import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import formReducer from './slice/formSlice';

export const store = configureStore({
    reducer: {
        form: formReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

