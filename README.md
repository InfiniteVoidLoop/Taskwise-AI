[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/YHSq4TPZ)
# To-Do App – Preliminary Assignment Submission
⚠️ Please complete **all sections marked with the ✍️ icon** — these are required for your submission.

👀 Please Check ASSIGNMENT.md file in this repository for assignment requirements.

## 🚀 Project Setup & Usage
**How to install and run your project:**  
✍️  
- Clone the repository:  
  - `git clone <your-repo-link>`  
  - `cd hackathon-react-starter`  

- Install dependencies:  
  - `npm install`  

- Run the backend server:  
  - `npm run start`  

- Run the frontend in development mode:  
  - `npm run dev`  

  
## 🔗 Deployed Web URL or APK file
✍️ [\[Paste your link here\]](https://taskwise-ai-rho.vercel.app)


## 🎥 Demo Video
**Demo video link (≤ 2 minutes):**  
📌 **Video Upload Guideline:** when uploading your demo video to YouTube, please set the visibility to **Unlisted**.  
- “Unlisted” videos can only be viewed by users who have the link.  
- The video will not appear in search results or on your channel.  
- Share the link in your README so mentors can access it.  

✍️ [Paste your video link here]


## 💻 Project Introduction

### a. Overview

✍️ Taskwise-AI is an intelligent task management and productivity application designed to support the users organize and track their tasks efficiently. It has a user-friendly interface with AI-powered insights which allows users to create and manage their tasks better.

### b. Key Features & Function Manual

✍️ 
**Key Features:**  
- **Task Management:** Easily add, edit, delete, and categorize.
- **AI-Powered:** The app provides AI which can create task for user.  
- **Progress Tracking:** Visualize progress in order to help users manage their tasks efficiently.  
- **Date-Based Tasks:** Assign specific dates to tasks and view them in a calendar for better scheduling.  
- **Account Management:** Users can create accounts, log in/out, and manage their profile securely.  

**Function Manual:**  
1. **Add a Task:** Click the “Add Task” button, enter task details (title, description, category), and save.  
2. **Edit a Task:** Select an existing task, modify details, and save changes.  
3. **Delete a Task:** Click the delete icon to remove a task.  
4. **Categorize Tasks:** Assign tasks to custom categories for better organization.  
5. **AI ChatBot:** Support users adding their tasks.  
6. **Mark as Completed:** Check the box next to a task to mark it as done and update progress statistics.  

### c. Unique Features (What’s special about this app?) 

✍️ 
- **Calendar Integration:** Tasks are displayed in a calendar view for clear visualization of finished and unfinished tasks.  
- **AI Task Creation:** The app’s AI can automatically generate tasks for users based on their inputs, saving time and improving planning.  
- **Progress Insights:** Provides visualization of task completion to help users improve efficiency.  
- **Account Management:** Managing user accounts, including sign up, log in/out, and profile settings, to provide a personalized and secure experience.

### d. Technology Stack and Implementation Methods

✍️
**Frontend:**  
- **React:** Core framework for building front-end.  
- **TypeScript:** Ensures type safety and better code maintainability.  
- **Vite:** Fast development server and build tool.  
- **MUI (Material-UI):** Provides ready-made UI components and date pickers.  
- **Zustand:** State management for tasks, categories, and user data.  
- **Dayjs:** Handles date manipulation for tasks and calendar features.  

**Backend:**  
- **Node.js & Express:** Provides REST API endpoints for user accounts, task management, and AI integration.  
- **Firebase:** Authentication, real-time database.    
- **Axios:** Handles HTTP requests between frontend and backend.  
- **CORS:** Manage cross-origin requests and environment variables securely.  

**AI Integration:**  
- **LangChain & OpenAI APIs:** AI framework for integrating AI and tool calling.
- **@langchain/google-genai:** Integration Google AI services.  


### e. Service Architecture & Database structure (when used)

✍️
**Service Architecture:**  
- **Realtime Database:** Firebase Realtime Database stores all user data, tasks, categories, and progress in real-time.  
- **Authentication:** Firebase Authentication manages secure user sign-up, login, and logout.  

**Database Structure (Firebase Realtime Database – JSON tree):**

    {
      "users": {
        "UID_1": [
          {
            "title": "NAVER AI HACKATHON",
            "description": "Complete project and submit",
            "category": "Learning",
            "timestamp": 1734806400000,
            "marked": true
          },
          {
            "title": "Docker",
            "description": "Learn docker",
            "category": "Learning",
            "timestamp": 1734713600000,
            "marked": true
          }
        ],
        "UID_2": [ ... ]
      }
    }


**Flow Overview:**  
1. User logs in → Backend authenticates via Firebase.  
2. Frontend fetches user tasks and categories → Renders tasks in list/calendar view.  
3. User adds/edits/deletes tasks → Backend updates the database.  
4. AI ChatBot can create tasks → Calling tool → Updates tasks in the database.  

## 🧠 Reflection

### a. If you had more time, what would you expand?

✍️ 
- **Enhanced AI Features:** Improve the AI to provide smart notifications and reminders for tasks.
- **Backend from scratch with JWT Authentication:** Improve security by implementing JWT-based authentication
- **Collaboration Mode:** Enable team-based task management.  


### b. If you integrate AI APIs more for your app, what would you do?
    
✍️ 
- **Enhanced AI Features:** Smart notifications and reminders for tasks.
- **Smart Modified note:** Convert user notes or ideas into detailed, plans with clear steps, deadlines, and categories.


## ✅ Checklist
- [✅] Code runs without errors  
- [✅] All required features implemented (add/edit/delete/complete tasks)  
- [✅] All ✍️ sections are filled  
