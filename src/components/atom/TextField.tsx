import { ChangeEvent } from 'react';

interface TextFieldProps {
    title: string;
    required: boolean;
    value: string;
    onChange: (value: string) => void;
}

const TextField: React.FC<TextFieldProps> = ({ title, required, value, onChange }: TextFieldProps) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    return (
        <>
            <label>{title}</label>
            <input
                type="text"
                required={required}
                value={value}
                placeholder={title}
                onChange={handleChange}
            />
        </>
    );
};

export default TextField;
