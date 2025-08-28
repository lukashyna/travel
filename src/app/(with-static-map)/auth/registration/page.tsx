'use client';

import { useRouter } from 'next/navigation';
import useAuth from '@/app/hooks/useAuth';
import useMutation from '@/app/hooks/useMutation';
import RegistrationForm from '@/app/components/Auth/RegistrationForm/RegistrationForm';
import { RegisterData } from '@/app/types/auth';

const RegisterPage = () => {
    const router = useRouter();
    const { register } = useAuth();

    const {
        isLoading,
        error,
        mutate: handleRegister,
    } = useMutation<void, RegisterData>({
        mutationFn: data => register(data),
        onSuccess: () => router.replace('/map'),
    });

    return (
        <>
            <RegistrationForm onSubmit={handleRegister} isLoading={isLoading} />
            {error && <div className="mt-4 text-red-500">{error}</div>}
        </>
    );
};

export default RegisterPage;
