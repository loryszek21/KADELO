import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

export interface RadioInputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    name: string;
    label: string;
    checked?: boolean;
}