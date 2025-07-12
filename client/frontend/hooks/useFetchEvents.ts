'use client';

import { useCallback, useEffect, useState } from 'react';

import { useAuthStore } from '@/store/authStore';
import { useEventStore } from '@/store/eventStore';

const base_url = process.env.NEXT_PUBLIC_FLASK_BASE_URL;


export const useFetchEvents = () => {
  const setEvents = useEventStore((s) => s.setEvents);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [noEventsFound, setNoEventsFound] = useState(false);

  console.log("base_url", base_url);
  console.log("process.env.NEXT_PUBLIC_FLASK_BASE_URL", process.env.NEXT_PUBLIC_FLASK_BASE_URL);

  // Fetch paginated events
  const fetchEvents = async (page: number, limit: number) => {
    console.log("fetchEvents" );

    if (noEventsFound) return;
    setLoading(true);
    setError(null);
    try {
      console.log("attempting fetch request" );
      const res = await fetch(`${process.env.NEXT_PUBLIC_FLASK_BASE_URL}/api/v1/events?page=${page}&limit=${limit}`);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      if (data?.events && data.events.length > 0) {
        setEvents(data.events, { page, limit, total: data.total });
        setNoEventsFound(false);
        return;
      } else {
        setNoEventsFound(true);
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


export const useCalendarData = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [calendarData, setCalendarData] = useState(false);
  const access_token = useAuthStore((s) => s.access_token);

  console.log("base_url", base_url);
  console.log("process.env.NEXT_PUBLIC_FLASK_BASE_URL", process.env.NEXT_PUBLIC_FLASK_BASE_URL);

  // Fetch paginated events
  const fetchCalendar = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${base_url}/api/v1/google_calendar/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`
        }
      })
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      if (data) {
        console.log("Fetched calendar events:", data);
        // setEvents(data.events, { page, limit, total: data.total });
        // setNoEventsFound(false);
        return;
      } else {
        console.log("No calendar details found");
        // setNoEventsFound(true);
      }
    } catch (err) {
      setError("Failed to fetch events");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { calendarData, loading, error };
}