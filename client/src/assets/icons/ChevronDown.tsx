export default function ChevronDown({ animate = false }: { animate?: boolean }) {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={2}
            stroke='currentColor'
            className={`h-3.5 w-3.5 text-secondary-foreground ${animate ? 'animate-pulse' : ''}`}
        >
            <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
        </svg>
    );
}
