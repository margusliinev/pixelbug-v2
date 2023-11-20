import { Link } from 'react-router-dom';

export default function BreadCrumbs({ url, child, alias }: { url: string; child: string; alias?: string }) {
    return (
        <div className='bg-white w-fit flex items-center rounded-lg shadow h-10 overflow-hidden'>
            <Link to={'/app/dashboard'}>
                <div className='pl-5 pr-4 py-1.5 group'>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                        className='w-5 h-5 text-gray-400 group-hover:text-primary transition-colors'
                    >
                        <path
                            fillRule='evenodd'
                            d='M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z'
                            clipRule='evenodd'
                        />
                    </svg>
                </div>
            </Link>
            <div className='pr-5'>
                <svg className='flex-shrink w-6' viewBox='0 0 24 44' preserveAspectRatio='none' fill='#d1d5db' aria-hidden='true'>
                    <path d='M.293 0l22 22-22 22h1.414l22-22-22-22H.293z'></path>
                </svg>
            </div>
            <Link to={`/app/${url}`}>
                <span className='pr-5 capitalize text-sm font-medium text-secondary-foreground hover:text-primary transition-colors'>{url}</span>
            </Link>
            <div className='pr-5'>
                <svg className='flex-shrink w-6' viewBox='0 0 24 44' preserveAspectRatio='none' fill='#d1d5db' aria-hidden='true'>
                    <path d='M.293 0l22 22-22 22h1.414l22-22-22-22H.293z'></path>
                </svg>
            </div>
            <Link to={`/app/${url}/${child}`}>
                <span className='pr-5 capitalize text-sm font-medium text-secondary-foreground hover:text-primary transition-colors'>
                    {alias ? alias : child}
                </span>
            </Link>
        </div>
    );
}
