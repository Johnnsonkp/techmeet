'use client'

import { Calendar, Clock, MapPin } from 'lucide-react'
import { Card, CardContent } from '../ui/card'

import { Button } from '../ui/button'
import Link from 'next/link'
import React from 'react'
import { formatDateTimeNow } from '../utils/formatDate'
import { slugify } from '@/lib/event/slugify-url'
import { useEffect } from 'react'
import { useEventStore } from '@/store/eventStore'
import { useRouter } from 'next/navigation'

interface Organiser {
  name: string;
  avatar?: string;
  followers?: string
}

interface Event {
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
  source_api?: string;
  attendee_image_1?: string;
  attendee_image_2?: string;
  attendee_image_3?: string;
  attendees_count?: number | string;
  tags?: string[] | undefined;
  categories?: string[] | undefined;
}

interface EventCardProps {
  event: Event;
}

interface Props {
  index: number;
}

export function EventCardGridLoadingSkeleton({ index }: Props)  {

  
  return (
    <Card key={index} className="border-0 h-[500px] w-[100%] flex-1 cursor-pointer group transition-all duration-300 bg-white overflow-hidden">
      <div className="relative p-3">
        <div className="animate-pulse">
          <div className="w-full h-64 bg-gray-300 rounded mb-0"></div>
        </div>
      </div>
      
      <CardContent className="p-3 pt-0 mt-0">
        <div className="flex items-center justify-between mb-2">
          <div className="animate-pulse flex items-center text-gray-600 text-xs">
            <div className="h-5 bg-gray-300 rounded w-3/4 mb-0"></div>
          </div>
        </div>
        
        <h3 className="animate-pulse text-md font-semibold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
          <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-6 bg-gray-300 rounded w-2/4 mb-6"></div>
        </h3>
        
        <div className="animate-pulse flex items-center text-gray-600 mb-4">
          <div className="h-8 w-full bg-gray-300 rounded"></div>
        </div>

        <div className="animate-pulse flex space-x-4">
          <div className="h-8 w-full bg-gray-300 rounded"></div>
        </div>
      </CardContent>
    </Card>
  )
}

export function EventCardGrid({event} : EventCardProps) {
  const selectedEvent = useEventStore((s) => s.selectedEvent)
  const selectEvent = useEventStore((s) => s.selectEvent);
  const router = useRouter();

  const handleSelect = (event: any) => {
    selectEvent(event)
    let url = slugify(event.name)
    
    router.push(`events/${event?.position}-${url}`);
  }

  const AvatarPlaceholder_1 = () => {
    return (
      <img 
        className="-ml-2 size-6 rounded-full border border-white first:ml-0" 
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80" 
        alt="" 
      />
    )
  }

  const AvatarPlaceholder_2 = () => {
    return (
      <img 
        className="-ml-2 size-6 rounded-full border border-white first:ml-0" 
        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2.25&amp;w=256&amp;h=256&amp;q=80" 
        alt="" 
      />
    )
  }

  const AvatarPlaceholder_3 = () => {
    return (
      <img 
        className="-ml-2 size-6 rounded-full border border-white first:ml-0" 
        src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80" 
        alt="" 
      />
    )
  }
  
  return (
    <Card  
      onClick={() => handleSelect(event)}
      key={event?.id} 
      className="h-[420px] w-[100%] flex-1 cursor-pointer group hover:shadow-md transition-all duration-300 hover:-translate-y-[0.3] bg-white overflow-hidden">
      <div className="relative p-3">
        <img
          src={event.image}
          alt={event.imageDescription}
          className="w-full h-60 object-cover transition-transform duration-300 rounded-lg"
        />
        <div className="absolute bottom-3 right-3 bg-black/50 text-white px-2 py-1 rounded text-sm font-medium">
          {event.price}
        </div>
      </div>
      
      <CardContent className="p-3 pt-0 mt-0">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center text-gray-600 text-xs">
            <Calendar className="w-3 h-3 mr-1" />
            {event?.date || event?.datetime || formatDateTimeNow()}
            {/* <Clock className="w-3 h-3 ml-3 mr-1" /> */}
          </div>
        </div>
        
        <div className="flex items-center text-gray-600 mb-2">
            <MapPin className="w-3 h-3 mr-1" />
            <span className="text-xs">{
              event?.location?.length > 30? 
              event?.location?.slice(0, 33) + "..." : event?.location || 'Melbourne, AU'}
            </span> 
        </div>

        
        <h3 className="text-md font-semibold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors min-h-13">
          {event?.name?.length > 50 ? event?.name?.slice(0, 50) + "..." : event?.name}
        </h3> 
        
        <div className='relative'>
          {typeof event?.attendee_image_1 === "string" && event.attendee_image_1.trim() !== "" ? (
            <div className="absolute bottom-[-35] mt-4 flex items-center text-xs font-medium text-primary w-[100%] justify-between">
              
              <div className='flex items-center'>
              <div className='mr-1 flex'>
                {typeof event?.attendee_image_1 === "string" && event.attendee_image_1.trim() !== "" ? (
                  <img className='-ml-2 size-6 object-cover rounded-full border border-white first:ml-0' src={event?.attendee_image_1} />
                ) : (
                  <AvatarPlaceholder_1 />
                )}
                {typeof event?.attendee_image_2 === "string" && event.attendee_image_2.trim() !== "" ? (
                  <img className='-ml-2 size-6 object-cover rounded-full border border-white first:ml-0' src={event?.attendee_image_2} />
                ) : (
                  <AvatarPlaceholder_2 />
                )}
                {typeof event?.attendee_image_3 === "string" && event.attendee_image_3.trim() !== "" ? (
                  <img className='-ml-2 size-6 rounded-full object-cover border border-white first:ml-0' src={event?.attendee_image_3} />
                ) : (
                  <AvatarPlaceholder_3 />
                )}
              </div>

                <span className="text-gray-500 align-middle align-center">
                  {event?.attendees_count || "0 Attendees"}
                </span>
              </div>

                <div className="flex gap-1 ml-3">
                  {event.tags && event.tags.map((tag, index) => (
                    index <= 3 && 
                      <span key={index} className="bg-indigo-100 text-indigo-800 px-1 py-1 rounded-full text-[11px]">#{tag}</span>    
                    ))}
                </div>

            </div>
            ) : 

              <div className="flex gap-1 mt-4 absolute bottom-[-35]">
                {event.tags && event.tags.map((tag, index) => (
                    index < 4 && 
                      <span key={index} className="bg-indigo-100 text-indigo-800 px-1 py-1 rounded-full text-[11px]">#{tag}</span>    
                    ))}
              </div>
          }
        </div>   
      </CardContent>
    </Card>
  )
}

export function EventCardList({event} : EventCardProps) {
  const selectedEvent = useEventStore((s) => s.selectedEvent)
  const selectEvent = useEventStore((s) => s.selectEvent);
  const router = useRouter();

  const handleSelect = (event: any) => {
    selectEvent(event)
    let url = slugify(event.name)
    
    router.push(`events/${event?.position}-${url}`);
  }

  return (
    <Card key={event?.id || event?.position} className="group hover:shadow-lg transition-all duration-300 bg-white">
    <CardContent className="p-4">
      <div className="flex items-center space-x-6">
        <div className="relative flex-shrink-0">
          <img
            src={event.image}
            alt={event?.imageDescription || event?.image_description}
            className="w-50 h-40 object-cover rounded-lg"
          />
          <div className="absolute -top-2 -right-2">
            <div className="bg-purple-100 text-purple-700 border-purple-200 text-xs">
              {event.category}
            </div>
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-2">
            {/* <div className="bg-green-500 text-white text-xs">Active</div> */}
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="w-4 h-4 mr-1" />
              {/* {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} */}
              {event?.date || event?.datetime}
              {/* <Clock className="w-4 h-4 ml-3 mr-1" /> */}
              {/* {event.time.split(' - ')[0]} */}
            </div>
          </div>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
            {event.name}
          </h3>
          
          <div className="flex items-center text-gray-600 mb-2">
            <MapPin className="w-4 h-4 mr-2" />
            <span className="text-sm">{event?.location || 'Melbourne, AU'}</span> 
          </div>
          
          <div className="flex items-center space-x-4">
          </div>
        </div>
        
        <div className="text-right flex-shrink-0">
          <div className="text-sm font-bold mb-2">{event.price}</div>
          {/* <Link href={`/events/${event.id || event?.position}`}> */}
            <Button 
              onClick={() => handleSelect(event)}
              size="sm" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              View Details
            </Button>
          {/* </Link> */}
        </div>
      </div>
    </CardContent>
  </Card>
  )
}