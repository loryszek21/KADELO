import 'react-toastify/dist/ReactToastify.css';
import Providers from '@/app/(site)/components/Theme/providers'
import { ToastContainer } from 'react-toastify'
import Input from '@/app/(site)/components/Form/Input/Input';
import styles from './newUser.module.scss';
import cn from 'classnames';
import { signIn } from 'next-auth/react';
import Button from '@/app/(site)/components/Form/Button/Button';
import Link from 'next/link';
import { useRef } from 'react';
import P from '@/app/(site)/components/Ptag/Ptag';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import '@/app/(site)/global.scss'
import { TiArrowBack } from "react-icons/ti";

export default function NewUser(): JSX.Element{

    const email = useRef<string>('')
    const router = useRouter()
    const password = useRef<string>('')
    const login = async(e:any) => {
        const rawResponse = await fetch('http://localhost:5000/user/insertUser', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email: email, password: password, name: name})
  });
  const content = await rawResponse.json();

  console.log(content);
    }
    const name = useRef<string>('')

    return (
        <Providers>
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
        <div className={cn(styles.login)}>
            <div className={styles.login_container}>
                <form className={styles.login_form} onSubmit={(e: any) => login(e)}>
                    <P size='l' className={styles.title}>Login</P>
                    <Input placeholder='' type='hidden' />
                    <Input placeholder='Name' type='text' onChange={(e) => name.current = e.target.value} />
                    <Input placeholder='Email' type='email' onChange={(e) => email.current = e.target.value} />
                    <Input placeholder='Password' type='password' onChange={(e) => password.current = e.target.value} />
                    <Button appearance='primary'>Register</Button>
                </form>
                <div className={styles.back} onClick = {()=>router.back()}>
                <TiArrowBack size={30}/>
                </div>
            </div>
        </div>
        </Providers>
    )

}