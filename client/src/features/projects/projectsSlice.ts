import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { DefaultAPIError, ProjectData } from '@/types';
import { ProjectStatus } from '@prisma/client';
import { getTickets } from '../tickets/ticketsSlice';
import { getDashboardData } from '../dashboard/dashboardSlice';
import axios, { isAxiosError } from 'axios';

type ProjectsState = {
    isLoading: boolean;
    error: DefaultAPIError | null;
    projects: ProjectData[];
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

type ProjectAPIResponse = {
    success: boolean;
    message: string;
    data: ProjectData;
};

type ProjectsAPIResponse = {
    success: boolean;
    message: string;
    data: ProjectData[];
};

type NewProjectDto = {
    avatar: string;
    title: string;
    description: string;
    status: ProjectStatus;
    startDate?: Date;
    dueDate?: Date;
};

type UpdateProjectDto = {
    projectId: string;
    title?: string;
    description?: string;
    status?: ProjectStatus;
    startDate?: Date;
    dueDate?: Date;
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

const createProject = createAsyncThunk<ProjectAPIResponse, NewProjectDto, { rejectValue: DefaultAPIError }>(
    'projects/createProject',
    async (body, thunkAPI) => {
        try {
            const response = await axios.post<ProjectAPIResponse>('/api/v1/projects', body);
            if (response.status === 201) {
                void thunkAPI.dispatch(getDashboardData());
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

const archiveProject = createAsyncThunk<ProjectAPIResponse, string, { rejectValue: DefaultAPIError }>(
    'projects/archiveProject',
    async (projectId, thunkAPI) => {
        try {
            const response = await axios.patch<ProjectAPIResponse>('/api/v1/projects', { projectId });
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

const updateProject = createAsyncThunk<ProjectAPIResponse, UpdateProjectDto, { rejectValue: DefaultAPIError }>(
    'projects/updateProject',
    async (body, thunkAPI) => {
        try {
            const response = await axios.put<ProjectAPIResponse>('/api/v1/projects', body);
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
                void thunkAPI.dispatch(getTickets());
                void thunkAPI.dispatch(getDashboardData());
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
        [getProjects, createProject, archiveProject, updateProject, deleteProject].forEach((thunk) => {
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
                .addCase(updateProject.fulfilled, (state, action) => {
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

export { getProjects, createProject, archiveProject, updateProject, deleteProject };
export default projectsSlice.reducer;
