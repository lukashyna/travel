import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import IButton from '@/app/components/IButton/IButton';
import IInput from '@/app/components/IInput/IInput';
import { Field } from '@/app/types/form';

interface DynamicFormProps<T extends Record<string, string>> {
    fields: Field[];
    initialValues: T;
    isLoading?: boolean;
    submitLabel: string;
    onSubmit: (values: T) => void;
    validationSchema: Yup.ObjectSchema<T>;
}

const DynamicForm = <T extends Record<string, string>>({
    fields,
    initialValues,
    isLoading = false,
    submitLabel,
    onSubmit,
    validationSchema,
}: DynamicFormProps<T>) => (
    <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
            onSubmit(values);
            setSubmitting(false);
        }}
    >
        {({ isSubmitting, errors, touched }) => (
            <Form>
                {fields.map(({ name, label, type, placeholder }) => (
                    <IInput
                        key={name as string}
                        className="mb-4"
                        label={label}
                        type={type}
                        placeholder={placeholder}
                        name={name as string}
                        error={errors[name] as string}
                        isTouched={touched[name] as boolean}
                    />
                ))}
                <IButton
                    type="submit"
                    variant="gradient"
                    isLoading={isLoading || isSubmitting}
                >
                    {submitLabel}
                </IButton>
            </Form>
        )}
    </Formik>
);

export default DynamicForm;
