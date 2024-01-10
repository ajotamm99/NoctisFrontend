import {NextRequest, NextResponse} from "next/server";
import connect from "../../../utils/db";
import User from "../../(models)/User";
import { getSession, useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";

export async function GET(request: any) {
    try {        
        const session = await getServerSession(authOptions);
        // eslint-disable-next-line
        const email = (session as { user: { email: string } })?.user?.email;
        if (session) {
            await connect();
            const actualUser = await User.findOne({ email: email }, { password: 0 }); // Exclude password field
            return NextResponse.json({ actualUser }, { status: 200 });
        }else{
            return NextResponse.json({message:"Unauthorized"}, { status: 403 });
        }
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    }
    
}

export async function PUT(request: any) {
    try {
        const session = await getServerSession(authOptions);
        // eslint-disable-next-line
        const email = (session as { user: { email: string } })?.user?.email;
        if (session) {
            
            await connect();
            const {newUsername} = await request.json();
            console.log(newUsername, "he llegado")
            const actualUser = await User.findOneAndUpdate({ email: email }, {username: newUsername}, { new: true });
            return NextResponse.json({ actualUser }, { status: 200 });
        } else {
            return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
        }
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    }
}

export async function DELETE(request: any) {
    try {
        const session = await getServerSession(authOptions);
        // eslint-disable-next-line
        const email = (session as { user: { email: string } })?.user?.email;
        if (session) {
            await connect();
            await User.findOneAndDelete({ email: email });
            return NextResponse.json({ message: "Account deleted and session closed" }, { status: 200 });
        } else {
            return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
        }
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    }
}
