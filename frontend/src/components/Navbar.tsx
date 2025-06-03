"use client"

import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { ThemeToggle } from './ThemeToggle'
import Image from 'next/image'
import { jwtDecode } from 'jwt-decode'


const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    // { label: 'Waitlist', href: '/waitlist' },
    { label: 'Chat', href: '/chat' },
    { label: 'Match Engine', href: '/match' },
]

const Navbar = () => {
    const [mobileOpen, setMobileOpen] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('token')
        try {
            if (token) jwtDecode(token)
            setIsLoggedIn(!!token)
        } catch {
            setIsLoggedIn(false)
        }
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('token')
        window.location.href = '/login'
    }

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                    <Image src='/logo.webp' alt='Matchkin Logo' width={160} height={28} style={{ color: 'transparent' }} />
                </div>
                <div className="hidden md:flex gap-8">
                    {navLinks.map(link => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-gray-700 dark:text-gray-100 hover:text-indigo-600 transition"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
                <div className="hidden md:flex items-center gap-8">
                    {isLoggedIn ? (
                        <button onClick={handleLogout} className="btn bg-[#ff691f] rounded-md px-3 h-9 self-center items-center flex">Logout</button>
                    ) : (
                            <Link href="/login" className="btn bg-[#ff691f] rounded-md px-3 h-9 self-center items-center flex">Login</Link>
                    )}
                    <a className="items-center justify-center gap-2 whitespace-nowrap text-sm font-medium bg-[#f0e4cb] hover:bg-[#f0e4cb] h-9 rounded-md px-3 hidden sm:inline-flex"
                        href="/onboarding">Join Us</a>
                    <ThemeToggle />
                </div>
                <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
                    {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Nav Links */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        className="md:hidden bg-white dark:bg-gray-900 px-4 py-4 space-y-4"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {navLinks.map(link => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileOpen(false)}
                                className="block text-gray-700 dark:text-gray-100 hover:text-indigo-600"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}

export default Navbar