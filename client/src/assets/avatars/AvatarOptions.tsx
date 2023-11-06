import { Academic, Rocket, Beaker, Book, Library, Bolt, Briefcase, Bug, Camera, Cake, Fire, Moon, Shopping, Tools, Sparkles } from '@/assets/avatars';
import { ReactElement } from 'react';

interface AvatarOption {
    value: string;
    name: string;
    icon: ReactElement;
}

const avatarOptions: AvatarOption[] = [
    { value: 'https://res.cloudinary.com/dwv94rkbl/image/upload/v1699244982/Avatars/Rocket_k9ylsa.png', name: 'Rocket', icon: <Rocket /> },
    { value: 'https://res.cloudinary.com/dwv94rkbl/image/upload/v1699244979/Avatars/Academic_nffnsv.png', name: 'Academic', icon: <Academic /> },
    { value: 'https://res.cloudinary.com/dwv94rkbl/image/upload/v1699244979/Avatars/Beaker_m50oke.png', name: 'Beaker', icon: <Beaker /> },
    { value: 'https://res.cloudinary.com/dwv94rkbl/image/upload/v1699244980/Avatars/Book_u0vxd0.png', name: 'Book', icon: <Book /> },
    { value: 'https://res.cloudinary.com/dwv94rkbl/image/upload/v1699244982/Avatars/Library_ptybnc.png', name: 'Library', icon: <Library /> },
    { value: 'https://res.cloudinary.com/dwv94rkbl/image/upload/v1699244979/Avatars/Bolt_kg0v3r.png', name: 'Bolt', icon: <Bolt /> },
    { value: 'https://res.cloudinary.com/dwv94rkbl/image/upload/v1699244980/Avatars/Briefcase_r6mudl.png', name: 'Briefcase', icon: <Briefcase /> },
    { value: 'https://res.cloudinary.com/dwv94rkbl/image/upload/v1699244980/Avatars/Bug_plvvxq.png', name: 'Bug', icon: <Bug /> },
    { value: 'https://res.cloudinary.com/dwv94rkbl/image/upload/v1699244981/Avatars/Cake-1_bszjzh.png', name: 'Camera', icon: <Camera /> },
    { value: 'https://res.cloudinary.com/dwv94rkbl/image/upload/v1699244981/Avatars/Cake_jbm1ca.png', name: 'Cake', icon: <Cake /> },
    { value: 'https://res.cloudinary.com/dwv94rkbl/image/upload/v1699244981/Avatars/Fire_bs8idi.png', name: 'Fire', icon: <Fire /> },
    { value: 'https://res.cloudinary.com/dwv94rkbl/image/upload/v1699244982/Avatars/Moon_qdy8de.png', name: 'Moon', icon: <Moon /> },
    { value: 'https://res.cloudinary.com/dwv94rkbl/image/upload/v1699244983/Avatars/Shopping_pzdovd.png', name: 'Shopping', icon: <Shopping /> },
    { value: 'https://res.cloudinary.com/dwv94rkbl/image/upload/v1699244983/Avatars/Tools_sfp3se.png', name: 'Tools', icon: <Tools /> },
    { value: 'https://res.cloudinary.com/dwv94rkbl/image/upload/v1699244984/Avatars/Tools-1_mncnxe.png', name: 'Sparkles', icon: <Sparkles /> },
];

export { avatarOptions };
