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
nameInput.addEventListener("input", validateName); // real-time feedback
emailInput.addEventListener("blur", validateEmail); // on losing focus
passwordInput.addEventListener("input", validatePassword);

// === Form Submission ===
form.addEventListener("submit", function (event) {
    event.preventDefault(); // prevent refresh

    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    if (isNameValid && isEmailValid && isPasswordValid) {
        form.style.display = "none";
        successMessage.classList.remove("hidden");
        console.log("User Data:", {
            name: nameInput.value,
            email: emailInput.value,
            password: passwordInput.value,
        });
    }
});
