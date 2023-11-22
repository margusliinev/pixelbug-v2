import { User } from '@prisma/client';

export default function UsersRole({ role }: { role: User['role'] }) {
    switch (role) {
        case 'ADMIN':
            return (
                <span className='capitalize text-xs border-orange-300 border w-fit justify-self-center bg-orange-50 text-orange-600 font-medium py-1 px-2 rounded-xl'>
                    {role}
                </span>
            );
        case 'DEVELOPER':
            return (
                <span className='capitalize text-xs border-emerald-300 border w-fit justify-self-center bg-emerald-50 text-emerald-600 font-medium py-1 px-2 rounded-xl'>
                    {role}
                </span>
            );
        case 'USER':
            return (
                <span className='capitalize text-xs border-blue-300 border w-fit justify-self-center bg-blue-50 text-blue-600 font-medium py-1 px-2 rounded-xl'>
                    {role}
                </span>
            );
        default:
            return (
                <span className='capitalize text-xs border-gray-300 border w-fit justify-self-center bg-gray-50 text-gray-600 font-medium py-1 px-2 rounded-xl'>
                    {role}
                </span>
            );
    }
}
