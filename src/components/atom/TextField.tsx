interface TextFieldProps {
    title: string;
    field: {
        name: string;
        required: boolean;
        options?: string[];
    };
    className: string;
    key: any;
    onFieldChange?: (name: string, value: string) => void;
}

const TextField = ({ field, onFieldChange }: TextFieldProps) => {


    return (
        <>
            <label>{field.name}</label>
            <input
                type="text" name={field.name} required={field.required} onChange={(e) => onFieldChange && onFieldChange(field.name, e.target.value)}
            />
        </>
    );
};

export default TextField;
