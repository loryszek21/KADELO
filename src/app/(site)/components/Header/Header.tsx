'use client'
import Menu from '../Menu/Menu';
import ThemeChange from '../Theme/Theme';
import styles from './Header.module.scss';
import { HeaderProps } from './Header.props';
import cn from 'classnames';
import { signIn, signOut, useSession } from 'next-auth/react';
import { FaCode } from "react-icons/fa";

export default function Header({ className, ...props }: HeaderProps): JSX.Element {

    const { data: session } = useSession();


    
    return (
        <header className={cn(className, styles.header)} {...props}>
            <FaCode size={40}/>
            <Menu />
            {/* <ThemeChange/> */}
            <>
                {session ?
                    <button onClick={() => signOut()}>Logout</button> :
                    <>
                        <button onClick={() => signIn()}>Login</button>
                    </>
                }
            </>
        </header>
    )
}