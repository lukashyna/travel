import { Field } from '@/types/form';

export const loginFields = (t: (str: string) => string): Field[] => [
    {
        name: 'email',
        label: t('label.email'),
        type: 'email',
        placeholder: 'email@gmail.com',
    },
    {
        name: 'password',
        label: t('label.password'),
        type: 'password',
        placeholder: t('placeholder.password'),
    },
];

export const initialValues = { email: '', password: '' };
