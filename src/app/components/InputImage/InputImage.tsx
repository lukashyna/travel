'use client';

import { ChangeEvent } from 'react';
import { useTranslations } from 'next-intl';
import UploadIcon from './UploadIcon';

type UploadImageProps = {
    setFieldValue: (field: string, base64: string | ArrayBuffer | null) => void;
    setFieldError: (field: string, error: string) => void;
    error: string;
    children: React.ReactNode;
};

const UploadImage = ({
    setFieldValue,
    setFieldError,
    error,
    children,
}: UploadImageProps) => {
    const t = useTranslations();

    const handleUploadImg = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (!file) return;

        if (file.size > 70 * 1024 * 1024) {
            setFieldError('img', t('errors.file_size'));
            return;
        }

        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
            setFieldValue('img', fileReader.result);
        };
    };

    return (
        <div className="mt-6">
            <label className="cursor-pointer hover:text-primary">
                <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleUploadImg}
                />
                <span className="flex items-center gap-1">
                    <UploadIcon />
                    <span className="text-xs underline">{children}</span>
                </span>
            </label>
            {error && <div className="mt-2 text-red-500">{error}</div>}
        </div>
    );
};

export default UploadImage;
