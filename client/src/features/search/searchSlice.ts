import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface SearchTicket {
    id: string;
    title: string;
}

interface TicketSearchResult {
    success: boolean;
    tickets: SearchTicket[];
}

export const searchSlice = createApi({
    reducerPath: 'search',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/v1' }),
    endpoints: (builder) => ({
        searchTickets: builder.query<TicketSearchResult, string>({
            query: (searchTerm) => ({
                url: '/search',
                method: 'GET',
                params: { searchTerm },
            }),
        }),
    }),
});

export const { useSearchTicketsQuery } = searchSlice;
