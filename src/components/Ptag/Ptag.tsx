import { PProps } from './Ptag.props';
import styles from './Ptag.module.scss'
import cn from 'classnames'

export default function P({ size = 'm', children, className, ...props }: PProps): JSX.Element {

    return (
        <p className={cn(className, {
            [styles.s]: size === 's',
            [styles.m]: size === 'm',
            [styles.l]: size === 'l'
        })}

            {...props}
        >
            {children}
        </p>
    )
}