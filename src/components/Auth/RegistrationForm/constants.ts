import { Field } from '@/types/form';

export const registerFields = (t: (str: string) => string): Field[] => [
    {
        name: 'name',
        label: t('label.name'),
        type: 'text',
        placeholder: t('placeholder.name'),
    },
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

export const initialValues = { name: '', email: '', password: '' };
