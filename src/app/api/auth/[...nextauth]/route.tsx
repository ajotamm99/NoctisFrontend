import NextAuth from "next-auth";
import { Account, User as AuthUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@/app/(models)/User";
import connect from "@/utils/db";
import { authOptions } from "./options";



export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };