import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { DefaultAPIError } from '@/types';
import { User } from '@prisma/client';
import axios, { isAxiosError } from 'axios';

type UserWithoutPassword = Omit<User, 'password'>;

type UserState = {
    isLoading: boolean;
    isError: boolean;
    error: DefaultAPIError | null;
    user: UserWithoutPassword | null;
};

const initialState: UserState = {
    isLoading: false,
    isError: false,
    error: null,
    user: null,
};

type UserAPIResponse = {
    success: boolean;
    data: UserWithoutPassword;
};

const getUser = createAsyncThunk<UserAPIResponse, void, { rejectValue: DefaultAPIError }>('user/getUser', async (_, thunkAPI) => {
    try {
        const response = await axios.get<UserAPIResponse>('/api/v1/users/me');
        return response.data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            return thunkAPI.rejectWithValue(error.response.data as DefaultAPIError);
        }
        const defaultError: DefaultAPIError = { success: false, message: 'Something went wrong', fields: null };
        return thunkAPI.rejectWithValue(defaultError);
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.payload ?? null;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.error = null;
                state.user = action.payload.data;
            });
    },
});

export { getUser };
export default userSlice.reducer;
