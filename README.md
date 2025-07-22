# 💸 BudgetTrackingApp

A full-stack cross-platform budget tracker tailored for students, with a modern React frontend and high-performance C++ backend.

---

## 📦 Tech Stack

| Layer       | Tech                             |
|-------------|----------------------------------|
| Frontend    | React (Vite), Tailwind CSS       |
| Backend     | C++ with Crow Web Framework      |
| Database    | SQLite                           |
| API Layer   | RESTful with JSON responses      |
| Dev Tools   | CMake, vcpkg, VS Code, Git       |

---

## 📁 Project Structure


 BudgetTrackingApp/
├── BudgeteerAPI/ # C++ Crow backend
│ ├── main.cpp # Entry point
│ ├── CMakeLists.txt
│ ├── models/ # Transaction & ExpectedExpense classes
│ ├── db/ # SQLite connection and repository
│ ├── features/ # Business logic (stack, queue, map, etc.)
│ └── api/ # HTTP route handlers
│
├── student-budget-tracker/ # React + Tailwind frontend
│ ├── src/
│ │ ├── api/ # Axios API calls
│ │ ├── components/ # UI components
│ │ ├── pages/ # Each page view
│ │ ├── utils/ # Helpers like date and currency formatting
│ │ └── App.jsx # Routing and layout
│ ├── public/
│ ├── .env # VITE_API_BASE=http://localhost:18080
│ └── ...
│
├── vcpkg/ # C++ package manager
├── .gitignore
└── README.md




## Frontend

---

## 🌐 Frontend: React + Vite + Tailwind

### 🧩 Pages & Features

- **Dashboard**: `/summary`, recent transactions, chart view (optional)
- **Add Transaction**: `/add` form for income/expenses
- **Expected Expenses**: setup and view recurring bills
- **Upcoming Expenses**: shows next 3 due items
- **Undo Transaction**: one-click revert
- **Category Summary**: `/summary/categories` via table or chart
- **Recent History**: transaction log via `TransactionCard`

### 🚀 Run Frontend Locally

```bash
cd student-budget-tracker
npm install
npm run dev


## Backend: C++ Crow + SQLite

Architecture
main.cpp: initializes database, routes, and starts the server

models/: Transaction and ExpectedExpense classes with JSON converters

db/: SQLite connection and transaction repository

features/: STL-based business logic (stack, queue, map, etc.)

api/: Crow route handlers (REST endpoints)


To run the backend
cd BudgeteerAPI
mkdir build && cd build
cmake ..
cmake --build .
./BudgeteerAPI


 Key API Endpoints
Endpoint	Description
POST /add	Add new transaction
GET /transactions	Get all transactions
GET /summary	Income, expenses, balance
POST /undo	Undo last transaction
POST /expected/add	Add recurring expense
GET /expected/upcoming	List upcoming bills
POST /expected/process	Process due bills
GET /summary/categories	Category → total expenses



Development Workflow
Follow a bottom-up build workflow for backend:

Phase 0 – CMake + entry point

Phase 1 – Models (Transaction, ExpectedExpense)

Phase 2 – Database & Repository

Phase 3 – Repository implementation (SQLite bindings)

Phase 4 – Business logic (stack, queue, map, etc.)

Phase 5 – HTTP Routes using Crow

Phase 6 – Integration in main.cpp

Phase 7 – Error handling, CORS, logging, and polish



## Future Enhancements
 Multi-user auth

 Cloud DB sync

 Recurring payment reminders

 Export to CSV/PDF


License
MIT License


### ✅ To add & push:
```bash
git add README.md
git commit -m "Added project README"
git push


