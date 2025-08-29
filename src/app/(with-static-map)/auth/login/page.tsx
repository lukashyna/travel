'use client';

import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import useMutation from '@/hooks/useMutation';
import LoginForm from '@/components/Auth/LoginForm/LoginForm';
import { LoginData } from '@/types/auth';

const LoginPage = () => {
    const router = useRouter();
    const { login } = useAuth();
    const {
        isLoading,
        error,
        mutate: handleLogin,
    } = useMutation<void, LoginData>({
        mutationFn: data => login(data),
        onSuccess: () => router.replace('/map'),
    });

    return (
        <>
            <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
            {error && <div className="mt-4 text-red-500">{error}</div>}
        </>
    );
};

export default LoginPage;
