document.addEventListener('DOMContentLoaded', function () {
    // Add input event listeners to trigger validation automatically
    const nameElement = document.getElementById('name') as HTMLInputElement;
    const emailElement = document.getElementById('email') as HTMLInputElement;
    const phoneElement = document.getElementById('phone') as HTMLInputElement;
    const educationElement = document.getElementById('education') as HTMLTextAreaElement;
    const experienceElement = document.getElementById('experience') as HTMLTextAreaElement;
    const skillsElement = document.getElementById('skills') as HTMLTextAreaElement;

    nameElement.addEventListener('input', validateName);
    emailElement.addEventListener('input', validateEmail);
    phoneElement.addEventListener('input', validatePhone);
    educationElement.addEventListener('input', validateEducation);
    experienceElement.addEventListener('input', validateExperience);
    skillsElement.addEventListener('input', validateSkills);
});

document.getElementById('resume_form')?.addEventListener('submit', function (event) {
    event.preventDefault();

    // Validate all fields before generating resume
    if (validateAll()) {
        const name = (document.getElementById('name') as HTMLInputElement).value;
        const email = (document.getElementById('email') as HTMLInputElement).value;
        const phone = (document.getElementById('phone') as HTMLInputElement).value;
        const education = (document.getElementById('education') as HTMLTextAreaElement).value;
        const experience = (document.getElementById('experience') as HTMLTextAreaElement).value;
        const skills = (document.getElementById('skills') as HTMLTextAreaElement).value;

        const resumeData =
            `
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

        const resumeDataElement = document.getElementById('resume_data');

        if (resumeDataElement) {
            resumeDataElement.innerHTML = resumeData;

            // Show the resume data again
            resumeDataElement.style.display = 'block';

            // Add Edit Button
            addEditButton();
        } else {
            console.error('The Resume Output Elements are Missing!');
        }

        // Reset the form fields
        const formElement = document.getElementById('resume_form') as HTMLFormElement;
        if (formElement) {
            formElement.reset();
        }
    } else {
        console.error('Form validation failed.');
    }
});


// Function to add the "Edit" button dynamically
function addEditButton() {
    let editButton = document.getElementById('edit_button');

    if (!editButton) {
        editButton = document.createElement('button');
        editButton.id = 'edit_button';
        editButton.textContent = 'Edit Resume';
        editButton.style.display = 'block';
        editButton.style.marginTop = '20px';

        const resumeContainer = document.getElementById('resume_data');
        if (resumeContainer) {
            resumeContainer.appendChild(editButton);
        } else {
            console.error('Resume data not found');
        }

        editButton.addEventListener('click', enableResumeEditing);
    }
}


function enableResumeEditing() {
    const resumeDataElement = document.getElementById('resume_data');

    if (resumeDataElement) {
        const resumeHtml = resumeDataElement.innerHTML;

        // Hide the resume data section
        resumeDataElement.style.display = 'none';

        // Extracting data from the resume HTML and setting it back to the form fields
        const nameElement = document.getElementById('name') as HTMLInputElement;
        const emailElement = document.getElementById('email') as HTMLInputElement;
        const phoneElement = document.getElementById('phone') as HTMLInputElement;
        const educationElement = document.getElementById('education') as HTMLTextAreaElement;
        const experienceElement = document.getElementById('experience') as HTMLTextAreaElement;
        const skillsElement = document.getElementById('skills') as HTMLTextAreaElement;

        // Populating form fields with the extracted resume data
        nameElement.value = extractResumeData('Name', resumeHtml);
        emailElement.value = extractResumeData('Email', resumeHtml);
        phoneElement.value = extractResumeData('Phone Number', resumeHtml);
        educationElement.value = extractResumeData('Education', resumeHtml);
        experienceElement.value = extractResumeData('Experience', resumeHtml);
        skillsElement.value = extractResumeData('Skills', resumeHtml);

        // Scroll to the form for ease of editing
        document.getElementById('resume_form')?.scrollIntoView({ behavior: 'smooth' });
    }
}


// Utility function to extract resume data from the HTML string
function extractResumeData(label: string, html: string): string {
    let regex;

    if (label === 'Education' || label === 'Experience' || label === 'Skills') {
        // For fields with only <p> tags without <strong>
        regex = new RegExp(`<h2>${label}</h2>\\s*<p>([^<]+)</p>`);
    } else {
        // For fields with <strong> like Name, Email, and Phone Number
        regex = new RegExp(`<p><strong>${label}\\s*:\\s*</strong>\\s*([^<]+)</p>`);
    }

    const match = html.match(regex);
    return match ? match[1].trim() : '';
}

// Validation functions (same as before)...

// Validate all fields
function validateAll() {
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();
    const isEducationValid = validateEducation();
    const isExperienceValid = validateExperience();
    const isSkillsValid = validateSkills();

    return isNameValid && isEmailValid && isPhoneValid && isEducationValid && isExperienceValid && isSkillsValid;
}

// Validation functions
function validateName() {
    const nameElement = document.getElementById('name') as HTMLInputElement;
    const nameError = document.getElementById('name_error')!;
    const nameRegex = /^[a-zA-Z\s]+$/;

    if (nameElement.value.length === 0) {
        nameError.textContent = 'Please fill out this field.';
        return false;
    } else if (nameElement.value.length < 3 || nameElement.value.length > 12) {
        nameError.textContent = 'Name must be between 3 and 12 characters long.';
        return false;
    } else if (!nameRegex.test(nameElement.value)) {
        nameError.textContent = 'Invalid name. Only letters and spaces allowed.';
        return false;
    } else {
        nameError.textContent = '';
        return true;
    }
}

function validateEmail() {
    const emailElement = document.getElementById('email') as HTMLInputElement;
    const emailError = document.getElementById('email_error')!;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailElement.value.length === 0) {
        emailError.textContent = 'Please fill out this field.';
        return false;
    } else if (!emailRegex.test(emailElement.value)) {
        emailError.textContent = 'Invalid email address.';
        return false;
    } else {
        emailError.textContent = '';
        return true;
    }
}

function validatePhone() {
    const phoneElement = document.getElementById('phone') as HTMLInputElement;
    const phoneError = document.getElementById('phone_error')!;
    const phoneRegex = /^\d{11}$/;

    if (phoneElement.value.length === 0) {
        phoneError.textContent = 'Please fill out this field.';
        return false;
    } else if (!phoneRegex.test(phoneElement.value)) {
        phoneError.textContent = 'Phone number must be exactly 11 digits.';
        return false;
    } else {
        phoneError.textContent = '';
        return true;
    }
}

function validateEducation() {
    const educationElement = document.getElementById('education') as HTMLTextAreaElement;
    const educationError = document.getElementById('education_error')!;
    const requiredFieldRegex = /.+/;

    if (!requiredFieldRegex.test(educationElement.value)) {
        educationError.textContent = 'Please fill out this field.';
        return false;
    } else {
        educationError.textContent = '';
        return true;
    }
}

function validateExperience() {
    const experienceElement = document.getElementById('experience') as HTMLTextAreaElement;
    const experienceError = document.getElementById('experience_error')!;
    const requiredFieldRegex = /.+/;

    if (!requiredFieldRegex.test(experienceElement.value)) {
        experienceError.textContent = 'Please fill out this field.';
        return false;
    } else {
        experienceError.textContent = '';
        return true;
    }
}

function validateSkills() {
    const skillsElement = document.getElementById('skills') as HTMLTextAreaElement;
    const skillsError = document.getElementById('skills_error')!;
    const requiredFieldRegex = /.+/;

    if (!requiredFieldRegex.test(skillsElement.value)) {
        skillsError.textContent = 'Please fill out this field.';
        return false;
    } else {
        skillsError.textContent = '';
        return true;
    }
}

