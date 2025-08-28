import * as Yup from 'yup';

export const loginValidationSchema = (t: (str: string) => string) =>
    Yup.object().shape({
        email: Yup.string()
            .email(t('errors.email_format'))
            .required(t('errors.email_req')),
        password: Yup.string()
            .min(6, t('errors.password_format'))
            .required(t('errors.password_req')),
    });
