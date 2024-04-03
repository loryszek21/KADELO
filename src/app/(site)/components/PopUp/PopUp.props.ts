import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface PupUpProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    children: ReactNode
    classname?: string
    isOpen: boolean
    setOpened: (opened: boolean) => void
}