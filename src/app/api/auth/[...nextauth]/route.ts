import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { login, loginWithGoogle } from "@/lib/firebase/service";
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";

interface User {
  id: string;
  email: string;
  password: string;
  fullName: string;
  role: string;
}

const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            type: 'credentials',
            name: 'Credentials',
            credentials: {
                email: {label: 'email', type: 'email', placeholder: 'email'},
                password: {label: 'password', type: 'password', placeholder: 'password'},
            },
            async authorize(credentials) {
                const {email, password} = credentials as {
                    email: string;
                    password: string;
                };

                // Get user from firebase
                const user = await login({email, password}) as User;
                
                if (user) {
                    // Verify password
                    const isValid = await bcrypt.compare(password, user.password);
                    
                    if (isValid) {
                        return {
                            id: user.id,
                            email: user.email,
                            fullname: user.fullName,
                            role: user.role
                        }
                    }
                }
                return null;
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_OAUTH_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET || "",
        }),
    ],
    callbacks: {
        async jwt({token, account, profile, user}: any) {
            if (account?.provider === "credentials") {
                token.email = user.email;
                token.fullname = user.fullname;
                token.role = user.role;
            }
            if (account?.provider === "google") {
               const data = {
                fullname: user.name,
                email: user.email,
                type: 'google',
               };
               
                await loginWithGoogle(
                data, 
                    (result: { status: boolean, data: any }) => {
                    if (result.status) {
                        token.email = result.data.email;
                        token.fullname = result.data.fullname;
                        token.role = result.data.role;
                    }
                });
            
            }
           return token; 
        },

        async session({session, token}: any) {
            if ("email" in token) {
                session.user.email = token.email;
            }
            if ("fullname" in token) {
                session.user.fullname = token.fullname;
            }
            if ("role" in token) {
                session.user.role = token.role;
            }
            return session;
        }
    },
    pages: {
        signIn: "/login",
    }
}

const handler = NextAuth(authOptions)

export {
    handler as GET,
    handler as POST
}