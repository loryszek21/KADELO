import styles from './footer.module.scss';
import { FooterProps } from './footer.props';
import cn from 'classnames';

export default function Footer({ className, ...props }: FooterProps): JSX.Element {
    return (
        <footer className={cn(className, styles.footer)}>
            <div>Coding page</div>
            <div><a href='#' target='_blank'>User agreements</a></div>
            <div><a href='#' target='_blank'>Privacy policy</a></div>
        </footer>
    )
}