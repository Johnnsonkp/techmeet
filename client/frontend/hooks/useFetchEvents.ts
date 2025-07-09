'use client';

import { useCallback, useEffect, useState } from 'react';

import { useEventStore } from '@/store/eventStore'; // adjust path as needed

const base_url = process.env.NEXT_PUBLIC_FLASK_BASE_URL;


export const useFetchEvents = () => {
  const setEvents = useEventStore((s) => s.setEvents);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  console.log("base_url", base_url);
  console.log("process.env.NEXT_PUBLIC_FLASK_BASE_URL", process.env.NEXT_PUBLIC_FLASK_BASE_URL);

  // Fetch paginated events
  const fetchEvents = async (page: number, limit: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_FLASK_BASE_URL}/api/v1/events?page=${page}&limit=${limit}`);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      if (data?.events) {
        setEvents(data.events, { page, limit, total: data.total });
        return;
      }
    } catch (err) {
      setError("Failed to fetch events");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  // Search events by query string
  const searchEvents = async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_FLASK_BASE_URL}/api/v1/events/search?q=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      if (data?.events) {
        setEvents(data.events, { page: 1, limit: data.events.length, total: data.total });
      }
    } catch (err) {
      setError("Failed to search events");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { fetchEvents, searchEvents, loading, error };
};