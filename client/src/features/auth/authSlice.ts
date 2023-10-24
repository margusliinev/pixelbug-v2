import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { DefaultAPIResponse, DefaultAPIError } from '@/types';
import axios, { isAxiosError } from 'axios';

type SignupDto = {
    username: string;
    email: string;
    password: string;
};

type SigninDto = {
    email: string;
    password: string;
};

const signup = createAsyncThunk<DefaultAPIResponse, SignupDto>('auth/signup', async (body, thunkAPI) => {
    try {
        const response = await axios.post<DefaultAPIResponse>('/api/v1/auth/signup', body);
        return response.data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
        const defaultError: DefaultAPIError = { success: false, message: 'Something went wrong', fields: null };
        return thunkAPI.rejectWithValue(defaultError);
    }
});

const signin = createAsyncThunk<DefaultAPIResponse, SigninDto>('auth/signin', async (body, thunkAPI) => {
    try {
        const response = await axios.post<DefaultAPIResponse>('/api/v1/auth/signin', body);
        return response.data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
        const defaultError: DefaultAPIError = { success: false, message: 'Something went wrong', fields: null };
        return thunkAPI.rejectWithValue(defaultError);
    }
});

const signout = createAsyncThunk('auth/signout', async (_, thunkAPI) => {
    try {
        await axios.post('/api/v1/auth/signout');
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
        const defaultError: DefaultAPIError = { success: false, message: 'Something went wrong', fields: null };
        return thunkAPI.rejectWithValue(defaultError);
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {},
    reducers: {},
});

export { signup, signin, signout };
export default authSlice.reducer;
