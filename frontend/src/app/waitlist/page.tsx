'use client';

import { useRouter } from 'next/navigation';
import { CheckCircle, Globe } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export default function WaitlistPage() {
    const router = useRouter();

    return (

        <div className="w-full flex flex-col items-center justify-center px-4">
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-crad rounded-xl flex flex-col items-center jusitfy-center gap-2 shadow-xl p-10 max-w-lg text-center">
                    <div className='rounded-full flex self-center justify-center items-center p-2 ring-4 bg-green-100 ring-green-200'>
                        <CheckCircle className="text-green-500 mx-auto w-17 h-17" />
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gary-900 dark:text-white mb-2">
                        You’re on the Waitlist!
                    </h1>
                    <p className="text-gray-700  dark:text-white/70 mb-6">
                        Thank you for your interest in <span className="font-semibold">Matchkin</span>. {`We're excited to have you!`}
                    </p>

                    <Globe className="text-orange-500 mx-auto mb-4" size={40} />
                    <p className="text-gray-700  dark:text-white/70 mb-6">
                       {` We'll notify you as soon as we launch and provide early access to our platform. Stay tuned for updates!`}
                    </p>

                    <p className="text-gray-700  dark:text-white/50 text-sm mb-8">
                        In the meantime, feel free to explore our homepage or learn more about us.
                    </p>

                    <div className="flex justify-center gap-4">
                        <button
                            onClick={() => router.push('/')}
                            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded font-medium transition"
                        >
                            Back to Homepage
                        </button>
                        <button
                            onClick={() => router.push('/about')}
                            className="bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 px-4 py-2 rounded font-medium transition"
                        >
                            Learn More About Us
                        </button>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
