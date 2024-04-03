import { RadioInputProps } from './RadioInput.props';
import cn from 'classnames'
import styles from './RadioInput.module.scss'

export default function RadioInput({ className, name, label, ...props }: RadioInputProps): JSX.Element {

    return (
        <div className={cn(className, styles.container)} {...props}>
            <input
                type='radio'
                name={name}
                className={styles.input}
                checked={props.checked}
                onChange={props.onChange}
                id={label}
            />
            <div className={styles.checkbox}></div>
            <label htmlFor={label}>{label}</label>
        </div>
    )
}