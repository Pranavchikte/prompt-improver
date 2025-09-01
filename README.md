# Prompt Improver

Prompt Improver is a full-stack, AI-powered web application built to transform raw, unstructured user prompts into high-quality, effective inputs for Large Language Models (LLMs). It provides a distraction-free workspace tailored to elevate prompt engineering far beyond basic chat interfaces.

---

## 🚀 Live Demo

[Access the live application here.](https://prompt-improver-frontend.onrender.com) <!-- Replace # with your actual demo URL -->

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Key Features](#key-features)
- [Architectural Decisions](#architectural-decisions)
- [Local Development](#local-development)
- [Deployment](#deployment)

---

## Overview

LLMs are only as good as the prompts they receive. Prompt Improver was built to make prompt writing easier, clearer, and more effective. By leveraging the Google Gemini API, it takes your initial ideas and automatically transforms them into structured, well-defined prompts—clearly separating role, task, constraints, and output format.

---

## Tech Stack

Prompt Improver is a decoupled, full-stack application using modern tools for both the frontend and backend.

**Frontend**
- **Framework:** Next.js (React)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Deployment:** Render (Static Site)

**Backend**
- **Framework:** Flask
- **Language:** Python
- **API:** RESTful API
- **Server:** Gunicorn (WSGI)
- **AI Integration:** Google Gemini API
- **Deployment:** Render (Web Service)

---

## Key Features

- **AI-Powered Prompt Refinement:** Uses Google Gemini to analyze and enhance user prompts.
- **Structured Output:** Organizes prompts into distinct sections for better clarity and LLM understanding.
- **Decoupled Architecture:** Separate frontend and backend for easier scaling and maintainability.
- **Minimalist UI:** Focused interface for efficient prompt engineering.
- **Copy to Clipboard:** One-click copying for seamless workflow with any LLM tool.

---

## Architectural Decisions

Prompt Improver is built with a decoupled architecture: the frontend and backend are separate, independently deployed services.

**Why this approach?**
- **Scalability:** Scale the frontend and backend independently to handle variable loads.
- **Tech Specialization:** Use the best tools for each part—Next.js on a CDN for frontend speed, Flask as a persistent web service for backend reliability.
- **Separation of Concerns:** Clean boundaries between UI and API logic improve maintainability and testing.

---

## Local Development

Get started locally by following these steps:

### Prerequisites

- Node.js & npm
- Python & pip
- Google Gemini API Key

### 1. Clone the Repository

```sh
git clone https://github.com/Pranavchikte/prompt-improver.git
cd prompt-improver
```

### 2. Backend Setup

```sh
# Navigate to the backend directory
cd backend

# Create and activate a virtual environment
python -m venv venv
source venv/bin/activate  # On Windows, use venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Add your Gemini API key
echo "GEMINI_API_KEY=YOUR_API_KEY_HERE" > .env

# Run the backend server
flask run
```

The backend runs at [http://127.0.0.1:5000](http://127.0.0.1:5000).

### 3. Frontend Setup

```sh
# Open a new terminal and navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Set the backend URL for local development
echo "NEXT_PUBLIC_API_URL=http://127.0.0.1:5000/api" > .env.local

# Run the frontend development server
npm run dev
```

The frontend runs at [http://localhost:3000](http://localhost:3000).

---

## Deployment

Prompt Improver is deployed on Render as two independent services:

### Backend Service (Web Service)
- **Root Directory:** `backend`
- **Build Command:** `pip install -r requirements.txt`
- **Start Command:** `gunicorn "app:create_app()"`
- **Branch:** `main` (with Continuous Deployment enabled)

### Frontend Service (Static Site)
- **Root Directory:** `frontend`
- **Build Command:** `npm run build`
- **Publish Directory:** `out`
- **Environment Variable:** `NEXT_PUBLIC_API_URL` set to the live backend URL

---

