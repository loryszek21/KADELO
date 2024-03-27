'use client'
import Menu from '../Menu/Menu';
import P from '../Ptag/Ptag';
import ThemeChange from '../Theme/Theme';
import styles from './Header.module.scss';
import { HeaderProps } from './Header.props';
import cn from 'classnames';
import { signOut, useSession } from 'next-auth/react';
import PopUp from '../PopUp/PopUp';
import Login from '../login/page';
import { useState } from 'react';

export default function Header({ className, ...props }: HeaderProps): JSX.Element {

    const { data: session } = useSession();
    console.log(session);
    const [opened, setOpened] = useState(false);

    return (
        <header className={cn(className, styles.header)} {...props}>
            <P size='s'>Logo</P>
            <Menu />
            {/* <ThemeChange /> */}
            {!opened && session ?
                // <Link href={'/profile'}>Profile</Link> :
                <button onClick={() => signOut()}>Logout</button> :
                <>
                    <button onClick={() => setOpened(true)}>Login</button>
                    <PopUp setOpened={setOpened} isOpen={opened} ><Login /></PopUp>
                </>
            }
        </header>
    )
}