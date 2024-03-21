import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './App.css';
import Landing from './features/form/Landing';

const CreateForm = lazy(() => import('./features/form/CreateForm'));
const SubmittedForms = lazy(() => import('./features/form/SubmittedForms'));
const ViewForm = lazy(() => import('./features/form/ViewForm'));

function App() {
  return (
    <>
      <Toaster toastOptions={{ duration: 3000 }} />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/forms/:formId" element={<ViewForm />} />
          <Route path="/viewForms" element={<SubmittedForms />} />
          <Route path="/createForm" element={<CreateForm />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
