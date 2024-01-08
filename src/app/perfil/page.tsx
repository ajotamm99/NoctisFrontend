"use client"
import { Component, useState, useEffect } from 'react';
import React from 'react';
import { useRouter } from 'next/navigation';
import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

const ProfilePage = () => {   
    const router = useRouter(); 
    const [error, setError] = useState("");
    const [user, setUser] = useState({ username: "", email: "", password: "", createdAt: "", threads: "" });
    const [loading, setLoading] = useState(true);
    const [newUsername, setNewUsername] = useState("");

    const { data: session, status: sessionStatus } = useSession();
    //console.log(session);
    if (sessionStatus!="authenticated") {
        //console.log("redirected profile");
        redirect("/");        
    }


    const handleData = async () => {
        try{
            const email = session?.user?.email;
            console.log("email",email);
            const res = await fetch("/api/perfil", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            if (res.status === 400) {
            setError("user not found");
            console.log(error)
            }
            if (res.status === 200) {
                
            const userData = await res.json();
            setUser(userData.actualUser);
            console.log ("sucess", userData, user);
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

    const handleNickChange = async (e: any) => {
        e.preventDefault();
        console.log(newUsername);

        try {
            const res = await fetch("/api/perfil", {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                newUsername
              }),
            });
            if (res.status === 400) {
              setError("This email is already registered");
            }
            if (res.status === 200) {
              setError("");
              console.log("cambiado")
              setUser(prevUser => ({ ...prevUser, username: newUsername }));
              router.refresh();
            }
          } catch (error) {
            setError("Error, try again");
            console.log(error);
          }
        };

        const handleDelete = async () => {

            try {
                const res = await fetch("/api/perfil", {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                  },
                });
                if (res.status === 400) {
                  setError("This email is already registered");
                }
                if (res.status === 200) {
                  setError("");
                  console.log("deleted");
                  signOut();
                }
              } catch (error) {
                setError("Error, try again");
                console.log(error);
              }

        }
    

    return (
        <div className='flex justify-center items-center flex-col'>
            {loading?(
                <div>Loading...</div>
            ):(
                <div>
                    <h1 className='text-3xl font-bold mb-4'>Profile</h1>
                    <form onSubmit={handleNickChange}>      
                        <div className='mb-2'>
                            <label className='font-bold'>Nick:</label>
                            <input
                                type="text"
                                className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
                                placeholder={user.username}
                                value={newUsername} // Usa el estado 'newUsername' como el valor
                                onChange={(e) => setNewUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className='mb-2'>
                            <label className='font-bold'>Registration Date:</label>
                            <span className='ml-2'>{user.createdAt}</span>
                        </div>
                        <div className='mb-2'>
                            <label className='font-bold'>Mail:</label>
                            <span className='ml-2'>{user.email}</span>
                        </div>
                        <div className='mb-2'>
                            <label className='font-bold'>Thread Count:</label>
                            <span className='ml-2'>{user.threads}</span>
                        </div>
                        <div>
                            <button type="submit" className="rounded-full shadow bg-blue-500 hover:bg-blue-600 text-white py-2 px-4" >Change Nick</button>
                        </div>
                    </form>
                    <div>
                        <button
                        onClick={() => {
                            handleDelete();
                        }}
                        className="rounded-full shadow bg-red-500 hover:bg-red-600 text-white py-2 px-4">Delete</button>
                    </div>
                </div>
            )}
            
        </div>
    );
// Remove the extra closing curly brace
};

export default ProfilePage;
