# Techmeet
A central hub for discovering tech events, conferences, all things tech-related promoting networking opportunities and career growth

## Live Deployment:
🔗 **Live App**: [https://techmeet-production.up.railway.app/](https://techmeet-production.up.railway.app/)

## Tech Stack
- Frontend: Next.js (React)
- Backend: Flask
- Database: SQLAlchemy (via Flask)
- OAuth: Google OAuth 2.0
- External APIs: Eventbrite, Meetup (via SourceAPI)
- DevOps: Docker & Docker Compose

## Installation

```
to be added
```

## Running Locally with Docker Compose

### Folder Structure
```
techmeet/
├── client/        # Next.js frontend
├── server/        # Flask backend
└── docker-compose.yml
```

### Start the App
Make sure Docker is running, then:
```
docker-compose up --build
```

### Access the App

- Frontend (Next.js): http://localhost:3000
- Backend (Flask API): http://localhost:5328


## System Architecture

### Class and Package Design
Modular structure with clear separation between:

- Presentation Layer (Frontend)
- Business Logic (Flask models & services)
- Persistence Layer (SQLAlchemy)

### Core Entities
- User, Profile, Event, Tag, Category, Connection
- Join tables: UserEvent, EventTag, CategoryTag
- Integration: OAuthConnection, SourceAPI

## Contributing

John Nkpolukwu

Crystal Carroll

Won Chak Leung

Mao Liu



## License

[MIT](https://choosealicense.com/licenses/mit/)
