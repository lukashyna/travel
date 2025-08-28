import * as Yup from 'yup';

export const registerValidationSchema = (t: (str: string) => string) =>
    Yup.object().shape({
        name: Yup.string()
            .min(2, t('errors.name_format'))
            .required(t('errors.name_req')),
        email: Yup.string()
            .email(t('errors.email_format'))
            .required(t('errors.email_req')),
        password: Yup.string()
            .min(6, t('errors.password_format'))
            .required(t('errors.password_req')),
    });
