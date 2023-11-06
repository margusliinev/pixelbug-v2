export default function Bolt() {
    return (
        <button
            className='bg-sky-200 w-10 h-10 grid place-items-center rounded-md border border-border focus:outline focus:outline-primary focus:outline-2'
            type='button'
        >
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='w-6 h-6 text-sky-700'>
                <path
                    fillRule='evenodd'
                    d='M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z'
                    clipRule='evenodd'
                />
            </svg>
        </button>
    );
}
