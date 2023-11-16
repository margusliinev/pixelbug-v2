export default function PriorityCell({ priority }: { priority: string }) {
    switch (priority) {
        case 'LOW':
            return <span className='text-sm font-semibold text-emerald-600'>Low</span>;
        case 'MEDIUM':
            return <span className='text-sm font-semibold text-yellow-600'>Medium</span>;
        case 'HIGH':
            return <span className='text-sm font-semibold text-red-600'>High</span>;
        case 'CRITICAL':
            return <span className='text-sm font-semibold text-rose-600'>Critical</span>;
        default:
            return <span className='text-sm font-semibold text-gray-600'>Unknown</span>;
    }
}
