var _a;
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
(_a = document.getElementById('resume_form')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (event) {
    event.preventDefault();
    // Validate all fields before generating resume
    if (validateAll()) {
        var name_1 = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var phone = document.getElementById('phone').value;
        var education = document.getElementById('education').value;
        var experience = document.getElementById('experience').value;
        var skills = document.getElementById('skills').value;
        var resumeData = "\n        <h2>RESUME</h2>\n        <h2>Personal Information</h2>\n        <p><strong>Name :</strong> ".concat(name_1, "</p>\n        <p><strong>Email :</strong> ").concat(email, "</p>\n        <p><strong>Phone Number :</strong> ").concat(phone, "</p>\n        <h2>Education</h2>\n        <p>").concat(education, "</p>\n        <h2>Experience</h2>\n        <p>").concat(experience, "</p>\n        <h2>Skills</h2>\n        <p>").concat(skills, "</p>\n        ");
        var resumeDataElement = document.getElementById('resume_data');
        if (resumeDataElement) {
            resumeDataElement.innerHTML = resumeData;
            // Show the resume data again
            resumeDataElement.style.display = 'block';
            // Add Edit Button
            addEditButton();
        }
        else {
            console.error('The Resume Output Elements are Missing!');
        }
        // Reset the form fields
        var formElement = document.getElementById('resume_form');
        if (formElement) {
            formElement.reset();
        }
    }
    else {
        console.error('Form validation failed.');
    }
});
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
        }
        else {
            console.error('Resume data not found');
        }
        editButton.addEventListener('click', enableResumeEditing);
    }
}
function enableResumeEditing() {
    var _a;
    var resumeDataElement = document.getElementById('resume_data');
    if (resumeDataElement) {
        var resumeHtml = resumeDataElement.innerHTML;
        // Hide the resume data section
        resumeDataElement.style.display = 'none';
        // Extracting data from the resume HTML and setting it back to the form fields
        var nameElement = document.getElementById('name');
        var emailElement = document.getElementById('email');
        var phoneElement = document.getElementById('phone');
        var educationElement = document.getElementById('education');
        var experienceElement = document.getElementById('experience');
        var skillsElement = document.getElementById('skills');
        // Populating form fields with the extracted resume data
        nameElement.value = extractResumeData('Name', resumeHtml);
        emailElement.value = extractResumeData('Email', resumeHtml);
        phoneElement.value = extractResumeData('Phone Number', resumeHtml);
        educationElement.value = extractResumeData('Education', resumeHtml);
        experienceElement.value = extractResumeData('Experience', resumeHtml);
        skillsElement.value = extractResumeData('Skills', resumeHtml);
        // Scroll to the form for ease of editing
        (_a = document.getElementById('resume_form')) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ behavior: 'smooth' });
    }
}
// Utility function to extract resume data from the HTML string
function extractResumeData(label, html) {
    var regex;
    if (label === 'Education' || label === 'Experience' || label === 'Skills') {
        // For fields with only <p> tags without <strong>
        regex = new RegExp("<h2>".concat(label, "</h2>\\s*<p>([^<]+)</p>"));
    }
    else {
        // For fields with <strong> like Name, Email, and Phone Number
        regex = new RegExp("<p><strong>".concat(label, "\\s*:\\s*</strong>\\s*([^<]+)</p>"));
    }
    var match = html.match(regex);
    return match ? match[1].trim() : '';
}
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
var generateResumeURL = function (username) {
    var baseURL = "".concat(window.location.origin); // Automatically captures the current domain
    return "".concat(baseURL, "/resume/").concat(username);
};
// Assuming you already have the username when the user submits the form
var username = document.getElementById('name').value.toLowerCase();
var resumeURL = generateResumeURL(username);
// Display the link in the 'resume_url' div
var resumeURLDiv = document.getElementById('resume_url');
if (resumeURLDiv) {
    resumeURLDiv.style.display = 'block'; // Make the div visible
    resumeURLDiv.innerHTML = "<a href=\"".concat(resumeURL, "\" target=\"_blank\">View Your Resume</a>");
}
else {
    console.error('Resume URL div not found');
}
