import { Close } from '@/assets/icons';
import SidebarLinks from './SidebarLinks';

export default function SidebarMobile({
    isSidebarOpen,
    setIsSidebarOpen,
}: {
    isSidebarOpen: boolean;
    setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    return (
        <>
            <div
                className={
                    isSidebarOpen
                        ? 'fixed z-50 h-screen w-screen bg-gray-900/80 transition-opacity duration-700 xl:hidden'
                        : 'fixed -z-50 -ml-96 h-screen w-screen opacity-0 transition-opacity duration-700 xl:hidden'
                }
            ></div>
            <aside
                className={
                    isSidebarOpen
                        ? 'fixed inset-0 z-50 ml-0 min-h-screen w-64 bg-white transition-all duration-500 xl:hidden'
                        : 'fixed inset-0 z-50 -ml-96 min-h-screen w-64 bg-white transition-all duration-500 xl:hidden'
                }
            >
                <button
                    type='button'
                    onClick={() => setIsSidebarOpen(false)}
                    aria-label='close menu'
                    className={
                        isSidebarOpen
                            ? 'absolute -right-8 top-5 text-white opacity-100 transition-opacity duration-500'
                            : 'absolute -right-8 top-5 text-white opacity-0 transition-opacity duration-500'
                    }
                >
                    <Close />
                </button>
                <div>
                    <div className='flex h-16 items-center gap-2 px-6 py-4'>
                        <img src='/apple-touch-icon.png' alt='logo' className='h-10 w-10' />
                        <h1 className='text-xl font-semibold text-emerald-800'>PixelBug</h1>
                    </div>
                    <SidebarLinks isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
                </div>
            </aside>
        </>
    );
}
