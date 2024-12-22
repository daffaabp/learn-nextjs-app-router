import { login } from "@/lib/firebase/service";
import { compare } from "bcrypt";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    secret: "daffa12345",
    providers: [
        CredentialsProvider({
            type: 'credentials',
            name: 'Credentials',
            credentials: {
                email: {label: 'email', type: 'email', placeholder: 'email'},
                password: {label: 'password', type: 'password', placeholder: 'password'},
            },
            async authorize(credentials) {
                const { email, password } = credentials as {
                    email: string;
                    password: string;
                };
                const user: any = await login({ email, password }); // Memperbaiki argumen yang dikirim ke fungsi login

                if (user) {
                    const passwordConfirm = await compare(password, user.password);
                    if (passwordConfirm) {
                        return user;
                    }
                }
                return null; // Mengembalikan null jika tidak ada pengguna atau password tidak cocok
            }
        })
    ],
    callbacks: {
        async jwt({ token, account, profile, user }: any) {
            if (account?.provider === "credentials") {
                token.email = user.email;
                token.fullname = user.fullname;
                token.role = user.role;
            }
            return token; 
        },

        async session({ session, token }: any) {
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