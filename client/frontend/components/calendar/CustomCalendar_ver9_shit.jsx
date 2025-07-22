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
  const [authInstance, setAuthInstance] = useState(null);
  const [authError, setAuthError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const titleRef = useRef(null);
  const typeRef = useRef(null);
  const modalRef = useRef(null);
  
  const access_token = useAuthStore((s) => s.access_token);
  const { data } = getCalendar();
  
  // Google Calendar state
  const [googleEvents, setGoogleEvents] = useState([]);
  const [isGoogleConnected, setIsGoogleConnected] = useState(false);
  const [gapiLoaded, setGapiLoaded] = useState(false);

  // Load Google API script
  useEffect(() => {
  if (typeof window === 'undefined' || window.google?.accounts) return;

  const script = document.createElement('script');
  script.src = 'https://accounts.google.com/gsi/client';
  script.async = true;
  script.defer = true;

  script.onload = () => {
    console.log('Google Identity Services loaded');
    setGapiLoaded(true);
  };
  
  script.onerror = () => {
    console.error('Failed to load Google Identity Services');
    setAuthError('Failed to load Google services');
  };

  document.body.appendChild(script);

  return () => {
    const script = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
    if (script) document.body.removeChild(script);
  };
}, []);



  // useEffect(() => {
  //   if (typeof window === 'undefined' || window.gapi) return;

  //   const loadGapi = () => {
  //     return new Promise((resolve, reject) => {
  //       const script = document.createElement('script');
  //       script.src = 'https://accounts.google.com/gsi/client';
  //       // script.src = 'https://apis.google.com/js/api.js';
  //       script.async = true;
  //       script.defer = true;

  //       script.onload = () => {
  //         console.log('Google Identity Services loaded');
  //         setGapiLoaded(true);
  //       };
  //       script.onerror = () => {
  //         console.error('Failed to load Google Identity Services');
  //         setAuthError('Failed to load Google services');
  //       };
  //       document.body.appendChild(script);
  //     };

  //     loadGoogleScript();

  //     return () => {
  //       const script = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
  //       if (script) document.body.removeChild(script);
  //     };
  //   }, []);



  //       script.onload = () => {
  //         window.gapi.load('client:auth2', {
  //           callback: resolve,
  //           onerror: () => reject(new Error('Failed to load client:auth2'))
  //         });
  //       };
  //       script.onerror = () => reject(new Error('Failed to load Google API script'));
  //       document.body.appendChild(script);
  //     });
  //   };

  //   loadGapi()
  //     .then(() => {
  //       console.log('Google API loaded successfully');
  //       setGapiLoaded(true);
  //     })
  //     .catch(error => {
  //       console.error('Script loading error:', error);
  //       setAuthError('Failed to load Google services. Please try again later.');
  //     });

  //   return () => {
  //     // Cleanup if needed
  //   };
  // }, []);

  // Load Google API client separately
useEffect(() => {
  if (typeof window === 'undefined' || window.gapi) return;

  const script = document.createElement('script');
  script.src = 'https://apis.google.com/js/api.js';
  script.async = true;
  script.defer = true;

  script.onload = () => {
    console.log('Google API client loaded');
  };

  document.body.appendChild(script);

  return () => {
    const script = document.querySelector('script[src="https://apis.google.com/js/api.js"]');
    if (script) document.body.removeChild(script);
  };
}, []);


  // Initialize Google client when script is loaded
  // 
  
  useEffect(() => {
  if (!gapiLoaded || !window.google?.accounts || !window.gapi) return;

  const initGoogleAuth = async () => {
    try {
      // Initialize Google Identity
      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
        auto_select: false,
      });

      // Initialize Google API Client
      await window.gapi.client.init({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
        scope: 'https://www.googleapis.com/auth/calendar.events'
      });

      const auth = window.gapi.auth2.getAuthInstance();
      setAuthInstance(auth);
      auth.isSignedIn.listen(updateSigninStatus);
      updateSigninStatus(auth.isSignedIn.get());
      
    } catch (error) {
      console.error('Google auth initialization error:', error);
      setAuthError('Google authentication failed to initialize');
    }
  };

  initGoogleAuth();
}, [gapiLoaded]);

const handleCredentialResponse = (response) => {
  // This handles the one-tap sign-in response if you implement it
  console.log('Google credential response', response);
  // You would typically decode the JWT credential here
};
//     useEffect(() => {
//   if (!gapiLoaded) return;

//   const initGoogleAuth = () => {
//     try {
//       window.google.accounts.id.initialize({
//         client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
//         callback: handleCredentialResponse,
//         auto_select: false,
//       });
      
//       // For calendar access, you'll still need to load the client library
//       window.gapi.load('client:auth2', {
//         callback: () => {
//           window.gapi.client.init({
//             apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
//             discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
//             scope: 'https://www.googleapis.com/auth/calendar.events'
//           }).then(() => {
//             console.log('GAPI client initialized');
//             setAuthInstance(window.gapi.auth2.getAuthInstance());
//           });
//         },
//         onerror: () => {
//           throw new Error('Failed to load client:auth2');
//         }
//       });
//     } catch (error) {
//       console.error('Google auth initialization error:', error);
//       setAuthError('Google authentication failed to initialize');
//     }
//   };

//   initGoogleAuth();
// }, [gapiLoaded]);

//   const handleCredentialResponse = (response) => {
//     // Handle the credential response if needed
//   };


  const updateSigninStatus = (isSignedIn) => {
    setIsGoogleConnected(isSignedIn);
    if (isSignedIn) {
      fetchGoogleEvents();
    } else {
      setGoogleEvents([]);
    }
  };

  const handleGoogleAuthClick = async () => {
    if (!authInstance) return;
    
    try {
      setIsLoading(true);
      if (isGoogleConnected) {
        await authInstance.signOut();
      } else {
        await authInstance.signIn();
      }
    } catch (error) {
      console.error('Google auth error:', error);
      setAuthError('Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchGoogleEvents = async () => {
    if (!authInstance || !authInstance.isSignedIn.get()) return;

    try {
      const response = await window.gapi.client.calendar.events.list({
        calendarId: 'primary',
        timeMin: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).toISOString(),
        timeMax: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).toISOString(),
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
      console.error('Error fetching Google events:', error);
      setAuthError('Failed to fetch Google Calendar events');
    }
  };

  const getEventsForDay = (day) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return [
      ...events.filter(e => e.date.toDateString() === date.toDateString()),
      ...googleEvents.filter(e => e.date.toDateString() === date.toDateString())
    ];
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
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() + delta);
      return newDate;
    });
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
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()),
      googleEvent: false
    };

    saveEvents([...events, newEvent]);
    closeModal();
    titleRef.current.value = '';
  };

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
      const dayEvents = getEventsForDay(day);
      
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
      <div className="google-integration">
        <button 
          className={`google-connect-btn ${isGoogleConnected ? 'connected' : ''}`}
          onClick={handleGoogleAuthClick}
          disabled={!gapiLoaded || isLoading}
        >
          {isLoading ? 'Processing...' : 
           isGoogleConnected ? 'Disconnect Google' : 'Connect Google Calendar'}
        </button>
        {authError && <div className="error">{authError}</div>}
      </div>

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