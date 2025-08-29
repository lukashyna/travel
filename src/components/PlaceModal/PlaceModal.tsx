import { Formik, Form } from 'formik';
import { useTranslations } from 'next-intl';
import Button from '../Button/Button';
import InputField from '../InputField/InputField';
import Modal from '../Modal/Modal';
import InputImage from '../InputImage/InputImage';
import MarkerIcon from '../icons/MarkerIcon';
import fallbackImage from '/public/assets/img/placeholder.png';
import Image from 'next/image';
import { fields, initialValues } from './constants';
import { validationSchema } from './validationSchema';
import { Place, BasePlace } from '@/types/place';

interface PlaceModalProps {
    isOpen?: boolean;
    isLoading?: boolean;
    error?: string;
    place?: Place | null;
    title: string;
    onClose: () => void;
    onSubmit: (formData: Place | BasePlace) => void;
}

const PlaceModal = ({
    isOpen = false,
    isLoading = false,
    error,
    place,
    title,
    onClose,
    onSubmit,
}: PlaceModalProps) => {
    const t = useTranslations();

    if (!isOpen) return null;

    return (
        <Modal onClose={onClose}>
            <div className="max-w--[750px]">
                <div className="mb-10 flex items-center gap-2">
                    <MarkerIcon />
                    {t(title)}
                </div>
                <Formik
                    initialValues={place || initialValues}
                    validationSchema={validationSchema(t)}
                    onSubmit={(values, { setSubmitting }) => {
                        onSubmit(values);
                        setSubmitting(false);
                    }}
                >
                    {({
                        isSubmitting,
                        errors,
                        touched,
                        values,
                        setFieldValue,
                        setFieldError,
                    }) => (
                        <Form>
                            <div className="flex flex-col gap-5 md:flex-row">
                                <div className="md:w-5/12">
                                    <Image
                                        className="rounded-md object-cover"
                                        src={
                                            typeof values.img === 'string' &&
                                            values.img
                                                ? values.img
                                                : fallbackImage
                                        }
                                        alt="place img"
                                        width={400}
                                        height={276}
                                        priority
                                    />
                                </div>

                                <div className="md:w-7/12">
                                    {fields(t).map(({ name, label, type }) => (
                                        <InputField
                                            key={name}
                                            className="mb-4"
                                            label={label}
                                            type={type}
                                            name={name}
                                            error={errors[name] as string}
                                            isTouched={touched[name] as boolean}
                                        />
                                    ))}

                                    <InputImage
                                        setFieldValue={setFieldValue}
                                        setFieldError={setFieldError}
                                        error={errors.img as string}
                                    >
                                        {values.img
                                            ? t('titles.change_photo')
                                            : t('titles.add_photo')}
                                    </InputImage>

                                    <Button
                                        type="submit"
                                        className="mt-10 w-full"
                                        variant="gradient"
                                        isLoading={isLoading || isSubmitting}
                                    >
                                        {t('button.save')}
                                    </Button>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
                {error && (
                    <div className="mt-4 text-red-500">
                        {t('errors.general')} : {error}
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default PlaceModal;
