import Menu from "../Menu/Menu";
import ThemeChange from "../Theme/Theme";
import styles from "./Header.module.scss";
import { HeaderProps } from "./Header.props";
import cn from "classnames";
import { FaCode } from "react-icons/fa";
import { FaUserCheck, FaUserAltSlash } from "react-icons/fa";
import Profile from "./profile/Profile";

export default function Header({
    className,
    ...props
}: HeaderProps): JSX.Element {
    return (
        <header className={cn(className, styles.header)} {...props}>
            <FaCode size={40} />
            <Menu />
            {/* <ThemeChange/> */}
            <Profile />
        </header>
    );
}
