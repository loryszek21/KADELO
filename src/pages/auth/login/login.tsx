'use client'
import Input from '@/app/(site)/components/Form/Input/Input';
import styles from './login.module.scss';
import { LoginProps } from './login.props';
import cn from 'classnames';
import { signIn } from 'next-auth/react';
import Button from '@/app/(site)/components/Form/Button/Button';
import Link from 'next/link';
import { useRef } from 'react';
import { FaGoogle } from "react-icons/fa";
import P from '@/app/(site)/components/Ptag/Ptag';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';



export default function Login({ className, props }: LoginProps): JSX.Element {
    const email = useRef<string>('')
    const password = useRef<string>('')
    const router = useRouter()
    console.log(props)
    const login = async (event: SubmitEvent) => {
        event.preventDefault()
        try{
            const res = await signIn('credentials', {
                email : email.current,
                password : password.current,
                redirect: false
            })
            console.log(res)
            if (res?.status == 200) {

                toast("Welcome " , { type: 'success' })
                router.push(props?.callbackUrl)
            } else{
                toast(res?.error, { type: 'error' })
            }
        }
        catch(e){
            console.log(e)
        }
    }

    return (
        <div className={cn(className, styles.login)}>
            <div className={styles.login_container}>
                <form className={styles.login_form} onSubmit={(e: any) => login(e)}>
                    <P size='l' className={styles.title}>Login</P>
                    <Input placeholder='' type='hidden' />
                    <Input placeholder='Email' type='email' onChange={(e) => email.current = e.target.value} />
                    <Input placeholder='Password' type='password' onChange={(e) => password.current = e.target.value} />
                    <Button appearance='primary'>Login</Button>
                </form>
                <div className={styles.line} />
                <div className={cn(className, styles.login_google)}>
                    <Button onClick={() => signIn('google', {redirect: true, callbackUrl: props?.callbackUrl})} appearance='ghost'>Login with Google <FaGoogle /></Button>
                </div>
                <section className={styles.registration}>
                    <P size='m'>Don`t have an account? <Link className={styles.reg_link} href='/registration'>Register</Link></P>
                </section>
            </div>
        </div>
    )
}