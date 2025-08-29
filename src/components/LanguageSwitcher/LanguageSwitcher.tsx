'use client';

import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

const LanguageSwitcher = () => {
    const router = useRouter();
    const locale = useLocale();

    const availableLocales = ['en', 'et', 'uk'];

    const handleChange = (newLocale: string) => {
        document.cookie = `locale=${newLocale}; path=/; max-age=31536000`;
        router.refresh();
    };

    return (
        <div className="flex w-full justify-center p-4">
            {availableLocales.map(lng => (
                <button
                    key={lng}
                    onClick={() => handleChange(lng)}
                    className={`mx-2 cursor-pointer rounded-xl px-3 py-1 hover:bg-white hover:text-primary ${
                        lng === locale
                            ? 'bg-white text-primary'
                            : 'bg-transparent'
                    }`}
                >
                    {lng.toUpperCase()}
                </button>
            ))}
        </div>
    );
};

export default LanguageSwitcher;
