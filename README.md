# Quiz Generator Frontend

A React-based frontend application for an AI-powered quiz generator that allows users to generate interactive quizzes through a chat-based interface.

---

## Overview

This application provides the user interface for the Quiz Generator system. Users can log in, create chat sessions, send topics, and receive AI-generated quizzes rendered dynamically in the browser.

The frontend communicates with a Laravel REST API backend.

---

## Tech Stack

- Frontend: React
- Build Tool: Vite
- Styling: CSS 
- Backend API: Laravel

---

## Features

- User authentication (Login / Register)
- Guest mode support
- Chat-based quiz generation
- Dynamic quiz rendering
- Support for MCQ and True/False questions
- Chat history for authenticated users

---

## Backend API

This frontend is connected to the Quiz Generator API.

Backend repository:  
https://github.com/cerine0205/quiz-generator-api.git

---

## Main Pages

- Login
- Register
- Chat
- Guest Quiz Generator

---

## API Integration

The application communicates with the backend using REST API endpoints:

- POST /api/register
- POST /api/login
- GET /api/user
- GET /api/chats
- POST /api/chats
- GET /api/chats/{id}
- DELETE /api/chats/{id}
- POST /api/chats/{id}/generate
- POST /api/guest/generate

---

## Future Improvements

- Quiz scoring system
- Difficulty levels
- Improved UI/UX
- Dark mode
- User performance dashboard

