'use client'

import { Calendar, Plus, Target, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { LargeText, MediumText } from '@/components/ui/textDisplay/LargeText'
import React, { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button';
import { EventCardGrid } from '@/components/event/EventCard';
import LargeAuthUserName from '@/components/auth/LargeAuthUserName';
import { useAuthStore } from '@/store/authStore';
import { useEventStore } from '@/store/eventStore';
import {useFetchUserProfile} from '@/hooks/fetchUserProfile';
import {useProfileEventSearch} from '@/hooks/userProfileEventSearch';

type UserStats = {
  connections_count?: number;
  events_attended_count?: number;
  upcoming_events_count?: number;
  active_goals_count?: number;
};


function Page() {
  const [mounted, setMounted] = useState(false);
  const [userStats, setUserStats] = useState<UserStats | null>();
  const [recEvents, setRecEvents] = useState<any[]>([]);
  // const [userEvents, setUserEvents] = useState<any[]>([]);
  const setUserEvents = useEventStore((s) => s.setUserEvents);
  const userEvents = useEventStore((s) => s.userEvents);
  const refreshEvents = useEventStore((s) => s.refreshEvents);
  const setRefreshEvents = useEventStore((s) => s.setRefreshEvents);
  const BASE_URL = process.env.NEXT_PUBLIC_FLASK_BASE_URL || "http://localhost:5328";

  useEffect(() => {
    setMounted(true);
  }, []);

  const token = useAuthStore((s) => s.access_token);
  const { profile, loading, error } = useFetchUserProfile(token);
  const events = useProfileEventSearch(profile);

  useEffect(() => {
    if (mounted) {
      setRecEvents(events);
    }
  }, [events, mounted]);

  useEffect(() => {
    async function fetchUserEvents() {
      if (!token) return;
      try {
        const res = await fetch(`${BASE_URL}/api/v1/user_events/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok && data.booked_events) {
          setUserEvents(data.booked_events);
        } else {
          setUserEvents([]);
        }
      } catch (err) {
        setUserEvents([]);
      }
    }
    if (refreshEvents) {
      console.log("Refreshing user events...");
      fetchUserEvents();
      setRefreshEvents(false); // Reset refresh state after fetching
    }
  }, [token]);


  useEffect(() => {
    async function fetchUserStats() {
      if (!token) return;
      try {
        const res = await fetch(`${BASE_URL}/api/v1/users/stats`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok && data) {
          console.log("User Stats:", data);
          
          setUserStats(data);
        } else {
          setUserStats(null);
        }
      } catch (err) {
        setUserStats(null);
      }
    }
    fetchUserStats();
  }, [token]);

  const stats = [
      { label: "Events Attended", value: "0", icon: Calendar },
      { label: "Upcoming Events", value: userStats?.connections_count || 0, icon: Plus },
      { label: "Total Connections", value: userStats?.connections_count || 0, icon: Users },
      { label: "Active Goals", value: "1", icon: Target },
  ];

  if (!mounted) return null;

  return (
    <div id="userdDashboard" className="dashboardHidden flex flex-1 flex-col gap-4 p-15 pt-0">
      <LargeAuthUserName />

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-blue-100">
                  <stat.icon className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <hr className='my-0'></hr>

      <MediumText text={"Upcoming Events"}/>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">

        {userEvents && userEvents.length > 0 ? (
          userEvents.map((event, index) => (
            <EventCardGrid event={event} key={index} />
          ))
        ) : (
          <div className="col-span-3 text-center text-gray-500 py-8">No registered events found.</div>
        )}

        {/* <div className="bg-muted/50 aspect-video rounded-xl" /> */}
      </div>

      <hr className='my-0'></hr>
      
      <div className='flex items-center justify-between'>
        
        <div className='flex align-middle my-auto'>
          <MediumText text={"Recommended Events"}/>
          <div className='border-2 bg-gray-100 border-gray-200 h-6 px-1 rounded-full mt-4 ml-1 text-sm'>{recEvents && recEvents.length}</div>
        </div>

        <Button className='cursor-pointer'>View Events</Button>
      </div>
      
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        {recEvents && recEvents.length > 0 ? (
          recEvents.map((event, index) => (
            index < 3 &&
            <EventCardGrid event={event} key={index} />
          ))
        ) : (
          <div className="col-span-3 text-center text-gray-500 py-8">No recommended events found.</div>
        )}
      </div>

    </div>
  )
}

export default Page