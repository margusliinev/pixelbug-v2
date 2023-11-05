import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { DefaultAPIError } from '@/types';
import { Project, ProjectStatus } from '@prisma/client';
import axios, { isAxiosError } from 'axios';

type ProjectsState = {
    isLoading: boolean;
    error: DefaultAPIError | null;
    projects: Project[];
};

const initialState: ProjectsState = {
    isLoading: false,
    error: null,
    projects: [],
};

type ProjectsAPIResponse = {
    success: boolean;
    message: string;
    data: Project;
};

type ProjectDto = {
    title: string;
    description: string;
    status: ProjectStatus;
    startDate: Date | undefined;
    dueDate: Date | undefined;
};

const createProject = createAsyncThunk<ProjectsAPIResponse, ProjectDto, { rejectValue: DefaultAPIError }>(
    'projects/createProject',
    async (body, thunkAPI) => {
        try {
            const response = await axios.post<ProjectsAPIResponse>('/api/v1/projects', body);
            return response.data;
        } catch (error) {
            console.log(error);
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
            });
    },
});

export { createProject };
export default projectsSlice.reducer;
