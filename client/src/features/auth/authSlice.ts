import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { DefaultAPIResponse, DefaultAPIError } from '@/types';
import axios, { isAxiosError } from 'axios';

type AuthState = {
    signupState: {
        isLoading: boolean;
        error: DefaultAPIError | null;
    };
    signinState: {
        isLoading: boolean;
        error: DefaultAPIError | null;
    };
};

const initialState: AuthState = {
    signupState: {
        isLoading: false,
        error: null,
    },
    signinState: {
        isLoading: false,
        error: null,
    },
};

type SignupDto = {
    username: string;
    email: string;
    password: string;
};

type SigninDto = {
    email: string;
    password: string;
};

const signup = createAsyncThunk<DefaultAPIResponse, SignupDto, { rejectValue: DefaultAPIError }>('auth/signup', async (body, thunkAPI) => {
    try {
        const response = await axios.post<DefaultAPIResponse>('/api/v1/auth/signup', body);
        return response.data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            return thunkAPI.rejectWithValue(error.response.data as DefaultAPIError);
        }
        const defaultAPIError: DefaultAPIError = { success: false, message: 'Something went wrong', fields: null };
        return thunkAPI.rejectWithValue(defaultAPIError);
    }
});

const signin = createAsyncThunk<DefaultAPIResponse, SigninDto, { rejectValue: DefaultAPIError }>('auth/signin', async (body, thunkAPI) => {
    try {
        const response = await axios.post<DefaultAPIResponse>('/api/v1/auth/signin', body);
        return response.data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            return thunkAPI.rejectWithValue(error.response.data as DefaultAPIError);
        }
        const defaultAPIError: DefaultAPIError = { success: false, message: 'Something went wrong', fields: null };
        return thunkAPI.rejectWithValue(defaultAPIError);
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetError: (state) => {
            state.signupState.error = null;
            state.signinState.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signup.pending, (state) => {
                state.signupState.isLoading = true;
                state.signupState.error = null;
            })
            .addCase(signup.rejected, (state, action) => {
                state.signupState.isLoading = false;
                state.signupState.error = action.payload ?? null;
            })
            .addCase(signup.fulfilled, (state) => {
                state.signupState.isLoading = false;
                state.signupState.error = null;
            })
            .addCase(signin.pending, (state) => {
                state.signinState.isLoading = true;
                state.signinState.error = null;
            })
            .addCase(signin.rejected, (state, action) => {
                state.signinState.isLoading = false;
                state.signinState.error = action.payload ?? null;
            })
            .addCase(signin.fulfilled, (state) => {
                state.signinState.isLoading = false;
                state.signinState.error = null;
            });
    },
});

export { signup, signin };
export const { resetError } = authSlice.actions;
export default authSlice.reducer;
