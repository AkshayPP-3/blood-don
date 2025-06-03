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
          max-width: 700px;
          margin: 20px auto;
          padding: 0 10px;
          background: #f9f9f9;
        }
        .main1{
        display:flex;
        flex-direction:row;
        justify-content:space-around;
        gap: 126px;
        }
        .main2{
        display:flex;
        flex-direction:row;
        justify-content:space-around;
        gap: 127px;
        }
        .main3{
        display:flex;
        flex-direction:row;
        justify-content:space-around;
        gap: 128px;
        }
        img{
        height:100px;
        width:100px;
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
        .step-card {
          width: 100px;  
          border: 1px solid #ccc;
          border-radius: 8px;
          padding: 20px 30px;
          margin-bottom: 15px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
          background-color: #fff;
        }
        .step-number {
          font-weight: bold;
          font-size: 1.3em;
          color: #d32f2f;
        }
        .step-title {
          font-weight: bold;
          font-size: 1.1em;
          margin-top: 5px;
        }
        .step-icon {
          font-style: italic;
          color: #777;
          margin-top: 4px;
        }
      </style>
    </head>
    <body>
      <h2>Blood Donation Process</h2>
      <p class="description">
        Find out what to do after you have scheduled your appointment, and learn about every step in our simple blood donation process. Also, download and print your blood donation preparation guide.
      </p>
      <div class="main">
    <div class="main1">
      <div class="step-card">
        <div class="step-number">1.</div>
        <div class="step-title">Check in for your appointment.</div>
        <br><br><br><br><br>
        <img class="process__step-image" 
        src="https://www.vitalant.org/getattachment/89db149a-36b4-43d8-84ad-c13f4a316045/icon-desk.png?lang=en-US&amp;ext=.png"
         alt="&quot;Desk&quot;">
      </div>

      <div class="step-card">
        <div class="step-number">2.</div>
        <div class="step-title">Meet with trained staff to complete health screening and questionnaire.</div>
        
        <img class="process__step-image" 
        src="https://www.vitalant.org/getattachment/0c74f8bf-7f5f-46d9-ba8c-2a36f6b777b2/icon-stethoscope.png?lang=en-US&amp;ext=.png" 
        alt="&quot;Stethoscope&quot;">
      </div>

      <div class="step-card">
        <div class="step-number">3.</div>
        <div class="step-title">Donor care specialist will review results and determine the best way for you to donate.</div>
        <img class="process__step-image"
         src="https://www.vitalant.org/getattachment/e2d7bcfb-115f-4701-b6a8-24f8e4019edd/icon-notes.png?lang=en-US&amp;ext=.png" 
        alt="&quot;Paper" and="" pencil&quot;="">
      </div> 
    </div>
    <div class="main2">
      <div class="step-card">
        <div class="step-number">4.</div>
        <div class="step-title">Relax while your specialist prepares materials and equipment.</div>
        <br>
        <img class="process__step-image" 
        src="https://www.vitalant.org/getattachment/bc630437-1a1f-4d09-be32-c9952e0a6aa1/icon-chair.png?lang=en-US&amp;ext=.png" 
        alt="&quot;Patient" in="" chair&quot;="">
      </div>

      <div class="step-card">
        <div class="step-number">5.</div>
        <div class="step-title">Specialist will clean an area on your arm and insert a sterile needle to begin.</div>
        <img class="process__step-image"
         src="https://www.vitalant.org/getattachment/afbb7571-c351-4589-ad03-926f5fbdae72/icon-iv.png?lang=en-US&amp;ext=.png"
         alt="&quot;Hand" with="" sterile="" needle="" inserted&quot;="">
      </div>

      <div class="step-card">
        <div class="step-number">6.</div>
        <div class="step-title">Samples of your blood will be collected for testing.</div>
        <br><br><br><br>
        <img class="process__step-image"
         src="https://www.vitalant.org/getattachment/b9cb53af-7a52-4657-893c-59e9a231c172/icon-test-tubes.png?lang=en-US&amp;ext=.png"
         alt="&quot;Test" tube="" samples&quot;="">
      </div>
    </div>
    <div class="main3">
      <div class="step-card">
        <div class="step-number">7.</div>
        <div class="step-title">You will then complete the whole blood donation process, which can take up to 15 minutes (usually 1O).</div>
        <img class="process__step-image" 
        src="https://www.vitalant.org/getattachment/40b4a0d3-f8c8-4c95-b7ca-7a5829b866e4/icon-blood-bag.png?lang=en-US&amp;ext=.png" 
        alt="&quot;Collected" blood&quot;="">
      </div>

      <div class="step-card">
        <div class="step-number">8.</div>
        <div class="step-title">Enjoy light refreshments to replenish fluids and nutrients.</div>
        <br><br><br<br><br><br><br<br><br><br><br<br><br>
        <img class="process__step-image"
        src="https://www.vitalant.org/getattachment/e39ed217-7cab-458d-a701-d2995068d17b/icon-snacks.png?lang=en-US&amp;ext=.png" 
        alt="&quot;Snacks&quot;">
      </div>

      <div class="step-card">
        <div class="step-number">9.</div>
        <div class="step-title">You’re done! Feel proud knowing you’ve saved up to three lives, and encourage friends and family to donate!</div>
        <img class="process__step-image"
        src="https://www.vitalant.org/getattachment/664ce1ee-cbcc-4048-8385-5733389be1dc/icon-group.png?lang=en-US&amp;ext=.png" 
        alt="&quot;A" group="" of="" three="" people&quot;="">
      </div> 
    </div>  
   </div> 
    </body>
  `;
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
          
        
        }
        .eligibility-criteria1 p {
          background-color: #fff;
          border: 1px solid #ccc;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
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
        <p>Must be at least 16 years old*</p>
        <p>Must weigh at least 110 pounds</p>
        <p>Must be in good health</p>
        <p>Eat within 2 hours ahead of your donation</p>
        <p>Must not have donated blood in the last 56 days</p>
        <p>Drink plenty of non-alcoholic liquids</p>
        <p>Bring a valid ID with your name and photo</p>
      </div>
      <button onclick="goBack()">Go Back</button>
    </body>
  `;
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


