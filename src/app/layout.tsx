import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import styles from './layout.module.scss';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/footer';
import Providers from '@/components/Theme/providers';
import './global.scss'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Top-app',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {

    return (
        <html lang="en" data-theme="dark" style={{ colorScheme: 'dark' }}>
            <body className={inter.className}>
                <Providers>
                    <div className={styles.wrapper}>
                        <Header className={styles.header} />
                        <div className={styles.body}>
                            {children}
                        </div>
                        <Footer className={styles.footer} />
                    </div>
                </Providers>
            </body>
        </html>
    )
}
