import { useTranslations } from 'next-intl';
import DynamicForm from '@/app/components/Auth/DynamicForm/DynamicForm';
import { loginValidationSchema } from './validationSchema';
import { loginFields, initialValues } from './constants';

interface LoginFormProps {
    isLoading?: boolean;
    onSubmit: (data: { email: string; password: string }) => void;
}

const LoginForm = ({ isLoading = false, onSubmit }: LoginFormProps) => {
    const t = useTranslations();

    return (
        <DynamicForm
            fields={loginFields(t)}
            initialValues={initialValues}
            isLoading={isLoading}
            submitLabel={t('button.login')}
            onSubmit={onSubmit}
            validationSchema={loginValidationSchema(t)}
        />
    );
};

export default LoginForm;
