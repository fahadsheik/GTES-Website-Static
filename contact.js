// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    }
});

// Form Validation and Submission
const contactForm = document.getElementById('contactForm');
const successMessage = document.createElement('div');
successMessage.className = 'success-message';
successMessage.textContent = 'Thank you for your message! We will get back to you within 24 hours.';

if (contactForm) {
    // Insert success message at the beginning of the form
    contactForm.insertBefore(successMessage, contactForm.firstChild);

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear previous errors
        clearErrors();
        
        // Validate form
        const isValid = validateForm();
        
        if (isValid) {
            // Simulate form submission
            submitForm();
        }
    });
}

function validateForm() {
    let isValid = true;
    
    // Get form fields
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const mobile = document.getElementById('mobile');
    const message = document.getElementById('message');
    
    // Validate name
    if (!name.value.trim()) {
        showError(name, 'Name is required');
        isValid = false;
    } else if (name.value.trim().length < 2) {
        showError(name, 'Name must be at least 2 characters');
        isValid = false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
        showError(email, 'Email is required');
        isValid = false;
    } else if (!emailRegex.test(email.value.trim())) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate mobile
    const mobileRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!mobile.value.trim()) {
        showError(mobile, 'Mobile number is required');
        isValid = false;
    } else if (!mobileRegex.test(mobile.value.replace(/[\s\-\(\)]/g, ''))) {
        showError(mobile, 'Please enter a valid mobile number');
        isValid = false;
    }
    
    // Validate message
    if (!message.value.trim()) {
        showError(message, 'Message is required');
        isValid = false;
    } else if (message.value.trim().length < 10) {
        showError(message, 'Message must be at least 10 characters');
        isValid = false;
    }
    
    return isValid;
}

function showError(field, message) {
    field.classList.add('error');
    
    // Create or update error message
    let errorElement = field.parentNode.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        field.parentNode.appendChild(errorElement);
    }
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function clearErrors() {
    // Remove error classes
    document.querySelectorAll('.error').forEach(field => {
        field.classList.remove('error');
    });
    
    // Hide error messages
    document.querySelectorAll('.error-message').forEach(error => {
        error.style.display = 'none';
    });
    
    // Hide success message
    successMessage.classList.remove('show');
}

function submitForm() {
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Show success message
        successMessage.classList.add('show');
        
        // Reset form
        contactForm.reset();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 5000);
        
    }, 2000);
}

// Real-time validation
document.addEventListener('DOMContentLoaded', () => {
    const formFields = ['name', 'email', 'mobile', 'message'];
    
    formFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.addEventListener('blur', () => {
                // Clear previous error for this field
                field.classList.remove('error');
                const errorElement = field.parentNode.querySelector('.error-message');
                if (errorElement) {
                    errorElement.style.display = 'none';
                }
                
                // Validate individual field
                validateField(field);
            });
            
            field.addEventListener('input', () => {
                // Remove error styling while typing
                if (field.classList.contains('error')) {
                    field.classList.remove('error');
                    const errorElement = field.parentNode.querySelector('.error-message');
                    if (errorElement) {
                        errorElement.style.display = 'none';
                    }
                }
            });
        }
    });
});

function validateField(field) {
    const fieldId = field.id;
    const value = field.value.trim();
    
    switch(fieldId) {
        case 'name':
            if (!value) {
                showError(field, 'Name is required');
            } else if (value.length < 2) {
                showError(field, 'Name must be at least 2 characters');
            }
            break;
            
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value) {
                showError(field, 'Email is required');
            } else if (!emailRegex.test(value)) {
                showError(field, 'Please enter a valid email address');
            }
            break;
            
        case 'mobile':
            const mobileRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!value) {
                showError(field, 'Mobile number is required');
            } else if (!mobileRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
                showError(field, 'Please enter a valid mobile number');
            }
            break;
            
        case 'message':
            if (!value) {
                showError(field, 'Message is required');
            } else if (value.length < 10) {
                showError(field, 'Message must be at least 10 characters');
            }
            break;
    }
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.contact-info, .contact-form, .info-card');
    
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Scroll to top functionality
const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

// Add scroll to top button
const createScrollToTopButton = () => {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.classList.add('scroll-to-top');
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #2563EB;
        color: white;
        border: none;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s ease, transform 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3);
    `;
    
    button.addEventListener('click', scrollToTop);
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'scale(1.1)';
        button.style.boxShadow = '0 6px 20px rgba(37, 99, 235, 0.4)';
    });
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'scale(1)';
        button.style.boxShadow = '0 4px 15px rgba(37, 99, 235, 0.3)';
    });
    
    document.body.appendChild(button);
    
    // Show/hide based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.opacity = '1';
        } else {
            button.style.opacity = '0';
        }
    });
};

// Initialize scroll to top button
createScrollToTopButton();

// Enhanced form interactions
document.addEventListener('DOMContentLoaded', () => {
    // Add focus effects to form fields
    const formFields = document.querySelectorAll('input, textarea');
    
    formFields.forEach(field => {
        field.addEventListener('focus', () => {
            field.parentNode.classList.add('focused');
        });
        
        field.addEventListener('blur', () => {
            field.parentNode.classList.remove('focused');
        });
    });
    
    // Add character counter for message field
    const messageField = document.getElementById('message');
    if (messageField) {
        const counter = document.createElement('div');
        counter.className = 'character-counter';
        counter.style.cssText = `
            text-align: right;
            font-size: 0.875rem;
            color: #6B7280;
            margin-top: 4px;
        `;
        messageField.parentNode.appendChild(counter);
        
        const updateCounter = () => {
            const length = messageField.value.length;
            counter.textContent = `${length} characters`;
            
            if (length < 10) {
                counter.style.color = '#EF4444';
            } else if (length > 500) {
                counter.style.color = '#F59E0B';
            } else {
                counter.style.color = '#10B981';
            }
        };
        
        messageField.addEventListener('input', updateCounter);
        updateCounter();
    }
});

// Performance optimization: Debounce scroll events
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    // Scroll-based animations here
}, 16); // ~60fps

window.addEventListener('scroll', debouncedScrollHandler);