'use client';

import { useEffect, useCallback, useState } from 'react';
import { useTranslations } from 'next-intl';
import useMutation from '@/app/hooks/useMutation';
import { getUserInfo } from '@/app/api/user';
import LogoutButton from '../LogoutButton/LogoutButton';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import UserIcon from './UserIcon';

type UserResponse = {
    data: {
        name: string;
    };
};

const UserInfo = () => {
    const [userName, setUserName] = useState<string>('');
    const t = useTranslations();

    const memoizedMutationFn = useCallback(() => getUserInfo(), []);

    const {
        data: userInfo,
        mutate: getUser,
        isLoading,
    } = useMutation<UserResponse>({
        mutationFn: memoizedMutationFn,
    });

    useEffect(() => {
        if (!userName) {
            getUser();
        }
    }, [userName, getUser]);

    useEffect(() => {
        if (userInfo?.data?.name) {
            setUserName(userInfo.data.name);
        }
    }, [userInfo]);

    const loadingText = isLoading ? (
        <span>{t('button.loading')}</span>
    ) : (
        <span>{userName || t('titles.unknown_user')}</span>
    );

    return (
        <div className="sticky top-0 mb-8 rounded-bl-2xl rounded-br-2xl border-b-2 border-solid border-primary bg-[#ffe6dc] px-6 py-4 text-black">
            <LanguageSwitcher />
            <div className="flex items-center gap-3">
                <div className="color-primary flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                    <UserIcon />
                </div>
                {loadingText}
                <LogoutButton />
            </div>
        </div>
    );
};

export default UserInfo;
