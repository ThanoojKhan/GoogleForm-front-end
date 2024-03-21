import { lazy, Suspense } from 'react';
import Navbar from "../../components/organs/Navbar";
import Loading from '../../components/organs/Loading';

const SubmittedForms = lazy(() => import("../../components/organs/SubmittedForms"));

function SubmittedFormPage() {
    return (
        <>
            <Navbar />
            <Suspense fallback={<Loading />}>
                <SubmittedForms />
            </Suspense>
        </>
    );
}

export default SubmittedFormPage;
