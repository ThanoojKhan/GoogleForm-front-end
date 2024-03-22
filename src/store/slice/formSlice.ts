import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// @ts-ignore
import axiosInstance from '../../api/axiosInstance';

interface FormState {
    forms: any[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null | undefined;
}

const initialState: FormState = {
    forms: [],
    status: 'idle',
    error: null
};

export const fetchForms = createAsyncThunk('forms/fetchForms', async () => {
    try {
        const response = await axiosInstance.get('/api/forms');
        return response.data;
    } catch (error) {
        throw error;
    }
});

export const submitForm = createAsyncThunk('forms/submitForm', async (formData: any) => {
    try {
        const response = await axiosInstance.post('/api/forms/submit', formData);
        return response.data;
    } catch (error) {
        throw error;
    }
});

export const createForm = createAsyncThunk('forms/createForm', async (formStructure: any) => {
    try {
        const response = await axiosInstance.post('/api/forms', formStructure);
        return response.data;
    } catch (error) {
        throw error;
    }
});

const formSlice = createSlice({
    name: 'forms',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchForms.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchForms.fulfilled, (state, action: PayloadAction<any[]>) => {
                state.status = 'succeeded';
                state.forms = action.payload;
            })
            .addCase(fetchForms.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(submitForm.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(submitForm.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = 'succeeded';
                state.forms = action.payload;
            })
            .addCase(submitForm.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(createForm.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createForm.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = 'succeeded';
                state.forms = action.payload;
            })
            .addCase(createForm.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export default formSlice.reducer;
