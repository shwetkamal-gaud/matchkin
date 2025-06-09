"use client"

import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import React, {  useState } from 'react'
import { ThemeToggle } from './ThemeToggle'
import { useAuthStore } from '@/store/authStore'
import getBaseUrl from '@/lib/getBaseUrl'
import { useRouter } from 'next/navigation'
import { useAuthContext } from '@/context/AuthContext'
const baseUrl = getBaseUrl();


const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Chat', href: '/chat' },
    { label: 'Match Engine', href: '/match' },
]

const Navbar = () => {
    const [mobileOpen, setMobileOpen] = useState(false)
    const {authUser, setAuthUser} = useAuthContext()
    const logout = useAuthStore((state) => state.logout);
    const router = useRouter();
    const handleLogout = async () => {
        try {
            await fetch(`${baseUrl}/api/auth/logout`, {
                method: 'POST'
            });
            logout();
            localStorage.removeItem('user')
            setAuthUser(null);
            router.push('/login');
        } catch (err) {
            console.error("Logout failed", err);
        }
    }

    return (
        <nav className="sticky top-0 z-50 w-full  shadow-md  bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                    <h1 className='dark:text-white text-black text-3xl'>matchkin.com</h1>
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
                <div className=" flex items-center dark:text-white text-black md:gap-8 gap-2">
                    {authUser !== null ? (
                        <div className='flex gap-2 items-center'>
                            <span>{authUser?.name}</span>
                            <button onClick={handleLogout} className="btn bg-[#ff691f] rounded-md px-3 h-9 self-center items-center hidden md:flex">Logout</button>
                        </div>
                    ) : (
                        <Link href="/login" className="btn bg-[#ff691f] rounded-md px-3 h-9 self-center items-center hidden md:flex">Login</Link>
                    )}
                    <a className="items-center dark:text-white text-black justify-center gap-2 whitespace-nowrap text-sm font-medium dark:bg-[#634c1c] dark:hover:bg-[#634c1e] bg-[#f0e4cb] hover:bg-[#f0e4cb] h-9 rounded-md px-3 hidden md:inline-flex"
                        href="/onboarding">Join Us</a>
                    <ThemeToggle />
                    <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
                        {mobileOpen ? <X className='dark:text-white text-black' size={24} /> : <Menu className='dark:text-white text-black' size={24} />}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        className="md:hidden bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t-1 border-t-gray-100 px-4 py-4 space-y-4"
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
                        <div className="md:hidden flex items-center dark:text-white text-black md:gap-8 gap-2">
                            {authUser ? (
                                <button onClick={handleLogout} className="btn bg-[#ff691f] rounded-md px-3 h-9 self-center items-center flex">Logout</button>
                            ) : (
                                <Link href="/login" className="btn bg-[#ff691f] rounded-md px-3 h-9 self-center items-center flex">Login</Link>
                            )}
                            <a className="items-center dark:text-white text-black justify-center gap-2 whitespace-nowrap text-sm font-medium dark:bg-[#634c1c] dark:hover:bg-[#634c1e] bg-[#f0e4cb] hover:bg-[#f0e4cb] h-9 rounded-md px-3 inline-flex"
                                href="/onboarding">Join Us</a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}

export default Navbar