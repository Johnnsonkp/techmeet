'use client'
import './calendarStyles.css'
import React, { useEffect, useRef, useState } from 'react'

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const GOOGLE_SCOPES = 'https://www.googleapis.com/auth/calendar.events'
const CALENDAR_DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'

function CustomCalendar() {
  // State
  const [currentDate, setCurrentDate] = useState(new Date())
  const [events, setEvents] = useState([])
  const [googleEvents, setGoogleEvents] = useState([])
  const [isGoogleConnected, setIsGoogleConnected] = useState(false)
  const [isGoogleApiLoaded, setIsGoogleApiLoaded] = useState(false)
  const [authError, setAuthError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  // Refs
  
  const titleRef = useRef(null);
  const typeRef = useRef(null);
  const modalRef = useRef(null);


  const [filterType, setFilterType] = useState('all');

  // Initialize Google API
  useEffect(() => {
    const initGoogleAPI = async () => {
      try {
        await loadGapiScript()
        await loadAuthClient()
        await initClient()
        setIsGoogleApiLoaded(true)
      } catch (error) {
        console.error('Google API initialization failed:', error)
        setAuthError('Failed to load Google services')
      }
    }

    if (!window.gapi) initGoogleAPI()
  }, [])

  const loadGapiScript = () => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.src = 'https://apis.google.com/js/api.js'
      script.async = true
      script.defer = true
      script.onload = resolve
      script.onerror = () => reject(new Error('Failed to load Google API script'))
      document.body.appendChild(script)
    })
  }

  const loadAuthClient = () => {
    return new Promise((resolve, reject) => {
      window.gapi.load('client:auth2', {
        callback: resolve,
        onerror: reject,
        timeout: 10000
      })
    })
  }

  const initClient = async () => {
    await window.gapi.client.init({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      discoveryDocs: [CALENDAR_DISCOVERY_DOC],
      scope: GOOGLE_SCOPES
    })

    const auth = window.gapi.auth2.getAuthInstance()
    auth.isSignedIn.listen(handleAuthChange)
    handleAuthChange(auth.isSignedIn.get())
  }

  const handleAuthChange = (isSignedIn) => {
    setIsGoogleConnected(isSignedIn)
    if (isSignedIn) {
      refreshTokenAndFetchEvents()
    } else {
      setGoogleEvents([])
    }
  }

  const refreshTokenAndFetchEvents = async () => {
    try {
      const auth = window.gapi.auth2.getAuthInstance()
      const user = auth.currentUser.get()
      await user.reloadAuthResponse()
      await fetchGoogleEvents()
    } catch (error) {
      console.error('Token refresh failed:', error)
      setAuthError('Failed to refresh session')
    }
  }

//   

  const createEventElement = (event, filterType) => {
  if (!event || !event.id) return null;

  return (
    <div
      key={event.id}
      className={`event ${event.type || ''} ${event.googleEvent ? 'google-event' : ''}`}
      draggable={!event.googleEvent}
      onDragStart={() => !event.googleEvent && setDraggedEvent(event)}
      onDragEnd={() => !event.googleEvent && setDraggedEvent(null)}
      style={{ 
        display: filterType === 'all' || filterType === event.type ? 'block' : 'none',
        cursor: event.googleEvent ? 'default' : 'grab'
      }}
      title={event.googleEvent ? `${event.description || ''}\n${event.location || ''}` : ''}
    >
      {event.title || 'Untitled Event'}
      {event.googleEvent && <span className="google-icon">G</span>}
    </div>
  );
};

  const fetchGoogleEvents = async () => {
    try {
      const response = await window.gapi.client.calendar.events.list({
        calendarId: 'primary',
        timeMin: getMonthStart(currentDate).toISOString(),
        timeMax: getMonthEnd(currentDate).toISOString(),
        showDeleted: false,
        singleEvents: true,
        orderBy: 'startTime'
      })

      const events = response.result.items.map(event => ({
        id: event.id,
        title: event.summary || 'No title',
        type: 'google',
        date: new Date(event.start.dateTime || event.start.date),
        description: event.description,
        location: event.location,
        googleEvent: true
      }))

      setGoogleEvents(events)
    } catch (error) {
      console.error('Failed to fetch events:', error)
      setAuthError('Failed to load calendar events')
    }
  }

  const handleGoogleAuth = async () => {
    if (!window.gapi || isLoading) return

    try {
      setIsLoading(true)
      setAuthError(null)
      
      const auth = window.gapi.auth2.getAuthInstance()
      
      if (isGoogleConnected) {
        await auth.signOut()
      } else {
        await auth.signIn()
        await refreshTokenAndFetchEvents()
      }
    } catch (error) {
      console.error('Authentication error:', error)
      setAuthError(error.message || 'Authentication failed')
    } finally {
      setIsLoading(false)
    }
  }

  // Calendar helper functions
  const getMonthStart = (date) => new Date(date.getFullYear(), date.getMonth(), 1)
  const getMonthEnd = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0)

  const changeMonth = (delta) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev)
      newDate.setMonth(prev.getMonth() + delta)
      return newDate
    })
  }

  // ... (keep your existing calendar rendering and UI logic)


  // Render calendar days
  
  // Save events to local storage
  const saveEvents = (newEvents) => {
    localStorage.setItem('calendarEvents', JSON.stringify(newEvents));
    setEvents(newEvents);
  };

  // // Change month
  // const changeMonth = (delta) => {
  //   setCurrentDate(prevDate => {
  //     const newDate = new Date(prevDate);
  //     newDate.setMonth(prevDate.getMonth() + delta);
  //     return newDate;
  //   });
  // };

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


  // return (
  //   <div className="calendar-wrapper">
  //     <button 
  //       onClick={handleGoogleAuth}
  //       disabled={!isGoogleApiLoaded || isLoading}
  //       className={`auth-button ${isGoogleConnected ? 'connected' : ''}`}
  //     >
  //       {isLoading ? 'Processing...' : 
  //        isGoogleConnected ? 'Disconnect Google' : 'Connect Google Calendar'}
  //     </button>

  //     {authError && <div className="error-message">{authError}</div>}
  //         {dayEvents.map(event => createEventElement(event, filterType))}

  //     {/* originaal calendar UI components */}
  //     <div className="calendar-container">
  //       <div className="calendar-header">
  //         <div className="month-nav">
  //           <button className="nav-btn" onClick={() => changeMonth(-1)}>←</button>
  //           <div className="current-month">
  //             {months[currentDate.getMonth()]} {currentDate.getFullYear()}
  //           </div>
  //           <button className="nav-btn" onClick={() => changeMonth(1)}>→</button>
  //         </div>

  //         {/* <div className="filter-controls"> */}
  //           {/* {['all', 'work', 'personal', 'meeting', 'google'].map(type => ( */}
  //           {/* {['primary', 'google'].map(type => (
  //             <button
  //               key={type}
  //               className={`filter-btn ${filterType === type ? 'active' : ''}`}
  //               onClick={() => setFilterType(type)}
  //             >
  //               {type.charAt(0).toUpperCase() + type.slice(1)}
  //             </button>
  //           ))}
  //         </div> */}
  //       </div>

  //       <div className="calendar-grid">
  //         {days.map(day => <div key={day} className="day-header">{day}</div>)}
  //         {renderCalendar()}
  //       </div>
  //     </div>

  //     <button className="add-event-btn" onClick={openModal}>+</button>

  //     <div className="modal" ref={modalRef}>
  //       <div className="modal-content">
  //         <h2>Add Event</h2>
  //         <div className="form-group">
  //           <input type="text" ref={titleRef} placeholder="Event Title" />
  //         </div>
  //         <div className="form-group">
  //           <select ref={typeRef} defaultValue="work">
  //             <option value="work">Work</option>
  //             <option value="personal">Personal</option>
  //             <option value="meeting">Meeting</option>
  //           </select>
  //         </div>
  //         <div className="modal-buttons">
  //           <button className="modal-btn cancel-btn" onClick={closeModal}>Cancel</button>
  //           <button className="modal-btn save-btn" onClick={saveEvent}>Save</button>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // )
  return (
  <div className="calendar-wrapper">
    <button 
      onClick={handleGoogleAuth}
      disabled={!isGoogleApiLoaded || isLoading}
      className={`auth-button ${isGoogleConnected ? 'connected' : ''}`}
    >
      {isLoading ? 'Processing...' : 
       isGoogleConnected ? 'Disconnect Google' : 'Connect Google Calendar'}
    </button>

    {authError && <div className="error-message">{authError}</div>}

    {/* Calendar UI */}
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

export default CustomCalendar
