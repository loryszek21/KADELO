import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
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
            },
            async authorize(credentials, req) {
                try {
                    const user = await fetch('http://localhost:5000/user/getUser', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(credentials)
                    })
                    console.log(user)
                    if(user.status === 200){
                        return user.json()
                    }
                    else if(user.status === 404){
                        throw new Error('Wrong e-mail')
                    }
                    else if(user.status === 401){
                        throw new Error('Wrong password')
                    }
                }
                catch(e){
                    console.log(e)
                    throw e
                }
            }
            
        })

    ],
    pages: {
        signIn: '/auth/signin',
        newUser: '/auth/newUser',
    },
});