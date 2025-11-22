// === Form Elements ===
const form = document.getElementById("registrationForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

// Error message fields
const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");

const successMessage = document.getElementById("successMessage");

// Theme toggle elements
const themeToggleBtn = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

// Password toggle elements
const passwordToggle = document.getElementById("passwordToggle");

// === Validation Functions ===
function validateName() {
  if (nameInput.value.trim() === "") {
    nameError.textContent = "Name cannot be empty";
    return false;
  }
  nameError.textContent = "";
  return true;
}

function validateEmail() {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailInput.value.match(emailPattern)) {
    emailError.textContent = "Enter a valid email address";
    return false;
  }

  emailError.textContent = "";
  return true;
}

function validatePassword() {
  const password = passwordInput.value;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  if (password === "") {
    passwordError.textContent = "Password cannot be empty";
    return false;
  }
  if (!hasUppercase) {
    passwordError.textContent = "Must contain an uppercase letter";
    return false;
  }
  if (!hasNumber) {
    passwordError.textContent = "Must contain a number";
    return false;
  }

  passwordError.textContent = "";
  return true;
}

// === Event Handling (At least two event types used) ===
nameInput.addEventListener("input", validateName);        // real-time feedback
emailInput.addEventListener("blur", validateEmail);       // on losing focus
passwordInput.addEventListener("input", validatePassword);

// Password reveal toggle (hover to show)
passwordToggle.addEventListener("mouseenter", function() {
  passwordInput.type = "text";
});

passwordToggle.addEventListener("mouseleave", function() {
  passwordInput.type = "password";
});

// === Form Submission ===
form.addEventListener("submit", function (event) {
  event.preventDefault(); // prevent refresh

  const isNameValid = validateName();
  const isEmailValid = validateEmail();
  const isPasswordValid = validatePassword();

  if (isNameValid && isEmailValid && isPasswordValid) {
    form.style.display = "none";
    // show success with animation: remove hidden and add show class
    successMessage.classList.remove("hidden");
    successMessage.classList.add("show");
    // Collected user data (demo)
    console.log("User Data:", {
      name: nameInput.value,
      email: emailInput.value,
      password: passwordInput.value,
    });
  }
});

/* === Character Animations === */
const character = document.getElementById('character');
const blinkOverlay = document.getElementById('blinkOverlay');

const svgMaps = {
  idle: '<svg width="100" height="150" viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="25" r="15" fill="#FFE0B5" stroke="#666" stroke-width="1.5"/><path d="M35 12 Q50 5 65 12 L65 15 Q50 18 35 15 Z" fill="#4A4A4A"/><circle cx="45" cy="22" r="1.5" fill="#333"/><circle cx="55" cy="22" r="1.5" fill="#333"/><path d="M48 26 Q50 28 52 26" stroke="#333" stroke-width="1" fill="none" stroke-linecap="round"/><rect x="40" y="40" width="20" height="50" rx="5" fill="#4A90E2" stroke="#666" stroke-width="1"/><ellipse cx="32" cy="50" rx="5" ry="20" fill="#FFE0B5"/><ellipse cx="68" cy="50" rx="5" ry="20" fill="#FFE0B5"/><rect x="42" y="90" width="6" height="60" rx="3" fill="#333"/><rect x="52" y="90" width="6" height="60" rx="3" fill="#333"/><rect x="40" y="145" width="10" height="5" rx="2" fill="#333"/><rect x="50" y="145" width="10" height="5" rx="2" fill="#333"/></svg>',
  reading: '<svg width="100" height="150" viewBox="0 0 100 150" transform="rotate(-10 50 75)" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="25" r="15" fill="#FFE0B5" stroke="#666" stroke-width="1.5"/><path d="M35 12 Q50 5 65 12 L65 15 Q50 18 35 15 Z" fill="#4A4A4A"/><circle cx="45" cy="22" r="1.5" fill="#333"/><circle cx="55" cy="22" r="1.5" fill="#333"/><path d="M48 26 Q50 28 52 26" stroke="#333" stroke-width="1" fill="none" stroke-linecap="round"/><rect x="40" y="40" width="20" height="50" rx="5" fill="#4A90E2" stroke="#666" stroke-width="1"/><ellipse cx="32" cy="50" rx="5" ry="20" fill="#FFE0B5"/><ellipse cx="68" cy="50" rx="5" ry="20" fill="#FFE0B5"/><rect x="42" y="90" width="6" height="60" rx="3" fill="#333"/><rect x="52" y="90" width="6" height="60" rx="3" fill="#333"/><rect x="40" y="145" width="10" height="5" rx="2" fill="#333"/><rect x="50" y="145" width="10" height="5" rx="2" fill="#333"/></svg>',
  'with-glasses': '<svg width="100" height="150" viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="25" r="15" fill="#FFE0B5" stroke="#666" stroke-width="1.5"/><path d="M35 12 Q50 5 65 12 L65 15 Q50 18 35 15 Z" fill="#4A4A4A"/><circle cx="45" cy="22" r="3" fill="none" stroke="#333" stroke-width="1.5"/><circle cx="55" cy="22" r="3" fill="none" stroke="#333" stroke-width="1.5"/><path d="M48 22 L52 22" stroke="#333" stroke-width="1.5"/><circle cx="45" cy="22" r="1.5" fill="#333"/><circle cx="55" cy="22" r="1.5" fill="#333"/><path d="M48 26 Q50 28 52 26" stroke="#333" stroke-width="1" fill="none" stroke-linecap="round"/><rect x="40" y="40" width="20" height="50" rx="5" fill="#4A90E2" stroke="#666" stroke-width="1"/><ellipse cx="32" cy="50" rx="5" ry="20" fill="#FFE0B5"/><ellipse cx="68" cy="50" rx="5" ry="20" fill="#FFE0B5"/><rect x="42" y="90" width="6" height="60" rx="3" fill="#333"/><rect x="52" y="90" width="6" height="60" rx="3" fill="#333"/><rect x="40" y="145" width="10" height="5" rx="2" fill="#333"/><rect x="50" y="145" width="10" height="5" rx="2" fill="#333"/></svg>',
  covering: '<svg width="100" height="150" viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="25" r="15" fill="#FFE0B5" stroke="#666" stroke-width="1.5"/><path d="M35 12 Q50 5 65 12 L65 15 Q50 18 35 15 Z" fill="#4A4A4A"/><circle cx="45" cy="22" r="1.5" fill="#333"/><circle cx="55" cy="22" r="1.5" fill="#333"/><path d="M48 26 Q50 28 52 26" stroke="#333" stroke-width="1" fill="none" stroke-linecap="round"/><rect x="40" y="40" width="20" height="50" rx="5" fill="#4A90E2" stroke="#666" stroke-width="1"/><ellipse cx="42" cy="35" rx="5" ry="15" fill="#FFE0B5"/><ellipse cx="58" cy="35" rx="5" ry="15" fill="#FFE0B5"/><rect x="42" y="90" width="6" height="60" rx="3" fill="#333"/><rect x="52" y="90" width="6" height="60" rx="3" fill="#333"/><rect x="40" y="145" width="10" height="5" rx="2" fill="#333"/><rect x="50" y="145" width="10" height="5" rx="2" fill="#333"/></svg>'
};

const blinkLayerSvg = '<svg width="100" height="150" viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg"><ellipse cx="50" cy="25" rx="15" ry="17" fill="#FFE0B5" opacity="0.8"/><path d="M40 23 Q50 21 60 23" stroke="#333" stroke-width="1.5" fill="none" stroke-linecap="round"/></svg>';

function setReaction(reactionClass) {
  character.classList.remove('reading', 'with-glasses', 'covering', 'idle');
  character.classList.add(reactionClass || 'idle');
  character.innerHTML = svgMaps[reactionClass] || svgMaps.idle;
}

function updateReaction() {
  const focused = document.activeElement;
  if (focused === nameInput) setReaction('reading');
  else if (focused === emailInput) setReaction('with-glasses');
  else if (focused === passwordInput) setReaction('covering');
  else setReaction('idle');
}

[nameInput, emailInput, passwordInput].forEach(input => {
  input.addEventListener('focus', updateReaction);
  input.addEventListener('blur', () => setTimeout(updateReaction, 0));
});

// Initial idle
setReaction('idle');

// Blinking every 3-6 seconds
setInterval(() => {
  if (character.classList.contains('idle')) {
    blinkOverlay.innerHTML = blinkLayerSvg;
    blinkOverlay.style.display = 'block';
    setTimeout(() => blinkOverlay.style.display = 'none', 120);
  }
}, 3000 + Math.random() * 3000);

/* === Theme Toggle Logic === */

// Apply theme from localStorage or system if none stored
function applyTheme(theme) {
  if (theme === "dark") {
    document.body.classList.add("dark");
    themeToggleBtn.setAttribute("aria-pressed", "true");
    themeIcon.textContent = "☀️";
  } else {
    document.body.classList.remove("dark");
    themeToggleBtn.setAttribute("aria-pressed", "false");
    themeIcon.textContent = "🌙";
  }
}

// Load saved preference or default to light
const savedTheme = localStorage.getItem("site-theme");
if (savedTheme) {
  applyTheme(savedTheme);
} else {
  // optional: detect system preference
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(prefersDark ? "dark" : "light");
}

// Toggle handler (click)
themeToggleBtn.addEventListener("click", function () {
  const isDark = document.body.classList.contains("dark");
  const newTheme = isDark ? "light" : "dark";
  applyTheme(newTheme);
  localStorage.setItem("site-theme", newTheme);
});

// Keyboard accessibility (keydown: Enter or Space)
themeToggleBtn.addEventListener("keydown", function (e) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    themeToggleBtn.click();
  }
});
// Show error with animation
function showError(inputElement, errorElement, message) {
  errorElement.textContent = message;
  errorElement.classList.add("show");
  setTimeout(() => {
    errorElement.classList.remove("show");
  }, 300); // Remove shake after animation
}

// Updated validation functions
function validateName() {
  if (nameInput.value.trim() === "") {
    showError(nameInput, nameError, "Name cannot be empty");
    return false;
  }
  nameError.textContent = "";
  return true;
}

function validateEmail() {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailInput.value.match(emailPattern)) {
    showError(emailInput, emailError, "Enter a valid email address");
    return false;
  }
  emailError.textContent = "";
  return true;
}

function validatePassword() {
  const password = passwordInput.value;
  const minLength = 12;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (password === "") {
    showError(passwordInput, passwordError, "Password cannot be empty");
    return false;
  }
  if (!hasUppercase) {
    showError(passwordInput, passwordError, "Must contain an uppercase letter");
    return false;
  }
  if (!hasNumber) {
    showError(passwordInput, passwordError, "Must contain a number");
    return false;
  }

  passwordError.textContent = "";
  return true;
}

// NOTE: removed stray global check (it caused ReferenceError because
// isNameValid/isEmailValid/isPasswordValid were local to the submit handler).
// Success message is now handled inside the submit listener above.
