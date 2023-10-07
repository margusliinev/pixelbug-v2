import Check from '~/components/icons/Check';

export default function AddedFeature({ text }: { text: string }) {
    return (
        <li className='flex space-x-5'>
            <Check />
            <p className='text-secondary-foreground'>{text}</p>
        </li>
    );
}
