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
const passwordToggleBtn = document.getElementById("passwordToggle");

// Password checklist elements
const checklistItems = {
  length: document.getElementById("check-length"),
  uppercase: document.getElementById("check-uppercase"),
  lowercase: document.getElementById("check-lowercase"),
  number: document.getElementById("check-number"),
  special: document.getElementById("check-special")
};

// Password validation regex (strict policy)
// Requires: 12+ chars, lowercase, uppercase, digit, and special char
const passwordRegex = /^(?=.{12,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).*$/;

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

// Check individual password criteria
function checkPasswordCriteria(password) {
  return {
    length: password.length >= 12,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[!@#$%^&()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
  };
}

// Update the checklist display in real-time
function updateChecklist(password) {
  const criteria = checkPasswordCriteria(password);

  // Update each checklist item
  const items = [
    { key: 'length', element: checklistItems.length },
    { key: 'uppercase', element: checklistItems.uppercase },
    { key: 'lowercase', element: checklistItems.lowercase },
    { key: 'number', element: checklistItems.number },
    { key: 'special', element: checklistItems.special }
  ];

  items.forEach(item => {
    if (criteria[item.key]) {
      item.element.classList.add('valid');
      item.element.querySelector('.check-icon').textContent = '✓';
    } else {
      item.element.classList.remove('valid');
      item.element.querySelector('.check-icon').textContent = '✗';
    }
  });

  return criteria;
}

// Validate password against strict policy
function validatePassword() {
  const password = passwordInput.value;
  const criteria = updateChecklist(password);

  // Check if password matches full regex pattern
  if (!password.match(passwordRegex)) {
    if (password === "") {
      passwordError.textContent = "Password is required";
    } else {
      // Show which specific requirements are missing
      const missing = [];
      if (!criteria.length) missing.push("12+ characters");
      if (!criteria.uppercase) missing.push("uppercase letter");
      if (!criteria.lowercase) missing.push("lowercase letter");
      if (!criteria.number) missing.push("number");
      if (!criteria.special) missing.push("special character");
      
      passwordError.textContent = missing.length > 0 
        ? `Missing: ${missing.join(", ")}`
        : "Password does not meet requirements";
    }
    return false;
  }

  passwordError.textContent = "";
  return true;
}

// === Event Handling ===
nameInput.addEventListener("input", validateName);        // real-time feedback
emailInput.addEventListener("blur", validateEmail);       // on losing focus
passwordInput.addEventListener("input", validatePassword); // real-time password validation

// Password toggle button (click to toggle visibility)
passwordToggleBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const isPassword = passwordInput.type === "password";
  passwordInput.type = isPassword ? "text" : "password";
  
  // Update icon
  const icon = passwordToggleBtn.querySelector('.toggle-icon');
  icon.textContent = isPassword ? "🙈" : "👁️";
  
  // Update aria-pressed
  passwordToggleBtn.setAttribute("aria-pressed", isPassword);
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
