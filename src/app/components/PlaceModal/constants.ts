import { Place } from '@/app/types/place';

export const fields = (t: (str: string) => string) =>
    [
        { name: 'title', label: t('label.location'), type: 'text' },
        {
            name: 'description',
            label: t('label.description'),
            type: 'textarea',
        },
    ] as const;

export const initialValues: Place = {
    id: '',
    title: '',
    description: '',
    img: '',
    coordinates: null,
};
