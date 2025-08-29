import { useCallback, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

type UseMutationParams<TData, TVariables> = {
    mutationFn: (variables: TVariables) => Promise<TData>;
    onSuccess?: (data: TData) => void;
    onError?: (error: unknown) => void;
};

const useMutation = <TData = unknown, TVariables = void>({
    mutationFn,
    onSuccess,
    onError,
}: UseMutationParams<TData, TVariables>) => {
    const [data, setData] = useState<TData | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>('');
    const router = useRouter();
    const t = useTranslations();

    const mutate = useCallback(
        async (variables: TVariables) => {
            setIsLoading(true);
            try {
                const result = await mutationFn(variables);
                setData(result);
                setError('');
                onSuccess?.(result);
            } catch (error: unknown) {
                const errorMessage =
                    (axios.isAxiosError(error) &&
                        error.response?.data?.message) ??
                    (error instanceof Error
                        ? error.message
                        : t('errors.general'));

                if (
                    typeof error === 'object' &&
                    error !== null &&
                    'redirectToLogin' in error
                ) {
                    router.push('/auth/login');
                    return;
                }

                setError(errorMessage);
                onError?.(errorMessage);
            } finally {
                setIsLoading(false);
            }
        },
        [onError, mutationFn, onSuccess, router, t]
    );

    const reset = useCallback(() => {
        setData(null);
        setError('');
        setIsLoading(false);
    }, []);

    return {
        data,
        isLoading,
        error,
        reset,
        mutate,
    };
};

export default useMutation;
