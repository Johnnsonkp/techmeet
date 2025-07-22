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
  const [isGoogleApiLoaded, setIsGoogleApiLoaded] = useState(false);

// for debugging
  useEffect(() => {
  console.log("Environment Variables:", {
    clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ? "✅ Loaded" : "❌ Missing",
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY ? "✅ Loaded" : "❌ Missing"
  });
}, []);

  // Added on 20th July 2025

  useEffect(() => {
  const loadGoogleAPI = async () => {
    try {
      // 1. Load script if not present
      if (!window.gapi) {
        await new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://apis.google.com/js/api.js';
          script.async = true;
          script.defer = true;
          script.onload = resolve;
          script.onerror = () => reject(new Error("Failed to load Google API script"));
          document.body.appendChild(script);
        });
      }

      // 2. Initialize client
      await initGoogleClient();
      
    } catch (error) {
      console.error("Loading Error:", error);
      setAuthError(error.message);
    }
  };

  loadGoogleAPI();

  return () => {
    // Cleanup if needed
  };
}, []);
 //

  // removed on 20th July 2025
  // Initialize Google API
  // useEffect(() => {
  //   const loadGoogleAPI = () => {
  //     const script = document.createElement('script');
  //     script.src = 'https://apis.google.com/js/api.js';
  //     script.async = true;
  //     script.defer = true;
  //     script.onload = () => {
  //       window.gapi.load('client:auth2', () => {
  //         initGoogleClient().catch(console.error);
  //       });
  //     };
  //     script.onerror = () => {
  //       setAuthError("Failed to load Google API script");
  //     };
  //     document.body.appendChild(script);
  //   };

  //   if (!window.gapi) {
  //     loadGoogleAPI();
  //   } else if (!window.gapi.auth2) {
  //     window.gapi.load('client:auth2', () => {
  //       initGoogleClient().catch(console.error);
  //     });
  //   }

  //   return () => {
  //     // Cleanup if needed
  //   };
  // }, []);

  //

//   const initGoogleClient = async () => {
//     try {
//       setIsLoading(true);
//       setAuthError(null);
      
//       await window.gapi.client.init({
//         apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
//         clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
//         discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
//         // scope: "https://www.googleapis.com/auth/calendar" // Write access
//         // scope: "https://www.googleapis.com/auth/calendar.events.readonly"
//         scope: "https://www.googleapis.com/auth/calendar.events"
//       });

// 0      // Get or initialize auth instance
//       let auth;
//       try {
//         auth = window.gapi.auth2.getAuthInstance();
//         if (!auth) {
//           auth = await window.gapi.auth2.init({
//             client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
//             // scope: "https://www.googleapis.com/auth/calendar.events.readonly"
//             // scope: "https://www.googleapis.com/auth/calendar" // Write access
//             scope: "https://www.googleapis.com/auth/calendar.events"
//           });
//         }
//       } catch (e) {
//         console.error("Auth instance error:", e);
//         throw e;
//       }

//       setAuthInstance(auth);
//       setIsGoogleApiLoaded(true);
//       auth.isSignedIn.listen(updateSigninStatus);
//       updateSigninStatus(auth.isSignedIn.get());
//     } catch (error) {
//       setAuthError("Failed to initialize Google API");
//       console.error("Error initializing Google client:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };


// disabled on 20th July 2025 for debugging 
//   const initGoogleClient = async () => {
//   try {
//     console.log("Step 1: Checking gapi existence", window.gapi ? "✅" : "❌");
    
//     // Verify critical objects exist
//     if (!window.gapi || !window.gapi.load || !window.gapi.client) {
//       throw new Error("Google API not properly loaded");
//     }

//     console.log("Step 2: Loading auth2");
//     await new Promise((resolve, reject) => {
//       window.gapi.load('auth2', {
//         callback: resolve,
//         onerror: reject
//       });
//     });

//     console.log("Step 3: Initializing client");
//     await window.gapi.client.init({
//       apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
//       clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
//       discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
//       scope: "https://www.googleapis.com/auth/calendar.events"
//     });

//     console.log("Step 4: Initializing auth");
//     const auth = window.gapi.auth2.getAuthInstance() || 
//       await window.gapi.auth2.init({
//         client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
//         scope: "https://www.googleapis.com/auth/calendar.events"
//       });

//     console.log("Step 5: Setting up listeners");
//     auth.isSignedIn.listen(updateSigninStatus);
//     updateSigninStatus(auth.isSignedIn.get());

//   } catch (error) {
//     console.error("FULL ERROR OBJECT:", {
//       message: error.message,
//       stack: error.stack,
//       gapiStatus: {
//         loaded: !!window.gapi,
//         auth2: !!window.gapi?.auth2,
//         client: !!window.gapi?.client
//       }
//     });
//     throw error;
//   }
// };

// removed on 20th July 2025  
// const initGoogleClient = async () => {
//   try {
//     // Add this verification FIRST
//     if (typeof window === 'undefined') {
//       throw new Error("Running on server - gapi only works client-side");
//     }

//     // Nuclear error capturing
//     const errorData = {};
//     try {
//       if (!window.gapi) {
//         errorData.stage = "gapi-not-loaded";
//         throw new Error("window.gapi undefined");
//       }

//       // Proceed with initialization...
//     } catch (innerError) {
//       errorData.innerError = {
//         name: innerError.name,
//         message: innerError.message,
//         stack: innerError.stack
//       };
//       throw errorData;
//     }
//   } catch (error) {
//     // Serialize EVERYTHING
//     console.error("💣 ULTIMATE ERROR DUMP", JSON.stringify({
//       timestamp: new Date().toISOString(),
//       error: error.innerError || {
//         name: error.name,
//         message: error.message,
//         stack: error.stack
//       },
//       windowStatus: {
//         gapi: !!window.gapi,
//         gapiAuth2: !!window.gapi?.auth2,
//         documentReady: document.readyState
//       },
//       env: {
//         clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID 
//           ? "✅ (length: " + process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID.length + ")" 
//           : "❌",
//         apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY 
//           ? "✅ (length: " + process.env.NEXT_PUBLIC_GOOGLE_API_KEY.length + ")"
//           : "❌"
//       },
//       scripts: Array.from(document.scripts).map(s => s.src)
//     }, null, 2));

//     throw new Error(`Initialization failed: ${error.message}`);
//   }
// };

// Added 20th July 2025
const initGoogleClient = async () => {
  try {
    setIsLoading(true);
    setAuthError(null);

    // 1. Verify gapi is properly loaded
    if (!window.gapi || !window.gapi.load) {
      throw new Error("Google API script not loaded properly");
    }

    // 2. Load client and auth2
    await new Promise((resolve, reject) => {
      window.gapi.load('client:auth2', {
        callback: resolve,
        onerror: reject
      });
    });

    // 3. Initialize client
    await window.gapi.client.init({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
      scope: "https://www.googleapis.com/auth/calendar.events"
    });

    // 4. Initialize auth
    const auth = window.gapi.auth2.getAuthInstance() || 
      await window.gapi.auth2.init({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        scope: "https://www.googleapis.com/auth/calendar.events"
      });

    setAuthInstance(auth);
    setIsGoogleApiLoaded(true);
    auth.isSignedIn.listen(updateSigninStatus);
    updateSigninStatus(auth.isSignedIn.get());

  } catch (error) {
    console.error("Initialization Error:", {
      message: error.message,
      stack: error.stack,
      gapiStatus: {
        loaded: !!window.gapi,
        auth2: !!window.gapi?.auth2,
        client: !!window.gapi?.client
      }
    });
    setAuthError(`Initialization failed: ${error.message}`);
  } finally {
    setIsLoading(false);
  }
};

const updateSigninStatus = (isSignedIn) => {
    setIsGoogleConnected(isSignedIn);
    if (isSignedIn) {
      fetchGoogleEvents();
    } else {
      setGoogleEvents([]);
    }
  };

  const handleGoogleAuthClick = async () => {
    if (!authInstance || isLoading) return;
    
    try {
      setIsLoading(true);
      setAuthError(null);
      
      if (isGoogleConnected) {
        await authInstance.signOut();
      } else {
        await authInstance.signIn();
        await fetchGoogleEvents();
      }
    } catch (error) {
      setAuthError(error.message || "Authentication failed");
      console.error("Google auth error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchGoogleEvents = async () => {
    if (!authInstance) return;

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

function GoogleApiLoader() {
  const [status, setStatus] = useState("loading");
  
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.async = true;
    script.defer = true;
    script.onload = () => setStatus("loaded");
    script.onerror = () => setStatus("failed");
    document.body.appendChild(script);

    return () => document.body.removeChild(script);
  }, []);

  return (
    <div className="api-status">
      Google API: {status} 
      {status === "failed" && (
        <button onClick={() => window.location.reload()}>
          Retry Loading
        </button>
      )}
    </div>
  );
}


  return (
    // removed 20th July 2025
    // <div className="calendar-wrapper">
    //   <GoogleApiLoader />
    //   <button 
    //     className={`google-connect-btn ${isGoogleConnected ? 'connected' : ''}`}
    //     onClick={handleGoogleAuthClick}
    //     disabled={!isGoogleApiLoaded || isLoading}
    //   >
    //     {isLoading ? 'Processing...' : 
    //      isGoogleConnected ? 'Disconnect Google' : 'Connect Google'}
    //   </button>

      <div className="google-controls">
        <button 
          onClick={handleGoogleAuthClick}
          disabled={!isGoogleApiLoaded || isLoading}
        >
          {isLoading ? 'Processing...' : 
          isGoogleConnected ? 'Disconnect Google' : 'Connect Google'}
        </button>
        
        {isGoogleConnected && (
          <button 
            onClick={fetchGoogleEvents}
            className="refresh-btn"
          >
            ↻ Refresh Events
          </button>
        )}
      {/* </div> */}

      {authError && <div className="error">{authError}</div>}

      {/* original calendar UI */}
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
