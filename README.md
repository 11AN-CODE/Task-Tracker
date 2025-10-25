 ## 📝 Task Tracker Dashboard
A full-stack web application built with Node.js and Express that allows authenticated users to manage their personal To-Do lists. Users can register, log in, create tasks, and track their status.

## ✨ Features
Secure Authentication: User registration and login handled with JWTs (JSON Web Tokens) for session management and bcrypt for secure password hashing.

User Isolation: Tasks are linked to the unique user ID (req.userid), ensuring users only see their own data.

Task Management: Users can create, view, and organize tasks.

Personalized Dashboard: Users only see tasks linked to their unique user ID.

Status Tracking: Tasks include a customizable status (Pending, Completed, In Progress).

Dynamic UI: Uses EJS (Embedded JavaScript) for server-side rendering and Tailwind CSS for styling.


## 🛠️ Tech Stack
Backend: Node.js, Express.js

Database: MongoDB (via Mongoose ODM)

Authentication: JWT, bcrypt

Templating: EJS

Styling: Tailwind CSS (via CDN)


## 🔒 Security Configuration
To prevent the leakage of sensitive information (database credentials and secret keys), this project requires environment variables.

1. Installation and Usage
Install dotenv: You should install a package like dotenv to load variables from a .env file:

Bash

npm install dotenv
Create .env File: Create a file named .env in your project root:

 .env
Update .gitignore: Ensure your .gitignore file contains the line .env to prevent the file from being accidentally uploaded to GitHub.

Load Variables in index.js: Add the following to the very top of your main application file (index.js):

JavaScript

require('dotenv').config();

2. Implementation in Code
Update your application code to use process.env.<VARIABLE_NAME> instead of hardcoded values:



## 🚀 Setup and Installation
Follow these steps to get a local copy of the project running.

Prerequisites
You need the following installed:

Node.js (v18+)

MongoDB (local instance or cloud service like MongoDB Atlas)


Steps
Clone the Repository:

Bash

git clone https://github.com/11AN-CODE/Task-Tracker
Install Dependencies:

Bash

npm install



