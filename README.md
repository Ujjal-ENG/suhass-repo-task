# Suhass Project Management Tool

A modern, full-stack project management application built with React, Node.js, and PostgreSQL. This tool allows teams to manage projects, invite members, and handle role-based access control.

## 🚀 Features

-   **Authentication & Authorization**: Secure login and role-based access control (Admin, Manager, Staff).
-   **User Management**:
    -   Invite new users via email.
    -   **Copy Invite Link** functionality for manual sharing.
    -    Manage user roles and statuses (Active/Inactive).
-   **Project Management**:
    -   Create, read, update, and delete (CRUD) projects.
    -   Track project status (Active, Archived, Deleted).
-   **Modern UI**: Built with Shadcn UI, Tailwind CSS, and Lucide Icons for a clean, responsive experience.

## 🛠 Tech Stack

### Frontend
-   **Framework**: [React](https://react.dev/) with [Vite](https://vitejs.dev/)
-   **Language**: TypeScript
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Components**: [shadcn/ui](https://ui.shadcn.com/)
-   **State Management**: [Zustand](https://github.com/pmndrs/zustand)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **HTTP Client**: Axios

### Backend
-   **Runtime**: Node.js
-   **Framework**: [Express](https://expressjs.com/)
-   **Database**: PostgreSQL
-   **ORM**: [TypeORM](https://typeorm.io/)
-   **Validation**: Zod

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
-   [Node.js](https://nodejs.org/) (v18 or higher)
-   [pnpm](https://pnpm.io/) (Package Manager)
-   [PostgreSQL](https://www.postgresql.org/) (Database)

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd suhass-repo-task
```

### 2. Database Setup

Ensure your PostgreSQL server is running and create a new database.

```sql
CREATE DATABASE suhass_db;
```

### 3. Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd suhass-backend
pnpm install
```

Create a `.env` file in the `suhass-backend` directory based on `.env.example`:

```env
PORT=4000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=suhass_db
JWT_SECRET=your_super_secret_key
FRONTEND_URL=http://localhost:5173
```

### 4. Frontend Setup

Navigate to the frontend directory and install dependencies:

```bash
cd ../suhass-frontend
pnpm install
```

Create a `.env` file in the `suhass-frontend` directory if needed (usually handled by Vite defaults):

```env
VITE_API_URL=http://localhost:4000/api
```

## ▶️ Running the Application

You need to run both the backend and frontend servers.

**Terminal 1 (Backend):**

```bash
cd suhass-backend
pnpm dev
```
*Server will start on http://localhost:4000*

**Terminal 2 (Frontend):**

```bash
cd suhass-frontend
pnpm dev
```
*Application will open at http://localhost:5173*

## 📖 Usage Guide

### 1. Initial Access
-   Open `http://localhost:5173` in your browser.
-   If you created the database fresh, you may need to seed an admin user or register the first user manually (depending on your seeding logic).
-   *Default Admin Creds (if seeded):* `admin@example.com` / `admin123`

### 2. Dashboard & Projects
-   The main dashboard displays all projects.
-   **Create Project**: Click "New Project" to create a workspace.
-   **Edit/Delete**: Admins can edit or delete projects using the action buttons on the project cards.

### 3. User Management (Admin Only)
-   Navigate to the **Users** page.
-   **Invite User**:
    1.  Click "Invite User".
    2.  Enter email and select role (Staff, Manager, Admin).
    3.  Click **"Send Invite"** to email the link OR **"Copy Invite Link"** to copy the secure link to your clipboard.
-   **Manage Users**:
    -   Change user roles (e.g., promote Staff to Manager).
    -   Deactivate/Activate users.

## 📂 Project Structure

```
suhass-repo-task/
├── suhass-backend/         # Node.js/Express API
│   ├── src/
│   │   ├── config/         # DB and Env config
│   │   ├── controllers/    # Route logic
│   │   ├── entities/       # TypeORM models
│   │   ├── middlewares/    # Auth and error handling
│   │   ├── routes/         # API routes
│   │   └── services/       # Business logic
│
└── suhass-frontend/        # React/Vite App
    ├── src/
    │   ├── components/     # Reusable UI components
    │   │   ├── projects/   # Project-specific components
    │   │   ├── users/      # User-specific components
    │   │   └── ui/         # Generic UI (buttons, inputs)
    │   ├── pages/          # Main application pages
    │   ├── store/          # Zustand state management
    │   ├── types/          # Centralized TypeScript types
    │   └── lib/            # Utilities and API setup
```

## 🤝 Contributing

1.  Fork the repository.
2.  Create a feature branch (`git checkout -b feature/amazing-feature`).
3.  Commit your changes (`git commit -m 'Add some amazing feature'`).
4.  Push to the branch (`git push origin feature/amazing-feature`).
5.  Open a Pull Request.
