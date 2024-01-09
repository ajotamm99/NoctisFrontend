import {NextResponse} from "next/server";
import connect from "../../../utils/db";
import Thread from "../../(models)/Thread";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";

export async function GET(request: any) {
  try {

    const session =await getServerSession(authOptions)
    if(session){
      await connect();
      const threads = await Thread.find();
  
      return NextResponse.json({ threads }, { status: 200 });
    }else{
      return NextResponse.json({message:"Unauthorized"}, { status: 403 });
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}

export async function POST(req: any) {
  try {
    const session =await getServerSession(authOptions);
    if (session){
      await connect();
      const { title, description, autor } = await req.json();
      console.log ("autor",autor);
      const thread = new Thread({
        title: title,
        description: description,
        autor: autor
      });      
      console.log(thread);
      await Thread.create(thread);
  
      return NextResponse.json({ message: "Thread Created" }, { status: 201 });
    }else{
      return NextResponse.json({message:"Unauthorized"}, { status: 403 });
    }

  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }

}