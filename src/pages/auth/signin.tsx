'use client'
import { getCsrfToken, getProviders } from 'next-auth/react'
import Login from './login/login'
import 'react-toastify/dist/ReactToastify.css';
import '@/app/(site)/global.scss'
import Providers from '@/app/(site)/components/Theme/providers'
import { ToastContainer } from 'react-toastify'
import styles from './signin.module.scss'
import { TiArrowBack } from 'react-icons/ti';
import { useRouter } from 'next/router';
import { useState } from 'react';
import NewUser from './newUser/newUser';

export default function Signin(props : any) {

    const router = useRouter()
    const [tab , setTab] = useState(0)

    return (
        <Providers>
            <div className={styles.login}>
                <div className={styles.login_container}>
                    {tab === 0 ?
                        <Login props={props} setTab={setTab} router={router}/>
                        : <NewUser props={props} setTab={setTab} router={router}/>
                    }
                    <div className={styles.back} onClick = {()=>router.back()}>
                        <TiArrowBack size={30}/>
                    </div>
                </div>
            </div>
            <ToastContainer
                position="bottom-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </Providers>
    )
}

export async function getServerSideProps(context: any) {
  const providers = await getProviders()
  const csrfToken = await getCsrfToken(context)
  const callbackUrl = context.query.callbackUrl
  return {
    props: {
      providers,
      csrfToken,
      callbackUrl
    },
  }
}