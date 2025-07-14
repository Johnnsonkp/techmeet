'use client';

import { ArrowLeft, Calendar, CheckCircle, Clock, Code, ExternalLink, Heart, MapPin, Music, Share2, Star, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

// import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from 'react';
import {toast} from "sonner";
import { use } from 'react';
import { useAuthStore } from "@/store/authStore";
import { useEventStore } from "@/store/eventStore";
import { useRouter } from "next/navigation";

const page = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const selectedEvent = useEventStore((s) => s.selectedEvent)
  const user = useAuthStore((s) => s.user);
  const token = useAuthStore((s) => s.access_token);
  const BASE_URL = process.env.NEXT_PUBLIC_FLASK_BASE_URL || "http://localhost:5328";
  const router = useRouter();

  // Add loading and error state
  const [loading, setLoading] = React.useState(!selectedEvent);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!selectedEvent) {
      // Simulate fetch or show error if not found
      setLoading(true);
      const timeout = setTimeout(() => {
        setLoading(false);
        if (!useEventStore.getState().selectedEvent) {
          setError('Event not found.');
        }
      }, 1000);
      return () => clearTimeout(timeout);
    } else {
      setLoading(false);
    }
  }, [selectedEvent]);


  async function bookEvent(eventId: number | undefined, userId: any) {
    
    if(!eventId || !userId) {
      toast.error("You must be logged in to book an event.");

      setTimeout(() => {
        return router.push('/auth');
      }, 2000)
    }

    try {
      const response = await fetch(`${BASE_URL}/api/v1/user_events/${eventId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ user_id: userId }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Event booked successfully!");
        console.log('Event booked:', data);

        setTimeout(() => {
          return router.push('/dashboard');
        }, 1500)

      } else {
        // Error logic here
        console.error('Booking failed:', data.message);
      }
      return data;
    } catch (error) {
      console.error('Network error:', error);
      throw error;
    }
  }


  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-lg">Loading event...</div>;
  }
  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-600 text-lg">{error}</div>;
  }

  const event = selectedEvent

  return (
    <div className="min-h-screen bg-white pb-30">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Breadcrumb */}
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span><Link href="/events">Events</Link></span>
              <span>/</span>
              <span className="text-purple-600">Event Details</span>
            </div>

            {/* Event Header */}
            <Card className="bg-white overflow-hidden">
              <div className="relative">
                <img
                  src={event?.image}
                  alt={event?.imageDescription}
                  className="w-full h-80 object-cover"
                />
                <div className="absolute top-4 left-4 flex space-x-2">
                  {event?.categories && event.categories.map((category: string, idx: number) => (
                     <span key={idx} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-xs text-[14px]">
                      {category}
                    </span>
                  ))}

                </div>
                
                <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-lg">
                  <div className="text-lg font-bold">{event?.price}</div>
                </div>
              </div>
              
              <CardContent className="p-8 pb-1">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4 w-[85%]">
                      {event?.name}
                    </h1>
                    
                    <div className="flex items-center text-gray-600 mb-2">
                      <Calendar className="w-5 h-5 mr-3 text-purple-600" />
                      <span>{event?.datetime}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-5 h-5 mr-3 text-purple-600" />
                      <span>{event?.location || "Melbourne, AU"}</span>
                    </div>

                    {event?.tags && event?.tags.length > 0 && (
                      <div className="flex items-center text-gray-600 mt-10">
                        Tags: {event?.tags.map((tag: string, index: number) => (
                          <span key={index} className="ml-1 bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-[15px]">#{tag}</span>
                        ))}
                      </div> )
                    }
                  </div>
                  
                  <div className="text-right">
                    <div className="text-2xl font-bold text-purple-600 mb-1">
                      {/* {event?.followers.toLocaleString()} */}
                    </div>

                    <div className="text-sm text-gray-600">
                      {event?.source_api}
                    </div>

                  </div>
                </div>
              </CardContent>
            </Card>

            {/* About Event */}
            <Card className="bg-white">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">About Event</h3>
                <p className="text-gray-700 leading-relaxed">
                  {event?.image_description}
                </p>
              </CardContent>
            </Card>

            {/* Terms & Conditions */}
            {/* <Card className="bg-white">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">Terms & Conditions</h3>
                  <Button variant="ghost" size="sm">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
                <div className="space-y-4 text-gray-700">
                  <div>
                    <h4 className="font-semibold mb-2">1. Ticket Purchase and Entry</h4>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li>All attendees must possess a valid ticket for entry.</li>
                      <li>Tickets are non-refundable and non-transferable unless specified by the event organizer.</li>
                      <li>Attendees must present a valid government-issued ID along with their ticket at the gate.</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">2. Security and Safety</h4>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li>Attendees are subject to security checks, including bag inspections, upon entry.</li>
                      <li>Prohibited items include weapons, drugs, alcohol, fireworks, and other hazardous materials.</li>
                      <li>The event organizer reserves the right to deny entry to individuals deemed a security risk.</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card> */}

          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Seat Plan */}
            <Card className="bg-white mt-11">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Seat Plan</h3>
                <div className="bg-gradient-to-b from-blue-100 to-purple-100 rounded-lg p-4 mb-4 h-32 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-sm text-gray-600 mb-1">Stage View</div>
                    <div className="grid grid-cols-3 gap-1">
                      <div className="w-3 h-3 bg-yellow-400 rounded"></div>
                      <div className="w-3 h-3 bg-purple-600 rounded"></div>
                      <div className="w-3 h-3 bg-pink-400 rounded"></div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-yellow-400 rounded mr-2"></div>
                      <span>Diamond $120</span>
                    </div>
                    <span className="text-gray-500">Standing</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-purple-600 rounded mr-2"></div>
                      <span>Platinum $100</span>
                    </div>
                    <span className="text-gray-500">Reserved</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-pink-400 rounded mr-2"></div>
                      <span>Gold $85</span>
                    </div>
                    <span className="text-gray-500">Reserved</span>

                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Packages */}
            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">Reserve Event</h3>
                  {/* <h3 className="font-semibold text-gray-900">={event?.event_link} </h3> */}

                </div>
                
                <Button onClick={() => bookEvent(selectedEvent?.id, user?.id)} className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 cursor-pointer">
                 Add Event to Calendar
                </Button>

                <Button className="w-full cursor-pointer mt-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Link target="_blank" rel="noopener noreferrer" href={event?.event_link || ''} className="flex">
                    Book Event on {event?.source_api} <ExternalLink className="w-4 h-4" />
                  </Link>
                </Button>

                
                <div className="text-center mt-4">
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;