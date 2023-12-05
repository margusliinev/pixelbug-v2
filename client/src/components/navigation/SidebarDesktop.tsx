import SidebarLinks from './SidebarLinks';

export default function SidebarDesktop({
    isSidebarOpen,
    setIsSidebarOpen,
}: {
    isSidebarOpen: boolean;
    setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    return (
        <aside className='sticky top-0 z-0 hidden h-screen w-64 border-r bg-white shadow-sm-right xl:block'>
            <div>
                <div className='flex h-16 items-center gap-2 px-6 py-4'>
                    <img src='/apple-touch-icon.png' alt='logo' className='h-10 w-10' />
                    <h1 className='text-xl font-semibold text-emerald-800'>PixelBug</h1>
                </div>
                <SidebarLinks isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
            </div>
        </aside>
    );
}
