# Notes Management System

A powerful and intuitive **Notes Management System** built using the **MERN (MongoDB, Express, React, Node.js) stack**. This application enables users to seamlessly create, read, update, and delete notes while offering advanced features like **user authentication**, **speech recognition**, **text-to-speech**, and a robust **search functionality** for easy note management.

## Features

- **User Authentication**: Secure user registration and login using JWT for token-based authentication.
- **CRUD Operations**: Effortless creation, viewing, updating, and deletion of notes with real-time updates.
- **Speech Recognition**: Convert spoken words into text and seamlessly save them as notes.
- **Text-to-Speech**: Listen to note content with a click, providing an alternative to reading.
- **Search Functionality**: Quickly find notes based on keywords in the title or content.

## Tech Stack

- **Frontend**: React, HTML5, CSS3, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Token)
- **Speech Recognition**: Web Speech API

## Project Structure

```plaintext
📁 notes-management-system
├── 📁 client                   # React Frontend
│   ├── 📁 public               # Public assets
│   └── 📁 src
│       ├── 📁 components       # Reusable UI components
│       ├── 📁 context          # Auth & Search context
│       ├── 📁 pages            # Individual page components
│       ├── 📁 styles           # CSS and styling
│       └── App.js              # Main React app component
├── 📁 server                   # Node.js + Express Backend
│   ├── 📁 controllers          # Controllers for API routes
│   ├── 📁 models               # Mongoose schemas/models
│   ├── 📁 routes               # API routes
│   ├── 📁 config               # Database and environment configuration
│   └── server.js               # Entry point for the Node server
└── README.md                   # Project README file

