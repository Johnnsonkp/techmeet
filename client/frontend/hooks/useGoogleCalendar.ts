interface AddEventToGoogleCalendarParams {
  access_token: string;
  refresh_token: string;
  summary: string;
  start: string;
  end: string;
  description?: string; // optional
  jwtToken: string; // Your app's JWT for authentication
}


export async function addEventToGoogleCalendar({
  access_token,
  refresh_token,
  summary,
  start,
  end,
  description,
  jwtToken // Your app's JWT for authentication
}: AddEventToGoogleCalendarParams): Promise<any> {
  // const BASE_URL = "http://localhost:5328/api/v1/calendar/add";
  const BASE_URL = process.env.NEXT_PUBLIC_FLASK_BASE_URL || 'http://localhost:5328';
  
  const payload = {
    access_token,
    refresh_token,
    summary,
    start,      // ISO string: "2025-07-21T10:00:00Z"
    end,        // ISO string: "2025-07-21T11:00:00Z"
    description // optional
  };

  const response = await fetch(
    `${BASE_URL}/api/v1/google_calendar/add`, 
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwtToken}`
      },
    body: JSON.stringify(payload)
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Failed to add event");
  }
  return data;
}

// addEventToGoogleCalendar({
//   access_token: "<google_access_token>",
//   refresh_token: "<google_refresh_token>",
//   summary: "Team Meeting",
//   start: "2025-07-21T10:00:00Z",
//   end: "2025-07-21T11:00:00Z",
//   description: "Discuss project updates",
//   jwtToken: "<your_app_jwt_token>"
// })
//   .then(event => console.log("Event created:", event))
//   .catch(err => console.error("Error:", err));