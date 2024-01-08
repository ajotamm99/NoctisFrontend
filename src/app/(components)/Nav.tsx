"use client";
import React from 'react';
import Link from 'next/link';
import { HiOutlineHome } from 'react-icons/hi';
import { signOut, useSession } from "next-auth/react";

const Nav = () => {
    const { data: session }: any = useSession();
    return (
        <nav className="bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <Link href="/">
                            <div className="flex items-center">
                                <HiOutlineHome className="w-6 h-6 text-gray-300" />
                                <span className="ml-2 text-white font-bold">Noctis Forum</span>
                            </div>
                        </Link>
                    </div>
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <input
                                type="text"
                                placeholder="Buscar..."
                                className="px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        {!session ? (
                            <>
                            <div className="flex-shrink-0 ml-2">
                                <Link href="/login" className='text-gray-300 hover:bg-gray-700'>
                                    Login
                                </Link>
                            </div>
                            <div className="flex-shrink-0 ml-2">
                                <Link href="/register" className='text-gray-300 hover:bg-gray-700'>
                                    Register
                                </Link>
                            </div>
                            </>
                        ) : (
                            <>
                            <div className="flex-shrink-0">
                                <li>
                                    <button
                                    onClick={() => {
                                        signOut();
                                    }}
                                    className="p-2 px-5 -mt-1 text-gray-300 hover:bg-gray-700 rounded-full"
                                    >
                                    Logout
                                    </button>
                                </li>
                            </div>
                            <div className="flex-shrink-0 ml-2">
                                <Link href="/noctis" className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                                    Threads
                                </Link>
                            </div>
                            <div className="flex-shrink-0 ml-2">
                                <Link href="/perfil" className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                                    Perfil
                                </Link>
                            </div>
                            </>
                        )}

                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Nav;
