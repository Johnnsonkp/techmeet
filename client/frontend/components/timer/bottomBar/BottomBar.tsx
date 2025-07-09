'use client'

import React, { useState } from 'react'

import Link from 'next/link';
import { Loader2Icon } from "lucide-react"

export default function BottomBar() {
  const [status, setStatus] = useState<any>({
    loading: false,
    action: ''
  })

  // Add upload handler
  const handleUploadEvents = async () => {
    setStatus({ loading: true, action: 'Upload' });
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_FLASK_BASE_URL}/api/v1/events/upload_events_to_db`, {
        method: 'GET',
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      alert(data.message || 'Events uploaded successfully!');
    } catch (err) {
      alert('Failed to upload events to DB');
      console.error(err);
    } finally {
      setStatus({ loading: false, action: '' });
    }
  };

  return (
    <div className="flex flex-col md:inline-flex md:flex-row rounded-xl md:rounded-full shadow-xl md:whitespace-nowrap text-center bg-gray-900 p-4 md:pr-2 md:pl-6 md:py-2 text-white text-sm lg:text-base mt-6 font-mono gap-4 items-center selection:bg-blue selection:text-white">
      <span>
        Working routes:
      </span>
      <Link
        className="!text-white flex items-center align-middle justify-center gap-2 relative cursor-pointer bg-blue md:aspect-square px-4 py-0 md:p-2 rounded-xl md:rounded-full hover:bg-yellow hover:text-black transition-colors duration-300 w-25"
        href={'/auth'}
        onClick={(e) => setStatus({
          loading: true,
          action: (e.target as HTMLElement)?.innerText
        })}
      >
        {status.loading && status.action == "Auth"? <Loader2Icon className="animate-spin" /> : "Auth"}
      </Link>
      <Link
        className="!text-white flex items-center align-middle justify-center gap-2 relative cursor-pointer bg-blue md:aspect-square px-4 py-0 md:p-2 rounded-xl md:rounded-full hover:bg-yellow hover:text-black transition-colors duration-300 w-25"
        href={'/dashboard'}
        onClick={(e) => setStatus({
          loading: true,
          action: (e.target as HTMLElement)?.innerText
        })}
      >
        {status.loading && status.action == 'Dashboard'? <Loader2Icon className="animate-spin" /> : 'Dashboard'}
      </Link>
      <button
        className="!text-white flex items-center align-middle justify-center gap-2 relative cursor-pointer bg-blue md:aspect-square px-4 py-0 md:p-2 rounded-xl md:rounded-full hover:bg-yellow hover:text-black transition-colors duration-300 w-25"
        onClick={handleUploadEvents}
        disabled={status.loading && status.action === 'Upload'}
      >
        {status.loading && status.action === 'Upload' ? <Loader2Icon className="animate-spin" /> : 'Upload Events'}
      </button>
    </div>
  );
}