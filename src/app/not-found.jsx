import { useTranslations } from 'next-intl';
import Button from '@/components/Button/Button';

const NotFound = () => {
    const t = useTranslations();

    return (
        <section className="flex min-h-screen flex-col items-center justify-center bg-primary px-6 text-center text-white">
            <h1 className="text-white-800 mb-4 text-6xl font-bold">404</h1>
            <h2 className="text-white-700 mb-6 text-2xl font-semibold">
                {t('titles.error')}
            </h2>
            <p className="text-white-600 mb-8 max-w-2xl">{t('not_found')}</p>

            <Button to="/">{t('button.home')}</Button>
        </section>
    );
};

export default NotFound;
