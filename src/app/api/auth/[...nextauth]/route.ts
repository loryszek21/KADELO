import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
    providers: [
        
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),  
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text", placeholder: "jsmith" },
                password: {  label: "Password", type: "password" },
                redirect: {  label: "Redirect", type: "text" },
            },
            async authorize(credentials, req) {
                // console.log(credentials, req)
                const res = await fetch('http://localhost:5000/user', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json',},
                    body: JSON.stringify(credentials)
                })
                const user = await res.json()
                console.log(user)

                if (res.ok && user) {
                    console.log(user)
                    return user
                }
                console.log(user)
                return null
            }
        })
    ],
    // pages: {
    //     signIn: 'signin',
    //     error: '/auth/error.tsx',
    // },
});

export { handler as GET, handler as POST };