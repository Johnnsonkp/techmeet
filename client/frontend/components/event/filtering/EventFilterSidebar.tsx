// components/EventFilterSidebar.tsx

'use client';

import { Input } from '@/components/ui/input';
import { MELBOURNE_CITIES } from '@/app/constants/cities';
import { MediumText } from '@/components/ui/textDisplay/LargeText';
import React from 'react';
import {
  Search as SearchIcon,
} from "lucide-react";

// import SearchIcon from 'lucide-react/dist/esm/icons/search';


const categories = ['All', 'Tech', 'Health', 'Business', 'Education'];
const months = ['All', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
const locations = ['All', 'New York', 'San Francisco', 'London', 'Berlin'];
const prices = ['All', 'Free', 'Paid'];
const ratings = ['All', '1+', '2+', '3+', '4+', '5'];

export default function EventFilterSidebar({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  // selectedMonth,
  // setSelectedMonth,
  selectedLocation,
  setSelectedLocation,
  selectedPrice,
  setSelectedPrice,
  selectedRating,
  setSelectedRating,
}: {
  // searchTerm: string;
  // setSearchTerm: (value: string) => void;
  selectedCategory: string;
  searchTerm: string;
  setSelectedCategory: (value: string) => void;
  setSearchTerm: (value: string) => void;
  // selectedMonth: string;
  // setSelectedMonth: (value: string) => void;
  selectedLocation: string;
  setSelectedLocation: (value: string) => void;
  selectedPrice: string;
  setSelectedPrice: (value: string) => void;
  selectedRating: string;
  setSelectedRating: (value: string) => void;
}) {
  return (
    <aside className="w-full md:w-64 p-4 bg-white shadow-xs space-y-4 border-2 rounded-lg pb-20">

      <MediumText text="Filters"/>
      
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
      
      <Dropdown label="Category" value={selectedCategory} options={categories} onChange={setSelectedCategory} />
      {/* <Dropdown label="Month" value={selectedMonth} options={months} onChange={setSelectedMonth} /> */}
      <Dropdown label="Location" value={selectedLocation} options={MELBOURNE_CITIES?.cities} onChange={setSelectedLocation} />
      <Dropdown label="Price" value={selectedPrice} options={prices} onChange={setSelectedPrice} />
      <Dropdown label="Rating" value={selectedRating} options={ratings} onChange={setSelectedRating} />
    </aside>
  );
}

function Dropdown({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="block font-semibold mb-1">{label}</label>
      <select
        className="w-full border rounded p-2"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
