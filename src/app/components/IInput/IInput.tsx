import { Field } from 'formik';

type InputFieldProps = {
    label?: string;
    placeholder?: string;
    type?: 'text' | 'password' | 'email' | 'textarea' | '';
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

    return (
        <div className={`relative w-full text-[#2C2C2C] ${className}`}>
            <label className="mb-2 block px-3 text-xs">{label}</label>
            <Field
                as={isTextarea ? 'textarea' : 'input'}
                type={type !== 'textarea' ? type : undefined}
                name={name}
                placeholder={placeholder}
                className={`w-full rounded-[4px] border ${
                    error && isTouched ? 'border-red-500' : 'border-[#eaeaea]'
                } px-3 py-2 text-sm focus:outline-primary ${
                    type === 'textarea' ? 'resize-none' : ''
                }`}
                rows={type === 'textarea' ? 3 : undefined}
            />
            {error && isTouched && (
                <div className="absolute right-0 mt-1 text-xs text-red-500">
                    {error}
                </div>
            )}
        </div>
    );
};

export default InputField;
