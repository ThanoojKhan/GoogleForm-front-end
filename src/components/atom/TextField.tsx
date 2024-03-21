
interface TextFieldProps {
    title: string;
    required: boolean;
    value: string;
    onChange: (value: string) => void;
}

const TextField = ({ title, required, value, onChange }: TextFieldProps) => {
    return (
        <>
            <label>Form</label>
            <input
                type="text"
                required={required}
                value={value}
                placeholder={title}
                onChange={(e) => onChange(e.target.value)}
            />
        </>
    );
}

export default TextField;
