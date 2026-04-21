# Unddict - Project Specification

## 1. Overview
**Unddict** is a specialized web application designed to help individuals overcome addiction, with a primary focus on heavy marijuana use. The application employs a "growth" metaphor, using a bright spring aesthetic and motivational tracking to help users "realize their potential."

**Tagline:** Your potential, realized.

## 2. Core Objectives
- Provide a clear, real-time visual of sobriety progress.
- Quantify the tangible benefits of recovery (money and time saved).
- Offer immediate access to proven behavioral and peer-support methods.
- Maintain a private, secure, and encouraging environment for personal growth.

## 3. Key Features

### 3.1 Authentication & Privacy
- **Secure Registration:** Collects Name, Username, Email, and Password.
- **JWT Authentication:** Secure session management with tokens.
- **Password Protection:** Industry-standard hashing using Bcrypt.

### 3.2 Growth Dashboard
- **Live Growth Clock:** A high-precision timer showing time since the user's "Bloom" (sobriety start date) in days, hours, minutes, and seconds.
- **Harvest Wealth:** Automatic calculation of cumulative money saved based on daily spending habits.
- **Potential Realized:** Calculation of cumulative time gained back for productive or healthy activities.
- **Vision Statement:** A prominently displayed personal "Why" or "Vision" statement to reinforce motivation during cravings.

### 3.3 Knowledge Base
- **Recovery Methods:** A dedicated section outlining research-backed strategies:
    - **CBT (Mindset Shift):** Cognitive Behavioral Therapy techniques.
    - **MET (Find Your Spark):** Motivational Enhancement Therapy.
    - **Peer Support (Growing Together):** Information on Marijuana Anonymous and SMART Recovery.
    - **Healthy Replacement (Flourish):** Science-based lifestyle adjustments.

## 4. Technical Stack

### 4.1 Frontend
- **Framework:** React 19 (Vite)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (Spring Theme: Emerald/Slate)
- **Icons:** Lucide-React
- **State Management:** React Context API (Auth)
- **Routing:** React Router 7

### 4.2 Backend
- **Runtime:** Node.js
- **Framework:** Express
- **Security:** Bcrypt (hashing), JSONWebToken (auth)
- **Middleware:** CORS, Express JSON parser

### 4.3 Database
- **Engine:** SQLite
- **Schema:**
    - `users`: Storage for credentials and profile info.
    - `tracker_data`: Relational storage for start dates, habit costs, and vision statements.

## 5. Visual Identity
- **Theme:** Bright Spring Bloom.
- **Primary Palette:** 
    - Emerald Green (#059669): Represents growth and vitality.
    - Slate Gray (#1e293b): Provides grounding and clarity.
    - Bloom Pink/Sky Blue: Accents for milestones.
- **Imagery:** Sprouts, Leaves, and Shields to symbolize the "flourishing" journey.

## 6. Future Roadmap
- **Community Garden:** Anonymous board for sharing wins.
- **Milestone Badges:** Visual "flowers" that bloom at 1 day, 1 week, 1 month, etc.
- **Panic Button:** Immediate deep-breathing exercises or emergency contact access.
- **Daily Journaling:** Mood tracking to identify emotional triggers.
