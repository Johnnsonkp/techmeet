'use client'

import React, { useState } from 'react'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2Icon } from "lucide-react"
import { Search } from "lucide-react";
import { useFetchEvents } from '@/hooks/useFetchEvents'
import { useRouter } from 'next/navigation';

function HeroEventSearch() {
  const [search, setSearch] = useState('');
  const { searchEvents, loading } = useFetchEvents();
  const router = useRouter();

  const [status, setStatus] = useState<any>({
      loading: false,
      action: ''
  })
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({
      loading: true,
      action: (e.target as HTMLElement)?.innerText
    })
    
    if (search.trim()) {
      searchEvents(search);

      router.push(`/events?search=${encodeURIComponent(search)}`);
    }
  };
    
  return (
    <div className="flex w-[550px] h-[45px] max-w-2xl mx-auto bg-white rounded-md overflow-hidden shadow-lg">
      <div className="flex-1 relative h-full">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-7 h-7" />
        <Input
          onChange={e => setSearch(e.target.value)}
          placeholder="Search for tech events, meetups, or conferences..." 
          className="pl-14 h-full py-5 text-lg border-0 focus:ring-0 text-foreground"
        />
      </div>
      <Button
        onClick={handleSubmit} 
        disabled={loading}
        className="px-5 w-[130px] h-full py-5 text-md rounded-none cursor-pointer bg-blue hover:bg-yellow"
      >
        {status.loading && status.action == 'Search Event'? 
          <Loader2Icon className="animate-spin" /> 
            : "Search Event" 
        }
      </Button>


    </div>
  )
}

export default HeroEventSearch