# Task Management

A complete and functional **task management dashboard** created with **Node.js (Next.js)**, **React**, **TypeScript**, and **Tailwind CSS**. The main focus of this repository is on the **frontend and API proxy layer** which is usable right away with the help of an **intelligent mock fallback system** that can be easily deployed.

> ⚠️ **Note:** A Java Spring Boot backend is **NOT** included in this repository. There's no need to execute `cd backend` or `mvn spring-boot:run` during the project setup.

---

## 🚀 Tech Stack

* **Frontend**: React (Next.js App Router), TypeScript, Tailwind CSS, Lucide Icons, Shadcn/UI
* **API Proxy**: Next.js Route Handlers (Node.js) with TypeScript
* **Backend API**: ❌ Not included in this repository (mocked by default)
* **Styling**: Tailwind CSS with custom design tokens

---

## 🛠️ Architecture

Modern layered architecture is manually adopted by the application.

1. **Frontend (React)**
   A perfect dashboard that supports multiple screen sizes and offers UI updates in real time together with the use of advanced UX patterns.

2. **Edge API (Node.js / Next.js)**
   A gateway/proxy that is responsible for the connection. The system includes an **intelligent mock fallback**—if the backend API is not available, the app is still functional and uses an in-memory data store.

---

## 📖 How to Use

### 1. Prerequisites

* [Node.js 18+](https://nodejs.org/)

> Java and Maven are **not required** for this repository.

---

### 2. Application Launching

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` to see the dashboard.

✅ The application starts right away with **mock data**.
✅ All functionalities (CRUD, stats, UI) are available without any backend.

---

## ✨ Highlights

* **Full CRUD**: Operations on tasks of create, read, update, and delete
* **Smart Fallback**: Automatic mock mode when backend becomes inaccessible
* **Real-time Stats**: Instantaneous computation of task states
* **Modern UI**: Dark mode interface with filters and popups

---

## 📁 Layout of the Project

* `/app`: Next.js pages and API routes (Node.js/TypeScript)
* `/components`: Commonly used React components
* `/hooks`: Customized React hooks
* `/lib`: Types and mock data logic shared across

---

## 📸 Images

### Dashboard Overview
![Dashboard](docs/images/dashboard.png)

> The central dashboard displays the list of tasks and the corresponding statistics.  
> When the backend is not reachable, it automatically resorts to mock data.

### Add Task
![Add Task](docs/images/addtask.png)

> New task can be created through a modal form by providing the title, description, and priority.

---
