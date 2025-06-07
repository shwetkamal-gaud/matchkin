'use client'

import { motion } from 'framer-motion'
import { FaBullseye, FaBrain, FaClock, FaCheckCircle } from 'react-icons/fa'

const features = [
    {
        icon: <FaBullseye className="text-orange-500 text-3xl" />,
        title: 'Access Top-Tier Expertise',
        desc: 'Connect with a curated network of vetted, expert consultants.',
    },
    {
        icon: <FaBrain className="text-orange-500 text-3xl" />,
        title: 'AI-Powered Precision Matching',
        desc: 'Our intelligent algorithms analyze your project needs precisely.',
    },
    {
        icon: <FaClock className="text-orange-500 text-3xl" />,
        title: 'Accelerate Your Search',
        desc: 'Streamline your search and receive high-quality proposals faster.',
    },
    {
        icon: <FaCheckCircle className="text-orange-500 text-3xl" />,
        title: 'Hire with Confidence',
        desc: 'Work with verified professionals who undergo a thorough vetting.',
    },
]

const ClientSection = () => {
    return (
        <section className=" px-6 text-center">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className='py-16 md:py-24 bg-gradient-to-b from-background via-secondary/5 to-background'
            >
                <h2 className="text-3xl dark:text-white md:text-4xl font-extrabold text-gray-900 mb-2">FOR CLIENTS</h2>
                <p className="text-gray-600 dark:text-[#d2ac60] text-lg md:w-[50%] mx-auto">
                    Find Your Ideal Consultant, Faster. Leverage AI to connect with vetted experts perfectly matched to your project needs.
                </p>
            </motion.div>

            <div className='py-16 bg-background container mx-auto px-4 sm:px-6'>
                <motion.h1 transition={{ duration: 0.5, ease: 'easeOut' }} className='uppercase dark:text-white text-black text-3xl font-bold mb-12'>Why Client Choose Us</motion.h1>
                <motion.div
                    initial="hidden"
                    whileInView="visible"

                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                >

                    {features.map((item, index) => (
                        <motion.div
                            key={index}
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                visible: { opacity: 1, y: 0 },
                            }}
                            transition={{ duration: 0.5, ease: 'easeOut' }}
                            className="bg-card p-6 rounded-xl shadow-lg text-center flex flex-col items-center justify-center hover:scale-105 transition"
                        >


                            <div className="p-4 bg-orange-100 rounded-full mb-4 text-primary ring-4 ring-orange-200">
                                {item.icon}
                            </div>

                            <h3 className="text-lg font-semibold dark:text-white   text-gray-900">{item.title}</h3>
                            <p className="text-sm text-gray-600 mt-2  dark:text-[#d2ac60]">{item.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

export default ClientSection