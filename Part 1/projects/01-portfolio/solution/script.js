// ===========================================
// Mobile Menu Toggle
// ===========================================
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  nav.classList.toggle('active');
});

// ===========================================
// Smooth Scrolling for Navigation Links
// ===========================================
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();

    // Get target section
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);

    // Scroll to section
    targetSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });

    // Close mobile menu if open
    hamburger.classList.remove('active');
    nav.classList.remove('active');
  });
});

// ===========================================
// Active Navigation Link on Scroll
// ===========================================
const sections = document.querySelectorAll('section[id]');

function highlightNavOnScroll() {
  const scrollY = window.pageYOffset;

  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      // Remove active class from all links
      navLinks.forEach(link => link.classList.remove('active'));

      // Add active class to current section link
      const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
      if (activeLink) {
        activeLink.classList.add('active');
      }
    }
  });
}

// Throttle scroll event for better performance
let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      highlightNavOnScroll();
      ticking = false;
    });
    ticking = true;
  }
});

// ===========================================
// Form Validation
// ===========================================
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const successMessage = document.getElementById('successMessage');

// Error message elements
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Validate individual field
function validateField(field, errorElement, validationFn, errorMessage) {
  const value = field.value.trim();

  if (!validationFn(value)) {
    field.classList.add('error');
    errorElement.textContent = errorMessage;
    return false;
  } else {
    field.classList.remove('error');
    errorElement.textContent = '';
    return true;
  }
}

// Validation functions
const validateName = (value) => value.length >= 2;
const validateEmail = (value) => emailRegex.test(value);
const validateMessage = (value) => value.length >= 10;

// Add real-time validation
nameInput.addEventListener('blur', () => {
  validateField(nameInput, nameError, validateName, 'Name must be at least 2 characters');
});

emailInput.addEventListener('blur', () => {
  validateField(emailInput, emailError, validateEmail, 'Please enter a valid email address');
});

messageInput.addEventListener('blur', () => {
  validateField(messageInput, messageError, validateMessage, 'Message must be at least 10 characters');
});

// Form submission
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Validate all fields
  const isNameValid = validateField(
    nameInput,
    nameError,
    validateName,
    'Name must be at least 2 characters'
  );

  const isEmailValid = validateField(
    emailInput,
    emailError,
    validateEmail,
    'Please enter a valid email address'
  );

  const isMessageValid = validateField(
    messageInput,
    messageError,
    validateMessage,
    'Message must be at least 10 characters'
  );

  // If all valid, show success message
  if (isNameValid && isEmailValid && isMessageValid) {
    // In a real application, you would send the form data to a server here
    console.log('Form submitted successfully!');
    console.log({
      name: nameInput.value,
      email: emailInput.value,
      message: messageInput.value
    });

    // Show success message
    successMessage.classList.add('show');

    // Reset form
    contactForm.reset();

    // Hide success message after 5 seconds
    setTimeout(() => {
      successMessage.classList.remove('show');
    }, 5000);
  }
});

// ===========================================
// Update Copyright Year
// ===========================================
document.getElementById('year').textContent = new Date().getFullYear();

// ===========================================
// Optional: Intersection Observer for Scroll Animations
// ===========================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe sections for fade-in animation
document.querySelectorAll('.section').forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(20px)';
  section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(section);
});
