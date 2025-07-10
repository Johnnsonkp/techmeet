export function formatDateTimeNow() {
  const now = new Date();

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const day = days[now.getDay()];
  const date = now.getDate();
  const month = months[now.getMonth()];

  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // convert 0 to 12-hour format

  return `${day}, ${date} ${month}, ${hours}:${minutes} ${ampm}`;
}