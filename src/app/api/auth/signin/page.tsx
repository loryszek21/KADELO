'use client'

import { SessionProvider } from 'next-auth/react'
import Login from './login/login'

const styles: any = {
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}

function Signin(props : any) {
    return (
        <SessionProvider >
            <div style={styles.container}>
                <Login callBackUrl = {props.searchParams.callbackUrl}/>
            </div>
        </SessionProvider >
    )
}

export default Signin