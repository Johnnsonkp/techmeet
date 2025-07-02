'use client';

import { ArrowLeft, Calendar, CheckCircle, Clock, Code, ExternalLink, Heart, MapPin, Music, Share2, Star, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

// import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { use } from 'react';
import { useEventStore } from "@/store/eventStore";

const page = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const selectedEvent = useEventStore((s) => s.selectedEvent)

  // Mock event data - in a real app, this would be fetched based on the ID
  const events = [
    {
      id: 1,
      name: "Echo Beats Festival",
      date: "2024-05-20",
      time: "6:00 PM",
      location: "Sunset Park, Los Angeles, CA",
      price: "$60",
      organiser: {
        name: "Echo Events",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        verified: true
      },
      followers: 21000,
      eventLink: "https://echobeats2024.com",
      image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=400&fit=crop",
      imageDescription: "Electronic music festival with vibrant lights and crowd",
      category: "Music",
      rating: 4.8,
      maxAttendees: 25000,
      description: "The Echo Beats Festival brings together a stellar lineup of artists across EDM, pop, and hip-hop genres. Prepare to experience a night of electrifying music, vibrant light shows, and unforgettable performances under the stars. Explore food trucks, art installations, and VIP lounges for an elevated experience.",
      about: "The Echo Beats Festival brings together a stellar lineup of artists across EDM, pop, and hip-hop genres. Prepare to experience a night of electrifying music, vibrant light shows, and unforgettable performances under the stars. Explore food trucks, art installations, and VIP lounges for an elevated experience.",
      speakers: [
        {
          name: "DJ Stellar",
          role: "Headliner",
          avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b353?w=100&h=100&fit=crop&crop=face"
        },
        {
          name: "Bass Drop",
          role: "Featured Artist",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
        }
      ],
      packages: [
        {
          name: "General Admission Package",
          price: "$50",
          features: ["Standing", "Access to Festival Area"]
        },
        {
          name: "Silver Package",
          price: "$70",
          features: ["Seating", "Mid-tier View"]
        },
        {
          name: "Gold Package",
          price: "$85",
          features: ["Seating", "Prime View"]
        },
        {
          name: "Platinum Package",
          price: "$100",
          features: ["Seating", "Near Stage"]
        },
        {
          name: "Diamond Package",
          price: "$120",
          features: ["Seating", "Front-Row View"]
        },
        {
          name: "VIP Lounge Package",
          price: "$150",
          features: ["Seating", "Exclusive Lounge"]
        }
      ],
      merchandise: [
        {
          name: "Echo Beats Cap",
          price: "USD $20",
          image: "https://images.unsplash.com/photo-1588850259026-5f2d0c1b32e0?w=200&h=200&fit=crop"
        },
        {
          name: "Festival T-Shirt",
          price: "USD $25",
          image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=200&h=200&fit=crop"
        },
        {
          name: "Light-Up Wristband",
          price: "USD $15",
          image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop"
        }
      ],
      tags: ["Music", "Electronic", "Festival", "Live Performance"],
      notes: [
        "Enjoy and unfold VIP area reserved seating with an unobstructed stage view.",
        "Standing categories include access to open floor areas near the stage."
      ],
      ticketBenefits: {
        vipLounge: ["Premium seating", "Complimentary drinks", "Fast-track entry"],
        backstageAccess: ["Standing access to the backstage area", "Artist meet-and-greet", "Exclusive merchandise"]
      }
    }
  ];

  const event = selectedEvent || events.find(e => e.id === parseInt(id || "1")) || events[0];

  return (
    <div className="min-h-screen bg-gray-50">

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
                  src={event.image}
                  alt={event.imageDescription}
                  className="w-full h-80 object-cover"
                />
                <div className="absolute top-4 left-4 flex space-x-2">
                  <div className="bg-purple-100 text-purple-700 border-purple-200 flex items-center">
                    <Music className="w-3 h-3 mr-1" />
                    {event?.category}
                  </div>
                  <div className="bg-green-500 text-white">
                    Active
                  </div>
                </div>
                <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-lg">
                  <div className="text-sm">Starts from</div>
                  <div className="text-lg font-bold">{event.price}</div>
                </div>
              </div>
              
              <CardContent className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                      {event.name}
                    </h1>
                    
                    <div className="flex items-center text-gray-600 mb-2">
                      <Calendar className="w-5 h-5 mr-3 text-purple-600" />
                      {/* <span>{new Date(event?.date).toLocaleDateString('en-US', { 
                        weekday: 'short', 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })} • {event.time}</span> */}

                      <span>{event?.datetime}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-5 h-5 mr-3 text-purple-600" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-2xl font-bold text-purple-600 mb-1">
                      {/* {event?.followers.toLocaleString()} */}
                    </div>
                    <div className="text-sm text-gray-600">going</div>
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
            <Card className="bg-white">
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
            </Card>

            {/* Official Merchandise */}
            {/* <Card className="bg-white">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">Official Merchandise</h3>
                  <Button variant="ghost" size="sm">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-3 gap-6">
                  {event.merchandise.map((item, index) => (
                    <div key={index} className="text-center">
                      <div className="w-full h-32 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg mb-3 flex items-center justify-center">
                        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                      </div>
                      <h4 className="font-medium text-gray-900 mb-1">{item.name}</h4>
                      <p className="text-purple-600 font-semibold">{item.price}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card> */}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Seat Plan */}
            <Card className="bg-white">
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

            {/* Notes */}
            <Card className="bg-white">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Notes</h3>
                {/* <div className="space-y-3 text-sm text-gray-600">
                  {event.notes.map((note, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>{note}</span>
                    </div>
                  ))}
                </div> */}
              </CardContent>
            </Card>

            {/* Ticket Category Benefits */}
            <Card className="bg-white">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Ticket Category Benefits</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">VIP Lounge</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      {/* {event.ticketBenefits.vipLounge.map((benefit, index) => (
                        <div key={index} className="flex items-center">
                          <CheckCircle className="w-3 h-3 text-green-500 mr-2" />
                          <span>{benefit}</span>
                        </div>
                      ))} */}
                    </div>
                    <div className="text-right mt-2">
                      <span className="text-lg font-bold text-purple-600">$100</span>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Backstage Access</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      {/* {event.ticketBenefits.backstageAccess.map((benefit, index) => (
                        <div key={index} className="flex items-center">
                          <CheckCircle className="w-3 h-3 text-green-500 mr-2" />
                          <span>{benefit}</span>
                        </div>
                      ))} */}
                    </div>
                    <div className="text-right mt-2">
                      <span className="text-lg font-bold text-purple-600">$200</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Packages */}
            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">Packages</h3>
                  <Button variant="ghost" size="sm">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {/* {event.packages.map((pkg, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{pkg.name}</h4>
                        <span className="text-lg font-bold text-purple-600">{pkg.price}</span>
                      </div>
                      <div className="space-y-1">
                        {pkg.features.map((feature, fIndex) => (
                          <div key={fIndex} className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-3 h-3 text-green-500 mr-2" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))} */}
                </div>

                <Button className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Buy a ticket
                </Button>
                
                <div className="text-center mt-4">
                  <Button variant="outline" className="text-purple-600 border-purple-200 hover:bg-purple-50">
                    See Details
                  </Button>
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