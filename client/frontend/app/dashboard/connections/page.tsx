'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Building,
  Calendar,
  Code,
  Facebook,
  Filter,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Plus,
  Search,
  Settings,
  StickyNote,
  Target,
  Users
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LargeText, MediumText } from '@/components/ui/textDisplay/LargeText'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";

// import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ConnectionForm } from "@/components/forms/ConnectionsForm";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const Connections = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const connections = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@techcorp.com",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      company: "TechCorp Inc.",
      jobTitle: "Senior React Developer",
      eventMet: "React Summit 2024",
      eventDate: "Dec 15, 2024",
      goal: "Learn advanced React patterns",
      notes: "Shared insights on React performance optimization. Interested in collaborating on open source projects.",
      social: {
        linkedin: "sarah-johnson-dev",
        github: "sarahj-dev",
        facebook: "sarah.johnson.dev"
      },
      tags: ["React", "TypeScript", "GraphQL"]
    },
    {
      id: 2,
      name: "Mike Chen",
      email: "mike.chen@startupxyz.com",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      company: "StartupXYZ",
      jobTitle: "Full Stack Engineer",
      eventMet: "AI Hackathon Weekend",
      eventDate: "Nov 20, 2024",
      goal: "Transition to AI/ML development",
      notes: "Expert in Node.js and Python. Building AI-powered applications. Offered to mentor on ML projects.",
      social: {
        linkedin: "mike-chen-fullstack",
        github: "mikechen-ai",
        facebook: ""
      },
      tags: ["Node.js", "Python", "AI/ML", "Docker"]
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      email: "emily.rodriguez@designstudio.com",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      company: "Design Studio Co.",
      jobTitle: "UX/UI Designer",
      eventMet: "UX Design Workshop",
      eventDate: "Oct 10, 2024",
      goal: "Improve UI/UX design skills",
      notes: "Incredible designer with 8 years experience. Shared Figma templates and design system best practices.",
      social: {
        linkedin: "emily-rodriguez-ux",
        github: "emily-designs",
        facebook: "emily.rodriguez.design"
      },
      tags: ["UI/UX", "Figma", "Design Systems"]
    },
    {
      id: 4,
      name: "David Kim",
      email: "david.kim@cloudtech.io",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      company: "CloudTech Solutions",
      jobTitle: "DevOps Engineer",
      eventMet: "DevOps Conference",
      eventDate: "Sep 25, 2024",
      goal: "Learn cloud architecture",
      notes: "AWS certified architect. Helped with containerization strategies. Great resource for cloud migration.",
      social: {
        linkedin: "david-kim-devops",
        github: "davidkim-cloud",
        facebook: ""
      },
      tags: ["AWS", "Kubernetes", "Docker", "CI/CD"]
    }
  ];

  const filteredConnections = connections.filter(connection =>
    connection.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    connection.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    connection.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const stats = [
    { label: "Total Connections", value: connections.length, icon: Users },
    { label: "Events Attended", value: "8", icon: Calendar },
    { label: "Active Goals", value: "3", icon: Target },
    { label: "This Month", value: "+5", icon: Plus }
  ];

  return (
    <div id="userdDashboard" className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <MediumText text="My Connections"/>
            </div>
            <Button className="cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Plus className="w-4 h-4 mr-2" />
              <ConnectionForm />
            </Button>
          </div>

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

          {/* Search and Filter */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search connections..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        {/* Connections Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {filteredConnections.map((connection) => (
            <Card key={connection.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-start space-x-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={connection.avatar} />
                    <AvatarFallback>
                      {connection.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-1">{connection.name}</CardTitle>
                    <p className="text-gray-600 mb-2">{connection.jobTitle}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Building className="w-3 h-3 mr-1" />
                        {connection.company}
                      </div>
                      <div className="flex items-center">
                        <Mail className="w-3 h-3 mr-1" />
                        {connection.email}
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Event Met */}
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center text-sm font-medium text-blue-900">
                      <Calendar className="w-4 h-4 mr-2" />
                      Met at: {connection.eventMet}
                    </div>
                    <span className="text-xs text-blue-600">{connection.eventDate}</span>
                  </div>
                </div>

                {/* Goal Connection */}
                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="flex items-center text-sm font-medium text-green-900 mb-1">
                    <Target className="w-4 h-4 mr-2" />
                    Connected Goal
                  </div>
                  <p className="text-sm text-green-700">{connection.goal}</p>
                </div>

                {/* Skills/Tags */}
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Skills & Expertise</p>
                  <div className="flex flex-wrap gap-1">
                    {connection.tags.map((tag, index) => (
                      // <Badge key={index} variant="secondary" className="text-xs">
                      //   {tag}
                      // </Badge>

                      <div key={index} className="text-xs">
                        {tag}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <div className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <StickyNote className="w-4 h-4 mr-2" />
                    Notes
                  </div>
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                    {connection.notes}
                  </p>
                </div>

                {/* Social Links */}
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-3">Social Profiles</p>
                  <div className="flex space-x-3">
                    {connection.social.linkedin && (
                      <Button variant="outline" size="sm" className="flex-1">
                        <Linkedin className="w-4 h-4 mr-2" />
                        LinkedIn
                      </Button>
                    )}
                    {connection.social.github && (
                      <Button variant="outline" size="sm" className="flex-1">
                        <Github className="w-4 h-4 mr-2" />
                        GitHub
                      </Button>
                    )}
                    {connection.social.facebook && (
                      <Button variant="outline" size="sm" className="flex-1">
                        <Facebook className="w-4 h-4 mr-2" />
                        Facebook
                      </Button>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                {/* <div className="flex space-x-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    Edit Connection
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Send Message
                  </Button>
                </div> */}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredConnections.length === 0 && searchTerm && (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No connections found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search terms</p>
            <Button 
              variant="outline" 
              onClick={() => setSearchTerm("")}
            >
              Clear Search
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Connections;