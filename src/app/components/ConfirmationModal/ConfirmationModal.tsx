import { useTranslations } from 'next-intl';
import IButton from '../IButton/IButton';
import IModal from '../IModal/IModal';

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
        <IModal onClose={onCancel}>
            <div className="mb-4 text-lg">{title}</div>
            <div className="flex justify-center gap-3">
                <IButton onClick={onCancel}>{t('button.cancel')}</IButton>
                <IButton
                    variant="gradient"
                    isLoading={isLoading}
                    onClick={onConfirm}
                >
                    {t('button.confirm')}
                </IButton>
            </div>
            {error && (
                <div className="mt-4 text-red-500">
                    {t('errors.general')} : {error}
                </div>
            )}
        </IModal>
    );
};

export default ConfirmModal;
