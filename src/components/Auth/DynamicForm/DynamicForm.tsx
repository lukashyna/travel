import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Button from '@/components/Button/Button';
import InputField from '@/components/InputField/InputField';
import { Field } from '@/types/form';

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
                    <InputField
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
                <Button
                    type="submit"
                    variant="gradient"
                    isLoading={isLoading || isSubmitting}
                >
                    {submitLabel}
                </Button>
            </Form>
        )}
    </Formik>
);

export default DynamicForm;
