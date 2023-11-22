import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { DefaultAPIError, TicketWithProject } from '@/types';
import { Priority, TicketType } from '@prisma/client';
import axios, { isAxiosError } from 'axios';
import { getDashboardData } from '../dashboard/dashboardSlice';

type TicketsState = {
    isLoading: boolean;
    error: DefaultAPIError | null;
    tickets: TicketWithProject[];
};

const initialState: TicketsState = {
    isLoading: false,
    error: null,
    tickets: [],
};

type TicketsAPIResponse = {
    success: boolean;
    message: string;
    data: TicketWithProject[];
};

type DeleteTicketAPIResponse = {
    success: boolean;
    message: string;
    data: string;
};

type NewTicketAPIResponse = {
    success: boolean;
    message: string;
    data: TicketWithProject;
};

type TicketDto = {
    title: string;
    description: string;
    type: TicketType;
    priority: Priority;
    projectId: string;
};

const getTickets = createAsyncThunk<TicketsAPIResponse, void, { rejectValue: DefaultAPIError }>('tickets/getTickets', async (_, thunkAPI) => {
    try {
        const response = await axios.get<TicketsAPIResponse>('/api/v1/tickets');
        return response.data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            return thunkAPI.rejectWithValue(error.response.data as DefaultAPIError);
        }
        const defaultError: DefaultAPIError = { success: false, message: 'Something went wrong', status: 500, fields: null };
        return thunkAPI.rejectWithValue(defaultError);
    }
});

const createTicket = createAsyncThunk<NewTicketAPIResponse, TicketDto, { rejectValue: DefaultAPIError }>(
    'tickets/createTicket',
    async (body, thunkAPI) => {
        try {
            const response = await axios.post<NewTicketAPIResponse>('/api/v1/tickets', body);
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

const assignTicket = createAsyncThunk<NewTicketAPIResponse, string, { rejectValue: DefaultAPIError }>(
    'tickets/assignTicket',
    async (ticketId, thunkAPI) => {
        try {
            const response = await axios.patch<NewTicketAPIResponse>('/api/v1/tickets', { ticketId });
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

const deleteTicket = createAsyncThunk<DeleteTicketAPIResponse, string, { rejectValue: DefaultAPIError }>(
    'tickets/deleteTicket',
    async (ticketId, thunkAPI) => {
        try {
            const response = await axios.delete<DeleteTicketAPIResponse>('/api/v1/tickets', { data: { ticketId } });
            if (response.status === 200) {
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

const ticketsSlice = createSlice({
    name: 'tickets',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        [getTickets, createTicket, assignTicket, deleteTicket].forEach((thunk) => {
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
                .addCase(getTickets.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.error = null;
                    state.tickets = action.payload.data;
                })
                .addCase(createTicket.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.error = null;
                    state.tickets = [...state.tickets, action.payload.data];
                })
                .addCase(assignTicket.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.error = null;
                    state.tickets = state.tickets.map((ticket) => {
                        if (ticket.id === action.payload.data.id) {
                            return action.payload.data;
                        }
                        return ticket;
                    });
                })
                .addCase(deleteTicket.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.error = null;
                    state.tickets = state.tickets.filter((ticket) => ticket.id !== action.payload.data);
                });
    },
});

export { getTickets, createTicket, assignTicket, deleteTicket };
export default ticketsSlice.reducer;
