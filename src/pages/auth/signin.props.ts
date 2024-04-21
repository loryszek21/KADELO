import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface SignInProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    setTab: any,
    router: any,
    props: {
        callbackUrl: string,
        csrfToken: string,
        providers: any
    }
}