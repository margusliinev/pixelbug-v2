import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { HomeLayout, AppLayout } from './layouts';
import { ErrorPage, HomePage, PricingPage, SignupPage, SigninPage, DashboardPage, ProjectsPage, TicketsPage, AccountPage, UsersPage } from './pages';

function App() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <HomeLayout />,
            errorElement: <ErrorPage />,
            children: [
                {
                    index: true,
                    element: <HomePage />,
                },
                {
                    path: 'pricing',
                    element: <PricingPage />,
                },
                {
                    path: 'sign-up',
                    element: <SignupPage />,
                },
                {
                    path: 'sign-in',
                    element: <SigninPage />,
                },
            ],
        },
        {
            path: '/app',
            element: <AppLayout />,
            children: [
                {
                    index: true,
                    element: <Navigate to='dashboard' />,
                },
                {
                    path: 'dashboard',
                    element: <DashboardPage />,
                },
                {
                    path: 'projects',
                    element: <ProjectsPage />,
                },
                {
                    path: 'tickets',
                    element: <TicketsPage />,
                },
                {
                    path: 'users',
                    element: <UsersPage />,
                },
                {
                    path: 'account',
                    element: <AccountPage />,
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;
