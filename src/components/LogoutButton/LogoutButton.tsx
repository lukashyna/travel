'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import useAuth from '@/hooks/useAuth';
import useMutation from '@/hooks/useMutation';
import LogoutIcon from './LogoutIcon';

const LogoutButton = () => {
    const router = useRouter();
    const { logout } = useAuth();
    const t = useTranslations('button');

    const { isLoading, mutate: handleLogout } = useMutation<void>({
        mutationFn: () => logout(),
        onSuccess: () => router.replace('/'),
    });

    return (
        <button
            className="ml-auto flex cursor-pointer items-center gap-2 px-6 hover:text-primary"
            onClick={() => handleLogout()}
        >
            {isLoading ? (
                <span>{t('loading')}</span>
            ) : (
                <span>{t('logout')}</span>
            )}
            <LogoutIcon />
        </button>
    );
};

export default LogoutButton;
