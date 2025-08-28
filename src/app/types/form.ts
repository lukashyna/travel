export type Field = {
    name: string;
    label: string;
    type: 'text' | 'email' | 'password' | 'textarea';
    placeholder?: string;
};
