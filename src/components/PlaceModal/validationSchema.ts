import * as Yup from 'yup';

export const validationSchema = (t: (str: string) => string) =>
    Yup.object().shape({
        title: Yup.string().required(t('errors.title_req')),
        description: Yup.string().required(t('errors.description_req')),
    });
