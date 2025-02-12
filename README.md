# NoteNest Full-Stack Notes Application

A full‑stack notes application built with a React frontend (using Vite and Tailwind CSS) and an Express/Node.js backend (with MongoDB). This application provides user authentication, note management (CRUD), and search functionality. Authentication is handled using JSON Web Tokens (JWT) stored in HttpOnly cookies with proper cross‑domain (CORS) configurations.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Usage](#usage)
- [Contributing](#contributing)
- [Acknowledgments](#acknowledgments)

## Features

- User signup, login, and logout
- Create, read, update, and delete (CRUD) notes
- Secure JWT-based authentication (stored in HttpOnly cookies)
- Cross-domain support with proper CORS configuration
- Responsive design using Tailwind CSS

## Technologies

- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express, MongoDB (Mongoose)
- **Authentication:** JSON Web Tokens (JWT)
- **Deployment:** Render (for both frontend and backend)


## Installation

### Backend Setup

1. **Navigate to the `server` folder:**
   ```bash
   cd server
   npm install
- Create a .env file in the server directory with the following variables:
  ```bash
  PORT=5000
  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret
  NODE_ENV=development
- Start the backend server
  ```bash
  npm run dev
### Frontend Setup

1. **Navigate to the `client` folder:**
   ```bash
   cd client
   npm install
- Start the backend server
  ```bash
  npm run dev

## Usage
1) Access the Application:
- For local development, open your browser and navigate to http://localhost:5173.
- In production, use the deployed frontend URL (e.g., https://note-nest-f82h.onrender.com).

2) User Authentication:
- Signup: Create a new account.
- Login: Sign in using your credentials. On successful login, a JWT is set as an HttpOnly cookie.
- Logout: Clear the cookie and end the session.
  
3) Notes Management:
Once logged in, create, edit, and delete your notes.
All authenticated requests automatically include the JWT cookie, so you won’t see 401 errors.

4) Deployment
- Frontend: Deploy the client folder to a static hosting provider (e.g., Render, Netlify, Vercel).
- Backend: Deploy the server folder to a Node.js hosting service (e.g., Render, Heroku). Ensure your production environment sets NODE_ENV=production and the cookie options in the authentication routes are properly configured for cross-domain usage.

## Contributing
Contributions are welcome! Please fork the repository and submit pull requests for any improvements or bug fixes. 

## Acknowledgments
- Thanks to the developers of React, Express, Vite, Tailwind CSS, and MongoDB for providing excellent tools to build modern web applications.
- Special thanks to the Render team for making deployment straightforward.
  
---

Feel free to modify this README to better suit your project's specifics, add any additional instructions, or include screenshots and usage examples as needed. This should give users a comprehensive guide on what the project is, how to install it, and how to get started.

