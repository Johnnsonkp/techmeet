import { CalendarIcon, Filter, SlidersHorizontal, X } from "lucide-react";

// import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
import CustomCalendar  from "@/components/calendar/CustomCalendar";
import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
// import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useState } from "react";

// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";


interface EventsSidebarProps {
  onFiltersChange: (filters: any) => void;
  selectedFilters: any;
}

const EventsSidebar = ({ onFiltersChange, selectedFilters }: EventsSidebarProps) => {
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({});
  const Calendar = CustomCalendar

  const categories = [
    "Conference", "Hackathon", "Meetup", "Workshop", "Bootcamp", "Webinar", "Networking"
  ];

  const tags = [
    "React", "JavaScript", "AI/ML", "Blockchain", "Web3", "Mobile", "DevOps", 
    "Design", "Startup", "Career", "Open Source", "Cloud", "Security"
  ];

  const locations = [
    "San Francisco, CA", "Austin, TX", "New York, NY", "Seattle, WA", 
    "Boston, MA", "Miami, FL", "Remote", "Hybrid"
  ];

  const handleCategoryChange = (category: string, checked: boolean) => {
    const updatedCategories = checked
      ? [...(selectedFilters.categories || []), category]
      : (selectedFilters.categories || []).filter((c: string) => c !== category);
    
    onFiltersChange({
      ...selectedFilters,
      categories: updatedCategories
    });
  };

  const handleTagChange = (tag: string, checked: boolean) => {
    const updatedTags = checked
      ? [...(selectedFilters.tags || []), tag]
      : (selectedFilters.tags || []).filter((t: string) => t !== tag);
    
    onFiltersChange({
      ...selectedFilters,
      tags: updatedTags
    });
  };

  const handleLocationChange = (location: string, checked: boolean) => {
    const updatedLocations = checked
      ? [...(selectedFilters.locations || []), location]
      : (selectedFilters.locations || []).filter((l: string) => l !== location);
    
    onFiltersChange({
      ...selectedFilters,
      locations: updatedLocations
    });
  };

  const handlePriceRangeChange = (values: number[]) => {
    setPriceRange(values);
    onFiltersChange({
      ...selectedFilters,
      priceRange: values
    });
  };

  const handleSortChange = (sortBy: string) => {
    onFiltersChange({
      ...selectedFilters,
      sortBy
    });
  };

  const clearAllFilters = () => {
    setPriceRange([0, 200]);
    setDateRange({});
    onFiltersChange({
      categories: [],
      tags: [],
      locations: [],
      priceRange: [0, 200],
      sortBy: "date",
      dateRange: {}
    });
  };

  const activeFiltersCount = 
    (selectedFilters.categories?.length || 0) +
    (selectedFilters.tags?.length || 0) +
    (selectedFilters.locations?.length || 0) +
    (selectedFilters.dateRange?.from ? 1 : 0);

  return (
    <div className="w-80 bg-white border-r border-gray-200 h-full overflow-y-auto">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <SlidersHorizontal className="w-5 h-5 text-purple-600" />
            <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
            {activeFiltersCount > 0 && (
              <div variant="secondary" className="bg-purple-100 text-purple-700">
                {activeFiltersCount}
              </div>
            )}
          </div>
          {activeFiltersCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-gray-500 hover:text-gray-700"
            >
              Clear all
            </Button>
          )}
        </div>

        {/* Sort By */}
        <div className="mb-6">
          <div className="text-sm font-medium text-gray-900 mb-3 block">Sort by</div>
          {/* <RadioGroup
            value={selectedFilters.sortBy || "date"}
            onValueChange={handleSortChange}
            className="space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="date" id="sort-date" />
              <Label htmlFor="sort-date" className="text-sm">Date (Newest first)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="price-low" id="sort-price-low" />
              <Label htmlFor="sort-price-low" className="text-sm">Price (Low to High)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="price-high" id="sort-price-high" />
              <Label htmlFor="sort-price-high" className="text-sm">Price (High to Low)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="popularity" id="sort-popularity" />
              <Label htmlFor="sort-popularity" className="text-sm">Most Popular</Label>
            </div>
          </RadioGroup> */}
        </div>

        <Separator className="my-6" />

        {/* Date Range */}
        <div className="mb-6">
          <div className="text-sm font-medium text-gray-900 mb-3 block">Date Range</div>
          {/* <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !dateRange.from && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "LLL dd, y")} -{" "}
                      {format(dateRange.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(dateRange.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                // initialFocus
                // mode="range"
                // defaultMonth={dateRange.from}
                // selected={dateRange}
                onSelect={(range) => {
                  setDateRange(range || {});
                  onFiltersChange({
                    ...selectedFilters,
                    dateRange: range || {}
                  });
                }}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover> */}
        </div>

        <Separator className="my-6" />

        {/* Price Range */}
        <div className="mb-6">
          <div className="text-sm font-medium text-gray-900 mb-3 block">
            Price Range: ${priceRange[0]} - ${priceRange[1]}
          </div>
          {/* <Slider
            value={priceRange}
            onValueChange={handlePriceRangeChange}
            max={200}
            min={0}
            step={5}
            className="w-full"
          /> */}
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Free</span>
            <span>$200+</span>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Categories */}
        <div className="mb-6">
          <div className="text-sm font-medium text-gray-900 mb-3 block">Categories</div>
          <div className="space-y-3">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                {/* <Checkbox
                  id={`category-${category}`}
                  checked={selectedFilters.categories?.includes(category) || false}
                  onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                /> */}
                <div className="text-sm font-normal">
                  {category}
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separator className="my-6" />

        {/* Tags */}
        <div className="mb-6">
          <div className="text-sm font-medium text-gray-900 mb-3 block">Tags</div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <div
                key={tag}
                // variant={selectedFilters.tags?.includes(tag) ? "default" : "secondary"}
                className={cn(
                  "cursor-pointer transition-colors",
                  selectedFilters.tags?.includes(tag)
                    ? "bg-purple-600 hover:bg-purple-700"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                )}
                onClick={() => handleTagChange(tag, !selectedFilters.tags?.includes(tag))}
              >
                {tag}
                {selectedFilters.tags?.includes(tag) && (
                  <X className="w-3 h-3 ml-1" />
                )}
              </div>
            ))}
          </div>
        </div>

        <Separator className="my-6" />

        {/* Locations */}
        <div className="mb-6">
          <div className="text-sm font-medium text-gray-900 mb-3 block">Location</div>
          <div className="space-y-3">
            {locations.map((location) => (
              <div key={location} className="flex items-center space-x-2">
                {/* <Checkbox
                  id={`location-${location}`}
                  checked={selectedFilters.locations?.includes(location) || false}
                  onCheckedChange={(checked) => handleLocationChange(location, checked as boolean)}
                /> */}
                <div className="text-sm font-normal">
                  {location}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsSidebar;
