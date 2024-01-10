import NextAuth from "next-auth";
import { Account, User as AuthUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@/app/(models)/User";
import connect from "@/utils/db";

export const authOptions: any = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      // eslint-disable-next-line
    async authorize(credentials) {
        
        try {
          await connect();

        const user = await User.findOne({ email: credentials?.email });
          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              // eslint-disable-next-line
              credentials?.password ?? '',
              user.password
            );
            if (isPasswordCorrect) {
              return {
                id: user.id,
                name:  user.username,
                email: user.email,
              }
            }else{
                return null;
            }
          }else{
            return null
          }
        } catch (err: any) {
            return null;          
        }
      },
    })
  ],
  callbacks: {
    async signIn({ user, account }: { user: AuthUser; account: Account }) {
      if (account?.provider == "credentials") {
        return true;
      }
    },
  },
};