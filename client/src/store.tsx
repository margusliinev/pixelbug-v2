import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import userReducer from './features/user/userSlice';
import usersReducer from './features/users/usersSlice';
import projectsReducer from './features/projects/projectsSlice';
import ticketsReducer from './features/tickets/ticketsSlice';
import dashboardReducer from './features/dashboard/dashboardSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        users: usersReducer,
        projects: projectsReducer,
        tickets: ticketsReducer,
        dashboard: dashboardReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
