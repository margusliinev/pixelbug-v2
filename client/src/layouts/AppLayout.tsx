import { useAppSelector, useAppDispatch } from '@/hooks';
import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getUser } from '@/features/user/userSlice';
import Navbar from '@/components/navigation/Navbar';
import SidebarDesktop from '@/components/navigation/SidebarDesktop';
import SidebarMobile from '@/components/navigation/SidebarMobile';

export default function AppLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isAuth, setIsAuth] = useState<boolean | undefined>(undefined);
    const { user } = useAppSelector((store) => store.user);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getUser())
            .unwrap()
            .then((res) => {
                if (res.success) {
                    setIsAuth(true);
                } else {
                    setIsAuth(false);
                }
            })
            .catch(() => {
                setIsAuth(false);
            });
    }, [dispatch]);

    if (isAuth === undefined || !user) return null;

    if (isAuth === false) return <Navigate to='/' />;

    return (
        <main className='grid xl:grid-cols-sidebar-layout bg-[#059669] bg-opacity-5'>
            <SidebarDesktop isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
            <SidebarMobile isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
            <div>
                <Navbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} user={user} />
                <div className='min-h-screen-minus-nav grid px-6 py-6 xl:px-12 xl:py-10 relative'>
                    <Outlet />
                </div>
            </div>
        </main>
    );
}
