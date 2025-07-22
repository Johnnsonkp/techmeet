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
  // added for google calendar
  const [googleEvents, setGoogleEvents] = useState([]);
  const [isGoogleConnected, setIsGoogleConnected] = useState(false);
  

    // Google Calendar
  const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
  const API_KEY = process.env.GOOGLE_API_KEY;
  const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
  const SCOPES = "https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar.events";

  // useEffect(() => {
  //   console.log("Calendar data:", data);
  // }, [currentDate, events, filterType]);

  // added for google calendar

  //   useEffect(() => {
  //   console.log("Initializing calendar...");
  //   console.log("Calendar data:", data);
  //   loadEvents();
  //   loadGoogleClient();
  // }, []);

  // Load Google API client
  const loadGoogleClient = () => {
    console.log("Loading Google API script...");
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.onload = () => {
      console.log("Google API script loaded, initializing client...");
      window.gapi.load('client:auth2', initGoogleClient);
    };

    useEffect(() => {
    console.log("Initializing calendar...");
    console.log("Calendar data:", data);
    loadEvents();
    loadGoogleClient();
  }, []);
    script.onerror = () => {
      console.error("Failed to load Google API script");
    };
    document.body.appendChild(script);
  };


   const initGoogleClient = () => {
    window.gapi.client.init({
      apiKey: API_KEY,
      clientId: GOOGLE_CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES
    }).then(() => {
      // Listen for sign-in state changes
      window.gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
      // Handle initial sign-in state
      updateSigninStatus(window.gapi.auth2.getAuthInstance().isSignedIn.get());
    });
  };

  const updateSigninStatus = (isSignedIn) => {
    console.log("Signed in:", isSignedIn); // for debugging
    setIsGoogleConnected(isSignedIn);
    if (isSignedIn) {
      fetchGoogleEvents();
    }
  };

  const handleGoogleAuthClick = () => {
    if (isGoogleConnected) {
      window.gapi.auth2.getAuthInstance().signOut();
    } else {
      window.gapi.auth2.getAuthInstance().signIn();
    }
  };

  const fetchGoogleEvents = () => {
    const calendarId = 'primary';
    const timeMin = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).toISOString();
    const timeMax = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).toISOString();

    window.gapi.client.calendar.events.list({
      'calendarId': calendarId,
      'timeMin': timeMin,
      'timeMax': timeMax,
      'showDeleted': false,
      'singleEvents': true,
      'orderBy': 'startTime'
    }).then(response => {
      console.log("Google Calendar response:", response); // for debugging
      const events = response.result.items.map(event => ({
        id: event.id,
        title: event.summary,
        type: 'google',
        date: new Date(event.start.dateTime || event.start.date),
        description: event.description,
        location: event.location,
        googleEvent: true
      }));
      console.log("Mapped events:", events); // for debugging
      setGoogleEvents(events);
    });
  };



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
    // added for google calendar
    if (isGoogleConnected) {
      fetchGoogleEvents();
    }
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

  // const createEventElement = (event) => (
  //   <div
  //     key={event.id}
  //     className={`event ${event.type}`}
  //     draggable
  //     onDragStart={() => setDraggedEvent(event)}
  //     onDragEnd={() => setDraggedEvent(null)}
  //     style={{ display: filterType === 'all' || filterType === event.type ? 'block' : 'none' }}
  //   >
  //     {event.title}
  //   </div>
  // );
  // amend for google calendar
  const createEventElement = (event) => (
    <div
      key={event.id}
      className={`event ${event.type} ${event.googleEvent ? 'google-event' : ''}`}
      draggable={!event.googleEvent}
      onDragStart={() => !event.googleEvent && setDraggedEvent(event)}
      onDragEnd={() => !event.googleEvent && setDraggedEvent(null)}
      style={{ 
        display: filterType === 'all' || filterType === event.type ? 'block' : 'none',
        cursor: event.googleEvent ? 'default' : 'grab'
      }}
      title={event.googleEvent ? `${event.description || ''}\n${event.location || ''}` : ''}
    >
      {event.title}
      {event.googleEvent && <span className="google-icon">G</span>}
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
      // const dayEvents = events.filter(ev => new Date(ev.date).toDateString() === date.toDateString());
      const dayEvents = [
      ...events.filter(ev => new Date(ev.date).toDateString() === date.toDateString()),
      ...googleEvents.filter(ev => new Date(ev.date).toDateString() === date.toDateString())
    ];
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
  console.log('Rendering calendar header with filter controls'); // debugging
  return (
    <div>
        {/* Simple visible button */}
    <button 
      style={{
        position: 'fixed',
        top: '10px',
        right: '10px',
        padding: '10px',
        background: '#4285f4',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        zIndex: 1000
      }}
      onClick={handleGoogleAuthClick}
    >
      {isGoogleConnected ? 'Disconnect Google' : 'Connect Google'}
    </button>

      <div className="calendar-container">
        <div className="calendar-header">
          <div className="month-nav">
            <button className="nav-btn" onClick={() => changeMonth(-1)}>←</button>
            <div className="current-month">
              {months[currentDate.getMonth()]} {currentDate.getFullYear()}
            </div>
            <button className="nav-btn" onClick={() => changeMonth(1)}>→</button>
          </div>
          {/* <div className="filter-controls">
            {['all', 'work', 'personal', 'meeting'].map(type => (
              <button
                key={type}
                className={`filter-btn ${filterType === type ? 'active' : ''}`}
                onClick={() => setFilterType(type)}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div> */}

        <div className="filter-controls">
          {['all', 'work', 'personal', 'meeting', 'google'].map(type => (
            <button
              key={type}
              className={`filter-btn ${filterType === type ? 'active' : ''}`}
              onClick={() => setFilterType(type)}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
          {/* <button 
            className={`google-connect-btn ${isGoogleConnected ? 'connected' : ''}`}
            onClick={handleGoogleAuthClick}
             style={{ display: 'block !important', opacity: '1 !important', visibility: 'visible !important' }}
          >
            {isGoogleConnected ? 'Disconnect Google' : 'Connect Google'}
          </button> */}
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
