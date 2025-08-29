import { useTranslations } from 'next-intl';
import DynamicForm from '@/components/Auth/DynamicForm/DynamicForm';
import { registerValidationSchema } from './validationSchema';
import { registerFields, initialValues } from './constants';

interface RegisterFormProps {
    isLoading?: boolean;
    onSubmit: (data: { name: string; email: string; password: string }) => void;
}
const RegisterForm = ({ isLoading = false, onSubmit }: RegisterFormProps) => {
    const t = useTranslations();

    return (
        <DynamicForm
            fields={registerFields(t)}
            initialValues={initialValues}
            isLoading={isLoading}
            submitLabel={t('button.registration')}
            onSubmit={onSubmit}
            validationSchema={registerValidationSchema(t)}
        />
    );
};

export default RegisterForm;
