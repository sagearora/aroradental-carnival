'use client';
import { useEffect, useState } from 'react';

import register from '@/app/register';
import RegistrationForm, { RegisterFormSchema } from "@/components/RegistrationForm";
import { Button } from '@/components/ui/button';
import dayjs from 'dayjs';
import { RsvpItemType } from "../types/RsvpItemType";

export default function Home() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [results, setResults] = useState<RsvpItemType[]>([])
  const [showRegistration, setShowRegistration] = useState(false)

  useEffect(() => {
    const existing = localStorage.getItem('results')
    if (existing) {
      try {
        const parsed = JSON.parse(existing)
        if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].id) {
          setResults(parsed)
          return
        }
      } catch (e) {
      }
    }
    setShowRegistration(true)
  }, [])

  const submit = async (data: RegisterFormSchema) => {
    setIsSubmitting(true)
    try {
      const result = await register({
        timestamp: dayjs().format('MM/DD/YYYY H:mm:ss'),
        time_slot: '',
        id: -1,
        name: data.full_name,
        email: data.email,
        phone: data.phone,
        current_patient: data.current_patient,
        total_guests: data.guests.length,
        guest_names: data.guests.map(g => `${g.name} - ${g.age}`).join('\n'),
        checked_in: 0,
        category: 'walk-in',
      })
      const items = [result, ...results]
      localStorage.setItem('results', JSON.stringify(items))
      if (result) {
        setResults(items)
        setShowRegistration(false)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container py-8">
      <section className='bg-[#ffe6c2] pb-8 border rounded-md shadow-lg'>
        <div className="flex space-x-4 mb-8">
          <div className="flex-1">
            <img className="w-full object-fit" src='/images/party_flags.png' />
          </div>
          <div className="flex-1">
            <img className="w-full object-fit" src='/images/party_flags.png' />
          </div>
          <div className="flex-1">
            <img className="w-full object-fit" src='/images/party_flags.png' />
          </div>
        </div>
        <div className='container mx-auto flex flex-col items-center'>
          <h3 className='text-ad-orange text-4xl text-center font-bold mb-4'>Arora Dental - Summer Carnival</h3>
          <h3 className='text-ad-orange text-2xl text-center font-semibold mb-4'>Sunday June 23rd, 2024. 11:00 AM - 3:00 PM</h3>
        </div>
      </section >
      {results.length > 0 && <div className='py-8 flex flex-col items-center space-y-2 max-w-lg mx-auto'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-20 text-green-600">
          <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
        </svg>
        <div className='text-4xl font-bold text-green-600'>Registered Sucessfully</div>
        <div className='text-lg font-semibold'>Please keep this screen open and proceed to check-in</div>
        {results.map(result => <div key={result.id} className="w-full bg-slate-200 border shadow-sm p-4 rounded-md">
          <div className="text-2xl font-bold">{result.name}</div>
          <div>{result.email}</div>
          <div className="text-lg">[{result.total_guests}] {result.guest_names}</div>
        </div>)}
        {!showRegistration && <Button variant='outline' onClick={() => setShowRegistration(true)}>Register Another</Button>}
      </div>}
      {showRegistration &&
        <RegistrationForm
          submit={submit}
          loading={isSubmitting}
        />}
    </div >
  );
}
