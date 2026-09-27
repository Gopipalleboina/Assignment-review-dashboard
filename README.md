# Assignment & Review Dashboard

A responsive frontend-based Assignment & Review Dashboard built using React.js and Tailwind CSS. This project simulates a student assignment management system where students can track assignments and confirm submissions through a double-verification flow, while admins can create assignments and monitor submission progress.

## Features

### Student Dashboard

- View assigned tasks in responsive assignment cards
- Check assignment title, subject, due date, and submission link
- Open the provided Google Drive submission link
- Confirm assignment submission through a double-verification modal
- View real-time assignment completion progress
- Display submitted and pending status badges

### Admin Dashboard

- Create new assignments
- Add assignment title, subject, due date, and Google Drive link
- View submission status for assignments
- Monitor progress using visual progress bars

### Additional Features

- Student and Admin role switching
- Responsive design for desktop and mobile devices
- Component-based React architecture
- Persistent data storage using Local Storage
- Clean and modern user interface built with Tailwind CSS

## Technologies Used

- React.js
- Tailwind CSS
- JavaScript (ES6+)
- HTML5
- Local Storage
- Vite
- Git
- GitHub

## Project Structure

Assignment-Review-Dashboard/
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── StatsCard.jsx
│   │   ├── AssignmentCard.jsx
│   │   ├── ConfirmModal.jsx
│   │   ├── AdminForm.jsx
│   │   └── StudentTable.jsx
│   │
│   ├── data/
│   │   └── assignments.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md

How to Run

1. Clone the repository.

git clone https://github.com/Gopipalleboina/assignment-review-dashboard.git

2. Open the project folder.

cd assignment-review-dashboard

3. Install dependencies.

npm install

4. Start the development server.

npm run dev

5. Open the local URL displayed in the terminal (usually http://localhost:5173).

Design Highlights

Clean SaaS-style dashboard layout

Reusable React components

Responsive grid layout using Tailwind CSS

Interactive confirmation modal

Visual progress indicators for assignment completion

Modern rounded cards with subtle shadows

Current Status

The frontend implementation is completed using React.js and Tailwind CSS. Assignment data is managed using Local Storage to simulate backend functionality while maintaining a smooth user experience.

Future Improvements

Connect the application to a backend API

Add secure user authentication

Store assignment data in a database

Support multiple students and professors

Allow editing and deleting assignments

Add search, filtering, and sorting options

Include assignment notifications and reminders

Author

Palleboina Gopi

GitHub: https://github.com/Gopipalleboina
