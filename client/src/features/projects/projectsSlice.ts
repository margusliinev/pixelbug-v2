import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { DefaultAPIError, ProjectWithLead } from '@/types';
import { ProjectStatus } from '@prisma/client';
import axios, { isAxiosError } from 'axios';
import { getTickets } from '../tickets/ticketsSlice';
import { getDashboardData } from '../dashboard/dashboardSlice';

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

type DeleteProjectAPIResponse = {
    success: boolean;
    message: string;
    data: string;
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
            if (response.status === 201) {
                await thunkAPI.dispatch(getDashboardData());
            }
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

const archiveProject = createAsyncThunk<NewProjectAPIResponse, string, { rejectValue: DefaultAPIError }>(
    'projects/archiveProject',
    async (projectId, thunkAPI) => {
        try {
            const response = await axios.patch<NewProjectAPIResponse>('/api/v1/projects', { projectId });
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

const deleteProject = createAsyncThunk<DeleteProjectAPIResponse, string, { rejectValue: DefaultAPIError }>(
    'projects/deleteProject',
    async (projectId, thunkAPI) => {
        try {
            const response = await axios.delete<DeleteProjectAPIResponse>('/api/v1/projects', { data: { projectId } });
            if (response.status === 200) {
                await thunkAPI.dispatch(getTickets());
                await thunkAPI.dispatch(getDashboardData());
            }
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
        [getProjects, createProject, archiveProject, deleteProject].forEach((thunk) => {
            builder
                .addCase(thunk.pending, (state) => {
                    state.isLoading = true;
                    state.error = null;
                })
                .addCase(thunk.rejected, (state, action) => {
                    state.isLoading = false;
                    state.error = action.payload ?? null;
                });
        }),
            builder
                .addCase(getProjects.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.error = null;
                    state.projects = action.payload.data;
                })
                .addCase(createProject.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.error = null;
                    state.projects = [...state.projects, action.payload.data];
                })
                .addCase(archiveProject.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.error = null;
                    state.projects = state.projects.map((project) => {
                        if (project.id === action.payload.data.id) {
                            return action.payload.data;
                        }
                        return project;
                    });
                })
                .addCase(deleteProject.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.error = null;
                    state.projects = state.projects.filter((project) => project.id !== action.payload.data);
                });
    },
});

export { getProjects, createProject, archiveProject, deleteProject };
export default projectsSlice.reducer;
