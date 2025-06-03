'use client';

import { Target, Briefcase, CheckCircle, Lightbulb, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function AboutPage() {
    const values = [
        {
            icon: <CheckCircle className="text-orange-500 text-3xl" />,
            title: 'Integrity',
            desc: 'Operating with transparency and ethical standards.',
        },
        {
            icon: <Lightbulb className="text-orange-500 text-3xl" />,
            title: 'Innovation',
            desc: 'Continuously improving through technology and insights.',
        },
        {
            icon: <Users className="text-orange-500 text-3xl" />,
            title: 'Collaboration',
            desc: 'Fostering strong partnerships between clients and consultants.',
        },
        {
            icon: <Target className="text-orange-500 text-3xl" />,
            title: 'Excellence',
            desc: 'Striving for the highest quality in matching and service.',
        },
    ]
    const users = [
        {
            id: 1,
            position: 'Founder & CEO',
            name: 'Aritra Mondal',
            img: "/Aritra.jpg"
        },
        {
            id: 2,
            position: 'Co-founder & CTO',
            name: 'Kshitij Shankar Kulal',
            img: "/Kshitij.jpg"
        },
        {
            id: 3,
            position: 'Business Head',
            name: 'Debanjan Saha',
            img: "/Debanjan.jpg"
        },
        {
            id: 4,
            position: 'Marketing Head',
            name: 'Lavanya Sharma',
            img: "/Lavanya.jpg"
        },

    ]
    return (
        <main className="min-h-[calc(100vh-4rem)] w-full text-gray-800 flex flex-col items-center text-center">
            <section className="py-24 md:py-32 bg-[#f0e4cb1a] text-center w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="container mx-auto px-6 relative z-10"
                >
                    <h1 className="text-4xl md:text-6xl font-bold dark:text-white text-black mb-4">About Matchkin</h1>
                    <p className="text-lg md:text-xl text-[#d2ac60] max-w-3xl mx-auto">
                        Connecting exceptional talent with impactful projects through intelligent matching.
                    </p>
                </motion.div>
            </section>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-5xl mx-auto px-4 py-16"
            >
                <section className='text-center fade-in-up'>
                    <Target className="text-orange-500 mx-auto mb-4 space-y-16 md:space-y-24" size={48} />
                    <h2 className="text-3xl font-bold mb-4 dark:text-white text-gray-900">OUR MISSION</h2>
                    <p className="text-base sm:text-lg text-[#d2ac60]">
                        To revolutionize the consulting landscape by seamlessly connecting businesses with
                        the precise expertise they need, fostering innovation and driving success through
                        intelligent, data-driven matching.
                    </p>
                </section>
                <section className='flex flex-col md:flex-row items-center gap-8 md:gap-12 fade-in-up'>
                    <div className='w-full md:w-1/2 flex-shrink-0 slef-end justify-end flex'>
                        <Image
                            width={600}
                            height={400}
                            src="/image.webp"
                            alt="City at night"
                            className="rounded-lg shadow-lg object-cover w-full h-auto"
                        />
                    </div>
                    <div className='w-full md:w-1/2 text-left'>
                        <Briefcase className="text-orange-500 mb-4" size={40} />
                        <h2 className="text-3xl md:text-4xl dark:text-white text-gray-900 font-bold mb-4">THE MATCHKIN STORY</h2>
                        <p className="text-[#d2ac60] text-base sm:text-lg">
                            Matchkin was born from a simple idea. Our team had already worked as freelancers,
                            independent consultants and consulting firms as well. When we were looking for outsourcing work
                            or independent projects we couldn’t find a platform that served our requirements.
                        </p>
                        <p className="mt-4 text-[#d2ac60] text-base sm:text-lg">
                            We built Matchkin to bridge this gap, creating a platform where AI precision meets human expertise.
                            Our goal is to empower both clients and consultants by facilitating meaningful connections that
                            lead to successful project outcomes and lasting partnerships.
                        </p>
                    </div>
                </section>

                <section className='fade-in-up py-12'>
                    <h2 className="text-3xl md:text-4xl font-bold text-center dark:text-white text-gray-900 mb-12 uppercase">Our Core Values</h2>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
                        {values.map((item, index) => (
                            <motion.div
                                key={index}
                                variants={{
                                    hidden: { opacity: 0, y: 30 },
                                    visible: { opacity: 1, y: 0 },
                                }}
                                transition={{ duration: 0.5, ease: 'easeOut' }}
                                className="bg-card p-6 rounded-xl shadow-lg text-center flex flex-col items-center justify-center hover:scale-105 transition"
                            >


                                <div className="p-4 bg-orange-100 rounded-full mb-4  text-primary">
                                    {item.icon}
                                </div>

                                <h3 className="text-lg font-semibold dark:text-white text-gray-900">{item.title}</h3>
                                <p className="text-sm text-[#d2ac60] mt-2 ">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>
                <section className='text-center w-full fade-in-up py-10 space-y-5 font-heading'>
                    <Users className='text-orange-500 mx-auto' size={60} />
                    <h1 className="text-3xl md:text-4xl dark:text-white text-gray-900 font-bold mb-12 uppercase">Meet The Team</h1>
                    <div className='grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8'>
                        {users.map((user, idx) => (
                            <div key={idx} className="flex flex-col items-center space-y-2">
                                <span className="relative flex shrink-0 overflow-hidden rounded-full h-20 w-20 md:h-24 md:w-24 border-2 border-orange-500/20 ring-1 ring-orange-500">
                                    <Image width={500} height={500} className="aspect-square h-full w-full" alt="Lavanya Sharma" data-ai-hint="professional headshot" src={user.img} />
                                </span><p className="font-semibold dark:text-white text-gray-900">{user.name}</p>
                                <p className="text-sm text-[#d2ac60]">{user.position}</p>
                            </div>
                        ))}
                    </div>
                </section>

            </motion.div>


        </main>
    );
}
