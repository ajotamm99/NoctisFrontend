"use client";
import React, { useEffect, useState } from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";

const Dashboard = () => {

    const { data: session, status } = useSession();
    const [error, setError] = useState("");
    const [threads, setThreads] = useState();
    const [loading, setLoading] = useState(true);
    
  console.log(session);
  // getserversession no funciona
  if (status!="authenticated") {
    console.log("redirected profile");
    redirect("/");
  }

  const handleData = async () => {
    try{
        const res = await fetch("/api/threads", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        if (res.status === 400) {
        setError("no threads");
        console.log(error)
        }
        if (res.status === 200) {
            
        const threadsData = await res.json();
        setThreads(threadsData.threads);
        console.log ("sucess", threadsData, threads);
        setLoading(false);
        }
    } catch (error) {
        error ="Error, try again";
        console.log(error);
        setLoading(false);
    }
    }

    useEffect(() => {
        handleData();
    }, []);


   //incluir codigo del dashboard
  return (
    <div className="flex flex-col items-center p-12">
        <div>
            <h1 className="text-4xl font-bold" >Threads</h1>
      </div>
      <br />
            {loading?(
                <div>Loading...</div>
            ):(
                <div className="w-full">
                    {threads && (threads as any[])?.map((thread: any) => (
                        <div key={thread?._id} className="border border-gray-300 p-4 mb-4 rounded w-full text-left">
                            <div className="font-bold text-xl mb-2"><span>{thread?.title}</span></div>
                            <div className="font-bold text-base mb-2"><span>{thread?.description}</span></div>
                            <div className="text-sm"><span>{thread?.autor}</span></div>
                            <div className="text-sm text-gray-500"><span>{thread?.date}</span></div>
                            <div className="text-sm text-gray-500"><span>{thread?.status}</span></div>
                        </div>
                    )
                    )                
                }
                </div>
            )}
            <Link href="/thread">
            <button className="rounded-full shadow bg-blue-500 hover:bg-blue-600 text-white py-2 px-4">Create Thread</button>
            </Link>
        </div>
  );
};

export default Dashboard;