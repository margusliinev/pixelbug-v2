import Minus from '@/components/icons/Minus';

export default function MissingFeature({ text }: { text: string }) {
    return (
        <li className='flex space-x-5'>
            <Minus />
            <p className='text-gray-400'>{text}</p>
        </li>
    );
}
