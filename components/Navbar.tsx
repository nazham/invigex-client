"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <nav className="bg-gray-300 dark:bg-gray-800 text-gray-800 dark:text-white p-4">
            <div className="container mx-auto">
                <div className="flex justify-between items-center">
                    <Link href="/" className="text-xl font-bold">
                        InvigEx
                    </Link>
                    <div className="hidden md:flex space-x-4 items-center">
                        <Link
                            href="/invigilators"
                            className="hover:text-gray-600 dark:hover:text-gray-300"
                        >
                            Invigilators
                        </Link>
                        <Link
                            href="/exam-centers"
                            className="hover:text-gray-600 dark:hover:text-gray-300"
                        >
                            Exam Centers
                        </Link>
                        {mounted && (
                            <button
                                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                            >
                                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                            </button>
                        )}
                    </div>
                    <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
                {isOpen && (
                    <div className="mt-5 text-sm font-semibold flex flex-col space-y-1 md:hidden w-fit text-center">
                        <Link
                            href="/invigilators"
                            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                        >
                            Invigilators
                        </Link>
                        <Link
                            href="/exam-centers"
                            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 "
                        >
                            Exam Centers
                        </Link>
                        {mounted && (
                            <button
                                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 inline-flex items-center"
                            >
                                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                                <span className="ml-2">Toggle Theme</span>
                            </button>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
}
