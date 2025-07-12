'use client'

import type { Event } from "@/store/eventStore";
import { useEventStore } from "@/store/eventStore";
import { useMemo } from "react";

interface Profile {
  job_title?: string;
  skills?: string[];
  description?: string;
  personality?: string[];
  tags?: string[];
}

export function useProfileEventSearch(profile: Profile | null) {
  const { events: storeEvents } = useEventStore((s) => s);

  const filteredEvents = useMemo(() => {
    if (!profile || !storeEvents?.events) return [];

    // Gather all profile search terms as lowercase strings, splitting multi-word terms
    let searchTerms: string[] = [
      profile.job_title,
      profile.description,
      ...(profile.skills || []),
      ...(profile.personality || []),
      ...(profile.tags || []),
    ]
      .filter(Boolean)
      .flatMap((s) => String(s).toLowerCase().split(/\s+/)); // split on whitespace

    // Remove duplicates and empty strings
    searchTerms = Array.from(new Set(searchTerms)).filter(Boolean);

    if (searchTerms.length === 0) return storeEvents.events;

    return storeEvents.events.filter((event: Event) => {
      const eventFields = [
        event.name,
        event.location,
        event.category,
        event.image_description,
      ]
        .filter(Boolean)
        .map((s) => String(s).toLowerCase());

      // Match if ANY search term is found in ANY event field
      return searchTerms.some((term) =>
        eventFields.some((field) => field.includes(term))
      );
    });
  }, [profile, storeEvents]);

  return filteredEvents;
}