'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { 
  Grid2x2, 
  ZoomIn, 
  Text, 
  Volume, 
  Palette, 
  ArrowUpDown,
  type LucideIcon
} from 'lucide-react';

interface ControlItem {
  id: string;
  icon: LucideIcon;
  label: string;
  angle: number;
}

interface CircularControlProps {
  centerLabel?: string;
  onItemClick?: (item: ControlItem) => void;
  className?: string;
}

const CircularControl: React.FC<CircularControlProps> = ({
  centerLabel = "Event Sourcing",
  onItemClick,
  className
}) => {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const controlItems: ControlItem[] = [
    { id: 'grid', icon: Grid2x2, label: 'Grid', angle: 0 },
    { id: 'zoom', icon: ZoomIn, label: 'Zoom', angle: 60 },
    { id: 'text', icon: Text, label: 'Text', angle: 120 },
    { id: 'arrows', icon: ArrowUpDown, label: 'Arrows', angle: 180 },
    { id: 'palette', icon: Palette, label: 'Palette', angle: 240 },
    { id: 'volume', icon: Volume, label: 'Volume', angle: 300 },
  ];

  const handleItemClick = (item: ControlItem) => {
    setActiveItem(item.id);
    onItemClick?.(item);
  };

  const getItemPosition = (angle: number, radius: number) => {
    const radian = (angle * Math.PI) / 180;
    const x = Math.cos(radian - Math.PI / 2) * radius;
    const y = Math.sin(radian - Math.PI / 2) * radius;
    return { x, y };
  };

  return (
    // <div className={cn("absolute bottom-12 right-12 z-20", className)}>
    <div className={cn(" z-20", className)}>
      {/* Main circular container */}
      <div className="relative w-60 h-60 rounded-full backdrop-blur-md bg-control-bg-alpha border border-control-border shadow-2xl">
        
        {/* Center circle */}
        <div className="absolute inset-6 rounded-full bg-control-bg border border-control-border flex items-center justify-center">
          <span className="text-control-icon font-medium text-lg tracking-wide">
            {centerLabel}
          </span>
        </div>

        {/* Vertical separator lines from center to outer edge */}
        {controlItems.map((item) => {
          const startPos = getItemPosition(item.angle, 60); // Start from inner circle
          const endPos = getItemPosition(item.angle, 135); // End at outer edge
          const lineLength = Math.sqrt(Math.pow(endPos.x - startPos.x, 2) + Math.pow(endPos.y - startPos.y, 2));
          
          return (
            <div
              key={`separator-${item.id}`}
              className="absolute h-px bg-control-border/30 origin-left"
              style={{
                left: `calc(50% + ${startPos.x}px)`,
                top: `calc(50% + ${startPos.y}px)`,
                width: `${lineLength}px`,
                transform: `rotate(${item.angle}deg)`,
                transformOrigin: '0 50%',
              }}
            />
          );
        })}

        {/* Control items positioned around the circle */}
        {controlItems.map((item) => {
          const { x, y } = getItemPosition(item.angle, 110);
          const isHovered = hoveredItem === item.id;
          const isActive = activeItem === item.id;
          
          return (
            <button
              key={item.id}
              className={cn(
                "absolute w-12 h-12 rounded-full border border-control-border",
                "flex items-center justify-center transition-all duration-300 ease-out",
                "backdrop-blur-sm transform-gpu",
                isHovered || isActive
                  ? "bg-control-accent scale-110 border-control-accent shadow-lg shadow-control-accent/25"
                  : "bg-control-bg-alpha hover:bg-control-bg hover:scale-105",
                "hover:shadow-lg active:scale-95"
              )}
              style={{
                left: `calc(50% + ${x}px - 24px)`,
                top: `calc(50% + ${y}px - 24px)`,
              }}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => handleItemClick(item)}
              aria-label={item.label}
            >
              <item.icon 
                size={20} 
                className={cn(
                  "transition-colors duration-300",
                  isHovered || isActive ? "text-white" : "text-control-icon"
                )}
              />
            </button>
          );
        })}

        {/* Decorative glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-control-accent/10 to-transparent opacity-50 pointer-events-none" />
        
        {/* Subtle inner shadow */}
        <div className="absolute inset-2 rounded-full shadow-inner shadow-control-shadow/30 pointer-events-none" />
      </div>

      {/* Active item indicator */}
      {activeItem && (
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="px-3 py-1 rounded-full bg-control-bg-alpha backdrop-blur-sm border border-control-border">
            <span className="text-control-icon text-sm font-medium">
              {controlItems.find(item => item.id === activeItem)?.label}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CircularControl;