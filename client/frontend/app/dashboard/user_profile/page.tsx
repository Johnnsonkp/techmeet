'use client';

import { AchievementsCard, ActivityCard, UserBio } from "@/components/profile/Cards"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Building,
  Calendar,
  Code,
  Edit,
  Eye,
  Github,
  Heart,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Settings,
  Star,
  Twitter,
  Users
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GithubStandAloneBtn, LinkedInStandAloneBtn } from "@/components/ui/buttons/Buttons";
import React, { useEffect } from 'react'
import { SkillCapsule, Tag } from "@/components/profile/Tag";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MediumText } from '@/components/ui/textDisplay/LargeText'
import { NeutralButton } from "@/components/ui/buttons/Buttons"
import { SkillTags } from "@/components/profile/Cards"
import UserProfileCard from "@/components/user/UserProfileCard"
import { useAuthStore } from "@/store/authStore";
import { useFetchUserProfile } from "@/hooks/fetchUserProfile";

interface UserI {
  image: string | null,
  first_name?: string,
  last_name?: string,
  name?: string | null,
  job_tile?: string | null,
  bio?: string | null,
  desired_job?: string | null,
}

type Props = {
  user: UserI | any;
};

function Page() {
  const user = useAuthStore((s) => s.user);
  const token = useAuthStore((s) => s.access_token);
  const { profile, loading, error } = useFetchUserProfile(token);
  const fallbackSrc = "https://www.svgrepo.com/show/382106/avatar-boy.svg";
  const userName = user?.name || null;
  const userImage = user?.image || fallbackSrc;
  const desiredOccupation = profile?.job_title || null;
  const occupationDescription = profile?.description || null;
  const userEmail = user?.email || null;
  const userSkills: string[] = profile?.skills || [];
  const userTags: string[] = profile?.tags || [];
  const userBio = user?.bio || null;

  // Stats (example: you may want to fetch these from profile or user if available)
  const stats = profile?.stats || null;
  const projects = profile?.projects || [];

  return (
    <div className="min-h-screen ">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-end items-center h-0">
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-8">
        {/* Profile Header */}
        <div className="mb-8">
          <Card className="h-80 overflow-hidden border-0">
            <div className="h-35 bg-gradient-to-br from-purple-400 via-blue-500 to-indigo-600 relative">
              <div className="absolute inset-0 bg-black/10"></div>
            </div>
            <CardContent className="relative px-8 pb-8">
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between -mt-5">
                <div className="flex flex-col lg:flex-row lg:items-end lg:space-x-6">
                  <Avatar className="w-36 h-36 border-4 border-white shadow-xl">
                    <AvatarImage src={userImage} />
                    <AvatarFallback className="text-4xl bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                      {userName ? userName[0] : "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="mt-4 lg:mt-0">
                    {userName && (
                      <div className="flex items-center space-x-3">
                        <h1 className="text-3xl font-bold text-gray-900">
                          {userName}
                        </h1>
                        <button className="bg-blue-100 text-blue-700 border-blue-200 font-medium">
                          Lvl 1
                        </button>
                      </div>
                    )}
                    {desiredOccupation && (
                      <p className="text-lg text-gray-600 mt-1 font-medium">{desiredOccupation}</p>
                    )}
                    <div className="flex items-center space-x-4 mt-4">
                      <GithubStandAloneBtn />
                      <LinkedInStandAloneBtn />
                    </div>
                  </div>
                </div>
                  <div className="flex items-center space-x-8 mt-6 lg:mt-0">
                    <div className="text-center">
                      <div className="text-sm text-gray-600 mb-1">Events Attended</div>
                      <div className="text-2xl font-bold text-gray-900">{stats?.followers?.toLocaleString() || 0}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-600 mb-1">Connections</div>
                      <div className="text-2xl font-bold text-gray-900">{stats?.following || 0}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-600 mb-1">Created Events</div>
                      <div className="text-2xl font-bold text-gray-900">{stats?.likes || 0}</div>
                    </div>
                  </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Tabs */}
        <Tabs defaultValue="about" className="space-y-8">
          <div className="border-b border-gray-200">
            <TabsList className="grid w-full max-w-md grid-cols-4 bg-transparent h-auto p-0">
              <TabsTrigger 
                value="about" 
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-b-black data-[state=active]:shadow-none rounded-none pb-4 font-semibold cursor-pointer"
              >
                About
              </TabsTrigger>
              <TabsTrigger 
                value="activity" 
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-b-black data-[state=active]:shadow-none rounded-none pb-4 font-semibold cursor-pointer"
              >
                Activity
              </TabsTrigger>
              <TabsTrigger 
                value="achievements" 
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-b-black data-[state=active]:shadow-none rounded-none pb-4 font-semibold cursor-pointer"
              >
                Achievements
              </TabsTrigger>              
            </TabsList>
          </div>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.length > 0 && projects.map((project: any) => (
                <Card key={project.id} className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer">
                  <div className="relative overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="flex items-center space-x-4 text-white">
                        <div className="flex items-center space-x-1">
                          <Heart className="w-4 h-4" />
                          <span className="text-sm">{project.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span className="text-sm">{project.views?.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-3 right-3 flex space-x-2">
                      <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">UI</span>
                      </div>
                      <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">Br</span>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1">{project.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{project.category}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Heart className="w-4 h-4" />
                          <span>{project.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>{project.views?.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* About Tab */}
          <TabsContent value="about" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>About</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed mb-6">{userBio || <span className="text-gray-400 italic">No bio provided.</span>}</p>
                    <div className="mt-4">
                      <h3 className="font-semibold text-gray-900 mb-3">Desired Occupation</h3>
                      <div className="flex flex-wrap gap-2">
                        {occupationDescription ? <p>{occupationDescription}</p> : <span className="text-gray-400 italic">No description provided.</span>}
                      </div>
                    </div>

                    <hr className="mt-5"></hr>
                    
                    <div className="mt-4">
                      <h3 className="font-semibold text-gray-900 mb-3">Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {userSkills.length > 0 ? userSkills.map((skill, index) => (
                          // <Tag key={index} name={skill}/>
                          <SkillCapsule key={index} name={skill} />
                        )) : <span className="text-gray-400 italic">No skills provided.</span>}
                      </div>
                    </div>
                    
                    <hr className="mt-5"></hr>

                    <div className="mt-4">
                      <h3 className="font-semibold text-gray-900 mb-3">Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {userTags.length > 0 ? userTags.map((tag, index) => (
                          <Tag key={index} name={tag}/>
                        )) : <span className="text-gray-400 italic">No tags provided.</span>}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Contact</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {userEmail && (
                      <div className="flex items-center space-x-2 text-sm">
                        <Mail className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-700">{userEmail}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Social Links</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <GithubStandAloneBtn />
                    <LinkedInStandAloneBtn />
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default Page