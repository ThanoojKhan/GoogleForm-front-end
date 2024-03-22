interface TextFieldProps {
    title: string;
    required: boolean;
    value: string;
    field: {
        name: string;
        required: boolean;
        options?: string[];
    };
    className: string;
    key: any;
    onChange: (value: string) => void;
}

const TextField = ({ title, required, value, onChange }: TextFieldProps) => {

    return (
        <>
            <label>{title}</label>
            <input
                type="text"
                required={required}
                value={value}
                placeholder={title}
                onChange={(e) => onChange && onChange(e.target.value)}
            />
        </>
    );
};

export default TextField;
