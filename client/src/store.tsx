import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import userReducer from './features/user/userSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
