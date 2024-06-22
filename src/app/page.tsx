'use client';
import { useDebounce } from "@uidotdev/usehooks";
import { ChangeEventHandler, useCallback, useEffect, useState } from 'react';

import searchRSVP from './search-rsvp';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function Home() {
  const [query, setQuery] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [results, setResults] = useState<any[]>([])
  const debouncedSearchTerm = useDebounce(query, 300);

  const search = useCallback(async () => {
    setIsSubmitting(true);
    try {
      const data = await searchRSVP(query);
      if (data) {
        setResults(data)
        return;
      }
    } catch (e) {

    } finally {
      setIsSubmitting(false)
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    search();
  }, [debouncedSearchTerm])

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setQuery(e.currentTarget.value)
  }

  return (
    <div className="container py-8">
      <div className="text-4xl font-bold mb-4">Arora Dental: Carnival</div>
      <div className="relative">
        <div className="absolute left-2 h-14 flex items-center">
          {isSubmitting ?
            <Loader2 className="size=6 animate-spin" />
            :
            <svg xmlns="http://www.w3.org/2000/svg"
              className="size-6"
              fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>}
        </div>
        <Input value={query}
          autoFocus
          className="px-10 text-2xl h-14"
          onChange={onChange} placeholder="Type to search..." />
        {query.length > 0 && <Button className="absolute right-0 top-0 h-14" variant='ghost' onClick={() => setQuery('')}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </Button>}
      </div>
      <div >
        {results.map(({ item }) => <div key={item.id} className='py-4 border-b flex items-center space-x-4'>
          <div className="text-6xl font-bold">{item.total_guests}</div>
          <div>
            <div className="text-2xl font-bold">{item.full_name}</div>
            <div className="text-lg">{item.guest_names}</div>
          </div>
        </div>)}
      </div>
    </div>
  );
}
