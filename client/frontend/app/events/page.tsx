"use client";

import { EventCardGrid, EventCardList } from "@/components/event/EventCard";
import {
  Filter,
  LayoutGrid,
  List,
  Search as SearchIcon,
} from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { Sidebar, SidebarContent, SidebarProvider } from "@/components/ui/sidebar2";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EventCardGridLoadingSkeleton } from "@/components/event/EventCard";
import EventFilterSidebar from "@/components/event/filtering/EventFilterSidebar";
import { Input } from "@/components/ui/input";
import { LargeText } from "@/components/ui/textDisplay/LargeText";
import { MELBOURNE_CITIES } from "../constants/cities";
import { useEventStore } from "@/store/eventStore";
import { useFetchEvents } from "@/hooks/useFetchEvents";

const categories = ["All", "Conference", "Hackathon", "Meetup", "Workshop", "Bootcamp", "Online"];
const months = ["All", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
const limit = 20;

const EventsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [eventsFiltered, setEventsFiltered] = useState<any[] | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<any | null>("All");


  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState('All');
  const [selectedRating, setSelectedRating] = useState('All');
  const [initialPageLoad, setInitialPageLoad] = useState(true);

  const { events: storeEvents } = useEventStore((s) => s);
  const { loading, error, fetchEvents } = useFetchEvents();

  useEffect(() => {
    setInitialPageLoad(false)

    const shouldFetch =
      !storeEvents ||
      storeEvents?.page !== currentPage;

    if (shouldFetch) {
      fetchEvents(currentPage, limit);
    }
  }, [currentPage, storeEvents, fetchEvents, initialPageLoad]);

  const parseEvents = useCallback(() => {
    console.log("selectedLocation", selectedLocation)

    if (!storeEvents?.events) return [];

    const search = searchTerm.toLowerCase();
    const month = selectedMonth.toLowerCase();
    const searchLocation = selectedLocation.toLowerCase();

    return storeEvents.events.filter((event) => {
      const name = event?.name?.toLowerCase() || '';
      const location = event?.location?.toLowerCase() || '';
      const datetime = event?.datetime?.toLowerCase() || '';

      const matchesSearch =
        name.includes(search) ||
        location.includes(search);

      const matchesCategory =
        selectedCategory === "All" || event.category === selectedCategory;

      const matchesMonth =
        selectedMonth === "All" ||
        name.includes(month) || datetime.includes(month);

      const matchLocation =
        selectedLocation === "All" || location.includes(searchLocation) || name.includes(searchLocation)
      
      console.log("matchLocation", matchLocation)
      console.log("location", location)
      console.log("selectedLocation", searchLocation)

      return matchesSearch && matchesCategory && matchesMonth && matchLocation;
    });
}, [searchTerm, selectedCategory, storeEvents, selectedMonth, selectedLocation]);



  useEffect(() => {
    if (searchTerm.trim() || selectedCategory !== "All" || selectedMonth !== "All" || selectedLocation !== "All") {
      console.log("selected month", selectedMonth)

      const filtered = parseEvents();
      setEventsFiltered(filtered);
    } else {
      setEventsFiltered(null);
    }
  }, [searchTerm, selectedCategory, storeEvents, selectedMonth, selectedLocation]);

  const eventsToDisplay = eventsFiltered ?? storeEvents?.events ?? [];
  const totalPages = Math.ceil((storeEvents?.total ?? 0) / limit);

  return (
    <div className="min-h-screen h-full pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-1 py-8">
        {/* Top bar */}
        <div className="rounded-2xl p-6 mb-2">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search and category */}
            <div className="flex flex-col md:flex-row gap-4 flex-1">
              <div className="flex-1 relative max-w-md">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search event, location, etc."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-10"
                />
              </div>
            </div>

            {/* Filters and layout toggle */}
            <div className="flex items-center gap-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === "All" ? "All Categories" : category}
                  </option>
                ))}
              </select>

              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                <select className="text-sm bg-transparent outline-none" onChange={(e) => setSelectedMonth(e.target.value)}>
                  {months.map((month, index) => (
                    <option key={index} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
              </Button>

              <div className="flex rounded-lg border border-gray-300 p-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={viewMode === "grid" ? "bg-purple-600 text-white" : ""}
                >
                  <LayoutGrid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={viewMode === "list" ? "bg-purple-600 text-white" : ""}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <LargeText text="Technology Events in Melbourne" />
        </div>

        {/* Sidebar + Events */}
        {/* <SidebarProvider> */}
          <div className="flex justify-between w-full">
            <Card className="w-[] bg-white shadow-none border-0 flex-[0.2]">
              <EventFilterSidebar
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedLocation={selectedLocation}
                setSelectedLocation={setSelectedLocation}
                selectedPrice={selectedPrice}
                setSelectedPrice={setSelectedPrice}
                selectedRating={selectedRating}
                setSelectedRating={setSelectedRating}
              />
            </Card>

            {initialPageLoad && loading || initialPageLoad ? (
              <div className="flex-[0.78] overflow-y-auto p-4 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                {months.map((month, index: number) => (
                  <EventCardGridLoadingSkeleton index={index}/>
                ))}
              </div>
            ) : viewMode === "grid" ? (
              <div className="flex-[0.78] overflow-y-auto p-4 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                {eventsToDisplay.map((event, index) => (
                  <EventCardGrid key={index} event={event} />
                ))}
              </div>
            ) : (
              <div className="flex-[0.78] space-y-4">
                {eventsToDisplay.map((event, index) => (
                  <EventCardList key={index} event={event} />
                ))}
              </div>
            )}
          </div>
        {/* </SidebarProvider> */}

        {/* No results */}
        {eventsToDisplay.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <SearchIcon className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-600">Try adjusting your search terms or filters</p>
          </div>
        )}

        {/* Pagination */}
        <div className="mt-8 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Showing {eventsToDisplay.length} out of {storeEvents?.total || 0}
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              Previous
            </Button>
            {Array.from({ length: totalPages }).map((_, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(index + 1)}
                className={currentPage === index + 1 ? "bg-purple-600 text-white" : ""}
              >
                {index + 1}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
