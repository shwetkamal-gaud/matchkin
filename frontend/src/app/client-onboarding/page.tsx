'use client'
import DropDown from '@/components/DropDown';
import OnBoardingForm from '@/components/OnBoardingForm';
import { FormData } from '@/type/type';
import { Building, CalendarRange, ChartColumnBig, DollarSign, Lightbulb, Mail, MessageCircleMore, Phone, User, Users } from 'lucide-react'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'



const ClientOnboardingPage = () => {
  const router = useRouter();
  const [error, setError] = useState({
    firstName: '',
    lastName: '',
    email: '',
    companyName: '',
    industry: '',
    size: ''
  })
  const [formData, setFormData] = useState<FormData>({
    accountType: 'Individual',
    companyName: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    industry: 'Select Industry',
    size: 'Select Company Size',
    projectType: '',
    description: '',
    budgetMin: '',
    budgetMax: '',
    timeline: '',
    howHeard: '',
    clientAdditionalInfo: '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  const validateStep1 = (formData: FormData) => {
    const newErrors = {
      firstName: '',
      lastName: '',
      email: '',
      companyName: '',
    };

    if (!formData?.firstName?.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.companyName.trim() && formData.accountType === 'Company') {
      newErrors.companyName = 'Company name is required';
    }

    if (!formData?.lastName?.trim()) {
      newErrors.lastName = 'Last name is required';
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
    console.log(formData.industry, formData.size)
    if (!formData.industry.trim() || formData.industry === 'Select Industry') {
      newErrors.industry = 'Industry is required';
    }

    if (!formData?.size?.trim() || formData.size === 'Select Company Size') {
      newErrors.size = 'Size is required';
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
              {['Individual', 'Company'].map((type) => (
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
          {formData.accountType === 'Individual' ?
            <>
              <div>
                <label htmlFor="first_name" className="block mb-2 flex items-center gap-1  text-sm font-medium text-gray-900 dark:text-white"><User className='dark:text-white text-[#ff691f] w-5 h-5' />  First name</label>
                <input type="text" id="first_name" value={formData.firstName}
                  onChange={(e) => handleChange('firstName', e.target.value)} className=" border border-gray-200 text-gray-900 text-sm rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff691f] focus-visible:ring-offset-2 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#ff691f] dark:focus:border-[#ff691f]" placeholder="eg., John" />
                {error.firstName && <p className="text-red-500 text-sm">{error.firstName}</p>}
              </div>
              <div>
                <label htmlFor="last_name" className="block mb-2 flex items-center gap-1 text-sm font-medium text-gray-900 dark:text-white"><User className='dark:text-white text-[#ff691f] w-5 h-5' />  Last name</label>
                <input type="text" id="last_name" value={formData.lastName}
                  onChange={(e) => handleChange('lastName', e.target.value)} className=" border border-gray-200 text-gray-900 text-sm rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff691f] focus-visible:ring-offset-2 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#ff691f] dark:focus:border-[#ff691f]" placeholder="eg., Doe" />
                {error.lastName && <p className="text-red-500 text-sm">{error.lastName}</p>}
              </div>
            </>
            :
            <div>
              <label htmlFor="company_name" className="block mb-2 flex items-center gap-1  text-sm font-medium text-gray-900 dark:text-white"><Building className='dark:text-white text-[#ff691f] w-5 h-5' />  Company name</label>
              <input type="text" id="company_name" value={formData.companyName}
                onChange={(e) => handleChange('companyName', e.target.value)} className=" border border-gray-200 text-gray-900 text-sm rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff691f] focus-visible:ring-offset-2 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#ff691f] dark:focus:border-[#ff691f]" placeholder="eg., John" />
              {error.companyName && <p className="text-red-500 text-sm">{error.companyName}</p>}
            </div>
          }
          <div>
            <label htmlFor="email" className="block mb-2 flex items-center gap-1 text-sm font-medium text-gray-900 dark:text-white"><Mail className='dark:text-white text-[#ff691f] w-5 h-5' />  Work Email</label>
            <input type="email" id="email" value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)} className=" border border-gray-200 text-gray-900 text-sm rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff691f] focus-visible:ring-offset-2 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#ff691f] dark:focus:border-[#ff691f]" placeholder="you@company.com" required />
            {error.email && <p className="text-red-500 text-sm">{error.email}</p>}
          </div>
          <div>
            <label htmlFor="phone" className="block mb-2 flex items-center gap-1 text-sm font-medium text-gray-900 dark:text-white"><Phone className='dark:text-white text-[#ff691f] w-5 h-5' /> Phone(Optional) </label>
            <input type="text" id="phone" value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)} className=" border border-gray-200 text-gray-900 text-sm rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff691f] focus-visible:ring-offset-2 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#ff691f] dark:focus:border-[#ff691f]" placeholder="+1 123 456 7890" />
          </div>
        </div>
      ),
    },
    {
      label: 'Company & Project Needs',
      content: <div className='flex flex-col gap-5'>
        <div>
          <label htmlFor="industury" className="block mb-2 flex items-center gap-1  text-sm font-medium text-gray-900 dark:text-white"><Building className='dark:text-white text-[#ff691f] w-5 h-5' />  Your Industry</label>
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
          <label htmlFor="size" className="block mb-2 flex items-center gap-1 text-sm font-medium text-gray-900 dark:text-white"><Users className='dark:text-white text-[#ff691f] w-5 h-5' />  Last name</label>
          <DropDown selected={formData?.size ?? ''}
            onChange={(val) => handleChange('size', val)} data={[
              '1-10 Employees',
              '11-50 Employees',
              '51-200 Employees',
              '201-500 Employees',
              '5000+ Employees',
            ]} />
          {error.size && <p className="text-red-500 text-sm">{error.size}</p>}
        </div>
        <div>
          <label htmlFor="type" className="block mb-2 flex items-center gap-1 text-sm font-medium text-gray-900 dark:text-white"><Lightbulb className='dark:text-white text-[#ff691f] w-5 h-5' /> Typical Project Types (Optional)</label>
          <textarea rows={4} id="type" value={formData.projectType}
            onChange={(e) => handleChange('projectType', e.target.value)} className=" border border-gray-200 text-gray-900 text-sm rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff691f] focus-visible:ring-offset-2 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#ff691f] dark:focus:border-[#ff691f]" placeholder="e.g, AI/ML developement, Web Application, Data Analysis" required />
        </div>
        <div>
          <label htmlFor="description" className="block mb-2 flex items-center gap-1 text-sm font-medium text-gray-900 dark:text-white"><Lightbulb className='dark:text-white text-[#ff691f] w-5 h-5' /> Brief Company Description (Optional) </label>
          <textarea rows={4} id="description" value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)} className=" border border-gray-200 text-gray-900 text-sm rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff691f] focus-visible:ring-offset-2 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#ff691f] dark:focus:border-[#ff691f]" placeholder="Tell us about your company..." />
        </div>
      </div>,
    },
    {
      label: 'Budget, Timeline & More',
      content: <div className='flex flex-col gap-5'>
        <div>
          <label htmlFor="budget" className="block mb-2 flex items-center gap-1  text-sm font-medium text-gray-900 dark:text-white"><DollarSign className='dark:text-white text-[#ff691f] w-5 h-5' /> Typical Project Budget (USD, Optional)</label>
          <div className='flex gap-3'>
            <input type="number" id="budget" value={formData.budgetMin}
              onChange={(e) => handleChange('budgetMin', e.target.value)} className=" border border-gray-200 text-gray-900 text-sm rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff691f] focus-visible:ring-offset-2 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#ff691f] dark:focus:border-[#ff691f]" placeholder="Min (e.g, 5000)" />
            <input type="number" value={formData.budgetMax}
              onChange={(e) => handleChange('budgetMax', e.target.value)} id="budget" className=" border border-gray-200 text-gray-900 text-sm rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff691f] focus-visible:ring-offset-2 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#ff691f] dark:focus:border-[#ff691f]" placeholder="Min (e.g, 20000)" />
          </div>
        </div>
        <div>
          <label htmlFor="timeline" className="block mb-2 flex items-center gap-1 text-sm font-medium text-gray-900 dark:text-white"><CalendarRange className='dark:text-white text-[#ff691f] w-5 h-5' />  Typical Project Timeline (Optional)</label>
          <input type="text" value={formData.timeline}
            onChange={(e) => handleChange('timeline', e.target.value)} id="timeline" className=" border border-gray-200 text-gray-900 text-sm rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff691f] focus-visible:ring-offset-2 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#ff691f] dark:focus:border-[#ff691f]" placeholder="e.g, 1-3 months, 6+ months" />
        </div>
        <div>
          <label htmlFor="us" className="block mb-2 flex items-center gap-1 text-sm font-medium text-gray-900 dark:text-white"><ChartColumnBig className='dark:text-white text-[#ff691f] w-5 h-5' />  How did you hear about us? (Optional)</label>
          <input type="text" id="us" value={formData.howHeard}
            onChange={(e) => handleChange('howHeard', e.target.value)} className=" border border-gray-200 text-gray-900 text-sm rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff691f] focus-visible:ring-offset-2 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#ff691f] dark:focus:border-[#ff691f]" placeholder="e.g, LinkedIn, Collegue, Search Engine" />
        </div>
        <div>
          <label htmlFor="question" className="block mb-2 flex items-center gap-1 text-sm font-medium text-gray-900 dark:text-white"><MessageCircleMore className='dark:text-white text-[#ff691f] w-5 h-5' /> Anything Else? (Optional) </label>
          <textarea rows={4} id="question" value={formData.clientAdditionalInfo}
            onChange={(e) => handleChange('clientAdditionalInfo', e.target.value)} className=" border border-gray-200 text-gray-900 text-sm rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff691f] focus-visible:ring-offset-2 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#ff691f] dark:focus:border-[#ff691f]" placeholder="Any specific needs and questoins?" />

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
      const res = await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        router.push('/watchlist');
      } else {
        alert(data.message || 'Submission failed');
      }
    } catch (err) {
      alert('Something went wrong.');
    }
  };
  return (
    <OnBoardingForm formData={formData} title='Client' validateStep1={validateStep1} validateStep2={validateStep2} steps={steps} handleSubmit={handleSubmit} />
  )
}

export default ClientOnboardingPage