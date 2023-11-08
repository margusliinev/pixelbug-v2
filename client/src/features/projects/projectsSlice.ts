import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { DefaultAPIError, ProjectWithLead } from '@/types';
import { ProjectStatus } from '@prisma/client';
import axios, { isAxiosError } from 'axios';

type ProjectsState = {
    isLoading: boolean;
    error: DefaultAPIError | null;
    projects: ProjectWithLead[];
};

const initialState: ProjectsState = {
    isLoading: false,
    error: null,
    projects: [],
};

type NewProjectAPIResponse = {
    success: boolean;
    message: string;
    data: ProjectWithLead;
};

type ProjectsAPIResponse = {
    success: boolean;
    message: string;
    data: ProjectWithLead[];
};

type ProjectDto = {
    avatar: string;
    title: string;
    description: string;
    status: ProjectStatus;
    startDate: Date | undefined;
    dueDate: Date | undefined;
};

const getProjects = createAsyncThunk<ProjectsAPIResponse, void, { rejectValue: DefaultAPIError }>('projects/getProjects', async (_, thunkAPI) => {
    try {
        const response = await axios.get<ProjectsAPIResponse>('/api/v1/projects');
        return response.data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            return thunkAPI.rejectWithValue(error.response.data as DefaultAPIError);
        }
        const defaultError: DefaultAPIError = { success: false, message: 'Something went wrong', status: 500, fields: null };
        return thunkAPI.rejectWithValue(defaultError);
    }
});

const createProject = createAsyncThunk<NewProjectAPIResponse, ProjectDto, { rejectValue: DefaultAPIError }>(
    'projects/createProject',
    async (body, thunkAPI) => {
        try {
            const response = await axios.post<NewProjectAPIResponse>('/api/v1/projects', body);
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

const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createProject.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createProject.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload ?? null;
            })
            .addCase(createProject.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.projects = [...state.projects, action.payload.data];
            })
            .addCase(getProjects.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getProjects.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload ?? null;
            })
            .addCase(getProjects.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.projects = action.payload.data;
            });
    },
});

export { getProjects, createProject };
export default projectsSlice.reducer;
