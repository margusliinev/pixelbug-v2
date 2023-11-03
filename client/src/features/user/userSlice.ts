import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { DefaultAPIError, DefaultAPIResponse } from '@/types';
import { User } from '@prisma/client';
import axios, { isAxiosError } from 'axios';

type UserWithoutPassword = Omit<User, 'password'>;

type UserState = {
    isLoading: boolean;
    error: DefaultAPIError | null;
    user: UserWithoutPassword | null;
};

const initialState: UserState = {
    isLoading: false,
    error: null,
    user: null,
};

type UserAPIResponse = {
    success: boolean;
    message: string;
    data: UserWithoutPassword;
};

type UpdatePasswordDto = {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
};

const getUser = createAsyncThunk<UserAPIResponse, void, { rejectValue: DefaultAPIError }>('user/getUser', async (_, thunkAPI) => {
    try {
        const response = await axios.get<UserAPIResponse>('/api/v1/users/me');
        return response.data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            return thunkAPI.rejectWithValue(error.response.data as DefaultAPIError);
        }
        const defaultError: DefaultAPIError = { success: false, message: 'Something went wrong', status: 500, fields: null };
        return thunkAPI.rejectWithValue(defaultError);
    }
});

const updateUserProfile = createAsyncThunk<UserAPIResponse, FormData, { rejectValue: DefaultAPIError }>(
    'user/updateUserProfile',
    async (body, thunkAPI) => {
        try {
            const response = await axios.patch<UserAPIResponse>('/api/v1/users/me', body);
            return response.data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                return thunkAPI.rejectWithValue(error.response.data as DefaultAPIError);
            }
            const defaultError: DefaultAPIError = { success: false, message: 'Something went wrong', status: 500, fields: null };
            return thunkAPI.rejectWithValue(defaultError);
        }
    },
);

const updateUserPassword = createAsyncThunk<DefaultAPIResponse, UpdatePasswordDto, { rejectValue: DefaultAPIError }>(
    'user/updateUserPassword',
    async (body, thunkAPI) => {
        try {
            const response = await axios.put<DefaultAPIResponse>('/api/v1/users/me', body);
            return response.data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                return thunkAPI.rejectWithValue(error.response.data as DefaultAPIError);
            }
            const defaultError: DefaultAPIError = { success: false, message: 'Something went wrong', status: 500, fields: null };
            return thunkAPI.rejectWithValue(defaultError);
        }
    },
);

const deleteUser = createAsyncThunk<DefaultAPIResponse, void, { rejectValue: DefaultAPIError }>('user/deleteUser', async (_, thunkAPI) => {
    try {
        const response = await axios.delete<DefaultAPIResponse>('/api/v1/users/me');
        return response.data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            return thunkAPI.rejectWithValue(error.response.data as DefaultAPIError);
        }
        const defaultError: DefaultAPIError = { success: false, message: 'Something went wrong', status: 500, fields: null };
        return thunkAPI.rejectWithValue(defaultError);
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        [getUser, updateUserProfile, updateUserPassword, deleteUser].forEach((thunk) => {
            builder
                .addCase(thunk.pending, (state) => {
                    state.isLoading = true;
                    state.error = null;
                })
                .addCase(thunk.rejected, (state, action) => {
                    state.isLoading = false;
                    state.error = action.payload ?? null;
                });
        });
        builder
            .addCase(getUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.user = action.payload.data;
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.user = action.payload.data;
            })
            .addCase(updateUserPassword.fulfilled, (state) => {
                state.isLoading = false;
                state.error = null;
            })
            .addCase(deleteUser.fulfilled, (state) => {
                state.isLoading = false;
                state.error = null;
                state.user = null;
            });
    },
});

export { getUser, updateUserProfile, updateUserPassword, deleteUser };
export default userSlice.reducer;
