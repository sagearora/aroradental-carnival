'use client';
import { useDebounce } from "@uidotdev/usehooks";
import { ChangeEventHandler, useCallback, useEffect, useState } from 'react';

import { RsvpItemType } from "@/app/checkin-79/RsvpItem";
import searchRSVP from './checkin-79/search-rsvp';

export default function Home() {
  const [query, setQuery] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [results, setResults] = useState<RsvpItemType[]>([])
  const debouncedSearchTerm = useDebounce(query, 300);

  const search = useCallback(async () => {
    setIsSubmitting(true);
    try {
      const data = await searchRSVP(query);
      if (data) {
        setResults(data.map(d => d.item))
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
      <div className="text-4xl font-bold mb-4">Welcome</div>
      
    </div>
  );
}
