const form = document.querySelector("form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const nummerInput = document.getElementById("nummer");
const bemInput = document.getElementById("bemærkninger");
const arrangementInput = document.getElementById("arrangement");

const feedback = document.getElementById("form-feedback");

form.addEventListener("submit", function(event) {
    event.preventDefault();
    clearMessage();

    if (validateForm()) {
        showSuccess("Formularen er gyldig. Tak, din besked er klar til at blive sendt.");
    }
});

function validateForm() {
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const nummer = nummerInput.value.trim();

    clearFieldState(nameInput);
    clearFieldState(emailInput);
    clearFieldState(nummerInput);

    if (name === "") {
        setFieldInvalid(nameInput);
        showError("Indtast dit navn.");
        return false;
    }
    if (!isnameValid(name)) {
        setFieldInvalid(nameInput);
        showError("Navnet skal være mindst 3 bogstaver og må kun indeholde bogstaver og mellemrum.");
        return false;
    }

    if (!isValidEmail(email)) {
        setFieldInvalid(emailInput);
        showError("Indtast en gyldig e-mailadresse.");
        return false;
    }

    if (nummer === "") {
        setFieldInvalid(nummerInput);
        showError("Indtast dit telefonnummer.");
        return false;
    }

    if (!isValidPhoneNumber(nummer)) {
        setFieldInvalid(nummerInput);
        showError("Indtast et gyldigt telefonnummer på 8 cifre.");
        return false;
    } 

    return true;
}

function setFieldInvalid(field) {
    field.classList.add("invalid");
    field.focus();
}

function clearFieldState(field) {
    field.classList.remove("invalid");
}

function showError(message) {
    feedback.textContent = message;
    feedback.className = "error";
}

function showSuccess(message) {
    feedback.textContent = message;
    feedback.className = "success";
}

function clearMessage() {
    feedback.textContent = "";
    feedback.className = "";
}

function isValidEmail(email) {
    return /^\S+@\S+\.\S+$/.test(email);
}

function isValidPhoneNumber(nummer) {
    return /^\d{8}$/.test(nummer);
}
function isnameValid(name) {
    const letterCount = name.replace(/[^a-zA-ZæøåÆØÅ]/g, "").length;
    return /^[a-zA-ZæøåÆØÅ\s]+$/.test(name) && letterCount >= 3;
}
