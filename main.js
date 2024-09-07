document.addEventListener('DOMContentLoaded', function () {
    // Add input event listeners to trigger validation automatically
    var nameElement = document.getElementById('name');
    var emailElement = document.getElementById('email');
    var phoneElement = document.getElementById('phone');
    var educationElement = document.getElementById('education');
    var experienceElement = document.getElementById('experience');
    var skillsElement = document.getElementById('skills');

    nameElement.addEventListener('input', validateName);
    emailElement.addEventListener('input', validateEmail);
    phoneElement.addEventListener('input', validatePhone);
    educationElement.addEventListener('input', validateEducation);
    experienceElement.addEventListener('input', validateExperience);
    skillsElement.addEventListener('input', validateSkills);
});

document.getElementById('resume_form').addEventListener('submit', function (event) {
    event.preventDefault();

    // Validate all fields before generating resume
    if (validateAll()) {
        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var phone = document.getElementById('phone').value;
        var education = document.getElementById('education').value;
        var experience = document.getElementById('experience').value;
        var skills = document.getElementById('skills').value;

        var resumeData = `
            <h2>RESUME</h2>
            <h2>Personal Information</h2>
            <p><strong>Name :</strong> ${name}</p>
            <p><strong>Email :</strong> ${email}</p>
            <p><strong>Phone Number :</strong> ${phone}</p>
            <h2>Education</h2>
            <p>${education}</p>
            <h2>Experience</h2>
            <p>${experience}</p>
            <h2>Skills</h2>
            <p>${skills}</p>
        `;

        var resumeDataElement = document.getElementById('resume_data');
        if (resumeDataElement) {
            resumeDataElement.innerHTML = resumeData;
            resumeDataElement.style.display = 'block';
            addEditButton();
        } else {
            console.error('The Resume Output Elements are Missing!');
        }

        // Generate and display the shareable resume link
        var username = name.toLowerCase().replace(/\s+/g, '-'); // Sanitize the username
        var resumeURL = generateResumeURL(username);

        var resumeURLDiv = document.getElementById('resume_url');
        if (resumeURLDiv) {
            resumeURLDiv.style.display = 'block';
            resumeURLDiv.innerHTML = `<a href="${resumeURL}" target="_blank">View Your Resume</a>`;
        } else {
            console.error('Resume URL div not found');
        }

        // Reset the form fields
        var formElement = document.getElementById('resume_form');
        if (formElement) {
            formElement.reset();
        }
    } else {
        console.error('Form validation failed.');
    }
});

// Function to generate a unique URL for the resume
function generateResumeURL(username) {
    var baseURL = window.location.origin; // Automatically captures the current domain
    return `${baseURL}/resume/${username}`;
}

// Function to add the "Edit" button dynamically
function addEditButton() {
    var editButton = document.getElementById('edit_button');
    if (!editButton) {
        editButton = document.createElement('button');
        editButton.id = 'edit_button';
        editButton.textContent = 'Edit Resume';
        editButton.style.display = 'block';
        editButton.style.marginTop = '20px';
        var resumeContainer = document.getElementById('resume_data');
        if (resumeContainer) {
            resumeContainer.appendChild(editButton);
        } else {
            console.error('Resume data not found');
        }
        editButton.addEventListener('click', enableResumeEditing);
    }
}

// Function to enable editing of the resume
function enableResumeEditing() {
    var resumeDataElement = document.getElementById('resume_data');
    if (resumeDataElement) {
        var resumeHtml = resumeDataElement.innerHTML;
        resumeDataElement.style.display = 'none';

        document.getElementById('name').value = extractResumeData('Name', resumeHtml);
        document.getElementById('email').value = extractResumeData('Email', resumeHtml);
        document.getElementById('phone').value = extractResumeData('Phone Number', resumeHtml);
        document.getElementById('education').value = extractResumeData('Education', resumeHtml);
        document.getElementById('experience').value = extractResumeData('Experience', resumeHtml);
        document.getElementById('skills').value = extractResumeData('Skills', resumeHtml);

        document.getElementById('resume_form').scrollIntoView({ behavior: 'smooth' });
    }
}

// Utility function to extract resume data from the HTML string
function extractResumeData(label, html) {
    var regex;
    if (label === 'Education' || label === 'Experience' || label === 'Skills') {
        regex = new RegExp(`<h2>${label}</h2>\\s*<p>([^<]+)</p>`);
    } else {
        regex = new RegExp(`<p><strong>${label} :</strong>\\s*([^<]+)</p>`);
    }
    var match = html.match(regex);
    return match ? match[1].trim() : '';
}

// Form validation functions go here...

// Validation functions (same as before)...
// Validate all fields
function validateAll() {
    var isNameValid = validateName();
    var isEmailValid = validateEmail();
    var isPhoneValid = validatePhone();
    var isEducationValid = validateEducation();
    var isExperienceValid = validateExperience();
    var isSkillsValid = validateSkills();
    return isNameValid && isEmailValid && isPhoneValid && isEducationValid && isExperienceValid && isSkillsValid;
}
// Validation functions
function validateName() {
    var nameElement = document.getElementById('name');
    var nameError = document.getElementById('name_error');
    var nameRegex = /^[a-zA-Z\s]+$/;
    if (nameElement.value.length === 0) {
        nameError.textContent = 'Please fill out this field.';
        return false;
    }
    else if (nameElement.value.length < 3 || nameElement.value.length > 12) {
        nameError.textContent = 'Name must be between 3 and 12 characters long.';
        return false;
    }
    else if (!nameRegex.test(nameElement.value)) {
        nameError.textContent = 'Invalid name. Only letters and spaces allowed.';
        return false;
    }
    else {
        nameError.textContent = '';
        return true;
    }
}
function validateEmail() {
    var emailElement = document.getElementById('email');
    var emailError = document.getElementById('email_error');
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailElement.value.length === 0) {
        emailError.textContent = 'Please fill out this field.';
        return false;
    }
    else if (!emailRegex.test(emailElement.value)) {
        emailError.textContent = 'Invalid email address.';
        return false;
    }
    else {
        emailError.textContent = '';
        return true;
    }
}
function validatePhone() {
    var phoneElement = document.getElementById('phone');
    var phoneError = document.getElementById('phone_error');
    var phoneRegex = /^\d{11}$/;
    if (phoneElement.value.length === 0) {
        phoneError.textContent = 'Please fill out this field.';
        return false;
    }
    else if (!phoneRegex.test(phoneElement.value)) {
        phoneError.textContent = 'Phone number must be exactly 11 digits.';
        return false;
    }
    else {
        phoneError.textContent = '';
        return true;
    }
}
function validateEducation() {
    var educationElement = document.getElementById('education');
    var educationError = document.getElementById('education_error');
    var requiredFieldRegex = /.+/;
    if (!requiredFieldRegex.test(educationElement.value)) {
        educationError.textContent = 'Please fill out this field.';
        return false;
    }
    else {
        educationError.textContent = '';
        return true;
    }
}
function validateExperience() {
    var experienceElement = document.getElementById('experience');
    var experienceError = document.getElementById('experience_error');
    var requiredFieldRegex = /.+/;
    if (!requiredFieldRegex.test(experienceElement.value)) {
        experienceError.textContent = 'Please fill out this field.';
        return false;
    }
    else {
        experienceError.textContent = '';
        return true;
    }
}
function validateSkills() {
    var skillsElement = document.getElementById('skills');
    var skillsError = document.getElementById('skills_error');
    var requiredFieldRegex = /.+/;
    if (!requiredFieldRegex.test(skillsElement.value)) {
        skillsError.textContent = 'Please fill out this field.';
        return false;
    }
    else {
        skillsError.textContent = '';
        return true;
    }
}

