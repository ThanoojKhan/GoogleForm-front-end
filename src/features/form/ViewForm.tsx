import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from '../../api/axiosInstance';
import CheckBoxField from "../../components/CheckBoxField";
import DropDownField from "../../components/DropDownField";
import RadioButtonField from "../../components/RadioButtonField";
import TextField from "../../components/TextField";
import Landing from "./Landing";
import '../../assets/styles/viewForm.css';

interface Field {
    name: string;
    type: string;
    required: boolean;
    options?: string[];
}

const ViewForm = () => {
    const { formId } = useParams();
    const [form, setForm] = useState({ title: '', fields: [] as Field[] });
    const [formResponses, setFormResponses] = useState({});
    const [submissionStatus, setSubmissionStatus] = useState('');

    const handleFieldChange = (name: string, value: string) => {
        setFormResponses({ ...formResponses, [name]: value });
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        try {
            const response = await axiosInstance.post(`/api/forms/${formId}/submit`, formResponses);

            if (response.status === 200) {
                console.log('Form submitted successfully');
                setSubmissionStatus('Form submitted successfully');
            } else {
                console.log('Error submitting form');
                setSubmissionStatus('Error submitting form');
            }
        } catch (error) {
            console.error('Error submitting form', error);
            setSubmissionStatus('Error submitting form');
        }
    };

    useEffect(() => {
        const fetchForm = async () => {
            const response = await axiosInstance.get(`/api/forms/${formId}`);
            setForm(response.data);
        };

        fetchForm();
    }, [formId]);

    const renderField = (field: Field, index: number) => {
        switch (field.type) {
            case 'text':
                return <TextField key={index} field={field} onFieldChange={handleFieldChange} />;
            case 'radio':
                return <RadioButtonField key={index} field={field} onFieldChange={handleFieldChange} />;
            case 'dropdown':
                return <DropDownField key={index} field={field} onFieldChange={handleFieldChange} />;
            case 'checkbox':
                return <CheckBoxField key={index} field={field} onFieldChange={handleFieldChange} />;
            default:
                return null;
        }
    };

    return (
        <>
            <Landing />
            <div>{submissionStatus === 'Form submitted successfully' ? (<div style={{ display: "flex", justifyContent: "center" }}><h3>{submissionStatus}</h3></div>) :
                (<div>
                    <h1 className="title">{form?.title}</h1>
                    <form onSubmit={handleSubmit}>
                        {form?.fields.map(renderField)}
                        <button type="submit">Submit</button>
                    </form>
                </div>)
            }
            </div>
        </>
    );
}

export default ViewForm