# 🍽️ AI-powered personalized meal recommendation system

An AI-powered food recommendation web application that suggests personalized meals based on user preferences, dietary requirements, available ingredients, and nutritional goals. The system leverages Machine Learning and AI techniques to provide smart, healthy, and customized food recommendations.

---

## 🚀 Features

- 🤖 AI-based Food Recommendation
- 🥗 Personalized Meal Suggestions
- 🥦 Diet Preference Selection (Veg/Non-Veg/Vegan)
- ❤️ Health-based Recommendations
- 🔍 Search Food by Ingredients
- 📊 Nutrition Information
- 📱 Responsive User Interface
- ⚡ Fast API Integration
- 🔐 Secure User Authentication (Optional)

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- HTML5
- CSS3
- JavaScript

### Backend
- Node.js
- Express.js

### AI / Machine Learning
- Python
- FastAPI / Flask
- Scikit-learn
- Pandas
- NumPy
- Joblib

### Database
- MongoDB

---

## 📂 Project Structure

```
AI-OMNIFOOD-SUGGESTION-APPLICATION/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── package.json
│
├── ml-service/
│   ├── app.py
│   ├── model.pkl
│   ├── requirements.txt
│   └── notebooks/
│
├── README.md
└── LICENSE
```

---

## ⚙️ Installation

### Clone the Repository

```bash
git clone https://github.com/your-username/AI-OMNIFOOD-SUGGESTION-APPLICATION.git
```

```bash
cd AI-OMNIFOOD-SUGGESTION-APPLICATION
```

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Runs on:

```
http://localhost:5173
```

---

## Backend Setup

```bash
cd backend
npm install
npm start
```

Runs on:

```
http://localhost:5000
```

---

## AI Service Setup

```bash
cd ml-service
pip install -r requirements.txt
python app.py
```

or

```bash
uvicorn main:app --reload
```

Runs on:

```
http://localhost:8000
```

---

## 🤖 AI Recommendation Workflow

```
User Preferences
      │
      ▼
React Frontend
      │
      ▼
Node.js Backend
      │
      ▼
AI Recommendation Engine
      │
      ▼
Food Recommendation Model
      │
      ▼
Personalized Meal Suggestions
```

---

## 🧠 AI Model

The recommendation engine considers:

- User Age
- Gender
- Weight & Height
- BMI
- Dietary Preference
- Allergies
- Health Conditions
- Favorite Cuisine
- Available Ingredients
- Calorie Requirement

### Machine Learning Techniques

- Content-Based Filtering
- Recommendation System
- Data Preprocessing
- Feature Engineering
- Similarity Matching

---

## 📊 Dataset

The model is trained using food and nutrition datasets containing:

- Food Name
- Calories
- Protein
- Carbohydrates
- Fat
- Fiber
- Vitamins
- Minerals
- Cuisine Type
- Diet Category

---

## 📷 Screenshots

Add screenshots here.

```
screenshots/
├── Home.png
├── Login.png
├── Recommendation.png
├── Dashboard.png
```

---

## 🎯 Future Enhancements

- 🍕 AI Meal Planner
- 🛒 Grocery List Generator
- 📅 Weekly Diet Planner
- 🥤 Water Intake Reminder
- 🧠 Deep Learning Recommendation Model
- 📱 Mobile App
- 🌐 Multi-language Support
- 🥦 Nutrition Tracking Dashboard
- 🤖 AI Chatbot Nutrition Assistant

---

## 📈 Project Objectives

- Recommend healthy meals using AI
- Improve user nutrition awareness
- Personalize food choices
- Save time in meal planning
- Promote healthy eating habits

---

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository

2. Create a feature branch

```bash
git checkout -b feature-name
```

3. Commit your changes

```bash
git commit -m "Added new feature"
```

4. Push to GitHub

```bash
git push origin feature-name
```

5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Ashwani Kumar**

- GitHub: https://github.com/Ashwani-kmr77
- LinkedIn: https://www.linkedin.com/in/your-linkedin-profile

