import { lazy, Suspense } from 'react';
import Navbar from '../../components/organs/Navbar';
import Loading from '../../components/organs/Loading';

const CreateForm = lazy(() => import('../../components/organs/CreateForm'));

function CreateFormPage() {
    return (
        <>
            <Navbar />
            <Suspense fallback={<Loading />}>
                <CreateForm />
            </Suspense>
        </>
    );
}

export default CreateFormPage;
