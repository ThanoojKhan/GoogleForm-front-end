import { useEffect } from "react";
import { useSelector } from "react-redux";
import CheckBoxField from "../atom/CheckBoxField";
import DropDownField from "../atom/DropDownField";
import RadioButtonField from "../atom/RadioButtonField";
import TextField from "../atom/TextField";
import { useAppDispatch } from "../../hooks/redux-hooks/useAppDispatch";
import { fetchForms, submitForm } from "../../store/slice/formSlice";
import { RootState } from "../../store/store";

const MainForm = () => {
    const dispatch = useAppDispatch();
    const forms = useSelector((state: RootState) => state.form.forms);
    const status = useSelector((state: RootState) => state.form.status);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const data = Array.from(formData.entries()).reduce((data: any, [field, value]) => {
            data[field] = value;
            return data;
        }, {});

        dispatch(submitForm(data));
    };

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchForms());
        }
    }, [status, dispatch]);

    let content;

    if (status === 'loading') {
        content = <div>Loading...</div>;
    } else if (status === 'succeeded') {
        content = forms.map((form: any) => (
            <div key={form._id}>
                {form.fields.map((field: any) => {
                    switch (field.type) {
                        case 'textbox':
                            return <TextField key={field._id} field={field} />;
                        case 'radio':
                            return <RadioButtonField key={field._id} field={field} />;
                        case 'checkbox':
                            return <CheckBoxField key={field._id} field={field} />;
                        case 'dropdown':
                            return <DropDownField key={field._id} field={field} />;
                        default:
                            return null;
                    }
                })}
            </div>
        ));
    } else if (status === 'failed') {
        content = <div>Failed to load forms.</div>;
    }
    return (
        <form onSubmit={handleSubmit}>
            {content}
            <button type="submit">Submit</button>
        </form>
    );
}

export default MainForm