import { DashboardBarChart } from '@/components/dashboard/DashboardBarChart';
import { DashboardDonutChart } from '@/components/dashboard/DashboardDonutChart';
import { getDashboardData } from '@/features/dashboard/dashboardSlice';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function DashboardPage() {
    const { dashboard } = useAppSelector((store) => store.dashboard);
    const { user } = useAppSelector((store) => store.user);
    const dispatch = useAppDispatch();

    useEffect(() => {
        void dispatch(getDashboardData());
    }, [dispatch]);

    const barChartData = dashboard.barChartData;

    const donutChartData = [
        {
            name: 'Low',
            Tickets: dashboard.donutChartData.low || 0,
        },
        {
            name: 'Medium',
            Tickets: dashboard.donutChartData.medium || 0,
        },
        {
            name: 'High',
            Tickets: dashboard.donutChartData.high || 0,
        },
        {
            name: 'Critical',
            Tickets: dashboard.donutChartData.critical || 0,
        },
    ];

    return (
        <section>
            <header className='flex items-end justify-between gap-8'>
                <div>
                    <h1 className='font-medium text-lg'>Welcome Back, {user?.firstName}!</h1>
                    <h2 className='text-base text-neutral-600'>Here&apos;s a short overview of what&apos;s happening today.</h2>
                </div>
            </header>
            <article className='custom-grid grid-cols-3 gap-6 my-4'>
                <div className='bg-white grid-area-a p-5 rounded-md border shadow-sm flex items-center justify-between'>
                    <div className='grid gap-3'>
                        <p className='uppercase text-base text-neutral-600 font-medium'>active projects</p>
                        <p className='text-2xl font-bold text-neutral-700'>{dashboard?.projects || 0}</p>
                        <Link className='text-base tracking-tight flex items-center gap-1 group' to={'/app/projects'}>
                            View projects
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth='1.5'
                                stroke='currentColor'
                                className='w-4 h-4 mt-0.5 transition-colors group-hover:text-emerald-600'
                            >
                                <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75' />
                            </svg>
                        </Link>
                    </div>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='currentColor'
                        className='w-14 h-14 p-3 rounded-md text-white bg-sky-500'
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z'
                        />
                    </svg>
                </div>
                <div className='bg-white grid-area-b p-5 rounded-md border shadow-sm flex items-center justify-between'>
                    <div className='grid gap-3'>
                        <p className='uppercase text-base text-neutral-600 font-medium'>your tickets</p>
                        <p className='text-2xl font-bold text-neutral-700'>{dashboard?.tickets || 0}</p>
                        <Link className='text-base tracking-tight flex items-center gap-1 group' to={'/app/tickets'}>
                            Total tickets
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth='1.5'
                                stroke='currentColor'
                                className='w-4 h-4 mt-0.5 transition-colors group-hover:text-emerald-600'
                            >
                                <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75' />
                            </svg>
                        </Link>
                    </div>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='currentColor'
                        className='w-14 h-14 p-3 rounded-md text-white bg-red-400'
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z'
                        />
                    </svg>
                </div>
                <div className='bg-white grid-area-c p-5 rounded-md border shadow-sm flex items-center justify-between'>
                    <div className='grid gap-3'>
                        <p className='uppercase text-base text-neutral-600 font-medium'>Users</p>
                        <p className='text-2xl font-bold text-neutral-70<svg>0'>{dashboard?.users || 0}</p>
                        <Link className='text-base tracking-tight flex items-center gap-1 group' to={'/app/users'}>
                            Find users
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth='1.5'
                                stroke='currentColor'
                                className='w-4 h-4 mt-0.5 transition-colors group-hover:text-emerald-600'
                            >
                                <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75' />
                            </svg>
                        </Link>
                    </div>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='currentColor'
                        className='w-14 h-14 p-3 rounded-md text-white bg-gray-400'
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z'
                        />
                    </svg>
                </div>
                <div className='grid-area-d shadow-sm'>{barChartData && <DashboardBarChart chartData={barChartData} />}</div>
                <div className='grid-area-e shadow-sm'>{donutChartData && <DashboardDonutChart chartData={donutChartData} />}</div>
            </article>
        </section>
    );
}
