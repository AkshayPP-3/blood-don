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
//learn more 
function showBlankPage(event) {
  event.preventDefault();  // prevent default link jump

  // Replace entire page content with your blood donation info
  document.documentElement.innerHTML = `
    <head>
      <title>Blood Donation Process</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          max-width: 900px;
          margin: 20px auto;
          padding: 0 10px;
          background: #f9f9f9;
        }
        h2 {
          text-align: center;
          color: #d32f2f;
          margin-bottom: 10px;
        }
        p.description {
          margin-bottom: 30px;
          font-size: 1.1em;
          color: #555;
        }
        .process-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px 24px; /* row gap, column gap */
          margin: 0 auto 30px auto;
        }
        .step-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          width: 92%; /* reduce width to show gap */
          min-height: 310px;
          border: 1px solid #ccc;
          border-radius: 12px;
          padding: 22px 14px 16px 14px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          background-color: #fff;
          transition: box-shadow 0.2s;
          margin: 0 auto;
        }
        .step-card:hover {
          box-shadow: 0 4px 16px rgba(211,47,47,0.13);
        }
        .step-number {
          font-weight: bold;
          font-size: 1.5em;
          color: #d32f2f;
          margin-bottom: 10px;
        }
        .step-title {
          font-weight: 500;
          font-size: 1.13em;
          margin-bottom: 18px;
          text-align: center;
          color: #333;
          min-height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .process__step-image {
          margin-top: auto;
          display: block;
          height: 100px;
          width: 100px;
          object-fit: contain;
        }
        button {
          margin-top: 30px;
          padding: 12px 28px;
          background-color: #d32f2f;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 17px;
        }
        button:hover {
          background-color: #b71c1c;
        }
        @media (max-width: 900px) {
          .process-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .step-card {
            width: 96%;
          }
        }
        @media (max-width: 600px) {
          .process-grid {
            grid-template-columns: 1fr;
          }
          .step-card {
            width: 100%;
            margin-bottom: 18px;
          }
        }
      </style>
    </head>
    <body>
      <h2>Blood Donation Process</h2>
      <p class="description">
        Find out what to do after you have scheduled your appointment, and learn about every step in our simple blood donation process. Also, download and print your blood donation preparation guide.
      </p>
      <div class="process-grid">
        <div class="step-card">
          <div class="step-number">1.</div>
          <div class="step-title">Check in for your appointment.</div>
          <img class="process__step-image" 
            src="https://www.vitalant.org/getattachment/89db149a-36b4-43d8-84ad-c13f4a316045/icon-desk.png?lang=en-US&amp;ext=.png"
            alt="Desk">
        </div>
        <div class="step-card">
          <div class="step-number">2.</div>
          <div class="step-title">Meet with trained staff to complete health screening and questionnaire.</div>
          <img class="process__step-image" 
            src="https://www.vitalant.org/getattachment/0c74f8bf-7f5f-46d9-ba8c-2a36f6b777b2/icon-stethoscope.png?lang=en-US&amp;ext=.png" 
            alt="Stethoscope">
        </div>
        <div class="step-card">
          <div class="step-number">3.</div>
          <div class="step-title">Donor care specialist will review results and determine the best way for you to donate.</div>
          <img class="process__step-image"
            src="https://www.vitalant.org/getattachment/e2d7bcfb-115f-4701-b6a8-24f8e4019edd/icon-notes.png?lang=en-US&amp;ext=.png" 
            alt="Paper and pencil">
        </div>
        <div class="step-card">
          <div class="step-number">4.</div>
          <div class="step-title">Relax while your specialist prepares materials and equipment.</div>
          <img class="process__step-image" 
            src="https://www.vitalant.org/getattachment/bc630437-1a1f-4d09-be32-c9952e0a6aa1/icon-chair.png?lang=en-US&amp;ext=.png" 
            alt="Patient in chair">
        </div>
        <div class="step-card">
          <div class="step-number">5.</div>
          <div class="step-title">Specialist will clean an area on your arm and insert a sterile needle to begin.</div>
          <img class="process__step-image"
            src="https://www.vitalant.org/getattachment/afbb7571-c351-4589-ad03-926f5fbdae72/icon-iv.png?lang=en-US&amp;ext=.png"
            alt="Hand with sterile needle inserted">
        </div>
        <div class="step-card">
          <div class="step-number">6.</div>
          <div class="step-title">Samples of your blood will be collected for testing.</div>
          <img class="process__step-image"
            src="https://www.vitalant.org/getattachment/b9cb53af-7a52-4657-893c-59e9a231c172/icon-test-tubes.png?lang=en-US&amp;ext=.png"
            alt="Test tube samples">
        </div>
        <div class="step-card">
          <div class="step-number">7.</div>
          <div class="step-title">You will then complete the whole blood donation process, which can take up to 15 minutes (usually 10).</div>
          <img class="process__step-image" 
            src="https://www.vitalant.org/getattachment/40b4a0d3-f8c8-4c95-b7ca-7a5829b866e4/icon-blood-bag.png?lang=en-US&amp;ext=.png" 
            alt="Collected blood">
        </div>
        <div class="step-card">
          <div class="step-number">8.</div>
          <div class="step-title">Enjoy light refreshments to replenish fluids and nutrients.</div>
          <img class="process__step-image"
            src="https://www.vitalant.org/getattachment/e39ed217-7cab-458d-a701-d2995068d17b/icon-snacks.png?lang=en-US&amp;ext=.png" 
            alt="Snacks">
        </div>
        <div class="step-card">
          <div class="step-number">9.</div>
          <div class="step-title">You’re done! Feel proud knowing you’ve saved up to three lives, and encourage friends and family to donate!</div>
          <img class="process__step-image"
            src="https://www.vitalant.org/getattachment/664ce1ee-cbcc-4048-8385-5733389be1dc/icon-group.png?lang=en-US&amp;ext=.png" 
            alt="A group of three people">
        </div>
      </div>
      <button onclick="goBack()">Go Back</button>
    </body>
  `;
}
function goBack() {
  window.location.reload();
}
// eligibility

//learn more 
function showEligibility(event) {
  event.preventDefault();

  document.documentElement.innerHTML = `
    <head>
      <title>Blood Donation Eligibility</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          padding: 30px;
          background-color: #f9f9f9;
          color: #333;
          max-width: 700px;
          margin: auto;
        }
        h1 {
          color: #d32f2f;
        }
        .eligibility-criteria1 {
          margin-bottom: 20px;
        }
        .criteria-item {
          background: #fff;
          border: none;
          border-radius: 0;
          padding: 20px 20px 10px 20px;
          margin-bottom: 10px;
          cursor: pointer;
          position: relative;
          transition: background 0.2s;
        }
        .criteria-item:hover {
          background: #fbe9e7;
        }
        .plus-symbol {
          font-weight: bold;
          color: #d32f2f;
          margin-right: 10px;
          font-size: 20px;
          transition: transform 0.2s;
          display: inline-block;
          width: 20px;
          text-align: center;
        }
        .criteria-desc {
          display: none;
          background: #ffeef3;
          padding: 12px 0 12px 0;
          margin-top: 10px;
          color: #444;
          font-size: 0.97em;
          position: relative;
          z-index: 1;
          flex-direction: row;
          align-items: center;
          gap: 16px;
        }
        .criteria-item.active .criteria-desc {
          display: flex;
        }
        .criteria-item.active .plus-symbol {
          transform: rotate(45deg);
        }
        .criteria-desc .criteria-img-circle {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 64px;
          width: 64px;
          min-width: 64px;
          min-height: 64px;
          border-radius: 50%;
          border: none !important;
          background: #ffe3ea;
          margin-left: 16px;
          box-sizing: border-box;
          box-shadow: none !important;
          outline: none !important;
        }
        .criteria-desc img, .criteria-desc svg {
          height: 54px;
          width: 54px;
          object-fit: contain;
          border-radius: 50%;
          border: none !important;
          background: transparent !important;
          box-shadow: none !important;
          outline: none !important;
          padding: 0;
          display: block;
          filter: none !important;
        }
        button {
          margin-top: 30px;
          padding: 10px 20px;
          background-color: #d32f2f;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
        }
        button:hover {
          background-color: #b71c1c;
        }
      </style>
    </head>
    <body>
      <h1>Are You Eligible to Donate Blood?</h1>
      <p>Donating blood is safe and easy to do. Find out the general eligibility criteria.</p>
      <div class="eligibility-criteria1">
        <h2>General Eligibility Criteria</h2>
        <div class="criteria-item" onclick="toggleCriteria(this)">
          <span class="plus-symbol">+</span>
          Must be at least 16 years old*
          <div class="criteria-desc">
            <span>
              You must be at least 16 years old to donate blood. Some locations may
              require parental consent for donors under 18.
            </span>
            <span class="criteria-img-circle">
              <!-- Freehand SVG: Birthday cake -->
              <svg viewBox="0 0 54 54" fill="none">
                <rect x="8" y="22" width="38" height="20" rx="6" fill="#fff3e0" stroke="#d32f2f" stroke-width="2"/>
                <ellipse cx="27" cy="22" rx="19" ry="7" fill="#ffe0b2" stroke="#d32f2f" stroke-width="2"/>
                <rect x="24" y="10" width="6" height="10" rx="3" fill="#fff59d" stroke="#d32f2f" stroke-width="1"/>
                <circle cx="27" cy="10" r="2" fill="#d32f2f"/>
                <ellipse cx="27" cy="42" rx="19" ry="4" fill="#ffe0b2" opacity="0.5"/>
              </svg>
            </span>
          </div>
        </div>
        <div class="criteria-item" onclick="toggleCriteria(this)">
          <span class="plus-symbol">+</span>
          Must weigh at least 110 pounds
          <div class="criteria-desc">
            <span>
              A minimum weight of 110 pounds (50 kg) is required to ensure donor safety and
              adequate blood volume.
            </span>
            <span class="criteria-img-circle">
              <!-- Freehand SVG: Weight scale -->
              <svg viewBox="0 0 54 54" fill="none">
                <ellipse cx="27" cy="32" rx="18" ry="14" fill="#e3f2fd" stroke="#1976d2" stroke-width="2"/>
                <rect x="17" y="18" width="20" height="10" rx="5" fill="#fff" stroke="#1976d2" stroke-width="2"/>
                <circle cx="27" cy="23" r="3" fill="#1976d2"/>
                <rect x="25.5" y="13" width="3" height="8" rx="1.5" fill="#1976d2"/>
              </svg>
            </span>
          </div>
        </div>
        <div class="criteria-item" onclick="toggleCriteria(this)">
          <span class="plus-symbol">+</span>
          Must be in good health
          <div class="criteria-desc">
            <span>
              You should feel well and healthy on the day of donation, with no cold, flu, or
              infection symptoms.
            </span>
            <span class="criteria-img-circle">
              <!-- Freehand SVG: Heart -->
              <svg viewBox="0 0 54 54" fill="none">
                <path d="M27 44s-13-8.5-13-18.5C14 18 20 14 27 22c7-8 13-4 13 3.5C40 35.5 27 44 27 44z" fill="#e57373" stroke="#d32f2f" stroke-width="2"/>
              </svg>
            </span>
          </div>
        </div>
        <div class="criteria-item" onclick="toggleCriteria(this)">
          <span class="plus-symbol">+</span>
          Eat within 2 hours ahead of your donation
          <div class="criteria-desc">
            <span>
              Eating a healthy meal within 2 hours before donating helps prevent dizziness or
              fainting.
            </span>
            <span class="criteria-img-circle">
              <!-- Freehand SVG: Meal plate -->
              <svg viewBox="0 0 54 54" fill="none">
                <circle cx="27" cy="27" r="20" fill="#fffde7" stroke="#fbc02d" stroke-width="2"/>
                <ellipse cx="27" cy="27" rx="12" ry="7" fill="#ffe082"/>
                <rect x="22" y="20" width="10" height="4" rx="2" fill="#a5d6a7"/>
                <rect x="25" y="30" width="4" height="7" rx="2" fill="#ef9a9a"/>
              </svg>
            </span>
          </div>
        </div>
        <div class="criteria-item" onclick="toggleCriteria(this)">
          <span class="plus-symbol">+</span>
          Must not have donated blood in the last 56 days
          <div class="criteria-desc">
            <span>
              There must be at least 56 days (8 weeks) between whole blood donations to allow your body to replenish.
            </span>
            <span class="criteria-img-circle">
              <!-- Freehand SVG: Calendar -->
              <svg viewBox="0 0 54 54" fill="none">
                <rect x="10" y="14" width="34" height="28" rx="4" fill="#e1f5fe" stroke="#0288d1" stroke-width="2"/>
                <rect x="10" y="20" width="34" height="6" fill="#b3e5fc"/>
                <rect x="16" y="28" width="6" height="6" fill="#0288d1"/>
                <rect x="26" y="28" width="6" height="6" fill="#0288d1"/>
                <rect x="36" y="28" width="6" height="6" fill="#0288d1"/>
              </svg>
            </span>
          </div>
        </div>
        <div class="criteria-item" onclick="toggleCriteria(this)">
          <span class="plus-symbol">+</span>
          Drink plenty of non-alcoholic liquids
          <div class="criteria-desc">
            <span>
              Staying hydrated before and after donation helps maintain blood pressure and recovery.
            </span>
            <span class="criteria-img-circle">
              <!-- Freehand SVG: Water glass -->
              <svg viewBox="0 0 54 54" fill="none">
                <rect x="18" y="10" width="18" height="34" rx="6" fill="#e3f2fd" stroke="#1976d2" stroke-width="2"/>
                <rect x="20" y="28" width="14" height="10" rx="5" fill="#81d4fa"/>
                <ellipse cx="27" cy="10" rx="9" ry="3" fill="#b3e5fc"/>
              </svg>
            </span>
          </div>
        </div>
        <div class="criteria-item" onclick="toggleCriteria(this)">
          <span class="plus-symbol">+</span>
          Bring a valid ID with your name and photo
          <div class="criteria-desc">
            <span>
              A government-issued photo ID is required for identification and record-keeping.
            </span>
            <span class="criteria-img-circle">
              <!-- Freehand SVG: ID card -->
              <svg viewBox="0 0 54 54" fill="none">
                <rect x="8" y="16" width="38" height="22" rx="4" fill="#fffde7" stroke="#fbc02d" stroke-width="2"/>
                <rect x="12" y="20" width="10" height="14" rx="2" fill="#ffe082"/>
                <circle cx="17" cy="25" r="3" fill="#fbc02d"/>
                <rect x="26" y="22" width="16" height="3" rx="1.5" fill="#fbc02d"/>
                <rect x="26" y="28" width="12" height="2" rx="1" fill="#fbc02d"/>
              </svg>
            </span>
          </div>
        </div>
      </div>
      <button onclick="goBack()">Go Back</button>
      <script>
        function toggleCriteria(item) {
          document.querySelectorAll('.criteria-item').forEach(function (div) {
            if (div !== item) div.classList.remove('active');
          });
          item.classList.toggle('active');
        }
      </script>
    </body>
  `;
}
function toggleCriteria(item) {
  // Collapse all others
  document.querySelectorAll('.criteria-item').forEach(function (div) {
    if (div !== item) div.classList.remove('active');
  });
  // Toggle this one
  item.classList.toggle('active');
}
function goBack() {
  window.location.reload();
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


