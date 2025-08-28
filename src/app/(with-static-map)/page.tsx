import Image from 'next/image';
import { useTranslations } from 'next-intl';
import IButton from '@/app/components/IButton/IButton';

const Home = () => {
    const t = useTranslations();

    return (
        <>
            <div className="text-center">
                <Image
                    className="mb-6 inline"
                    src="/img/map-pin.svg"
                    width={24}
                    height={24}
                    alt="pin"
                />
                <h1 className="mb-7 text-4xl font-bold">IT traveler</h1>
                <p className="mb-11 leading-6">{t('app_description')}</p>
                <IButton to="/auth/registration">{t('button.start')}</IButton>
            </div>
        </>
    );
};

export default Home;
