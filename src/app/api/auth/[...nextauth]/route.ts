import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),  
    ],
    callbacks: {
        jwt({ token, trigger, session }) {
            if (trigger === "update" && session?.name) {
                token.name = session.name
            }
            return token
        }
    }
});

export { handler as GET, handler as POST };