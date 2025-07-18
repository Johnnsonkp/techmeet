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
  const titleRef = useRef(null);
  const typeRef = useRef(null);
  const modalRef = useRef(null);
  const access_token = useAuthStore((s) => s.access_token);
  const { data } = getCalendar();
  

  useEffect(() => {
    console.log("Calendar data:", data);
  }, [currentDate, events, filterType]);

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
      className={`event ${event.type}`}
      draggable
      onDragStart={() => setDraggedEvent(event)}
      onDragEnd={() => setDraggedEvent(null)}
      style={{ display: filterType === 'all' || filterType === event.type ? 'block' : 'none' }}
    >
      {event.title}
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

  const base_url = process.env.NEXT_PUBLIC_FLASK_BASE_URL;

  const getCalendarEvents = () => {
    const res = fetch(`${base_url}/api/v1/google_calendar`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`
      }
    })
    return res;
    // const data = res
    
    // if(data){
    //   return data;
    // }
  }

  // useEffect(() => {
  //   getCalendarEvents()
  //   .then((data) => console.log("Calendar events loaded successfully.", data))
  // }, []);

  return (
    <div>
      <div className="calendar-container">
        <div className="calendar-header">
          <div className="month-nav">
            <button className="nav-btn" onClick={() => changeMonth(-1)}>←</button>
            <div className="current-month">
              {months[currentDate.getMonth()]} {currentDate.getFullYear()}
            </div>
            <button className="nav-btn" onClick={() => changeMonth(1)}>→</button>
          </div>
          <div className="filter-controls">
            {['all', 'work', 'personal', 'meeting'].map(type => (
              <button
                key={type}
                className={`filter-btn ${filterType === type ? 'active' : ''}`}
                onClick={() => setFilterType(type)}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
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
            <input type="text" ref={titleRef} placeholder="Event Title" />
          </div>
          <div className="form-group">
            <select ref={typeRef}>
              <option value="work">Work</option>
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
