import { useSearchTicketsQuery } from '@/features/search/searchSlice';
import { useState, useEffect } from 'react';
import { Search } from '@/assets/icons';
import { Link } from 'react-router-dom';
import SearchSpinner from '@/components/spinners/SearchSpinner';

export default function GlobalSearch() {
    const [isLoading, setIsLoading] = useState(false);
    const [isSearchboxOpen, setIsSearchboxOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
    const { data } = useSearchTicketsQuery(debouncedSearchTerm, { refetchOnMountOrArgChange: true, skip: searchTerm === '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setSearchTerm(e.target.value);
        setIsLoading(true);
    };

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 500);
    }, [debouncedSearchTerm]);

    useEffect(() => {
        const delay = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 300);

        return () => {
            clearTimeout(delay);
        };
    }, [searchTerm]);

    return (
        <div className='relative flex w-full gap-2 rounded-md px-3 py-2 ring-1 ring-border shadow-sm sm:px-2 sm:py-2'>
            <label htmlFor='search' className='ml-1 hidden text-gray-500 xs:flex xs:items-center'>
                <div className='grid w-4 place-items-center'>{isLoading && searchTerm !== '' ? <SearchSpinner /> : <Search />}</div>
            </label>
            <div className='w-full'>
                <input
                    type='text'
                    name='search'
                    id='search'
                    placeholder='Search'
                    className='w-full text-sm focus:outline-none'
                    value={searchTerm}
                    onChange={handleChange}
                    onFocus={() => setIsSearchboxOpen(true)}
                    onBlur={(e) => {
                        if (!(e.relatedTarget instanceof HTMLAnchorElement)) {
                            setIsSearchboxOpen(false);
                        }
                    }}
                />
                <div
                    className={
                        isSearchboxOpen && !isLoading && debouncedSearchTerm !== ''
                            ? 'absolute bg-white top-12 w-full border rounded-lg right-0 max-h-48 overflow-y-auto'
                            : 'hidden'
                    }
                >
                    {data && data.tickets && !isLoading && data.tickets.length > 0 ? (
                        data.tickets.map((ticket) => {
                            return (
                                <Link
                                    to={`/app/tickets/${ticket.id}`}
                                    className='block capitalize text-sm p-3 transition-colors hover:bg-gray-100'
                                    key={ticket.id}
                                    onClick={() => {
                                        setIsSearchboxOpen(false);
                                    }}
                                >
                                    <span className='text-neutral-500'>Ticket: </span>
                                    {ticket.title}
                                </Link>
                            );
                        })
                    ) : (
                        <article className='capitalize text-sm p-3'>No results</article>
                    )}
                </div>
            </div>
        </div>
    );
}
