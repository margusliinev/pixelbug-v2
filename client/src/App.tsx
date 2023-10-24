import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { ErrorPage, HomePage, PricingPage, SignupPage, SigninPage } from './pages';
import { HomeLayout } from './layouts';
import AppLayout from './layouts/AppLayout';
import DashboardPage from './pages/DashboardPage';
import ProjectsPage from './pages/ProjectsPage';
import TicketsPage from './pages/TicketsPage';
import AccountPage from './pages/AccountPage';
import DevelopersPage from './pages/DevelopersPage';

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
                    path: 'account',
                    element: <AccountPage />,
                },
                {
                    path: 'developers',
                    element: <DevelopersPage />,
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;
