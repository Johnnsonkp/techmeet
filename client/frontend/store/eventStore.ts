import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Organiser {
  name: string;
  avatar?: string;
  followers: string;
}

export interface Event {
  id?: number;
  position?: number;
  name: string;
  date?: string;
  time?: string;
  datetime?: string;
  location: string;
  price: string;
  organiser?: Organiser;
  organizer: Organiser;
  event_link?: string;
  image: string;
  imageDescription?: string;
  image_description: string;
  category?: string;
  rating?: number;
  progress?: number;
  tags?: string[] | undefined;
  source_api?: string;
  categories?: string[] | undefined;
}

interface EventsPayload {
  events: Event[];
  page: number;
  limit: number;
  total: number;
}

interface EventState {
  events: EventsPayload | null;
  selectedEvent: Event | null;
  userEvents: Event[] | null;
  refreshEvents: boolean; // Optional property for refreshing events
  currentSearchTerm: string; // <-- Add persistent search term

  setEvents: (events: Event[], meta: { page: number; limit: number; total: number }) => void;
  setNextPage: (events: Event[], meta: { page: number; limit: number; total: number }) => void;

  addEvent: (event: Event) => void;
  updateEvent: (event: Event) => void;
  removeEvent: (eventId: number) => void;

  selectEvent: (event: Event) => void;
  clearSelectedEvent: () => void;
  clearEvents: () => void;
  setCurrentSearchTerm: (term: string) => void; // <-- Add setter
  setUserEvents: (events: Event[]) => void;
  setRefreshEvents: (refresh: boolean) => void; // Optional setter for refresh state
  getFirst3ValidEvents: () => Event[]; // <-- Add this line
}

export const useEventStore = create<EventState>()(
  persist(
    (set, get) => ({
      events: null,
      selectedEvent: null,
      userEvents: [],
      refreshEvents: true, // Initialize refresh state
      currentSearchTerm: '', // <-- Initialize

      setEvents: (events, { page, limit, total }) =>
        set({
          events: { events, page, limit, total },
        }),

      setNextPage: (newEvents, { page, limit, total }) => {
        const currentEvents = get().events?.events || [];
        set({
          events: {
            events: [...currentEvents, ...newEvents],
            page,
            limit,
            total,
          },
        });
      },

      addEvent: (event) => {
        const state = get().events;
        if (!state) return;

        set({
          events: {
            ...state,
            events: [...state.events, event],
          },
        });
      },

      updateEvent: (updatedEvent) => {
        const state = get().events;
        if (!state) return;

        set({
          events: {
            ...state,
            events: state.events.map((event) =>
              event.id === updatedEvent.id ? updatedEvent : event
            ),
          },
        });
      },

      removeEvent: (eventId) => {
        const state = get().events;
        if (!state) return;

        set({
          events: {
            ...state,
            events: state.events.filter((event) => event.id !== eventId),
          },
        });
      },

      selectEvent: (event) => set({ selectedEvent: event }),
      setUserEvents: (events: Event[]) => set({ userEvents: events }),
      clearSelectedEvent: () => set({ selectedEvent: null }),
      clearEvents: () => set({ events: null, selectedEvent: null }),
      setCurrentSearchTerm: (term) => set({ currentSearchTerm: term }), // <-- Setter
      getFirst3ValidEvents: () => {
        const events = get().events?.events || [];
        return events.filter(e => e.datetime && e.location && e.image).slice(0, 6);
      },
      setRefreshEvents: (refresh) => set({ refreshEvents: refresh }), // Optional setter for refresh state
    }),
    {
      name: 'event-store',
    }
  )
);
