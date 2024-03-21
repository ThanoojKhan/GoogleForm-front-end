import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import CreateForm from './pages/form/createFormPage';
import Landing from './pages/form/landingPage';
import SubmittedForms from './pages/form/submittedFormPage';
import ViewForm from './pages/form/viewFormPage';

function App() {
  return (
    <>
      <Toaster toastOptions={{ duration: 3000 }} />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/forms/:formId" element={<ViewForm />} />
        <Route path="/viewForms" element={<SubmittedForms />} />
        <Route path="/createForm" element={<CreateForm />} />
      </Routes>
    </>
  );
}

export default App;
