import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface LoginProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    props: {
        callbackUrl: string,
        csrfToken: string,
        providers: any
    }
}