'use client'

import React, { useEffect, useState } from 'react'

import { Button } from '../ui/button';
import { Loader2Icon } from "lucide-react"
import { useFetchEvents } from '@/hooks/useFetchEvents'
import { useRouter } from 'next/navigation';

function SearchBar() {
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

      setTimeout(() => {
        setStatus({ loading: false, action: '' });
      }, 1000);
    }
  };


  return (
    <form className="p-4 text-gray-600 dark:text-gray-300 outline-none focus:outline-none">
      <div className="relative flex overflow-hidden">
        {/* ...existing select... */}
        <select 
            className="bg-white dark:bg-gray-800 h-12 px-5 rounded-l-full text-sm focus:outline-none outline-none border-2 border-gray-500 dark:border-gray-600 border-r-1 cursor-pointer max-h-12 overflow-y-hidden">
            <option className="font-medium cursor-pointer" value="categories">categories</option>
            <option className="font-medium cursor-pointer" value="filter">filter</option>
            <option className="font-medium cursor-pointer" value="filter">filter</option>
            <option className="font-medium cursor-pointer" value="filter">filter</option>
        </select>

        <input 
          type="search" 
          name="search"
          placeholder="Search"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="bg-white dark:bg-gray-800 h-12 flex px-5 w-[350px] rounded-r-full text-sm focus:outline-none border-2 border-l-0 border-gray-500 dark:border-gray-600"
          required 
          step="any" 
        />

        <Button
          onClick={handleSubmit}
          // type="submit" 
          className="cursor-pointer absolute inset-y-0 right-0 mr-2 flex items-center px-4 bg-black rounded-2xl h-[80%] w-[100px] my-auto text-white text-sm"
          disabled={loading}
        >
          {status.loading && status.action == 'Search'? 
            <Loader2Icon className="animate-spin" /> 
            : "Search" 
          }
        </Button>
      </div>
    </form>
  )
}

export default SearchBar

