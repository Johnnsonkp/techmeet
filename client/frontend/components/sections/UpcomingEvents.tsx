'use client'

import { ArrowRight, Calendar, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Event, useEventStore } from "@/store/eventStore";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { EventCardGrid } from "../event/EventCard";
import { useFetchEvents } from "@/hooks/useFetchEvents"
import { useRouter } from 'next/navigation'

export const UpcomingEvents = () => {
    const { events: storeEvents, getFirst3ValidEvents } = useEventStore((s) => s);
    const { loading, error, fetchEvents } = useFetchEvents();
    const [parsedEvents, setParsedEvents] = useState<Event[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const router = useRouter();
    const limit = 20;

    const first3Events = getFirst3ValidEvents();

    useEffect(() => {
      const shouldFetch =
        !storeEvents ||
        storeEvents?.page !== currentPage;
  
      if (shouldFetch) {
        fetchEvents(currentPage, limit);
      }
    }, [currentPage, storeEvents, fetchEvents]);

    const handleSeeMore = () => {
      router.push(`/events`);
    }

  return (
    <section className="py-10 bg-transparent">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-sm uppercase tracking-wider text-primary mb-2">
              UPCOMING EVENTS
            </p>
            <h2 className="text-3xl font-bold text-secondary-foreground">Upcoming Events</h2>
          </div>
          <Button
            onClick={handleSeeMore}
           variant="outline" 
           className="flex items-center space-x-2 bg-primary text-primary-foreground border-primary cursor-pointer">
            <span>See More</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex gap-4 mb-6">
          <div className="bg-primary text-primary-foreground">All Category</div>
          {/* <div >All Dates</div> */}
        </div>

        <div className="flex-[0.78] overflow-y-auto pb-0 p-4 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3">
          {loading ? "" : first3Events.map((event: Event, index: number) => (
            <div key={index} className="hover:shadow-md cursor-pointer ">
              <img
                src={event.image}
                alt={event.imageDescription}
                className="w-full mb-2 h-40 object-cover transition-transform duration-300 rounded-lg"
              />
              <div className="p-2 pt-0 rounded-xl">
                <h3 className="text-md font-semibold mb-1 group-hover:text-primary transition-colors">
                  {event?.name}
                </h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{event.datetime}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{event?.location}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-primary">{event.price}</span>
                </div>
                </div> 
              </div>
          ))}
          </div>
      </div>
    </section>
  );
};