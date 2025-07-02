'use client';

import { useCallback, useEffect, useState } from 'react';

import { Event } from '@/store/eventStore';
import { useEventStore } from '@/store/eventStore'; // adjust path as needed

const base_url = process.env.NEXT_PUBLIC_FLASK_BASE_URL;

export const useFetchEvents = () => {
  const setEvents = useEventStore((s) => s.setEvents);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = async (page: number, limit: number) => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_FLASK_BASE_URL}/api/v1/events?page=${page}&limit=${limit}`);
      const data = await res.json();

      console.log("fetch events")

      if (data?.events) {
        setEvents(data.events, { page, limit, total: data.total });
      }
    } catch (err) {
      setError("Failed to fetch events");
    } finally {
      setLoading(false);
    }
  };

  return { fetchEvents, loading, error };
};
