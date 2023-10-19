import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ErrorPage, HomeLayout, HomePage, PricingPage, SignupPage, SigninPage } from './pages';

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
