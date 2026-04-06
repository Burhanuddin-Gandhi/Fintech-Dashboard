# Fintech Dashboard

This project is a frontend-based fintech dashboard built using React and Vite. It focuses on presenting financial data in a structured and user-friendly way, while also handling common edge cases and usability concerns that arise in real-world applications.

The main goal of this project was not just to build a UI, but to simulate practical scenarios such as role-based access, input validation, and theme customization.

---

## Approach

The project is built using a component-based architecture in React to ensure reusability and maintainability.

State management is handled in a structured way (using local state or Redux where applicable), allowing different parts of the dashboard to stay in sync.

The UI is divided into smaller reusable components such as cards, transaction lists, and layout elements. This makes it easier to scale and modify individual sections without affecting the entire application.

Mock data is used to simulate real-world financial scenarios, allowing the UI and logic to be developed independently of a backend.

---

## Features

* Dashboard interface for financial data
* Role-based access control (RBAC)

  * Admin: full access to actions and data
  * Viewer: restricted access (read-only view)
* Light and dark mode support
* Input validation for transactions
* Handling of edge cases such as invalid or negative values
* Component-based architecture using React

---

## Data Source

The data used in this project is mock data generated for development and demonstration purposes.

Some of the dataset was created with the assistance of AI tools to simulate realistic financial transactions and dashboard metrics. This approach was used to focus on frontend development, UI structure, and state management without relying on a live backend.

The structure of the data is designed to be easily replaceable with real API responses in future improvements.

---

## Design and UI Decisions

* A minimal and clean layout was used to keep the dashboard readable and uncluttered
* Color choices were kept balanced to avoid overly bright or dull interfaces, making it usable for a wide range of users
* Light and dark themes were implemented to improve accessibility and user preference
* Components were structured in a reusable way to maintain consistency across the UI

---

## Edge Case Handling

Some basic validations and safeguards were implemented:

* Prevented invalid transaction entries by restricting input values
* Added conditions to handle negative values in transactions
* Enforced a minimum value (e.g., 1) where required to avoid incorrect data entries
* Used conditional logic to ensure only valid data is processed and displayed

These checks help maintain data integrity and simulate real-world application behavior.

---

## Tech Stack

* React (with Vite)
* JavaScript
* CSS / Tailwind CSS (if configured)
* Redux (for state management, if used)
* ESLint

---

## Project Structure

```
fintech-dashboard/
│
├── public/              Static assets
├── src/
│   ├── components/      Reusable components
│   ├── assets/          Images and icons
│   ├── App.jsx          Main application component
│   └── main.jsx         Entry point
│
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## How to Run the Project Locally

To run this project on your system, follow the steps below:

### 1. Clone the repository

```
git clone https://github.com/Burhanuddin-Gandhi/Fintech-Dashboard.git
```

### 2. Navigate into the project folder

```
cd Fintech-Dashboard
```

### 3. Install dependencies

Make sure Node.js (v16 or above) is installed.

```
npm install
```

All required dependencies (including libraries like Redux or Tailwind CSS, if used) will be installed automatically.

### 4. Start the development server

```
npm run dev
```

### 5. Open in browser

```
http://localhost:5173/
```

---

## Future Improvements

* Integration with real financial APIs
* Authentication system with persistent login
* More advanced analytics and charting
* Improved mobile responsiveness
* Backend integration for storing transactions

---

## Author

Burhanuddin Gandhi
