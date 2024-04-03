import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Providers from '@/app/(site)/components/Theme/providers';
import './(site)/global.scss'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Top-app',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {

    return (
        <html lang="en" data-theme="dark" style={{ colorScheme: 'dark' }}>
            <body className={inter.className}>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    )
}
