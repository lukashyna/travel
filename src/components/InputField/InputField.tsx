import { Field } from 'formik';

type InputFieldProps = {
    label?: string;
    placeholder?: string;
    type?: 'text' | 'password' | 'email' | 'textarea';
    name: string;
    className?: string;
    error?: string;
    isTouched?: boolean;
};

const InputField = ({
    label,
    placeholder = '',
    type = 'text',
    name,
    className = '',
    error,
    isTouched,
}: InputFieldProps) => {
    const isTextarea = type === 'textarea';
    const hasError = Boolean(error && isTouched);

    return (
        <div className={`relative w-full text-[#2C2C2C] ${className}`}>
            {label && (
                <label className="mb-2 block px-3 text-xs">{label}</label>
            )}
            <Field
                as={isTextarea ? 'textarea' : 'input'}
                type={!isTextarea ? type : undefined}
                name={name}
                placeholder={placeholder}
                rows={isTextarea ? 3 : undefined}
                aria-invalid={hasError}
                className={`w-full rounded-[4px] border px-3 py-2 text-base focus:outline-primary ${
                    hasError ? 'border-red-500' : 'border-[#eaeaea]'
                } ${isTextarea ? 'resize-none' : ''}`}
            />
            {hasError && (
                <div className="absolute right-0 mt-1 text-xs text-red-500">
                    {error}
                </div>
            )}
        </div>
    );
};

export default InputField;
