import { useTranslations } from 'next-intl';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';

interface ConfirmModalProps {
    title?: string;
    isOpen?: boolean;
    isLoading?: boolean;
    error?: string;
    hasError?: boolean;
    onCancel: () => void;
    onConfirm: () => void;
}

const ConfirmModal = ({
    title = '',
    isOpen = false,
    isLoading = false,
    error,
    onCancel,
    onConfirm,
}: ConfirmModalProps) => {
    const t = useTranslations();

    if (!isOpen) return null;

    return (
        <Modal onClose={onCancel}>
            <div className="mb-4 text-lg">{title}</div>
            <div className="flex justify-center gap-3">
                <Button variant="gradient" onClick={onCancel}>
                    {t('button.cancel')}
                </Button>
                <Button
                    variant="gradient"
                    isLoading={isLoading}
                    onClick={onConfirm}
                >
                    {t('button.confirm')}
                </Button>
            </div>
            {error && (
                <div className="mt-4 text-red-500">
                    {t('errors.general')} : {error}
                </div>
            )}
        </Modal>
    );
};

export default ConfirmModal;
