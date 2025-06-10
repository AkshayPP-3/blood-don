// Main frontend logic for Community Blood Donation Web App

document.addEventListener('DOMContentLoaded', () => {
  // Navigation
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.getAttribute('href').replace('#', '');
      showSection(target);
    });
  });

  function showSection(sectionId) {
    document.querySelectorAll('section').forEach(sec => {
      sec.style.display = sec.id === sectionId ? 'block' : 'none';
    });
  }

  // Show default section
  showSection('home');

  // Registration Forms
  const donorForm = document.getElementById('donor-form');
  const hospitalForm = document.getElementById('hospital-form');
  if (donorForm) {
    donorForm.addEventListener('submit', (e) => {
      e.preventDefault();
      registerUser('donor', donorForm);
    });
  }
  if (hospitalForm) {
    hospitalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      registerUser('hospital', hospitalForm);
    });
  }

  // Login
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      loginUser(loginForm);
    });
  }

  // Blood Compatibility Checker
  const bloodForm = document.getElementById('blood-checker-form');
  if (bloodForm) {
    bloodForm.addEventListener('submit', (e) => {
      e.preventDefault();
      checkCompatibility();
    });
  }

  // Achievements Navigation
  const prevBtn = document.getElementById('prev-achievement');
  const nextBtn = document.getElementById('next-achievement');
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => navigateAchievement(-1));
    nextBtn.addEventListener('click', () => navigateAchievement(1));
  }
});

// Registration
function registerUser(type, form) {
  const data = Object.fromEntries(new FormData(form));
  fetch(`/api/register/${type}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(result => {
      alert(result.message || 'Registered successfully!');
      form.reset();
    })
    .catch(() => alert('Registration failed.'));
}

// Login
function loginUser(form) {
  const data = Object.fromEntries(new FormData(form));
  fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(result => {
      if (result.success) {
        alert('Login successful!');
        window.location.reload();
      } else {
        alert(result.message || 'Login failed.');
      }
    })
    .catch(() => alert('Login failed.'));
}

// Blood Compatibility Checker
function checkCompatibility() {
  const donor = document.getElementById('donor-group').value;
  const recipient = document.getElementById('recipient-group').value;
  fetch(`/api/compatibility?donor=${donor}&recipient=${recipient}`)
    .then(res => res.json())
    .then(result => {
      document.getElementById('compatibility-result').textContent = result.compatible
        ? 'Compatible!'
        : 'Not compatible.';
    })
    .catch(() => {
      document.getElementById('compatibility-result').textContent = 'Error checking compatibility.';
    });
}

// Achievements Navigation
let currentAchievement = 0;
const achievements = [
  { level: 'Keep Donating!', emoji: '🩸', litres: 0 },
  { level: 'Bronze', emoji: '🥉', litres: 2 },
  { level: 'Silver', emoji: '🥈', litres: 3 },
  { level: 'Gold', emoji: '🥇', litres: 5 },
  { level: 'Platinum', emoji: '🏆', litres: 8 },
  { level: 'Diamond', emoji: '💎', litres: 12 },
  { level: 'Legend', emoji: '👑', litres: 20 }
];

function navigateAchievement(direction) {
  currentAchievement += direction;
  if (currentAchievement < 0) currentAchievement = 0;
  if (currentAchievement >= achievements.length) currentAchievement = achievements.length - 1;
  updateAchievementCard();
}

function updateAchievementCard() {
  const card = document.getElementById('achievement-card');
  if (!card) return;
  const ach = achievements[currentAchievement];
  card.querySelector('.level').textContent = ach.level;
  card.querySelector('.emoji').textContent = ach.emoji;
  card.querySelector('.litres').textContent = ach.litres;
  // Update progress bar, lock icons, etc. as needed
}
