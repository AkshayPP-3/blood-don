# 🩸 Community Blood Donation Website

## 🌐 Preview

[Live Demo on Render](https://blood-don-1.onrender.com)

---

A modern, gamified web application for managing blood donations, donor/hospital dashboards, and user achievements. Built with Node.js (Express) and vanilla JavaScript for demo and educational purposes.

---

## 🚀 Features

- **Donor & Hospital Registration:**
  - Donors and hospitals can register via simple forms.
  - All data is stored in-memory (no database required for demo).

- **Dashboards:**
  - Real-time lists of registered donors and hospital blood requests.
  - Admin dashboard for user and request management.

- **User Authentication:**
  - Simple login and registration for users and admin.
  - Profile view and edit functionality.

- **Gamified Records & Achievements:**
  - Multi-level achievement card (Keep Donating, Bronze, Silver, Gold, Platinum, Diamond, Legend).
  - Progress bar, emoji badges, and locked next levels.
  - "Previous Level" and "Next Level" navigation for achievements.

- **Modern UI/UX:**
  - Clean, responsive design with animated navigation and accessibility improvements.
  - Particle background effect and beautiful cards.

- **Blood Compatibility & Education:**
  - Interactive blood group compatibility checker.
  - Informative pages on donation process and eligibility.

---

## 🛠️ Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express
- **Other:** In-memory storage (no DB), CORS enabled

---

## 📂 Project Structure

```
├── public/
│   ├── index.html         # Main frontend UI
│   ├── styles.css         # All styles and card designs
│   ├── javascript.js      # All frontend logic and interactivity
│   ├── favicon.ico        # App icon
│   └── README.md          # Frontend usage notes
├── server.js              # Express backend API
├── package.json           # Project config
├── .gitignore             # Git ignore rules
├── .renderignore          # Render deployment ignore rules
└── README.md              # This file
```

---

## ⚡ Getting Started

1. **Clone the repository:**
   ```powershell
   git clone <your-repo-url>
   cd blood-don
   ```
2. **Install dependencies:**
   > Only Express and CORS are required for demo
   ```powershell
   npm install express cors
   ```
3. **Run the backend server:**
   ```powershell
   node server.js
   ```
4. **Access the app:**
   - For local development: Open [http://localhost:10000](http://localhost:10000) (or the port shown in your terminal)
   - For deployed version: Visit your Render-provided URL (e.g., https://blood-don-1.onrender.com)

---

## 🧑‍💻 Demo Accounts

- **Admin:**
  - Email: `admin@blooddon.com`
  - Password: `admin123`
- **Demo User:**
  - Email: `test@example.com`
  - Password: `password123`

---

## 🏆 Achievement Levels

| Level           | Emoji | Requirement (Litres) |
|-----------------|-------|----------------------|
| Keep Donating!  | 🩸    | 0                    |
| Bronze          | 🥉    | 2                    |
| Silver          | 🥈    | 3                    |
| Gold            | 🥇    | 5                    |
| Platinum        | 🏆    | 8                    |
| Diamond         | 💎    | 12                   |
| Legend          | 👑    | 20                   |

---

## 📢 Notes

- This project is for demo/educational use. All data is lost on server restart.
- For production, add a real database and authentication.
- Contributions and suggestions are welcome!

---

## 📜 License

MIT License. See [LICENSE](LICENSE) for details.
