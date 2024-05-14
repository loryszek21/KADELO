import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                try {
                    const userInfo = await fetch(
                        "http://localhost:5000/user/getUser",
                        {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(credentials),
                        }
                    );

                    const user = await userInfo.json();
                    console.log("USER:", user);
                    if (user.error) {
                        throw new Error(user.error);
                    }
                    return {
                        name: user.users_name,
                        email: user.users_email,
                    };
                } catch (error) {
                    console.error("Authorization error:", error);
                    throw new Error("Authentication failed");
                }
            },
        }),
    ],
    pages: {
        signIn: "/auth/signin",
        newUser: "/auth/newUser",
    },
});
