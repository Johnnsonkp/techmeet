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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MediumText } from '@/components/ui/textDisplay/LargeText'
import { NeutralButton } from "@/components/ui/buttons/Buttons"
import Profile from "./page_2"
import React from 'react'
import { SkillTags } from "@/components/profile/Cards"
import { Tag } from "@/components/profile/Tag";
import UserProfileCard from "@/components/user/UserProfileCard"
import { currentUser } from "@/lib/auth/user"
import { useAuthStore } from "@/store/authStore";

interface UserI {
  image: string | null,
  first_name?: string | null,
  last_name?: string | null,
  name?: string | null,
  job_tile?: string | null,
  desired_job?: string | null
}

type Props = {
  user: UserI | any;
};

function page() {
  const user = useAuthStore((s) => s.user);

  const fallbackSrc = "https://www.svgrepo.com/show/382106/avatar-boy.svg"
  const userName = !user? "John Doe" : user?.name
  const userImage = !user? fallbackSrc : user?.image || fallbackSrc
  const currentOccupation = !user? "Occupation" : null
  const desiredOccupation = !user? "Desired Occupation" : null
  const userEmail = user?.email || ""
  

  // return (
    // <div id="userdDashboard" className="dashboardHidden">
    //   <Profile />
    // </div>
    // <div id="userdDashboard" className="dashboardHidden flex flex-1 flex-col gap-4 p-15 pt-0">
    //   <div className="grid auto-rows-min gap-3 md:grid-cols-2">
    //     <UserProfileCard user={user}/>
    //     <div className="flex-row h-8 justify-end">  
    //       <NeutralButton title="Edit" href="/" Icon={Edit} />
    //       <div className="flex items-center space-x-4 mt-1">
    //         <div className="flex text-sm font-medium text-gray-900">
    //           <span>542</span> 
    //           <span>Events Attended</span>
    //         </div>
    //         <span className="flex text-sm font-medium text-gray-900">12 Connections</span>
    //         <span className="flex text-sm font-medium text-gray-900">0 Created Events</span>
    //       </div>
    //     </div>
    //   </div>
      
    //   <hr className="mt-5"></hr>
    //   <div className="flex justify-between mt-2">
    //     <Tabs defaultValue="profile" className="w-[100%]">
    //       <TabsList>
    //         <TabsTrigger className="cursor-pointer px-7" value="profile">Profile</TabsTrigger>
    //         <TabsTrigger className="cursor-pointer px-7" value="activity">Activity</TabsTrigger>
    //         <TabsTrigger className="cursor-pointer px-7" value="achievements">Achievements</TabsTrigger>
    //       </TabsList>
    //       <TabsContent className="p-2" value="profile">
    //         <div className="flex justify-between">
    //           <UserBio />
    //           <SkillTags />
    //         </div>
    //       </TabsContent>
    //       <TabsContent className="p-2" value="activity">
    //         <ActivityCard />
    //       </TabsContent> 
    //       <TabsContent className="p-2" value="achievements">
    //         <AchievementsCard />
    //       </TabsContent>
    //     </Tabs>
    //   </div>
    // </div>
  // )
  // const Profile = () => {
  const userProfile = {
    id: "irene-brooks",
    firstName: "Irene",
    lastName: "Brooks", 
    email: "irene.brooks@email.com",
    jobTitle: "Interface and Brand Designer",
    bio: "Passionate designer with 5+ years of experience creating beautiful, user-centered designs. I specialize in interface design, branding, and creating seamless user experiences across web and mobile platforms.",
    location: "San Antonio, TX",
    company: "Design Studio",
    joinDate: "March 2023",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
    skills: [
      "UI/UX Design", "Figma", "Adobe Creative Suite", "Prototyping", 
      "Brand Design", "Web Design", "Mobile Design", "Design Systems"
    ],
    socialLinks: {
      github: "irenebrooks",
      linkedin: "irene-brooks-designer",
      twitter: "irenebrooksux"
    },
    stats: {
      followers: 2985,
      following: 132,
      likes: 548,
      projects: 54
    },
    projects: [
      {
        id: 1,
        title: "VPN Mobile App",
        category: "Mobile UI, Research",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop",
        likes: 517,
        views: 9300,
        tags: ["Mobile", "VPN", "Dark UI"]
      },
      {
        id: 2,
        title: "Property Dashboard",
        category: "Web interface",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
        likes: 983,
        views: 14000,
        tags: ["Dashboard", "Real Estate", "Analytics"]
      },
      {
        id: 3,
        title: "Healthcare Mobile App",
        category: "Mobile UI, Branding",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop",
        likes: 875,
        views: 13500,
        tags: ["Healthcare", "Mobile", "Telemedicine"]
      },
      {
        id: 4,
        title: "E-commerce Platform",
        category: "Web Design, UX",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop",
        likes: 1240,
        views: 18200,
        tags: ["E-commerce", "Shopping", "Responsive"]
      },
      {
        id: 5,
        title: "Banking App Redesign",
        category: "Mobile UI, Fintech",
        image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop",
        likes: 692,
        views: 11800,
        tags: ["Fintech", "Banking", "Security"]
      },
      {
        id: 6,
        title: "Travel Booking Platform",
        category: "Web interface, Travel",
        image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop",
        likes: 445,
        views: 8900,
        tags: ["Travel", "Booking", "Adventure"]
      }
    ]
  };

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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="mb-8">
          <Card className="h-80 overflow-hidden border-0 shadow-lg">
            <div className="h-35 bg-gradient-to-br from-purple-400 via-blue-500 to-indigo-600 relative">
              <div className="absolute inset-0 bg-black/10"></div>
            </div>
            <CardContent className="relative px-8 pb-8">
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between -mt-5">
                <div className="flex flex-col lg:flex-row lg:items-end lg:space-x-6">
                  <Avatar className="w-36 h-36 border-4 border-white shadow-xl">
                    <AvatarImage src={userImage} />
                    <AvatarFallback className="text-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                      {userProfile.firstName[0]}{userProfile.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="mt-4 lg:mt-0">
                    <div className="flex items-center space-x-3">
                      <h1 className="text-3xl font-bold text-gray-900">
                        {userName}
                      </h1>
                      {/* <div className="bg-blue-100 text-blue-700 border-blue-200 font-medium">
                        PRO
                      </div> */}
                    </div>
                    <p className="text-lg text-gray-600 mt-1 font-medium">{currentOccupation} | {desiredOccupation}</p>
                    {/* <p className="text-sm text-gray-500 mt-1">based in {userProfile.location}</p> */}
                    
                    <div className="flex items-center space-x-4 mt-4">
                      <GithubStandAloneBtn />
                      <LinkedInStandAloneBtn />
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-8 mt-6 lg:mt-0">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{userProfile.stats.followers.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Events Attended</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{userProfile.stats.following}</div>
                    <div className="text-sm text-gray-600">Connections</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{userProfile.stats.likes}</div>
                    <div className="text-sm text-gray-600">Created Events</div>
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
                {/* <sup className="ml-1 text-xs">{userProfile.stats.projects}</sup> */}
              </TabsTrigger>
              <TabsTrigger 
                value="achievements" 
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-b-black data-[state=active]:shadow-none rounded-none pb-4 font-semibold cursor-pointer"
              >
                Achievements
              </TabsTrigger>              
            </TabsList>
          </div>

          {/* Work Tab */}
          <TabsContent value="work" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userProfile.projects.map((project) => (
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
                          <span className="text-sm">{project.views.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Corner s for UI and Br icons */}
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
                          <span>{project.views.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Other Tabs */}
          <TabsContent value="moodboards" className="space-y-6">
            <div className="text-center py-12">
              <p className="text-gray-500">No moodboards yet.</p>
            </div>
          </TabsContent>

          <TabsContent value="likes" className="space-y-6">
            <div className="text-center py-12">
              <p className="text-gray-500">No liked projects to show.</p>
            </div>
          </TabsContent>

          <TabsContent value="about" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>About</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed mb-6">{userProfile.bio}</p>
                    
                    <h3 className="font-semibold text-gray-900 mb-3">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {userProfile.skills.map((skill, index) => (
                        <Tag key={index} name={skill}/>
                        // <div key={index} className="px-3 py-1 text-sm">
                        //   {skill}
                        // </div>
                      ))}
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
                    <div className="flex items-center space-x-2 text-sm">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-700">{userEmail}</span>
                    </div>
                    {/* <div className="flex items-center space-x-2 text-sm">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-700">{userProfile.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Building className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-700">{userProfile.company}</span>
                    </div> */}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Social Links</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {/* <Button variant="outline" size="sm" className="w-full justify-start">
                      <Github className="w-4 h-4 mr-2" />
                      {userProfile.socialLinks.github}
                    </Button> */}
                    <GithubStandAloneBtn />
                    <LinkedInStandAloneBtn />
                    {/* <Button variant="outline" size="sm" className="w-full justify-start">
                      <Linkedin className="w-4 h-4 mr-2" />
                      LinkedIn
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Twitter className="w-4 h-4 mr-2" />
                      Twitter
                    </Button> */}
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

export default page