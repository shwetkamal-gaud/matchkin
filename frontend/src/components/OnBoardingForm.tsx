'use client'
import React, { ReactNode, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, CircleCheckBig } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FormData } from '@/types/types';

const OnBoardingForm = ({ steps, title, handleSubmit, validateStep1, validateStep2, formData }: { steps: { label: string, content: ReactNode }[], title: string, handleSubmit: () => void, validateStep1: (value: FormData) => boolean, validateStep2: (value: FormData) => boolean, formData: FormData }) => {
    const [step, setStep] = useState(0);
    const router = useRouter();

    return (
        <div className="flex-grow flex justify-center items-center bg-card overflow-hidden">
            <motion.div
                layout
                className="w-full max-w-xl rounded-lg shadow-xl p-6"
            >
                <h2 className="text-2xl font-semibold text-gary-900 dark:text-white text-center">{title + 'Onboarding'}</h2>
                <p className="text-sm text-center text-gray-600 mb-4">
                    Step {step + 1} of 3: {steps[step].label}
                </p>

                <div className="w-full h-2 bg-gray-200 rounded mb-6">
                    <motion.div
                        className="h-full bg-orange-500 rounded"
                        initial={{ width: 0 }}
                        animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
                        transition={{ duration: 0.3 }}
                    />
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {steps[step].content}
                    </motion.div>
                </AnimatePresence>

                <div className="mt-6 flex justify-between">
                    <button

                        onClick={() => {
                            if (step > 0) {

                                setStep(step - 1)
                            }
                            else {
                                router.push('/onboarding')
                            }
                        }}
                        className="px-4 flex items-center gap-1 py-2 bg-gray-200 rounded disabled:opacity-50"
                    >
                        <ArrowLeft className='w-4 h-4' /> Back
                    </button>
                    <button
                        onClick={() => {
                            if (step <= 1) {
                                if (step === 0 && validateStep1(formData)) {
                                    setStep(1);
                                } else if (step === 1 && validateStep2(formData)) {
                                    
                                    setStep(2);
                                }
                            }
                            else {
                                handleSubmit()
                            }
                        }}

                        className="px-4 py-2 bg-orange-500 text-white flex items-center gap-1 rounded disabled:opacity-50"
                    >
                        {step >= 2 ? 'Submit to Waitlist' : 'Next'} {step >= 2 ? <CircleCheckBig className='w-4 h-4' /> : <ArrowRight className='w-4 h-4' />}
                    </button>
                </div>
            </motion.div>
        </div>
    )
}

export default OnBoardingForm