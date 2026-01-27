# Netflix Clone (Full Stack)
 
This is a full-stack Netflix Clone built with React (Vite), Node.js, Express, and MongoDB. It mimics the original Netflix UI/UX with high fidelity, including smooth animations and responsive design.

## Features
- **Authentication**: User registration and login using JWT.
- **Profiles**: Management of multiple user profiles (e.g., Kids, Personal).
- **Movies & TV**: Browsing via TMDB API (proxied securely).
- **Animations**: Premium feel using Framer Motion.
- **My List**: Add/Remove movies to your personal list (backend persisted).

## Tech Stack
- **Frontend**: React, Tailwind CSS, Framer Motion, Axios.
- **Backend**: Node.js, Express.js, Mongoose.
- **Database**: MongoDB.

## Getting Started

### 1. Server Setup
```bash
cd server
npm install
# Configure .env (see walkthrough.md or server/.env example)
npm run dev
```

### 2. Client Setup
```bash
cd client
npm install
npm run dev
```

For detailed documentation on the architecture and API routes, please refer to [walkthrough.md](walkthrough.md).
