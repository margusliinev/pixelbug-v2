const SearchSpinner = () => {
    return (
        <div
            className='animate-spin duration-500 inline-block w-3 h-3 border-[2px] border-current border-t-transparent text-neutral-500 rounded-full'
            role='status'
            aria-label='loading'
        >
            <span className='sr-only'>Loading...</span>
        </div>
    );
};

export default SearchSpinner;
