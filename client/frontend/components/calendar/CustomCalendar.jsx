'use client'

import './calendarStyles.css'

import React, { useEffect, useRef, useState } from 'react';

import { getCalendar } from '@/hooks/fetchUserCalendar';
import { useAuthStore } from '@/store/authStore';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function CustomCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [draggedEvent, setDraggedEvent] = useState(null);
  const [filterType, setFilterType] = useState('all');
  const [rangeType, setRangeType] = useState('month'); // 'month', 'fortnight', 'week'
  const titleRef = useRef(null);
  const typeRef = useRef(null);
  const modalRef = useRef(null);
  const access_token = useAuthStore((s) => s.access_token);
  const user_email = useAuthStore((s) => s.user?.email);

  // Fetch events from Flask backend using getCalendar hook
  useEffect(() => {
    if (!user_email) return;

    const now = new Date(currentDate);
    let time_min = new Date(now.getFullYear(), now.getMonth(), 1);
    let time_max;
    if (rangeType === 'month') {
      time_max = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
    } else if (rangeType === 'fortnight') {
      time_max = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 13, 23, 59, 59);
    } else if (rangeType === 'week') {
      time_max = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 6, 23, 59, 59);
    }
    // Convert to ISO string
    time_min = time_min.toISOString();
    time_max = time_max.toISOString();

    async function fetchBackendEvents() {
      try {
        const data = await getCalendar(time_min, time_max); // getCalendar should call Flask backend

        if (data && data.length > 0) {
          const updatedEvents = saveFetchedEvent(data, user_email);
          if (updatedEvents && updatedEvents.length > 0) {
            setEvents(updatedEvents);
          }
        }
      } catch (err) {
        console.error('Failed to fetch backend events:', err);
      }
    }
    fetchBackendEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDate, user_email, rangeType]);

  const loadEvents = () => {
    const savedEvents = localStorage.getItem('calendarEvents');
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents).map(e => ({ ...e, date: new Date(e.date) })));
    }
  };

  const saveEvents = (newEvents) => {
    localStorage.setItem('calendarEvents', JSON.stringify(newEvents));
    setEvents(newEvents);
  };

  const changeMonth = (delta) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + delta);
    setCurrentDate(newDate);
  };

  const openModal = () => {
    modalRef.current.style.display = 'flex';
  };

  const closeModal = () => {
    modalRef.current.style.display = 'none';
  };


  const saveFetchedEvent = (data, user_email) => {

    const existingEvents = events || [];
    
    const newEvents = (data || []).map((event, index) => ({
      id: event.id || `${event.summary}-${event.date}`,
      title: event.summary,
      type: user_email || 'work',
      // type: `${event?.description.includes("Event booked via TechMeet")? user_email + 'events' : user_email}`,
      date: event.date ? new Date(event.date) : (event.start && (event.start.dateTime ? new Date(event.start.dateTime) : new Date(event.start.date)))
    }));

    const merged = [...existingEvents];
    console.log('Merged events:', merged);
    
    newEvents.forEach(ev => {
      if (!merged.some(e => e.id === ev.id)) {
        merged.push(ev);
      }
    });
    return merged;
  };

  const saveEvent = () => {
    const title = titleRef.current.value;
    const type = typeRef.current.value;

    if (!title) return;

    const newEvent = {
      id: Date.now(),
      title,
      type,
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())
    };

    const updatedEvents = [...events, newEvent];

    saveEvents(updatedEvents);
    closeModal();
    titleRef.current.value = '';
  };

  const handleDrop = (e, day) => {
    e.preventDefault();
    if (!draggedEvent) return;
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const updated = events.map(ev =>
      ev.id === draggedEvent.id ? { ...ev, date: newDate } : ev
    );
    saveEvents(updated);
    setDraggedEvent(null);
  };

  const createEventElement = (event) => (
    <div
      key={event.id}
      className={`event ${event.type} ${event.type.includes('events') && 'techmeet-event'}`}
      draggable
      onDragStart={() => setDraggedEvent(event)}
      onDragEnd={() => setDraggedEvent(null)}
      style={{ display: filterType === 'all' || filterType == event.type ? 'block' : 'none' }}
    >
      {event.title}
      {/* {event.type} */}
    </div>
  );

  const renderCalendar = () => {
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const paddingDays = firstDay.getDay();
    const prevLastDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);

    let calendarDays = [];

    for (let i = paddingDays - 1; i >= 0; i--) {
      calendarDays.push(
        <div key={`prev-${i}`} className="day-cell different-month">
          <div className="day-number">{prevLastDay.getDate() - i}</div>
        </div>
      );
    }

    for (let day = 1; day <= lastDay.getDate(); day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dayEvents = events.filter(ev => new Date(ev.date).toDateString() === date.toDateString());

      calendarDays.push(
        <div
          key={`curr-${day}`}
          className="day-cell"
          onDragOver={e => e.preventDefault()}
          onDrop={e => handleDrop(e, day)}
        >
          <div className="day-number">{day}</div>
          {dayEvents.map(createEventElement)}
        </div>
      );
    }

    const remainingDays = 42 - (paddingDays + lastDay.getDate());
    
    for (let i = 1; i <= remainingDays; i++) {
      calendarDays.push(
        <div key={`next-${i}`} className="day-cell different-month">
          <div className="day-number">{i}</div>
        </div>
      );
    }

    return calendarDays;
  };

  return (
    <div className=''>
      <div className="calendar-container">
        <div className="calendar-header">
          <div className="month-nav">
            <button className="nav-btn" onClick={() => changeMonth(-1)}>←</button>
            <div className="current-month">
              {months[currentDate.getMonth()]} {currentDate.getFullYear()}
            </div>
            <button className="nav-btn" onClick={() => changeMonth(1)}>→</button>
          </div>
          <div className="filter-controls flex gap-4 items-center">
            {/* Calendar type dropdown */}
            <div>
              {/* <label htmlFor="calendar-range" className="mr-2 text-sm font-medium">View:</label> */}
              {/* <select
                id="calendar-range"
                value={rangeType}
                onChange={e => setRangeType(e.target.value)}
                className="border rounded px-2 py-1 text-sm"
              >
                <option value="month">Month</option>
                <option value="fortnight">Fortnight</option>
                <option value="week">Week</option>
              </select> */}
            </div>
            {/* Existing filter dropdown */}
            <div className="group relative cursor-pointer py-0 border-2 rounded-full min-w-[240px] w-[240px]">
              <div className="flex items-center justify-between space-x-3 bg-white px-4 min-w-[200px] rounded-full">
                <a className="menu-hover my-1 py-1 font-medium text-sm text-black lg:mx-4">
                    {filterType.charAt(0).toUpperCase() + filterType.slice(1) || "Select a calendar"}
                </a>
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                      stroke="currentColor" className="h-5 w-5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </span>
              </div>
              <div className="invisible absolute z-50 flex w-full flex-col bg-gray-100 py-1 px-4 text-gray-800 shadow-xl group-hover:visible">
                {['all', 'events', user_email || 'personal'].map(type => (
                  <a 
                    key={type} 
                    onClick={() => setFilterType(type)}
                    className="my-2 text-xs block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-black md:mx-2">
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="calendar-grid">
          {days.map(day => <div key={day} className="day-header">{day}</div>)}
          {renderCalendar()}
        </div>
      </div>

      <button className="add-event-btn" onClick={openModal}>+</button>

      <div className="modal" ref={modalRef} style={{ display: 'none' }}>
        <div className="modal-content">
          <h2>Add Event</h2>
          <div className="form-group">
            <input className="input" type="text" ref={titleRef} placeholder="Event Title" />
          </div>
          <div className="form-group">
            <select className="select" ref={typeRef}>
              <option value="work">Work</option>
              <option value="work">{user_email}</option>
              <option value="personal">Personal</option>
              <option value="meeting">Meeting</option>
            </select>
          </div>
          <div className="modal-buttons">
            <button className="modal-btn cancel-btn" onClick={closeModal}>Cancel</button>
            <button className="modal-btn save-btn" onClick={saveEvent}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomCalendar;
