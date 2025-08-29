import { useTranslations } from 'next-intl';

const Loading = () => {
    const t = useTranslations();

    return (
        <div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center p-6">
            {t('button.loading')}
        </div>
    );
};

export default Loading;
