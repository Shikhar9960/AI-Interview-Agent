
AI MOCK INTERVIEW SYSTEM - COMPLETE SETUP GUIDE
==============================================

PROJECT STRUCTURE
=================

ai-interview-system/
│
├── backend/
├── frontend/
├── python_ai/
└── README.md


==============================================
1. INSTALL REQUIRED SOFTWARE
==============================================

1. Install Python 3.11.9
Download:
https://www.python.org/downloads/release/python-3119/

IMPORTANT:
✓ While installing check:
  [✓] Add Python to PATH

Verify:
python --version


----------------------------------------------

2. Install Node.js
Download:
https://nodejs.org/

Verify:
node -v
npm -v


----------------------------------------------

3. Install MongoDB Compass (Optional)
Download:
https://www.mongodb.com/products/tools/compass


----------------------------------------------

4. Install VS Code
Download:
https://code.visualstudio.com/


==============================================
2. FRONTEND SETUP
==============================================

Open terminal inside frontend folder:

cd frontend

Install dependencies:

npm install

Install extra packages:

npm install axios framer-motion react-loader-spinner react-speech-recognition

Start frontend:

npm run dev

Frontend runs on:
http://localhost:5173


==============================================
3. PYTHON AI SERVER SETUP
==============================================

Open terminal inside python_ai folder:

cd python_ai

Create virtual environment:

py -3.11 -m venv venv

Activate virtual environment:

Windows:
venv\Scripts\activate

Install dependencies:

pip install fastapi uvicorn langchain langchain-groq python-dotenv

Create .env file:

GROQ_API_KEY=your_groq_api_key

Get Groq API key:
https://console.groq.com/


----------------------------------------------

Run AI server:

uvicorn main:app --reload

AI server runs on:
http://127.0.0.1:8000


==============================================
4. BACKEND SETUP (OPTIONAL)
==============================================

Open terminal inside backend folder:

cd backend

Install dependencies:

npm install express mongoose cors dotenv

Start backend:

node server.js


==============================================
5. MONGODB CONNECTION
==============================================

OPTION 1 -> MongoDB Atlas

1. Create account:
https://www.mongodb.com/cloud/atlas

2. Create Cluster

3. Click Connect

4. Copy connection string

Example:

mongodb+srv://username:password@cluster.mongodb.net/interviewDB

5. Add inside .env:

MONGO_URI=your_connection_string


----------------------------------------------

OPTION 2 -> MongoDB Compass Local

Install Compass

Connect using:

mongodb://localhost:27017


==============================================
6. REQUIRED FRONTEND PACKAGES
==============================================

npm install axios
npm install framer-motion
npm install react-loader-spinner
npm install react-speech-recognition


==============================================
7. REQUIRED PYTHON PACKAGES
==============================================

pip install fastapi
pip install uvicorn
pip install langchain
pip install langchain-groq
pip install python-dotenv


==============================================
8. HOW TO RUN COMPLETE PROJECT
==============================================

STEP 1:
Start Python AI server

cd python_ai
venv\Scripts\activate
uvicorn main:app --reload


STEP 2:
Start frontend

cd frontend
npm run dev


STEP 3:
Open browser

http://localhost:5173


==============================================
9. COMMON ERRORS + FIX
==============================================

ERROR:
Invalid API Key

FIX:
Check GROQ_API_KEY inside .env


----------------------------------------------

ERROR:
react-speech-recognition not found

FIX:

npm install react-speech-recognition


----------------------------------------------

ERROR:
Port already in use

FIX:

Change port or stop old terminal


----------------------------------------------

ERROR:
CORS issue

FIX:
Add this inside FastAPI main.py

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


==============================================
10. FEATURES INCLUDED
==============================================

✓ AI Interview Questions
✓ Voice to Text
✓ AI Feedback
✓ Marks out of 10
✓ Animated UI
✓ Loading Animations
✓ Modern Interface
✓ AI Evaluation
✓ Dynamic Questions


==============================================
11. FUTURE FEATURES YOU CAN ADD
==============================================

✓ Webcam monitoring
✓ Emotion detection
✓ AI follow-up questions
✓ PDF report generation
✓ User authentication
✓ Interview history
✓ Dashboard analytics
✓ Text to speech interviewer
✓ Deployment


==============================================
12. DEPLOYMENT
==============================================

Frontend:
Vercel

Backend:
Render

Database:
MongoDB Atlas


==============================================
PROJECT NAME FOR RESUME
==============================================

AI Mock Interview System using Agentic AI


==============================================
END
==============================================
