'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Building,
  Calendar,
  Code,
  Facebook,
  Filter,
  Github,
  LayoutGrid,
  Linkedin,
  List,
  Mail,
  MapPin,
  Plus,
  Search,
  Settings,
  StickyNote,
  Target,
  Trash,
  Users
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { LargeText, MediumText } from '@/components/ui/textDisplay/LargeText'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { ConnectionForm } from "@/components/forms/ConnectionsForm";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useAuthStore } from "@/store/authStore";
import { useEventStore } from '@/store/eventStore';
import { useUserConnections } from "@/hooks/useUserConnections";

const Connections = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const token = useAuthStore((s) => s.access_token);
  const [viewMode, setViewMode] = useState<'row' | 'column'>('row');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const { fetchedConnection, loading, connectionError } = useUserConnections();
  const userEvents = useEventStore((s) => s.userEvents) || [];
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    jobTitle: "",
    eventMet: "",
    eventDate: "",
    goal: "",
    notes: "",
    tags: "",
    linkedin: "",
    github: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const BASE_URL = process.env.NEXT_PUBLIC_FLASK_BASE_URL || 'http://localhost:5328';

  const [connections, setConnections] = useState<any[]>([]);


    // Add Connection handler (integrated with backend)
  const handleAddConnection = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);
    try {
      // Prepare payload
      const payload = {
        name: form.name,
        email: form.email,
        company: form.company,
        job_title: form.jobTitle,
        event_met: form.eventMet,
        event_date: form.eventDate,
        goal: form.goal,
        notes: form.notes,
        tags: form.tags.split(",").map(t => t.trim()).filter(Boolean),
        linkedin: form.linkedin,
        github: form.github,
      };
      const res = await fetch(`${BASE_URL}/api/v1/connections/`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Failed to add connection");
      }
      const newConnection = await res.json();
      setConnections(prev => [newConnection, ...prev]);
      setSuccess("Connection added!");
      setShowAddDialog(false);
      setForm({
        name: "",
        email: "",
        company: "",
        jobTitle: "",
        eventMet: "",
        eventDate: "",
        goal: "",
        notes: "",
        tags: "",
        linkedin: "",
        github: "",
      });
      toast.success("Connection added.");
    } catch (err: any) {
      setError(err.message || `Failed to add connection ${BASE_URL}/api/v1/connections token:${token}`);
      toast.error(err.message || "Failed to add connection");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Sync local state with fetchedConnection (only on initial load)
  useEffect(() => {
    if (Array.isArray(fetchedConnection) && connections.length === 0) {
      setConnections(fetchedConnection);
    }
    // eslint-disable-next-line
  }, [fetchedConnection]);

  // Filtered connections from fetched data
  const filteredConnections = (connections || []).filter((connection: any) =>
    connection?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    connection?.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (Array.isArray(connection?.tags) && (connection.tags as any[]).some((tag: any) => tag.toLowerCase().includes(searchTerm.toLowerCase())))
  );



  return (
    <div id="userdDashboard" className="min-h-screen bg-white">
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Connection</DialogTitle>
          </DialogHeader>
        
          <form onSubmit={handleAddConnection} className="space-y-4">
            <div className="flex gap-4">
              <Input required placeholder="Full Name" value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} />
              <Input required placeholder="Email" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} />
            </div>
            <div className="flex gap-4">
              <Input placeholder="Company" value={form.company} onChange={e => setForm(f => ({...f, company: e.target.value}))} />
              <Input placeholder="Job Title" value={form.jobTitle} onChange={e => setForm(f => ({...f, jobTitle: e.target.value}))} />
            </div>
            <div className="flex gap-4">
              {/* Dropdown for Event Met */}
              <select
                className="w-full border rounded px-3 py-2 text-sm"
                value={form.eventMet}
                onChange={e => setForm(f => ({ ...f, eventMet: e.target.value }))}
              >
                <option value="">Select Event Met</option>
                {userEvents.map((event) => (
                  <option key={event.id} value={event.name}>{event.name}</option>
                ))}
              </select>
              <Input placeholder="Event Date" value={form.eventDate} onChange={e => setForm(f => ({...f, eventDate: e.target.value}))} />
            </div>
            <Input placeholder="Notes" value={form.notes} onChange={e => setForm(f => ({...f, notes: e.target.value}))} />
            <Input placeholder="Tags (comma separated)" value={form.tags} onChange={e => setForm(f => ({...f, tags: e.target.value}))} />
            <div className="flex gap-4">
              <Input placeholder="LinkedIn" value={form.linkedin} onChange={e => setForm(f => ({...f, linkedin: e.target.value}))} />
              <Input placeholder="GitHub" value={form.github} onChange={e => setForm(f => ({...f, github: e.target.value}))} />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Adding..." : "Add Connection"}
              </Button>
            </DialogFooter>
            {error && <div className="text-red-500 text-sm pt-2">{error}</div>}
            {success && <div className="text-green-600 text-sm pt-2">{success}</div>}
          </form>

        </DialogContent>
      </Dialog>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <MediumText text="My Connections"/>
            </div>

            <div className="flex rounded-lg p-1 cursor-pointer">

              <div className="border border-gray-200 rounded-lg p-1">
                <Button
                  variant={viewMode === 'row' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode("row")}
                  className={viewMode === 'row' ? ' text-white cursor-pointer' : 'cursor-pointer'}
                  // className={viewMode === 'row' ? 'bg-purple-600 text-white cursor-pointer' : 'cursor-pointer'}
                >
                  <List className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'column' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode("column")}
                  className={viewMode === 'column' ? ' text-white mx-1 cursor-pointer' : 'mx-1 cursor-pointer'}
                  // className={viewMode === 'column' ? 'bg-purple-600 text-white mx-1 cursor-pointer' : 'mx-1 cursor-pointer'}
                >
                  <LayoutGrid className="w-4 h-4" />
                </Button>
              </div>
            
              <Button 
                // className="mt-1 mx-2 cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" 
                className="mt-1 mx-2 cursor-pointer " 
                onClick={() => setShowAddDialog(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Connection
              </Button>
            </div> 
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

        {/* Connections List/Grid */}
        {loading ? (
          <div className="text-center py-12">Loading connections...</div>
        ) : connectionError ? (
          <div className="text-center py-12 text-red-500">{connectionError}</div>
        ) : fetchedConnection && fetchedConnection.length > 0 ? (
          <div
            className={
              viewMode === 'row'
                ? 'flex flex-col gap-6'
                : 'grid lg:grid-cols-2 gap-6'
            }
          >
            {filteredConnections.map((connection: any) => (
              <Card key={connection?.id} className="hover:shadow-md transition-shadow p-4 cursor-pointer relative">
                {/* Edit & Delete Buttons */}
                <div className="absolute top-2 right-2 flex gap-2 z-10">
                  <Button
                    size="icon"
                    variant="ghost"
                    aria-label="Edit"
                    onClick={e => {
                      e.stopPropagation();
                      setForm({
                        name: connection.name || '',
                        email: connection.email || '',
                        company: connection.company || '',
                        jobTitle: connection.job_title || '',
                        eventMet: connection.event_met || '',
                        eventDate: connection.event_date || '',
                        goal: connection.goal || '',
                        notes: connection.notes || '',
                        tags: (connection.tags || []).join(','),
                        linkedin: connection.linkedin || '',
                        github: connection.github || '',
                      });
                      setShowAddDialog(true);
                    }}
                  >
                    <Settings className="w-5 h-5 text-blue-500 cursor-pointer" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    aria-label="Delete"
                    onClick={async e => {
                      e.stopPropagation();
                      if (!window.confirm('Are you sure you want to delete this connection?')) return;

                      try {
                        const res = await fetch(`${BASE_URL}/api/v1/connections/${connection.id}`, {
                          method: 'DELETE',
                          headers: { Authorization: `Bearer ${token}` },
                        });
                        if (!res.ok) throw new Error('Failed to delete connection');
                        setConnections(prev => prev.filter((c: any) => c.id !== connection.id));
                        toast.success('Connection deleted');
                      } catch (err: any) {
                        toast.error(err.message || 'Failed to delete connection');
                      }
                    }}
                  >
                    <Trash className="w-5 h-5 text-red-500 cursor-pointer" />
                  </Button>
                </div>
                {viewMode === 'row' ? (
                  <div className="flex flex-row items-stretch gap-6 w-full">
                    {/* Avatar and Basic Info */}
                    <div className="flex items-center min-w-[110px] justify-center">
                      <div className="flex-row">
                        <Avatar className="w-18 h-18 mb-2">
                          <AvatarImage src={''} />
                          <AvatarFallback>
                            {connection?.name?.split(' ').map((n: string) => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex items-center pt-2">
                          <Button variant="outline" size="sm" className="flex-1 mr-1">
                            <Linkedin className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1 ml-1">
                            <Github className="w-4 h-4 " />
                          </Button>
                        </div>
                      </div>
                      <div className="px-4">
                        <CardTitle className="text-md mb-1 text-start">{connection.name}</CardTitle>
                        <p className="text-gray-600 mb-2 text-sm text-start">{connection.job_title}</p>
                        <div className="flex flex-col items-left text-xs text-gray-500">
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
                    {/* Details */}
                    <div className="flex-1 flex flex-row flex-nowrap gap-4 items-stretch overflow-x-auto">
                      {/* Event Met */}
                      <div className="bg-blue-50 p-3 rounded-lg flex flex-col justify-between min-w-[180px]">
                        <div className="flex items-center text-sm font-medium text-blue-900 mb-1">
                          <Calendar className="w-4 h-4 mr-2" />
                          Met at: {connection?.event_met}
                        </div>
                        <span className="text-xs text-blue-600">{connection?.event_date}</span>
                      </div>
                      {/* Goal Connection */}
                      <div className="bg-green-50 p-3 rounded-lg flex flex-col justify-between min-w-[180px]">
                        <div className="flex items-center text-sm font-medium text-green-900 mb-1">
                          <Target className="w-4 h-4 mr-2" />
                          Connected Goal
                        </div>
                        <p className="text-sm text-green-700">{connection?.goal}</p>
                      </div>
                      {/* Skills/Tags */}
                      <div className="flex flex-col min-w-[120px]">
                        <p className="text-sm font-medium text-gray-700 mb-2">Skills & Expertise</p>
                        <div className="flex flex-wrap gap-1">
                          {(connection?.tags || []).map((tag: string, index: number) => (
                            <div key={index} className="text-xs">
                              {tag}
                            </div>
                          ))}
                        </div>
                      </div>
                      {/* Notes */}
                      <div className="flex flex-col min-w-[180px]">
                        <div className="flex items-center text-sm font-medium text-gray-700 mb-2">
                          <StickyNote className="w-4 h-4 mr-2" />
                          Notes
                        </div>
                        <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                          {connection?.notes}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Column view (original card layout)
                  <>
                    <CardHeader className="pb-4">
                      <div className="flex items-start space-x-4">
                        <Avatar className="w-16 h-16">
                          <AvatarImage src={''} />
                          <AvatarFallback>
                            {connection.name?.split(' ').map((n: string) => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-1">{connection.name}</CardTitle>
                          <p className="text-gray-600 mb-2">{connection.job_title}</p>
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
                            Met at: {connection.event_met}
                          </div>
                          <span className="text-xs text-blue-600">{connection.event_date}</span>
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
                          {(connection.tags || []).map((tag: string, index: number) => (
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
                      {/* Social Links (optional, if you add social fields to backend) */}
                    </CardContent>
                  </>
                )}
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No connections found</h3>
            <p className="text-gray-600 mb-6">{searchTerm ? 'Try adjusting your search terms' : 'You have not added any connections yet.'}</p>
            {searchTerm && (
              <Button 
                variant="outline" 
                onClick={() => setSearchTerm("")}
              >
                Clear Search
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Connections;