import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ErrorPage, HomePage, PricingPage, SignupPage, SigninPage } from './pages';
import { HomeLayout } from './layouts';

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
    ]);

    return <RouterProvider router={router} />;
}

export default App;
