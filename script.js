const submitBtn = document.getElementById('submitBtn');
const message = document.getElementById('success-message');
const inputs = document.querySelectorAll('.input-field');
const radioButtons = document.querySelectorAll('input[name="radio"]');
const form = document.getElementById('contact-form');

// Function to clear the form after submission
function clearForm() {
    inputs.forEach(input => input.value = '');
    radioButtons.forEach(radio => radio.checked = false);
    document.getElementById('consent').checked = false;
}

// Function to show or hide error based on input validity
function handleInput(input) {
    const errorMsg = input.nextElementSibling; // Get the next sibling which is the error message (p tag)
    
    if (!input.checkValidity()) {
        errorMsg.style.display = "block"; // Show error message if input is invalid
    } else {
        errorMsg.style.display = "none"; // Hide error message if input is valid
    }
}

// Attach event listeners to each input field to check validity during typing
inputs.forEach(input => {
    input.addEventListener('input', () => handleInput(input));
});

// Handle radio buttons separately with validation
function validateRadioButtons() {
    const errorMsg = document.getElementById('radio-error');
    let isChecked = false;

    // Check if any radio button is selected
    radioButtons.forEach(radio => {
        if (radio.checked) {
            isChecked = true;
        }
    });

    // Show or hide the error message
    if (!isChecked) {
        errorMsg.style.display = "block";
        return false;
    } else {
        errorMsg.style.display = "none";
        return true;
    }
}

// Add event listeners to each radio button to remove error when selected
radioButtons.forEach(radio => {
    radio.addEventListener('change', validateRadioButtons);
});

// Add event listener to the checkbox to hide the error when it's checked
const consentCheckbox = document.getElementById('consent');
const consentError = document.getElementById('consent-error');
consentCheckbox.addEventListener('change', () => {
    if (consentCheckbox.checked) {
        consentError.style.display = 'none';
    }
});

// Handle form submission
submitBtn.addEventListener('click', (event) => {
    event.preventDefault();
    let hasError = false;

    // Validate all inputs
    inputs.forEach(inputValue => {
        if (!inputValue.checkValidity()) {
            handleInput(inputValue);
            hasError = true;
        }
    });

    // Validate radio buttons
    if (!validateRadioButtons()) {
        hasError = true;
    }

    // Validate checkbox
    if (!consentCheckbox.checked) {
        consentError.style.display = "block";
        hasError = true;
    } else {
        consentError.style.display = "none";
    }

    // If no error, display success message and clear the form
    if (!hasError) {
        message.style.display = 'flex';
        clearForm();
    }
});
