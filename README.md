# WTWR — Weather-To-Wear Recommendation App

WTWR (Weather-To-Wear Recommendation) is a fullstack application that provides clothing recommendations based on real-time weather conditions. It combines a React frontend with a Node.js/Express backend to deliver a dynamic, data-driven user experience.

- Frontend Repository: [https://github.com/WyattYousey/se_project_react_WTWR](https://github.com/WyattYousey/se_project_react_WTWR)
- Backend Repository: [https://github.com/WyattYousey/se_project_express](https://github.com/WyattYousey/se_project_express)
- Live Demo:
[https://whatstheweather.flowtemp.ro/](https://whatstheweather.flowtemp.ro/)


---

## Why This Project

This project was built to demonstrate real-world fullstack development practices, including API integration, state management, authentication, and component-driven UI design. It reflects an iterative development process and focuses on building features that mirror production-level applications.

---

## Key Engineering Highlights

- Built a fullstack architecture with a React frontend and Express/MongoDB backend
- Implemented JWT-based authentication and protected routes
- Designed RESTful API endpoints for CRUD operations and user interactions
- Developed a dynamic like/unlike system with real-time UI updates
- Created reusable and scalable React components
- Integrated geolocation and external weather APIs for contextual data
- Managed global state using React Context

---

## Tech Stack

### Frontend

- React
- Vite
- JavaScript (ES6+)
- CSS

### Backend

- Node.js
- Express
- MongoDB (Mongoose)

### Other

- OpenWeather API
- JWT Authentication

---

## Feature Summary

- Weather-based outfit recommendations
- Temperature-aware clothing filtering
- User authentication (signup/login)
- Add, delete, and like clothing items
- Real-time like/unlike functionality
- Responsive desktop and mobile layouts
- Modal-based UI for item creation, editing, and preview

---

## Development Approach

The project was built incrementally using small, focused commits to simulate a real production workflow:

- Initial frontend scaffolding with React and Vite
- Backend API development with Express and MongoDB
- Integration between frontend and backend
- Authentication and protected route implementation
- Feature expansion (likes, modals, profile management)
- UI/UX refinements and responsive design

---

## Screenshots

![Home](/src/assets/screenshots/home-screenshot.png)  
![Item Preview](/src/assets/screenshots/item-preview-screenshot.png)  
![Add Garment](/src/assets/screenshots/add-garment-screenshot.png)  
![Mobile](/src/assets/screenshots/mobile-screenshot.png)

---

## Local Setup

### 1. Clone repositories

```bash
git clone https://github.com/Yournd/se_project_react_WTWR
git clone https://github.com/Yournd/se_project_express
```

### 2. Setup backend

```bash
cd se_project_express
npm install
npm run dev
```

### 3. Setup Frontend

```bash
cd se_project_react_WTWR
npm install
```

### Create a .env file

```bash
VITE_API_KEY=YOUR_OPENWEATHER_API_KEY
```

### Run the app

```bash
npm run dev
```

---

### Project Pitch Video

Check out this video where I walk through the project and discuss key challenges: [https://www.loom.com/share/4a9348aa16f445f4bf42828a89204618](https://www.loom.com/share/4a9348aa16f445f4bf42828a89204618)
