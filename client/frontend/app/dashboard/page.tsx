'use client'

import { Calendar, Plus, Target, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { LargeText, MediumText } from '@/components/ui/textDisplay/LargeText'
import React, { useEffect, useState } from 'react'

import { EventCardGrid } from '@/components/event/EventCard';
import LargeAuthUserName from '@/components/auth/LargeAuthUserName';
import { useAuthStore } from '@/store/authStore';
import { useEventStore } from '@/store/eventStore';
import {useFetchUserProfile} from '@/hooks/fetchUserProfile';
import {useProfileEventSearch} from '@/hooks/userProfileEventSearch';

function Page() {
  const [mounted, setMounted] = useState(false);
  const [recEvents, setRecEvents] = useState<any[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const token = useAuthStore((s) => s.access_token);
  const { profile, loading, error } = useFetchUserProfile(token);
  const events = useProfileEventSearch(profile);

   const stats = [
      { label: "Total Connections", value: 5, icon: Users },
      { label: "Events Attended", value: "8", icon: Calendar },
      { label: "Active Goals", value: "3", icon: Target },
      { label: "This Month", value: "+5", icon: Plus }
    ];

  useEffect(() => {
    if (mounted) {
      setRecEvents(events);
    }
  }, [events, mounted]);

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

      <MediumText text={"Upcoming Events"}/>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="bg-muted/50 aspect-video rounded-xl" />
        <div className="bg-muted/50 aspect-video rounded-xl" />
        <div className="bg-muted/50 aspect-video rounded-xl" />
      </div>
      <MediumText text={"Recommended Events"}/>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        {recEvents && recEvents.length > 0 ? (
          recEvents.map((event, index) => (
            <EventCardGrid event={event} key={index} />
          ))
        ) : (
          <div className="col-span-3 text-center text-gray-500 py-8">No recommended events found.</div>
        )}
      </div>
      <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
    </div>
  )
}

export default Page