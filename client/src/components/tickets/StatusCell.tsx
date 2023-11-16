export default function StatusCell({ status }: { status: string }) {
    switch (status) {
        case 'UNASSIGNED':
            return <span className='px-2 py-1 text-sm font-semibold rounded-md bg-gray-100 text-gray-800'>Unassigned</span>;
        case 'ASSIGNED':
            return <span className='px-2 py-1 text-sm font-semibold rounded-md bg-yellow-100 text-yellow-800'>Assigned</span>;
        case 'IN_DEVELOPMENT':
            return <span className='px-2 py-1 text-sm font-semibold rounded-md bg-green-100 text-green-800'>In Development</span>;
        case 'ON_HOLD':
            return <span className='px-2 py-1 text-sm font-semibold rounded-md bg-red-100 text-red-800'>On Hold</span>;
        case 'RESOLVED':
            return <span className='px-2 py-1 text-sm font-semibold rounded-md bg-blue-100 text-blue-800'>Resolved</span>;
        default:
            return <span className='px-2 py-1 text-sm font-semibold rounded-md bg-gray-100 text-gray-800'>Unknown</span>;
    }
}
