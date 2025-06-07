'use client'
import React, { useState } from 'react'
import DropDown from '@/components/DropDown';
import OnBoardingForm from '@/components/OnBoardingForm';
import { FormData } from '@/types/types';
import { Briefcase, Building, DollarSign, Lightbulb, Mail, MapPin, MessageCircleMore, Phone, User, Users } from 'lucide-react'
import { useRouter } from 'next/navigation';

const ConsultantOnboardingPage = () => {
    const router = useRouter();
    const [error, setError] = useState({
        fullName: '',
        email: '',
        companyName: '',
        industry: '',
    })
    const [formData, setFormData] = useState<FormData>({
        accountType: 'Individual Consultant',
        companyName: '',
        fullName: '',
        email: '',
        phone: '',
        industry: 'Select Industry',
        description: '',
        additionalInfo: '',
        job: '',
        loaction: '',
        hourlyRate: NaN,
        role: 'Consultant'
    });

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };
    const validateStep1 = (formData: FormData) => {
        const newErrors = {
            fullName: '',
            email: '',
            companyName: '',
        };

        if (!formData?.fullName?.trim()) {
            newErrors.fullName = 'Full name is required';
        }
        if (!formData.companyName.trim() && formData.accountType === 'Company/Agency') {
            newErrors.companyName = 'Company name is required';
        }


        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }

        setError(prev => ({ ...prev, ...newErrors }));

        return Object.values(newErrors).every(e => e === '');
    };
    const validateStep2 = (formData: FormData) => {
        const newErrors = {
            industry: '',
            size: '',
        };
        if (!formData.industry.trim() || formData.industry === 'Select Industry') {
            newErrors.industry = 'Industry is required';
        }
        setError(prev => ({ ...prev, ...newErrors }));

        return Object.values(newErrors).every(e => e === '');
    };


    const steps = [
        {
            label: 'Your Information',
            content: (
                <div className='flex flex-col gap-5'>
                    <div className='flex flex-col gap-2'>
                        <span className='dark:text-white flex items-center gap-2 font-semibold'>
                            <Users className='dark:text-white text-[#ff691f] w-5 h-5' />Account Type
                        </span>
                        <div className='flex gap-3'>
                            {['Individual Consultant', 'Company/Agency'].map((type) => (
                                <label key={type} className="flex items-center cursor-pointer">
                                    <input
                                        type="radio"
                                        name="account-type"
                                        value={type}
                                        checked={formData.accountType === type}
                                        onChange={() => handleChange('accountType', type)}
                                        className="w-4 h-4 text-[#ff691f]  bg-gray-100 border-[#ff691f] dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    <span className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{type}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    {formData.accountType === 'Individual Consultant' ?
                        <>
                            <div>
                                <label htmlFor="fullName" className=" mb-2 flex items-center gap-1  text-sm font-medium text-gray-900 dark:text-white"><User className='dark:text-white text-[#ff691f] w-5 h-5' />  Full Name</label>
                                <input type="text" id="fullName" value={formData.fullName}
                                    onChange={(e) => handleChange('fullName', e.target.value)} className=" border border-gray-200 text-gray-900 text-sm rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff691f] focus-visible:ring-offset-2  w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#ff691f] dark:focus:border-[#ff691f]" placeholder="eg., John" />
                                {error.fullName && <p className="text-red-500 text-sm">{error.fullName}</p>}
                            </div>
                        </>
                        :
                        <div>
                            <label htmlFor="company_name" className=" mb-2 flex items-center gap-1  text-sm font-medium text-gray-900 dark:text-white"><Building className='dark:text-white text-[#ff691f] w-5 h-5' />  Company name</label>
                            <input type="text" id="company_name" value={formData.companyName}
                                onChange={(e) => handleChange('companyName', e.target.value)} className=" border border-gray-200 text-gray-900 text-sm rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff691f] focus-visible:ring-offset-2  w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#ff691f] dark:focus:border-[#ff691f]" placeholder="eg., John" />
                            {error.companyName && <p className="text-red-500 text-sm">{error.companyName}</p>}
                        </div>
                    }
                    <div>
                        <label htmlFor="email" className=" mb-2 flex items-center gap-1 text-sm font-medium text-gray-900 dark:text-white"><Mail className='dark:text-white text-[#ff691f] w-5 h-5' />  Work Email</label>
                        <input type="email" id="email" value={formData.email}
                            onChange={(e) => handleChange('email', e.target.value)} className=" border border-gray-200 text-gray-900 text-sm rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff691f] focus-visible:ring-offset-2  w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#ff691f] dark:focus:border-[#ff691f]" placeholder="you@company.com" required />
                        {error.email && <p className="text-red-500 text-sm">{error.email}</p>}
                    </div>
                    <div>
                        <label htmlFor="phone" className=" mb-2 flex items-center gap-1 text-sm font-medium text-gray-900 dark:text-white"><Phone className='dark:text-white text-[#ff691f] w-5 h-5' /> Phone(Optional) </label>
                        <input type="text" id="phone" value={formData.phone}
                            onChange={(e) => handleChange('phone', e.target.value)} className=" border border-gray-200 text-gray-900 text-sm rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff691f] focus-visible:ring-offset-2  w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#ff691f] dark:focus:border-[#ff691f]" placeholder="+1 123 456 7890" />
                    </div>
                </div>
            ),
        },
        {
            label: 'Company & Project Needs',
            content: <div className='flex flex-col gap-5'>
                <div>
                    <label htmlFor="industury" className=" mb-2 flex items-center gap-1  text-sm font-medium text-gray-900 dark:text-white"><Building className='dark:text-white text-[#ff691f] w-5 h-5' />  Your Industry</label>
                    <DropDown selected={formData.industry}
                        onChange={(val) => handleChange('industry', val)} data={[
                            'Technology',
                            'Finance',
                            'Marketing',
                            'Healthcare',
                            'Education',
                            'Manufacturing',
                            'Retail',
                            'Real Estate',
                            'Other',
                        ]} />
                    {error.industry && <p className="text-red-500 text-sm">{error.industry}</p>}
                </div>
                <div>
                    <label htmlFor="job" className=" mb-2 flex items-center gap-1 text-sm font-medium text-gray-900 dark:text-white"><Briefcase className='dark:text-white text-[#ff691f] w-5 h-5' />  Your Job Title / Headline</label>
                    <input type="text" id="job" value={formData.job}
                        onChange={(e) => handleChange('job', e.target.value)} className=" border border-gray-200 text-gray-900 text-sm rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff691f] focus-visible:ring-offset-2  w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#ff691f] dark:focus:border-[#ff691f]" placeholder="eg., AI Strategy Consultant" />


                </div>
                <div>
                    <label htmlFor="description" className=" mb-2 flex items-center gap-1 text-sm font-medium text-gray-900 dark:text-white"><Lightbulb className='dark:text-white text-[#ff691f] w-5 h-5' /> Brief Company Description (Optional) </label>
                    <textarea rows={4} id="description" value={formData.description}
                        onChange={(e) => handleChange('description', e.target.value)} className=" border border-gray-200 text-gray-900 text-sm rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff691f] focus-visible:ring-offset-2  w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#ff691f] dark:focus:border-[#ff691f]" placeholder="Showcase your expertise or your company's focus..." />
                </div>
            </div>,
        },
        {
            label: 'Budget, Timeline & More',
            content: <div className='flex flex-col gap-5'>

                <div>
                    <label htmlFor="loaction" className=" mb-2 flex items-center gap-1 text-sm font-medium text-gray-900 dark:text-white"><MapPin className='dark:text-white text-[#ff691f] w-5 h-5' />  Location (Optional)</label>
                    <input type="text" value={formData.loaction}
                        onChange={(e) => handleChange('location', e.target.value)} id="location" className=" border border-gray-200 text-gray-900 text-sm rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff691f] focus-visible:ring-offset-2  w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#ff691f] dark:focus:border-[#ff691f]" placeholder="e.g, New York, NY or Remote" />
                </div>
                <div>
                    <label htmlFor="us" className=" mb-2 flex items-center gap-1 text-sm font-medium text-gray-900 dark:text-white"><DollarSign className='dark:text-white text-[#ff691f] w-5 h-5' />  Expected Hourly Rate (USD, Optional)</label>
                    <input type="number" value={formData.hourlyRate}
                        onChange={(e) => handleChange('hourlyRate', e.target.value)} id="budget" className=" border border-gray-200 text-gray-900 text-sm rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff691f] focus-visible:ring-offset-2  w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#ff691f] dark:focus:border-[#ff691f]" placeholder="Min (e.g, 75)" />
                </div>
                <div>
                    <label htmlFor="question" className=" mb-2 flex items-center gap-1 text-sm font-medium text-gray-900 dark:text-white"><MessageCircleMore className='dark:text-white text-[#ff691f] w-5 h-5' /> Anything Else? (Optional) </label>
                    <textarea rows={4} id="question" value={formData.additionalInfo}
                        onChange={(e) => handleChange('additionalInfo', e.target.value)} className=" border border-gray-200 text-gray-900 text-sm rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff691f] focus-visible:ring-offset-2  w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#ff691f] dark:focus:border-[#ff691f]" placeholder="Any specific needs and questoins?" />

                </div>
            </div>,
        },
    ];
    const handleSubmit = async () => {
        const payload = {
            ...formData,
            accountType: formData.accountType?.toLowerCase() ?? null,
        };

        try {
            const res = await fetch('https://matchkin-kazv.onrender.com/api/onboarding', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            const data = await res.json();
            if (res.ok) {
                router.push('/waitlist');
            } else {
                alert(data.message || 'Submission failed');
            }
        } catch (err) {
            alert('Error:' + err);
        }
    };
    return (
        <OnBoardingForm formData={formData} title='Consultant' validateStep1={validateStep1} validateStep2={validateStep2} steps={steps} handleSubmit={handleSubmit} />
    )
}

export default ConsultantOnboardingPage