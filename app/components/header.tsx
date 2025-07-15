// app/components/Header.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Instagram, Twitter, Mail } from "lucide-react";
import { Page } from "@/types/Page"; // Adjust this if needed

type Props = {
    pages: Page[];
};

export default function Header({ pages }: Props) {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="w-full">
            <div className="flex items-center justify-between max-w-5xl mx-auto">
                {/* Logo / Name */}
                <Link
                    href="/"
                    className="text-4xl text-gray-700 hover:text-gray-900 hover:font-bold transition-all duration-200"
                >
                    Dapo Sarumi
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex space-x-6 text-base text-gray-500">
                    {/* Static "Projects" link */}
                    <Link
                        href="/"
                        className="hover:underline hover:text-black transition-colors duration-200"
                    >
                        Projects
                    </Link>

                    {/* Dynamically rendered pages */}
                    {pages.map((page) => (
                        <Link
                            key={page._id}
                            href={`/${page.slug}`}
                            className="hover:underline hover:text-black transition-colors duration-200"
                        >
                            {page.title}
                        </Link>
                    ))}
                </nav>


                {/* Hamburger Icon - Mobile */}
                <button
                    onClick={() => setMenuOpen(true)}
                    className="md:hidden text-gray-700"
                    aria-label="Open menu"
                >
                    <Menu size={28} />
                </button>
            </div>

            {/* Sliding Side Menu - Mobile Only */}
            <div
                className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${menuOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="p-4 flex items-center justify-between border-b">
                    <span className="text-xl font-bold text-gray-700">Menu</span>
                    <button onClick={() => setMenuOpen(false)} aria-label="Close menu">
                        <X size={24} />
                    </button>
                </div>

                <nav className="flex flex-col p-4 space-y-4 text-gray-700 text-base">
                    {/* Add your static "Projects" link */}
                    <Link
                        href="/"
                        onClick={() => setMenuOpen(false)}
                        className="hover:underline hover:text-black transition-colors duration-200"
                    >
                        Projects
                    </Link>

                    {/* Dynamically rendered pages */}
                    {pages.map((page) => (
                        <Link
                            key={page._id}
                            href={`/${page.slug}`}
                            onClick={() => setMenuOpen(false)}
                            className="hover:underline hover:text-black transition-colors duration-200"
                        >
                            {page.title}
                        </Link>
                    ))}
                </nav>


                {/* Social Links */}
                <div className="mt-6 flex justify-center gap-4 text-gray-400">
                    <a
                        href="https://twitter.com/adeomosarumi"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Twitter"
                    >
                        <Twitter size={20} />
                    </a>
                    <a
                        href="https://instagram.com/dapo_sarumi"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                    >
                        <Instagram size={20} />
                    </a>
                    <a href="mailto:sarumiadedapo@gmail.com" aria-label="Email">
                        <Mail size={20} />
                    </a>
                </div>
            </div>
        </header>
    );
}

