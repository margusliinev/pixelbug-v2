import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CommentWithUser, DefaultAPIError } from '@/types';
import axios, { isAxiosError } from 'axios';

type CommentsState = {
    isLoading: boolean;
    error: DefaultAPIError | null;
    comments: CommentWithUser[];
};

const initialState: CommentsState = {
    isLoading: false,
    error: null,
    comments: [],
};

type CommentsAPIResponse = {
    success: boolean;
    message: string;
    data: CommentWithUser[];
};

const getComments = createAsyncThunk<CommentsAPIResponse, string, { rejectValue: DefaultAPIError }>('comments/getComments', async (id, thunkAPI) => {
    try {
        const response = await axios.get<CommentsAPIResponse>(`/api/v1/comments/${id}`);
        return response.data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            return thunkAPI.rejectWithValue(error.response.data as DefaultAPIError);
        }
        const defaultError: DefaultAPIError = { success: false, message: 'Something went wrong', status: 500, fields: null };
        return thunkAPI.rejectWithValue(defaultError);
    }
});

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {},
});

export { getComments };
export default commentsSlice.reducer;
