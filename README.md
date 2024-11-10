# HadesX E-commerce

A modern e-commerce platform built with TypeScript and Firebase, featuring real-time cart updates, user authentication, and a responsive design.

## Features

- **Authentication System**
  - User registration and login
  - Firebase Authentication integration
  - Persistent sessions

- **Shopping Cart**
  - Real-time updates
  - Local storage persistence
  - Dynamic quantity management
  - Price calculations

- **Product Management**
  - Product catalog display
  - Category filtering
  - Stock management
  - Image handling

- **User Interface**
  - Responsive design
  - Dynamic navigation
  - Cart modal
  - Loading states

## Tech Stack

- TypeScript
- Firebase
  - Authentication
  - Firestore
  - Storage
- Custom Components
- TailwindCSS

## Project Structure
src/ ├── components/ │ ├── cart/ │ ├── common/ │ └── product/ ├── controllers/ ├── interfaces/ ├── models/ ├── pages/ ├── services/ ├── state/ └── utils/

## Getting Started

1. Clone the repository
```bash
git clone https://github.com/yourusername/hadesx-ecommerce.git

2. Install dependencies
npm run dev

3. Set up Firebase
Create a Firebase project
Add your Firebase config to src/config/firebase.ts

4.Run the development server
npm run dev
