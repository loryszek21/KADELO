'use client'
import Menu from '../Menu/Menu';
import P from '../Ptag/Ptag';
import ThemeChange from '../Theme/Theme';
import styles from './Header.module.scss';
import { HeaderProps } from './Header.props';
import cn from 'classnames';
import { signOut, useSession } from 'next-auth/react';
import PopUp from '../PopUp/PopUp';
import Login from '../login/login';
import { useState } from 'react';

export default function Header({ className, ...props }: HeaderProps): JSX.Element {

    const { data: session } = useSession();
    const [opened, setOpened] = useState(false);
    console.log(session)

    return (
        <header className={cn(className, styles.header)} {...props}>
            <P size='l'>Logo</P>
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