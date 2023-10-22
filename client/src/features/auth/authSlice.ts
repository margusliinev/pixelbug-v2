import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { DefaultError } from '@/types';
import axios, { isAxiosError } from 'axios';

type AuthState = {
    isLoading: boolean;
    isError: boolean;
    error: DefaultError | null;
};

const initialState: AuthState = {
    isLoading: false,
    isError: false,
    error: null,
};

type SignupAPIResponse = {
    success: boolean;
    message: string;
};

type SignupDto = {
    username: string;
    email: string;
    password: string;
};

const signup = createAsyncThunk<SignupAPIResponse, SignupDto, { rejectValue: DefaultError }>('auth/signup', async (body, thunkAPI) => {
    try {
        const response = await axios.post<SignupAPIResponse>('/api/v1/auth/signup', body);
        return response.data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            return thunkAPI.rejectWithValue(error.response.data as DefaultError);
        }
        const defaultError: DefaultError = { success: false, message: 'Something went wrong', fields: null };
        return thunkAPI.rejectWithValue(defaultError);
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetError: (state) => {
            state.isError = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signup.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.error = null;
            })
            .addCase(signup.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.payload ?? null;
            })
            .addCase(signup.fulfilled, (state) => {
                state.isLoading = false;
                state.isError = false;
                state.error = null;
            });
    },
});

export { signup };
export const { resetError } = authSlice.actions;
export default authSlice.reducer;
