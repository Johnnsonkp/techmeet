import { Calendar, Clock, Search, User } from 'lucide-react';
// import { Card, CardContent } from "@/frontend/components/ui/card";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// import { Badge } from "@/frontend/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const page = () => {
  const featuredPosts = [
    {
      id: 1,
      title: "The Future of Tech Meetups: Building Community in a Digital Age",
      excerpt: "Explore how technology communities are evolving and what this means for developers worldwide.",
      author: "Sarah Chen",
      date: "APR 15, 2025",
      readTime: "8 MIN READ",
      category: "Community",
      tags: ["community", "networking", "future"],
      gradient: "from-blue-500 to-purple-600"
    },
    {
      id: 2,
      title: "Top 10 React Patterns Every Developer Should Know",
      excerpt: "Master these essential React patterns to write cleaner, more maintainable code.",
      author: "Mike Johnson",
      date: "APR 12, 2025", 
      readTime: "12 MIN READ",
      category: "Engineering",
      tags: ["react", "javascript", "patterns"],
      gradient: "from-green-500 to-blue-500"
    },
    {
      id: 3,
      title: "Networking Tips for Introverted Developers",
      excerpt: "Practical strategies to build meaningful connections at tech events, even if you're shy.",
      author: "Alex Rivera",
      date: "APR 10, 2025",
      readTime: "6 MIN READ", 
      category: "Career",
      tags: ["networking", "career", "tips"],
      gradient: "from-purple-500 to-pink-500"
    }
  ];

  const recentPosts = [
    {
      id: 4,
      title: "Building Inclusive Tech Communities",
      author: "Jessica Park",
      date: "APR 8, 2025",
      readTime: "7 MIN READ",
      category: "Culture",
      tags: ["inclusion", "diversity", "community"]
    },
    {
      id: 5,
      title: "The Rise of AI in Developer Tools",
      author: "David Kim",
      date: "APR 5, 2025", 
      readTime: "10 MIN READ",
      category: "Technology",
      tags: ["ai", "tools", "productivity"]
    },
    {
      id: 6,
      title: "Event Planning 101: Organizing Your First Meetup",
      author: "Emma Wilson",
      date: "APR 3, 2025",
      readTime: "9 MIN READ",
      category: "Events",
      tags: ["planning", "meetup", "organization"]
    }
  ];

  const categories = [
    "All", "Engineering", "Community", "Career", "Culture", "Technology", "Events"
  ];

  const popularTags = [
    "#react", "#javascript", "#community", "#networking", "#career",
    "#ai", "#meetup", "#developer-experience", "#inclusion", "#innovation"
  ];

  return (
    <div className="min-h-screen ">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Posts Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Featured Posts</h2>
          <p className="text-gray-600 mb-8">Discover the latest insights from the tech community</p>
          
          <hr className='mb-5'></hr>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Main Featured Post */}
            <Card className="lg:col-span-1 overflow-hidden">
              <div className={`h-48 bg-gradient-to-r ${featuredPosts[0].gradient} relative`}>
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute bottom-4 left-4 text-white">
                  {/* <Badge variant="secondary" className="mb-2">{featuredPosts[0].category}</Badge> */}
                  <div className="mb-2">{featuredPosts[0].category}</div>
                  <h3 className="text-xl font-bold mb-2">{featuredPosts[0].title}</h3>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-gray-600 mb-4">{featuredPosts[0].excerpt}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>{featuredPosts[0].author}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{featuredPosts[0].date}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{featuredPosts[0].readTime}</span>
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {featuredPosts[0].tags.map((tag) => (
                    // <Badge key={tag} variant="outline" className="text-xs">
                    //   #{tag}
                    // </Badge>
                    <div key={tag} className="text-xs">
                      #{tag}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Secondary Featured Posts */}
            <div className="space-y-6">
              {featuredPosts.slice(1).map((post) => (
                <Card key={post.id} className="overflow-hidden">
                  <div className="flex">
                    <div className={`w-32 bg-gradient-to-r ${post.gradient} flex-shrink-0`} />
                    <CardContent className="p-4 flex-1">
                      {/* <Badge variant="outline" className="mb-2 text-xs">{post.category}</Badge> */}
                      <div className="mb-2 text-xs">{post.category}</div>
                      <h3 className="font-semibold text-lg mb-2 line-clamp-2">{post.title}</h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center text-xs text-gray-500 space-x-3">
                        <span>{post.author}</span>
                        <span>{post.date}</span>
                        <span>{post.readTime}</span>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="space-y-8">
            {/* Popular Tags */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Popular Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag) => (
                    <div 
                      key={tag} 
                      // variant="secondary" 
                      className="cursor-pointer hover:bg-blue-100 hover:text-blue-700 transition-colors"
                    >
                      {tag}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Newsletter */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Stay Updated</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">
                  Get the latest tech insights and community updates delivered to your inbox.
                </p>
                <div className="space-y-2">
                  <input placeholder="Enter your email" />
                  <Button className="w-full">Subscribe</Button>
                </div>
              </CardContent>
            </Card>

            {/* Featured Categories */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Browse Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {categories.slice(1).map((category) => (
                    <button 
                      key={category}
                      className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Recent Posts */}
          <div className="lg:col-span-2">
            <h2 className="text-1xl font-bold text-gray-900 mb-1">Latest Posts</h2>
            <hr className='my-3'></hr>
            <div className="space-y-6">
              {recentPosts.map((post) => (
                <Card key={post.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      {/* <Badge variant="outline">{post.category}</Badge> */}
                      <div>{post.category}</div>
                      <div className="flex items-center text-sm text-gray-500 space-x-3">
                        <span>{post.date}</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 hover:text-blue-600 cursor-pointer">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Explore the latest trends and insights in the tech community...
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{post.author}</span>
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {post.tags.slice(0, 2).map((tag) => (
                          // <Badge key={tag} variant="outline" className="text-xs">
                          //   #{tag}
                          // </Badge>
                          <div key={tag} className="text-xs">
                            #{tag}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Load More */}
            <div className="text-center mt-8">
              <Button variant="outline" size="lg">
                Load More Articles
              </Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default page;