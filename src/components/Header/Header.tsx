import Login from '../Login/login';
import Menu from '../Menu/Menu';
import P from '../Ptag/Ptag';
import ThemeChange from '../Theme/Theme';
import styles from './Header.module.scss';
import { HeaderProps } from './Header.props';
import cn from 'classnames';

export default function Header({ className, ...props }: HeaderProps): JSX.Element {
    return (
        <header className={cn(className, styles.header)} {...props}>
            <P size='s'>Logo</P>
            <Menu />
            {/* <ThemeChange /> */}
            <Login />
        </header>
    )
}