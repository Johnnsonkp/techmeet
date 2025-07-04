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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Profile = () => {
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                TechMeet
              </span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  Dashboard
                </Button>
              </Link>
              <Button variant="outline" size="sm">
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="mb-8">
          <Card className="overflow-hidden border-0 shadow-lg">
            <div className="h-40 bg-gradient-to-br from-purple-400 via-blue-500 to-indigo-600 relative">
              <div className="absolute inset-0 bg-black/10"></div>
            </div>
            <CardContent className="relative px-8 pb-8">
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between -mt-20">
                <div className="flex flex-col lg:flex-row lg:items-end lg:space-x-6">
                  <Avatar className="w-32 h-32 border-4 border-white shadow-xl">
                    <AvatarImage src={userProfile.avatar} />
                    <AvatarFallback className="text-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                      {userProfile.firstName[0]}{userProfile.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="mt-4 lg:mt-0">
                    <div className="flex items-center space-x-3">
                      <h1 className="text-3xl font-bold text-gray-900">
                        {userProfile.firstName} {userProfile.lastName}
                      </h1>
                      <div className="bg-blue-100 text-blue-700 border-blue-200 font-medium">
                        PRO
                      </div>
                    </div>
                    <p className="text-lg text-gray-600 mt-1 font-medium">{userProfile.jobTitle}</p>
                    <p className="text-sm text-gray-500 mt-1">based in {userProfile.location}</p>
                    
                    <div className="flex items-center space-x-4 mt-4">
                      <Button className="bg-black text-white hover:bg-gray-800 px-6">
                        Follow
                      </Button>
                      <Button variant="outline" className="px-6">
                        Get in touch
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-8 mt-6 lg:mt-0">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{userProfile.stats.followers.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Followers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{userProfile.stats.following}</div>
                    <div className="text-sm text-gray-600">Following</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{userProfile.stats.likes}</div>
                    <div className="text-sm text-gray-600">Likes</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
J
        {/* Navigation Tabs */}
        <Tabs defaultValue="work" className="space-y-8">
          <div className="border-b border-gray-200">
            <TabsList className="grid w-full max-w-md grid-cols-4 bg-transparent h-auto p-0">
              <TabsTrigger 
                value="work" 
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:shadow-none rounded-none pb-4 font-semibold"
              >
                Work
                <sup className="ml-1 text-xs">{userProfile.stats.projects}</sup>
              </TabsTrigger>
              <TabsTrigger 
                value="moodboards" 
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:shadow-none rounded-none pb-4 font-semibold"
              >
                Moodboards
              </TabsTrigger>
              <TabsTrigger 
                value="likes" 
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:shadow-none rounded-none pb-4 font-semibold"
              >
                Likes
              </TabsTrigger>
              <TabsTrigger 
                value="about" 
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:shadow-none rounded-none pb-4 font-semibold"
              >
                About
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
                        <div key={index} className="px-3 py-1 text-sm">
                          {skill}
                        </div>
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
                      <span className="text-gray-700">{userProfile.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-700">{userProfile.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Building className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-700">{userProfile.company}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Social Links</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Github className="w-4 h-4 mr-2" />
                      {userProfile.socialLinks.github}
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Linkedin className="w-4 h-4 mr-2" />
                      LinkedIn
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Twitter className="w-4 h-4 mr-2" />
                      Twitter
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
