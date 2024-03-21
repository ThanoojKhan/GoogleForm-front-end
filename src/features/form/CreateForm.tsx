import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import '../../assets/styles/createform.css'
import CheckBoxField from "../../components/CheckBoxField"
import DropDownField from "../../components/DropDownField"
import RadioButtonField from "../../components/RadioButtonField"
import TextField from "../../components/TextField"
import { useAppDispatch } from "../../hooks/redux-hooks/useAppDispatch"
import { createForm } from "../../store/slice/formSlice"
import { RootState } from "../../store/store"
import Landing from "./Landing"
import { toast } from 'react-hot-toast';

interface Field {
    name: string,
    type: string,
    required: boolean,
    options?: string[]
}

const CreateForm = () => {
    const [form, setForm] = useState({ title: '', fields: [] as Field[] })
    const [field, setField] = useState({ name: '', type: '', required: false, options: [] as string[] })
    const [option, setOption] = useState('');
    const [showToast, setShowToast] = useState(false); 

    const formStatus = useSelector((state: RootState) => state.form.status);
    const formError = useSelector((state: RootState) => state.form.error);
    const dispatch = useAppDispatch();

    const addField = () => {
        const newField = { ...field };
        if (newField?.name && newField?.type) {
            setForm({ ...form, fields: [...form?.fields, newField] });
        }
        setField({ name: '', type: '', required: false, options: [] as string[] });
    };

    const removeField = (index: number) => {
        const newFields = [...form?.fields];
        newFields.splice(index, 1);
        setForm({ ...form, fields: newFields });
    };

    const addOption = () => {
        if (option.trim()) {
            setField({ ...field, options: [...(field?.options || []), option] });
        }
        setOption('');
    };

    const handleSubmit = () => {
        if (form?.title && form?.fields?.length > 0) {
            dispatch(createForm(form));
            setShowToast(true); 
        } else {
            toast.error('Please fill in form title and add at least one field');
        }
    };

    const renderField = (field: Field, index: number) => {
        switch (field?.type) {
            case 'text':
                return (
                    <TextField
                        key={index}
                        title={field?.name}
                        required={field?.required}
                        value={field?.value}
                        onChange={(value: string) => {
                            const updatedFields = [...form?.fields];
                            updatedFields[index].value = value;
                            setForm({ ...form, fields: updatedFields });
                        }}
                    />
                );
            case 'dropdown':
                return <DropDownField key={index} field={field} />;
            case 'checkbox':
                return <CheckBoxField key={index} field={field} />;
            case 'radio':
                return <RadioButtonField key={index} field={field} />;
            default:
                return null;
        }
    };

    useEffect(() => {
        if (formStatus === 'succeeded' && showToast) {
            setForm({ title: '', fields: [] as Field[] });
            toast?.success('Form saved successfully');
            setShowToast(false);
        }
    }, [formStatus, showToast]);

    useEffect(() => {
        if (formStatus === 'failed' && formError) {
            toast?.error(`Error saving form: ${formError}`);
        }
    }, [formStatus, formError]);

    return (
        <div className='container'>
            <Landing />
            <div style={{ display: "flex", justifyContent: 'center' }}>
                <h1>Create Form</h1>
            </div>

            <div className="formClass">
                <div className="formContent">
                    <input
                        type="text"
                        placeholder="Form Title"
                        value={form?.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                    />
                    {form?.fields?.map((field, index) => (
                        <div key={index}>
                            {renderField(field, index)}
                            <div className="buttonDel">
                                <button className="delBut" onClick={() => removeField(index)}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </div>
                        </div>
                    ))}
                    <button onClick={handleSubmit}>Save Form</button>
                </div>
                <div className="formEditor">
                    <input
                        type="text"
                        placeholder="Field Name"
                        value={field?.name}
                        onChange={(e) => setField({ ...field, name: e.target.value })}
                    />
                    <select
                        value={field?.type}
                        onChange={(e) => setField({ ...field, type: e.target.value })}
                    >
                        <option value="">Select field type</option>
                        <option value="text">Text</option>
                        <option value="radio">Radio</option>
                        <option value="dropdown">Dropdown</option>
                        <option value="checkbox">Checkbox</option>
                    </select>
                    <button onClick={addField}>Add Field</button>
                    {field?.type === 'dropdown' || field?.type === 'checkbox' || field?.type === 'radio' ? (
                        <div>
                            <input
                                type="text"
                                placeholder="Enter option and press Add Option"
                                value={option}
                                onChange={(e) => setOption(e.target.value)}
                            />
                            <button onClick={addOption}>Add Option</button>
                            {field?.options && field?.options?.map((option, index) => (
                                <div key={index}>
                                    <span>{option}</span>
                                </div>
                            ))}
                        </div>
                    ) : null}
                    <input
                        type="checkbox"
                        checked={field?.required}
                        onChange={(e) => setField({ ...field, required: e.target.checked })}
                    />
                    <label>Required</label>
                </div>
            </div>
        </div>
    )
}

export default CreateForm;