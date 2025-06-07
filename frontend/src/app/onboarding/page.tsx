
'use client';

import { useRouter } from 'next/navigation';
import { ArrowRight, Building, Search } from 'lucide-react';
import { motion } from 'framer-motion';

export default function OnboardingPage() {
    const router = useRouter();

    const handleSelect = (type: string) => {
        router.push(`/${type}`);
    };

    return (
        <div className=" flex items-center justify-center w-full  px-4">
            <div className="max-w-2xl w-full bg-card rounded-xl shadow-xl p-8 text-center">
                <h1 className="text-3xl font-bold mb-2 text-gary-900 dark:text-white">Join Our Waitlist</h1>
                <p className="text-gray-600 mb-10">Tell us who you are to get started.</p>

                <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        onClick={() => handleSelect('client-onboarding')}
                        className="cursor-pointer border-2 border-orange-200 hover:scale-105 hover:border-orange-400 flex flex-col gap-2 items-center justify-center rounded-lg p-6 shadow-sm hover:shadow-lg transition"
                    >
                        <div className="text-orange-500 mb-4">
                            <Building className='text-[#ff691f] w-15 h-15' />
                        </div>
                        <h2 className="text-xl font-semibold mb-2 text-gary-900 dark:text-white">{`I'm a Client`}</h2>
                        <p className="text-gray-600 text-sm mb-4">
                            Looking to post projects and hire expert consultants to achieve your business goals.
                        </p>
                        <button className="bg-orange-500 text-white px-4 py-2 rounded flex items-center w-full justify-center gap-2 ">
                            Post Projects <ArrowRight size={18} />
                        </button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        onClick={() => handleSelect('consultant-onboarding')}
                        className="cursor-pointer border-2 border-orange-200 hover:scale-105 hover:border-orange-400 flex flex-col gap-2 items-center justify-center rounded-lg p-6 shadow-sm hover:shadow-lg transition"
                    >
                        <div className="text-orange-500 mb-4 text-center">
                            <Search className=' text-[#ff691f] w-15 h-15' />
                        </div>
                        <h2 className="text-xl font-semibold text-gary-900 dark:text-white mb-2">{`I'm a Consultant`}</h2>
                        <p className="text-gray-600 text-sm mb-4">
                            Ready to find exciting projects, showcase your expertise, and connect with clients.
                        </p>
                        <button className="bg-orange-100 text-black px-4 py-2 rounded flex items-center w-full justify-center gap-2 ">
                            Find Projects <ArrowRight size={18} />
                        </button>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
