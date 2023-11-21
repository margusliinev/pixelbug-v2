import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { DefaultAPIError } from '@/types';
import axios, { isAxiosError } from 'axios';

type BarChartColumn = {
    title: string;
    tickets: number;
};

type DonutChartSection = {
    low: number;
    medium: number;
    high: number;
    critical: number;
};

type Dashboard = {
    barChartData: BarChartColumn[];
    donutChartData: DonutChartSection;
    projects: number;
    tickets: number;
    users: number;
};

type DashboardState = {
    isLoading: boolean;
    error: DefaultAPIError | null;
    dashboard: Dashboard;
};

const initialState: DashboardState = {
    isLoading: false,
    error: null,
    dashboard: {
        barChartData: [],
        donutChartData: {
            low: 0,
            medium: 0,
            high: 0,
            critical: 0,
        },
        projects: 0,
        tickets: 0,
        users: 0,
    },
};

type DashboardAPIResponse = {
    success: boolean;
    message: string;
    data: Dashboard;
};

const getDashboardData = createAsyncThunk<DashboardAPIResponse, void, { rejectValue: DefaultAPIError }>(
    'dashboard/getDashboardData',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get<DashboardAPIResponse>('/api/v1/dashboard');
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

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getDashboardData.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getDashboardData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload ?? null;
            })
            .addCase(getDashboardData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.dashboard = action.payload.data;
            });
    },
});

export { getDashboardData };
export default dashboardSlice.reducer;
