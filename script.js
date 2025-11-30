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
let passwordVisible = false; // Track visibility state

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
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

  if (password === "") {
    passwordError.textContent = "Password cannot be empty";
    return false;
  }
  if (password.length < 12) {
    passwordError.textContent = "Password must be at least 12 characters";
    return false;
  }
  if (!hasUppercase) {
    passwordError.textContent = "Must contain an uppercase letter (A-Z)";
    return false;
  }
  if (!hasLowercase) {
    passwordError.textContent = "Must contain a lowercase letter (a-z)";
    return false;
  }
  if (!hasNumber) {
    passwordError.textContent = "Must contain a number (0-9)";
    return false;
  }
  if (!hasSpecial) {
    passwordError.textContent =
      "Must contain a special character (!@#$%^&*()_+-=[]{};':\"\\|,.<>/?)";
    return false;
  }

  passwordError.textContent = "";
  return true;
}

// === Event Handling (At least two event types used) ===
nameInput.addEventListener("input", validateName); // real-time feedback
emailInput.addEventListener("blur", validateEmail); // on losing focus
passwordInput.addEventListener("input", validatePassword);

// Password reveal toggle (click to toggle)
passwordToggle.addEventListener("click", function () {
  passwordVisible = !passwordVisible;
  passwordInput.type = passwordVisible ? "text" : "password";
  passwordToggle.textContent = passwordVisible ? "🙈" : "👁️";
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
  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
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
