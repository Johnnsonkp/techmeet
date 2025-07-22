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
  const [authInstance, setAuthInstance] = useState(null);

  // Google Calendar state
  const [googleEvents, setGoogleEvents] = useState([]);
  const [isGoogleConnected, setIsGoogleConnected] = useState(false);
  const [isGoogleApiLoaded, setIsGoogleApiLoaded] = useState(false);
  const [authError, setAuthError] = useState(null);  // added for debugging

  // Google Calendar config for debugging only
  // const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
  // const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
  // const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
  // const SCOPES = "https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar.events";

  // Load events and initialize Google API on mount
  // useEffect(() => {
  //   loadEvents();
  //   loadGoogleClient();
  // }, []);

  // // Fetch Google events when month changes and connected
  // useEffect(() => {
  //   if (isGoogleConnected) {
  //     fetchGoogleEvents();
  //   }
  // }, [currentDate, isGoogleConnected]);

  // Initialize Google API
  useEffect(() => {
    const loadGoogleAPI = () => {
      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/api.js';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        window.gapi.load('client:auth2', initGoogleClient);
      };
      document.body.appendChild(script);
    };

  // Load Google API client
  const loadGoogleClient = () => {
    if (window.gapi) {
      initGoogleClient();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      window.gapi.load('client:auth2', initGoogleClient);
    };
    script.onerror = () => {
      console.error("Failed to load Google API script");
    };
    document.body.appendChild(script);
  };

  // Initialize Google client
  // const initGoogleClient = () => {
  //   window.gapi.client.init({
  //     apiKey: GOOGLE_API_KEY,
  //     clientId: GOOGLE_CLIENT_ID,
  //     discoveryDocs: DISCOVERY_DOCS,
  //     scope: SCOPES
  //   }).then(() => {
  //     setIsGoogleApiLoaded(true);
  //     window.gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
  //     updateSigninStatus(window.gapi.auth2.getAuthInstance().isSignedIn.get());
  //   }).catch(error => {
  //     console.error("Error initializing Google client:", error);
  //   });
  // };
//   
   const initGoogleClient = async () => {
    try{ 
    // check auth2 is loaded
      if (!window.gapi.auth2) {
        await new Promise((resolve) => {
          window.gapi.load('auth2', resolve);
       });
      }


    // window.gapi.client.init({
    //     apiKey: process.env.GOOGLE_API_KEY,
    //     clientId: process.env.GOOGLE_CLIENT_ID,
    //     discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
    //     scope: "https://www.googleapis.com/auth/calendar.events.readonly"
    //   }).then(() => {
    //     setIsGoogleApiLoaded(true);
    //     const auth = window.gapi.auth2.getAuthInstance();
    //     auth.isSignedIn.listen(updateSigninStatus);
    //     updateSigninStatus(auth.isSignedIn.get());
    //   }).catch(error => {
    //     setAuthError("Failed to initialize Google API");
    //     console.error("Error initializing Google client:", error);
    //   });
    // };

    await window.gapi.client.init({
      apiKey: process.env.GOOGLE_API_KEY,
      clientId: process.env.GOOGLE_CLIENT_ID,
      discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
      scope: "https://www.googleapis.com/auth/calendar.events.readonly"
    });

    // Get or initialize auth instance
    let auth;
    try {
      auth = window.gapi.auth2.getAuthInstance();
      if (!auth) {
        auth = await window.gapi.auth2.init({
          client_id: process.env.GOOGLE_CLIENT_ID,
          scope: "https://www.googleapis.com/auth/calendar.events.readonly"
        });
      }
    } catch (e) {
      console.error("Auth instance error:", e);
      throw e;
    }

    setIsGoogleApiLoaded(true);
    auth.isSignedIn.listen(updateSigninStatus);
    updateSigninStatus(auth.isSignedIn.get());
    setAuthInstance(auth); // Store the auth instance in state
  } catch (error) {
    setAuthError("Failed to initialize Google API");
    console.error("Error initializing Google client:", error);
  }
};

    if (!window.gapi) {
      loadGoogleAPI();
    } else if (!window.gapi.auth2) {
      window.gapi.load('client:auth2', initGoogleClient);
    }

    return () => {
      // Cleanup if needed
    };
  }, []);


  // Update sign-in status
  const updateSigninStatus = (isSignedIn) => {
    setIsGoogleConnected(isSignedIn);
    if (isSignedIn) {
      fetchGoogleEvents();
    } else {
      setGoogleEvents([]);
    }
  };

  // Handle Google auth button click
  const handleGoogleAuthClick = () => {
    if (!isGoogleApiLoaded) return;
    
    const authInstance = window.gapi.auth2.getAuthInstance();
    if (isGoogleConnected) {
      authInstance.signOut();
    } else {
      authInstance.signIn()
        .then(() => fetchGoogleEvents())
        .catch(error => console.error("Sign-in error:", error));
    }
  };

  // Fetch Google Calendar events
  const fetchGoogleEvents = async () => {
    try {
      // const calendarId = 'primary';
      // const timeMin = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).toISOString();
      // const timeMax = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).toISOString();

      // const response = await window.gapi.client.calendar.events.list({
      //   calendarId,
      //   timeMin,
      //   timeMax,
      //   showDeleted: false,
      //   singleEvents: true,
      //   orderBy: 'startTime'
      const response = await window.gapi.client.calendar.events.list({
        calendarId: 'primary',
        timeMin: (new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)).toISOString(),
        timeMax: (new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)).toISOString(),
        showDeleted: false,
        singleEvents: true,
        orderBy: 'startTime'

      });

      const events = response.result.items.map(event => ({
        id: event.id,
        title: event.summary || 'No title',
        type: 'google',
        date: new Date(event.start.dateTime || event.start.date),
        description: event.description,
        location: event.location,
        googleEvent: true
      }));

      setGoogleEvents(events);
    } catch (error) {
      setAuthError("Failed to fetch calendar events");
      console.error("Error fetching Google events:", error);
    }
  };

  // Added 18/7/25 Merge events for display
  const getEventsForDay = (day) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return [
      ...events.filter(e => e.date.toDateString() === date.toDateString()),
      ...googleEvents.filter(e => e.date.toDateString() === date.toDateString())
    ];
  };

  // Load local events from storage
  const loadEvents = () => {
    const savedEvents = localStorage.getItem('calendarEvents');
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents).map(e => ({ ...e, date: new Date(e.date) })));
    }
  };

  // Save events to local storage
  const saveEvents = (newEvents) => {
    localStorage.setItem('calendarEvents', JSON.stringify(newEvents));
    setEvents(newEvents);
  };

  // Change month
  const changeMonth = (delta) => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() + delta);
      return newDate;
    });
  };

  // Modal handlers
  const openModal = () => {
    modalRef.current.style.display = 'flex';
  };

  const closeModal = () => {
    modalRef.current.style.display = 'none';
  };

  // Save new event
  const saveEvent = () => {
    const title = titleRef.current.value;
    const type = typeRef.current.value;
    if (!title) return;

    const newEvent = {
      id: Date.now(),
      title,
      type,
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()),
      googleEvent: false
    };

    saveEvents([...events, newEvent]);
    closeModal();
    titleRef.current.value = '';
  };

  // Handle event drag and drop
  const handleDrop = (e, day) => {
    e.preventDefault();
    if (!draggedEvent || draggedEvent.googleEvent) return;
    
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const updatedEvents = events.map(ev =>
      ev.id === draggedEvent.id ? { ...ev, date: newDate } : ev
    );
    
    saveEvents(updatedEvents);
    setDraggedEvent(null);
  };

  // Create event element
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

  // Render calendar days
  const renderCalendar = () => {
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const paddingDays = firstDay.getDay();
    const prevLastDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);

    let calendarDays = [];

    // Previous month days
    for (let i = paddingDays - 1; i >= 0; i--) {
      calendarDays.push(
        <div key={`prev-${i}`} className="day-cell different-month">
          <div className="day-number">{prevLastDay.getDate() - i}</div>
        </div>
      );
    }

    // Current month days
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
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

    // Next month days
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
    <div className="calendar-wrapper">
      {/* Google Connect Button
      <button 
        className={`google-connect-btn ${isGoogleConnected ? 'connected' : ''}`}
        onClick={handleGoogleAuthClick}
        disabled={!isGoogleApiLoaded}
      >
        {isGoogleConnected ? 'Disconnect Google' : 'Connect Google'}
      </button> */}
       <button 
        onClick={() => {
          if (!isGoogleConnected) {
            window.gapi.auth2.getAuthInstance().signIn();
          } else {
            window.gapi.auth2.getAuthInstance().signOut();
          }
        }}
        disabled={!isGoogleApiLoaded}
      >
        {isGoogleConnected ? 'Disconnect Google' : 'Connect Google Calendar'}
      </button>

      {authError && <div className="error">{authError}</div>}


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
            {['all', 'work', 'personal', 'meeting', 'google'].map(type => (
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

      <div className="modal" ref={modalRef}>
        <div className="modal-content">
          <h2>Add Event</h2>
          <div className="form-group">
            <input type="text" ref={titleRef} placeholder="Event Title" />
          </div>
          <div className="form-group">
            <select ref={typeRef} defaultValue="work">
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