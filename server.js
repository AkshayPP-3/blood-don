// server.js
// Basic Express backend for Community Blood Donation

const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// In-memory storage (for demo purposes)
const donors = [];
const hospitals = [];

// Demo user for login (replace with real DB in production)
const users = [
  { email: 'test@example.com', password: 'password123', name: 'Test User' }
];

// Admin credentials (for demo)
const admin = { email: 'admin@blooddon.com', password: 'admin123' };

// Register a donor
app.post('/api/donors', (req, res) => {
  const donor = req.body;
  donors.push(donor);
  res.status(201).json({ message: 'Donor registered successfully', donor });
});

// Register a hospital request
app.post('/api/hospitals', (req, res) => {
  const hospital = req.body;
  hospitals.push(hospital);
  res.status(201).json({ message: 'Hospital request submitted', hospital });
});

// Get all donors
app.get('/api/donors', (req, res) => {
  res.json(donors);
});

// Get all hospital requests
app.get('/api/hospitals', (req, res) => {
  res.json(hospitals);
});

// Login endpoint
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    res.json({ success: true, message: 'Login successful', name: user.name });
  } else {
    res.status(401).json({ success: false, message: 'Invalid email or password' });
  }
});

// Admin login endpoint
app.post('/api/admin-login', (req, res) => {
  const { email, password } = req.body;
  if (email === admin.email && password === admin.password) {
    res.json({ success: true, message: 'Admin login successful' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid admin credentials' });
  }
});

// Admin: get all users
app.get('/api/admin/users', (req, res) => {
  res.json(users);
});

// Admin: delete user
app.post('/api/admin/delete-user', (req, res) => {
  const { email } = req.body;
  const idx = users.findIndex(u => u.email === email);
  if (idx !== -1) {
    users.splice(idx, 1);
    res.json({ success: true, message: 'User deleted.' });
  } else {
    res.status(404).json({ success: false, message: 'User not found.' });
  }
});

// Admin: get all donors
app.get('/api/admin/donors', (req, res) => {
  res.json(donors);
});

// Admin: get all hospital requests
app.get('/api/admin/hospitals', (req, res) => {
  res.json(hospitals);
});

// Admin: approve/reject hospital request
app.post('/api/admin/update-hospital', (req, res) => {
  const { id, status } = req.body;
  const hospital = hospitals[id];
  if (hospital) {
    hospital.status = status;
    res.json({ success: true, message: `Request ${status}.` });
  } else {
    res.status(404).json({ success: false, message: 'Request not found.' });
  }
});

// Register endpoint
app.post('/api/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }
  // Check if user already exists
  const exists = users.find(u => u.email === email);
  if (exists) {
    return res.status(409).json({ success: false, message: 'User already exists.' });
  }
  users.push({ name, email, password });
  res.status(201).json({ success: true, message: 'Registration successful.' });
});

// Get user profile by email (for demo, no authentication)
app.get('/api/profile', (req, res) => {
  const { email } = req.query;
  const user = users.find(u => u.email === email);
  if (user) {
    res.json({ success: true, profile: { name: user.name, email: user.email } });
  } else {
    res.status(404).json({ success: false, message: 'User not found' });
  }
});

// Edit profile endpoint
app.post('/api/edit-profile', async (req, res) => {
  const { currentEmail, name, email, password } = req.body;
  const user = users.find(u => u.email === currentEmail);
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found.' });
  }
  // Check if new email is already taken by another user
  if (email !== currentEmail && users.find(u => u.email === email)) {
    return res.status(409).json({ success: false, message: 'Email already in use.' });
  }
  user.name = name;
  user.email = email;
  if (password) {
    user.password = await bcrypt.hash(password, 10);
  }
  res.json({ success: true, message: 'Profile updated successfully.' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
