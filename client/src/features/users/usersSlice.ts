import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { DefaultAPIError } from '@/types';
import { User } from '@prisma/client';
import axios, { isAxiosError } from 'axios';

type UserWithoutPassword = Omit<User, 'password'>;

type UsersState = {
    isLoading: boolean;
    error: DefaultAPIError | null;
    users: UserWithoutPassword[];
};

const initialState: UsersState = {
    isLoading: false,
    error: null,
    users: [],
};

type UsersAPIResponse = {
    success: boolean;
    message: string;
    data: UserWithoutPassword[];
};

const getUsers = createAsyncThunk<UsersAPIResponse, void, { rejectValue: DefaultAPIError }>('user/getUsers', async (_, thunkAPI) => {
    try {
        const response = await axios.get<UsersAPIResponse>('/api/v1/users');
        return response.data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            return thunkAPI.rejectWithValue(error.response.data as DefaultAPIError);
        }
        const defaultError: DefaultAPIError = { success: false, message: 'Something went wrong', status: 500, fields: null };
        return thunkAPI.rejectWithValue(defaultError);
    }
});

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload ?? null;
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.users = action.payload.data;
            });
    },
});

export { getUsers };
export default usersSlice.reducer;
