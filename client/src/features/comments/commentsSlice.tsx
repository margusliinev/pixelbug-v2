import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CommentData, DefaultAPIError } from '@/types';
import axios, { isAxiosError } from 'axios';

type CommentsState = {
    isLoading: boolean;
    error: DefaultAPIError | null;
    comments: CommentData[];
};

const initialState: CommentsState = {
    isLoading: false,
    error: null,
    comments: [],
};

type CommentsAPIResponse = {
    success: boolean;
    message: string;
    data: CommentData[];
};

type NewCommentAPIResponse = {
    success: boolean;
    message: string;
    data: CommentData;
};

type DeleteCommentAPIResponse = {
    success: boolean;
    message: string;
    data: string;
};

const getComments = createAsyncThunk<CommentsAPIResponse, string, { rejectValue: DefaultAPIError }>('comments/getComments', async (id, thunkAPI) => {
    try {
        const response = await axios.get<CommentsAPIResponse>(`/api/v1/comments/${id}`);
        return response.data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            return thunkAPI.rejectWithValue(error.response.data as DefaultAPIError);
        }
        const defaultError: DefaultAPIError = {
            success: false,
            message: 'Something went wrong',
            status: 500,
            fields: null,
        };
        return thunkAPI.rejectWithValue(defaultError);
    }
});

const createComment = createAsyncThunk<NewCommentAPIResponse, { ticketId: string; content: string }, { rejectValue: DefaultAPIError }>(
    '/comments/createComment',
    async (body, thunkAPI) => {
        try {
            const response = await axios.post<NewCommentAPIResponse>(`/api/v1/comments`, body);
            return response.data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                return thunkAPI.rejectWithValue(error.response.data as DefaultAPIError);
            }
            const defaultError: DefaultAPIError = {
                success: false,
                message: 'Something went wrong',
                status: 500,
                fields: null,
            };
            return thunkAPI.rejectWithValue(defaultError);
        }
    },
);

const updateComment = createAsyncThunk<NewCommentAPIResponse, { commentId: string; content: string }, { rejectValue: DefaultAPIError }>(
    'comments/updateComment',
    async (body, thunkAPI) => {
        try {
            const response = await axios.patch<NewCommentAPIResponse>(`/api/v1/comments`, body);
            return response.data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                return thunkAPI.rejectWithValue(error.response.data as DefaultAPIError);
            }
            const defaultError: DefaultAPIError = {
                success: false,
                message: 'Something went wrong',
                status: 500,
                fields: null,
            };
            return thunkAPI.rejectWithValue(defaultError);
        }
    },
);

const deleteComment = createAsyncThunk<DeleteCommentAPIResponse, string, { rejectValue: DefaultAPIError }>(
    'comments/deleteComment',
    async (commentId, thunkAPI) => {
        try {
            const response = await axios.delete<DeleteCommentAPIResponse>(`/api/v1/comments`, { data: { commentId } });
            return response.data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                return thunkAPI.rejectWithValue(error.response.data as DefaultAPIError);
            }
            const defaultError: DefaultAPIError = {
                success: false,
                message: 'Something went wrong',
                status: 500,
                fields: null,
            };
            return thunkAPI.rejectWithValue(defaultError);
        }
    },
);

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {},
});

export { getComments, createComment, updateComment, deleteComment };
export default commentsSlice.reducer;
