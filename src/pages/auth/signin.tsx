import { getCsrfToken, getProviders } from 'next-auth/react'
import Login from './login/login'
import '@/app/(site)/global.scss'
import 'react-toastify/dist/ReactToastify.css';
import Providers from '@/app/(site)/components/Theme/providers'
import { ToastContainer } from 'react-toastify'

export default function Signin(props : any) {
    return (
        <Providers>
            <Login props={props}/>
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