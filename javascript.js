let mapInstance = null;

function navigate(sectionId) {
  const sections = document.querySelectorAll("section.card");
  sections.forEach((section) => {
    if (section.id === sectionId) {
      section.classList.remove("hidden");
      section.setAttribute("aria-hidden", "false");
    } else {
      section.classList.add("hidden");
      section.setAttribute("aria-hidden", "true");
    }
  });
  if (sectionId === "map") {
    setTimeout(() => {
      if (!mapInstance) {
        initializeMap();
      } else {
        mapInstance.invalidateSize();
      }
    }, 200); 
  }
}

// Donor form submission handler
function handleDonorSubmit(event) {
  event.preventDefault();
  const name = document.getElementById("donorName").value.trim();
  const email = document.getElementById("donorEmail").value.trim();
  const phone = document.getElementById("donorPhone").value.trim();
  const bloodGroup = document.getElementById("bloodGroup").value;
  const location = document.getElementById("location").value.trim();
  const message = document.getElementById("donorMessage");

  if (!name || !email || !phone || !bloodGroup || !location) {
    message.textContent = "Please fill in all donor fields.";
    return false;
  }

  message.textContent = "Donor registered successfully!";
  event.target.reset();
  return false;
}

// Hospital form submission handler
function handleHospitalSubmit(event) {
  event.preventDefault();
  const hospitalName = document.getElementById("hospitalName").value.trim();
  const contactPerson = document.getElementById("contactPerson").value.trim();
  const hospitalPhone = document.getElementById("hospitalPhone").value.trim();
  const bloodGroup = document.getElementById("requiredBloodGroup").value;
  const unitsNeeded = document.getElementById("unitsNeeded").value;
  const location = document.getElementById("hospitalLocation").value.trim();
  const message = document.getElementById("hospitalMessage");

  if (
    !hospitalName ||
    !contactPerson ||
    !hospitalPhone ||
    !bloodGroup ||
    !unitsNeeded ||
    !location
  ) {
    message.textContent = "Please fill in all hospital request fields.";
    return false;
  }

  message.textContent = "Blood request submitted successfully!";
  event.target.reset();
  return false;
}

// Login form handler
function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();
  const message = document.getElementById("loginMessage");

  if (!email || !password) {
    message.textContent = "Please enter email and password.";
    return false;
  }

  message.textContent = "Login successful!";
  event.target.reset();
  return false;
}

// Register form handler
function handleRegister(event) {
  event.preventDefault();
  const name = document.getElementById("regName").value.trim();
  const email = document.getElementById("regEmail").value.trim();
  const password = document.getElementById("regPassword").value.trim();
  const message = document.getElementById("registerMessage");

  if (!name || !email || !password || password.length < 6) {
    message.textContent = "Please complete the form correctly.";
    return false;
  }

  message.textContent = "Registration successful!";
  event.target.reset();
  return false;
}

// Initialize Leaflet map
function initializeMap() {
  if (mapInstance) {
    mapInstance.remove(); 
  }
  mapInstance = L.map("leafletMap").setView([0, 0], 15);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(mapInstance);

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const userLat = pos.coords.latitude;
        const userLng = pos.coords.longitude;
        const userLocation = [userLat, userLng];

        mapInstance.setView(userLocation, 15);

        L.marker(userLocation)
          .addTo(mapInstance)
          .bindPopup("Your Location")
          .openPopup();

        const overpassUrl = `https://overpass-api.de/api/interpreter?data=[out:json];(node["amenity"="hospital"](around:5000,${userLat},${userLng}););out;`;

        fetch(overpassUrl)
          .then((res) => res.json())
          .then((data) => {
            data.elements.forEach((hospital) => {
              const lat = hospital.lat;
              const lon = hospital.lon;
              const name = hospital.tags.name || "Unnamed Hospital";

              L.marker([lat, lon])
                .addTo(mapInstance)
                .bindPopup(`<strong>${name}</strong>`);
            });
          })
          .catch((err) => {
            console.error("Overpass API error:", err);
          });
      },
      () => {
        alert("Geolocation failed.");
      }
    );
  } else {
    alert("Geolocation not supported.");
  }
}

// Particle effect for background
const canvas = document.getElementById("particle-canvas");
const ctx = canvas.getContext("2d");
let particlesArray = [];

function initParticles() {
  particlesArray = [];
  const numberOfParticles = 120;
  for (let i = 0; i < numberOfParticles; i++) {
    particlesArray.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      speedX: Math.random() * 1 - 0.5,
      speedY: Math.random() * 1 - 0.5,
      color: "rgba(255, 0, 0, 0.6)",
    });
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particlesArray.forEach((p) => {
    ctx.beginPath();
    ctx.fillStyle = p.color;
    ctx.shadowColor = "red";
    ctx.shadowBlur = 8;
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();

    p.x += p.speedX;
    p.y += p.speedY;

    if (p.x < 0 || p.x > canvas.width) p.speedX = -p.speedX;
    if (p.y < 0 || p.y > canvas.height) p.speedY = -p.speedY;
  });

  requestAnimationFrame(animateParticles);
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
}

const compatibility = {
  "A+": { donateTo: ["A+", "AB+"], receiveFrom: ["A+", "A-", "O+", "O-"] },
  "A-": { donateTo: ["A+", "A-", "AB+", "AB-"], receiveFrom: ["A-", "O-"] },
  "B+": { donateTo: ["B+", "AB+"], receiveFrom: ["B+", "B-", "O+", "O-"] },
  "B-": { donateTo: ["B+", "B-", "AB+", "AB-"], receiveFrom: ["B-", "O-"] },
  "AB+": {
    donateTo: ["AB+"],
    receiveFrom: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  },
  "AB-": { donateTo: ["AB+", "AB-"], receiveFrom: ["A-", "B-", "AB-", "O-"] },
  "O+": { donateTo: ["A+", "B+", "O+", "AB+"], receiveFrom: ["O+", "O-"] },
  "O-": {
    donateTo: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
    receiveFrom: ["O-"],
  },
};

function showCompatibility() {
  const selected = document.getElementById("blood-group").value;
  const donateList = compatibility[selected].donateTo;
  const receiveList = compatibility[selected].receiveFrom;

  const donateUl = document.getElementById("donate-to");
  const receiveUl = document.getElementById("receive-from");

  donateUl.innerHTML = donateList.map((bg) => `<li>${bg}</li>`).join("");
  receiveUl.innerHTML = receiveList.map((bg) => `<li>${bg}</li>`).join("");

  document.getElementById("results").style.display = "block";
}


window.addEventListener("resize", resizeCanvas);

window.onload = () => {
  resizeCanvas();
  animateParticles();
  initializeMap();
  navigate("landing");
};


