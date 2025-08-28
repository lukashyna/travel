'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const t = useTranslations('button');

    const linkClass = (path: string) =>
        `text-gray hover:text-primary ${pathname === `/auth/${path}` ? 'text-primary' : ''}`;

    return (
        <section className="w-full rounded-2xl bg-white p-10">
            <div className="mb-10 flex justify-center gap-10">
                <Link
                    href="/auth/registration"
                    className={linkClass('registration')}
                >
                    {t('registration')}
                </Link>
                <Link href="/auth/login" className={linkClass('login')}>
                    {t('login')}
                </Link>
            </div>
            {children}
        </section>
    );
};

export default AuthLayout;
