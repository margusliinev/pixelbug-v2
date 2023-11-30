import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { DefaultAPIError } from '@/types';
import { Project, Ticket } from '@prisma/client';
import axios, { isAxiosError } from 'axios';

interface ProjectPage extends Project {
    lead: {
        id: string | null;
        photo: string | null;
        name: string;
    };
    tickets: Ticket[];
}

type ProjectState = {
    isLoading: boolean;
    error: DefaultAPIError | null;
    project: ProjectPage | null;
};

const initialState: ProjectState = {
    isLoading: false,
    error: null,
    project: null,
};

type ProjectAPIResponse = {
    success: boolean;
    message: string;
    data: ProjectPage;
};

const getProject = createAsyncThunk<ProjectAPIResponse, string, { rejectValue: DefaultAPIError }>('project/getProject', async (id, thunkAPI) => {
    try {
        const response = await axios.get<ProjectAPIResponse>(`/api/v1/projects/${id}`);
        return response.data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            return thunkAPI.rejectWithValue(error.response.data as DefaultAPIError);
        }
        const defaultError: DefaultAPIError = { success: false, message: 'Something went wrong', status: 500, fields: null };
        return thunkAPI.rejectWithValue(defaultError);
    }
});

const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        [getProject].forEach((thunk) => {
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
        builder.addCase(getProject.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.project = action.payload.data;
        });
    },
});

export { getProject };
export default projectSlice.reducer;
