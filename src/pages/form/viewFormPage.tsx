import { lazy, Suspense } from 'react';
import Navbar from '../../components/organs/Navbar';
import Loading from '../../components/organs/Loading';

const ViewForm = lazy(() => import('../../components/organs/ViewForm'));

function ViewFormPage() {
    return (
        <>
            <Navbar />
            <Suspense fallback={<Loading />}>
                <ViewForm />
            </Suspense>
        </>
    );
}

export default ViewFormPage;
