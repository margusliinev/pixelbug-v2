import { Folder, Ticket, Users } from '@/assets/icons';
import { DashboardBarChart } from '@/components/dashboard/DashboardBarChart';
import { DashboardDonutChart } from '@/components/dashboard/DashboardDonutChart';
import { getDashboardData } from '@/features/dashboard/dashboardSlice';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageSpinner from '@/components/PageSpinner';

export default function DashboardPage() {
    const { isLoading, dashboard } = useAppSelector((store) => store.dashboard);
    const { user } = useAppSelector((store) => store.user);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (dashboard.barChartData.length > 0) return;
        void dispatch(getDashboardData());
    }, [dispatch, dashboard.barChartData.length]);

    if (isLoading) {
        return <PageSpinner />;
    }

    return (
        <section>
            <header className='flex items-end justify-between gap-8'>
                <div>
                    <h1 className='font-medium text-lg'>{user?.firstName ? `Welcome Back, ${user.firstName}!` : 'Welcome Back!'}</h1>
                    <h2 className='text-base text-neutral-600'>Here&apos;s a short overview of what&apos;s happening today.</h2>
                </div>
            </header>
            <article className='custom-grid grid-cols-3 gap-6 my-4'>
                <div className='bg-white grid-area-a p-5 rounded-md border shadow flex items-center justify-between'>
                    <div className='grid gap-3'>
                        <p className='uppercase text-base text-neutral-600 font-medium'>active projects</p>
                        <p className='text-2xl font-bold text-neutral-700'>{dashboard?.projects || 0}</p>
                        <Link className='text-base tracking-tight flex items-center gap-1 group' to={'/app/projects'}>
                            <span>View projects</span>
                            <span className='transition-colors group-hover:text-emerald-600'>&rarr;</span>
                        </Link>
                    </div>
                    <span className='bg-blue-400 p-3 rounded-md'>
                        <Folder height={8} width={8} color='text-white' />
                    </span>
                </div>
                <div className='bg-white grid-area-b p-5 rounded-md border shadow flex items-center justify-between'>
                    <div className='grid gap-3'>
                        <p className='uppercase text-base text-neutral-600 font-medium'>total tickets</p>
                        <p className='text-2xl font-bold text-neutral-700'>{dashboard?.tickets || 0}</p>
                        <Link className='text-base tracking-tight flex items-center gap-1 group' to={'/app/tickets'}>
                            <span>View tickets</span>
                            <span className='transition-colors group-hover:text-emerald-600'>&rarr;</span>
                        </Link>
                    </div>
                    <span className='rounded-md p-3 bg-red-400'>
                        <Ticket height={8} width={8} color='text-white' />
                    </span>
                </div>
                <div className='bg-white grid-area-c p-5 rounded-md border shadow flex items-center justify-between'>
                    <div className='grid gap-3'>
                        <p className='uppercase text-base text-neutral-600 font-medium'>Users</p>
                        <p className='text-2xl font-bold text-neutral-70<svg>0'>{dashboard?.users || 0}</p>
                        <Link className='text-base tracking-tight flex items-center gap-1 group' to={'/app/users'}>
                            <span>Find users</span>
                            <span className='transition-colors group-hover:text-emerald-600'>&rarr;</span>
                        </Link>
                    </div>
                    <span className='rounded-md p-3 bg-gray-400'>
                        <Users height={8} width={8} color='text-white' />
                    </span>
                </div>
                <div className='grid-area-d shadow-sm'>
                    <DashboardBarChart chartData={dashboard.barChartData} />
                </div>
                <div className='grid-area-e shadow-sm'>
                    <DashboardDonutChart chartData={dashboard.donutChartData} />
                </div>
            </article>
        </section>
    );
}
