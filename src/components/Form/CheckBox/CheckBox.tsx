import { CheckBoxProps } from './CheckBox.props';
import cn from 'classnames'
import styles from './CheckBox.module.scss'

export default function CheckBox({ className, ...props }: CheckBoxProps): JSX.Element {

    return (
        <div className={cn(className, styles.container)} {...props}>
            <input
                type='checkbox'
            />
        </div>
    )
}