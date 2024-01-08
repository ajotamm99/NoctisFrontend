"use client"
import { set } from 'mongoose';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const CreateThreadPage = () => {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState("");
    const {data : session, status: sessionStatus} = useSession();
    const [autor, setAutor] = useState(session?.user?.email);
    //const [res, setRes] = useState(0)

    if (sessionStatus!="authenticated") {
        console.log("redirected profile");
        router.push("/");
    }


    const handleTitleChange = (event: any) => {
        setTitle(event.target.value);
    };

    const handleDescriptionChange = (event: any) => {
        setDescription(event.target.value);
    };


    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            
            //console.log ("email", autor);
            const res = await fetch("/api/threads", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                title,
                autor,
                description,
              }),
            });
            if (res.status === 400) {
              setError("This email is already registered");
            }
            if (res.status === 201) {
                //setRes(201);
                router.push("/noctis");
            }
          } catch (error) {
            setError("Error, try again");
            console.log(error);
          }
        };
      
    return (
        <div className='flex justify-center items-center flex-col'>
            <h1>Create Thread</h1>
            <form onSubmit={handleSubmit}>
                <div className='mb-2'>
                    <label htmlFor="title">Title:</label>
                </div>
                <div className='mb-2'>
                    <input type="text" id="title" value={title} onChange={handleTitleChange} />
                </div>
                <div className='mb-2'>
                    <label htmlFor="description">Description:</label>
                </div>
                <div className='mb-2'>
                    <textarea id="description" value={description} onChange={handleDescriptionChange} />
                </div>
                <button type="submit" className="rounded-full shadow bg-blue-500 hover:bg-blue-600 text-white py-2 px-4">Create</button>
            </form>
        </div>
    );
};

export default CreateThreadPage;
