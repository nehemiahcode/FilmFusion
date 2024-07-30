'use client'

import React, { useState, useEffect } from 'react';
import { toast, Toaster } from "sonner"
import {useRouter} from "next/navigation";

function PromptUser({ children }: { children: React.ReactNode }) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [name, setName] = useState('');
    const router = useRouter();
    useEffect(() => {
        const userName = localStorage.getItem('userName');
        if (!userName) {
            setIsModalVisible(true);
        }
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.length === 0) {
            toast.error("You have to provide a name!");
            navigator.vibrate([50, 50])
        } else if (name.length <= 2) {
            toast.error(`That's too short!`);
            navigator.vibrate([50, 50]);
        } else if (name.length >= 3 && name.trim()) {
            localStorage.setItem('userName', name);
            setIsModalVisible(false);
            toast.success(`Welcome to FilmFusion ${name}!`)
            navigator.vibrate([50, 100])
        }
    };


    return (
        <>
            <Toaster richColors expand={false} position='top-right' />
            {isModalVisible && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center w-screen justify-center z-50">
                    <div className="w-screen px-4 heading">
                        <div className="bg-white dark:bg-slate-800 dark:text-white text-black rounded-lg shadow-lg p-6 w-full sm:max-w-xl lg:max-w-lg mx-auto">

                            <h2 className="text-xl font-bold mb-4 heading">Welcome!</h2>
                            <div>
                                <p>
                                    This web application allows you to explore a wide variety of movies and TV series from around the world. It will keep you updated and brighten your day.
                                </p>
                                <p>
                                    More features will be added soon, including full authentication.
                                </p>
                                <p>
                                    Please provide your real name, as it will be used to refer to you within this application.
                                </p>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4 py-3">
                                    <label htmlFor="name" className="block text-sm font-medium dark:text-white text-black">
                                        Enter your name:
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="mt-1 block w-full px-3 py-2 border bg-white border-gray-300 rounded-md shadow-sm focus:outline-none text-black focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
            {children}
        </>
    );
}

export default PromptUser;
