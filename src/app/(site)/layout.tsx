import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import styles from './layout.module.scss';
import Header from '@/app/(site)/components/Header/Header';
import Footer from '@/app/(site)/components/Footer/footer';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Top-app',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {

    return (
        <div className={styles.wrapper}>
            <Header className={styles.header} />
            <div className={styles.body}>
                {children}
            </div>
            <Footer className={styles.footer} />
        </div>
    )
}
