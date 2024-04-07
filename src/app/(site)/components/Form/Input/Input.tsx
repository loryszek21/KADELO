import { InputProps } from './Input.props';
import cn from 'classnames'
import styles from './Input.module.scss'

export default function Input({ className, placeholder, ...props }: InputProps): JSX.Element {

    return (
        <div className={styles.container}>
            <input
                className={cn(className, styles.input)}
                {...props}
                required
                placeholder=''
            />
            <div className={styles.placeholder}>
                {placeholder}
            </div>
        </div>
    )
}