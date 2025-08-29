import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale } from 'next-intl/server';

import '../styles/globals.css';

import { AuthProvider } from '@/context/AuthProvider';

const geistSans = Geist({
    subsets: ['latin'],
    variable: '--font-geist-sans',
});

const geistMono = Geist_Mono({
    subsets: ['latin'],
    variable: '--font-geist-mono',
});

export const generateMetadata = async (): Promise<Metadata> => {
    const locale = await getLocale();

    const metadataByLocale = {
        uk: {
            title: 'IT traveler',
            description:
                'Простий та зручний спосіб ділитися IT-локаціями та відмічати улюблені місця',
            keywords: 'IT, подорожі, локації, карта, улюблені місця',
            openGraph: {
                title: 'IT traveler - Твої IT-локації',
                description: 'Відмічай улюблені IT-місця та ділися ними',
            },
        },
        en: {
            title: 'IT traveler',
            description:
                'Simple and convenient way to share IT locations and mark your favorite places',
            keywords: 'IT, travel, locations, map, favorite places',
            openGraph: {
                title: 'IT traveler - Your IT Locations',
                description:
                    'Mark your favorite IT places and share them with others',
            },
        },
        et: {
            title: 'IT traveller',
            description:
                'Lihtne ja mugav viis IT-asukohtade jagamiseks ja lemmikohtade märgistamiseks',
            keywords: 'IT, reisimine, asukohad, kaart, lemmikkohad',
            openGraph: {
                title: 'IT traveller - Sinu IT-asukohad',
                description: 'Märgi oma lemmik IT-kohad ja jaga neid teistega',
            },
        },
    };

    const metadata =
        metadataByLocale[locale as keyof typeof metadataByLocale] ||
        metadataByLocale.en;

    return {
        ...metadata,
        authors: [{ name: 'IT Traveler' }],
        generator: 'Next.js',
        metadataBase: new URL('https://travel-production-6248.up.railway.app/'),
        robots: {
            index: true,
            follow: true,
        },
        twitter: {
            card: 'summary_large_image',
            title: metadata.title,
            description: metadata.description,
        },
    };
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
    const locale = await getLocale();

    return (
        <html lang={locale}>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <NextIntlClientProvider>
                    <AuthProvider>{children}</AuthProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
};

export default RootLayout;
