import Tick from '../../icons/Tick';

export default function AddedFeature({ text }: { text: string }) {
    return (
        <li className='flex space-x-5'>
            <Tick />
            <p className='text-secondary-foreground'>{text}</p>
        </li>
    );
}
