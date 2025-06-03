'use client'
import Link from 'next/link'
import React from 'react'
import { motion } from 'framer-motion'

const HeroSection = () => {
    return (
        <section className="relative w-full h-[calc(100vh-4rem)] flex items-center justify-center flex-col text-center bg-gradient-to-br from-background via-secondary/10 to-background overflow-hidden">
            <div className="absolute inset-0 bg-black/5 dark:bg-black/10 z-0">
            </div>
            <div className='relative z-10 py-16 text-foreground w-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center '>
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="text-4xl dark:text-white text-black md:text-6xl font-bold md:w-[70%]  text-gray-900 leading-tight"
                >
                    CONNECT PROJECTS WITH EXPERT CONSULTANTS
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="mt-6 text-lg md:text-xl dark:text-[#d2ac60] text-gray-600"
                >
                    AI-powered matching for seamless collaboration. Find the perfect fit for your consulting needs.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="mt-8 flex flex-col sm:flex-row gap-4"
                >
                    <Link
                        href="/client-onboarding"
                        className="bg-orange-500 hover:bg-orange-600 font-body text-white font-semibold py-3 px-6 rounded-lg shadow-md transition"
                    >
                        Join as a Client
                    </Link>
                    <Link
                        href="/consultant-onboarding"
                        className="bg-orange-100 dark:bg-[#634c1c] dark:hover:bg-[#634c1e] hover:bg-orange-200 font-body dark:text-white text-gray-800 font-semibold py-3 px-6 rounded-lg shadow-md transition"
                    >
                        Join as a Consultant
                    </Link>
                </motion.div>
            </div>

        </section>
    )
}

export default HeroSection