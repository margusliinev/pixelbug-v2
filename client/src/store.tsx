import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import userReducer from './features/user/userSlice';
import usersReducer from './features/users/usersSlice';
import ticketsReducer from './features/tickets/ticketsSlice';
import projectReducer from './features/project/projectSlice';
import projectsReducer from './features/projects/projectsSlice';
import commentsReducer from './features/comments/commentsSlice';
import dashboardReducer from './features/dashboard/dashboardSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        users: usersReducer,
        tickets: ticketsReducer,
        project: projectReducer,
        projects: projectsReducer,
        comments: commentsReducer,
        dashboard: dashboardReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
