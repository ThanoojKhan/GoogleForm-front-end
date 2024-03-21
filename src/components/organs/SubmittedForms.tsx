import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { useAppDispatch } from "../../hooks/redux-hooks/useAppDispatch";
import { fetchForms } from "../../store/slice/formSlice";
import { RootState } from "../../store/store";
import "../../assets/styles/submittedForms.css"

const SubmittedForms = () => {
    const dispatch = useAppDispatch()
    const forms = useSelector((state: RootState) => state.form.forms);
    const formStatus = useSelector((state: RootState) => state.form.status);
    const formError = useSelector((state: RootState) => state.form.error);

    useEffect(() => {
        if (formStatus === 'idle') {
            dispatch(fetchForms());
        }
    }, [dispatch]);

    let content;

    if (formStatus === 'loading') {
        content = <div>Loading...</div>;
    } else if (formStatus === 'succeeded') {
        content = (
            <ul className="formList">
                {forms?.map((form, index) => (
                    <li className="formItem" key={index}>
                        <Link to={`/forms/${form?._id}`}>
                            <h2>{form?.title}</h2>
                        </Link>
                    </li>
                ))}
            </ul>
        );
    } else if (formStatus === 'failed') {
        content = <div className="errorMessage">{formError}</div>;
    }

    return (
        <div className="container">
            <h1>Forms</h1>
            {content}
        </div>
    )
}

export default SubmittedForms;