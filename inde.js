/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle');

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show-menu');

        // Change hamburger icon
        const icon = navToggle.querySelector('i');
        if (navMenu.classList.contains('show-menu')) {
            icon.classList.replace('fa-bars', 'fa-times');
        } else {
            icon.classList.replace('fa-times', 'fa-bars');
        }
    });
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link');

function linkAction() {
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');

    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu');

    // Reset hamburger icon
    const icon = navToggle.querySelector('i');
    icon.classList.replace('fa-times', 'fa-bars');
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__link[href*=' + sectionId + ']').classList.add('active');
        } else {
            document.querySelector('.nav__link[href*=' + sectionId + ']').classList.remove('active');
        }
    });
}
window.addEventListener('scroll', scrollActive);

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader() {
    const nav = document.getElementById('header');
    // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
    if (this.scrollY >= 80) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header');
}
window.addEventListener('scroll', scrollHeader);

/*==================== SHOW SCROLL UP ====================*/
function scrollUp() {
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if (this.scrollY >= 560) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll');
}
window.addEventListener('scroll', scrollUp);

/*==================== SCROLL UP BUTTON CLICK ====================*/
const scrollUpButton = document.getElementById('scroll-up');
if (scrollUpButton) {
    scrollUpButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/*==================== SMOOTH SCROLL ====================*/
const scrollLinks = document.querySelectorAll('a[href^="#"]');

scrollLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

/*==================== FORM SUBMISSION ====================*/
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(this);
        const formObject = {};

        // Convert FormData to object
        for (let [key, value] of formData.entries()) {
            formObject[key] = value;
        }

        // Show loading state
        const submitButton = this.querySelector('.form__button');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitButton.disabled = true;

        // Simulate form submission (replace with actual submission logic)
        setTimeout(() => {
            // Show success message
            showNotification('¡Mensaje enviado correctamente! Te contactaremos pronto.', 'success');

            // Reset form
            this.reset();

            // Reset button
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }, 2000);
    });
}

/*==================== NOTIFICATION SYSTEM ====================*/
function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification__content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification__close">
            <i class="fas fa-times"></i>
        </button>
    `;

    // Add styles dynamically
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.75rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        max-width: 400px;
        animation: slideIn 0.3s ease;
        font-family: 'Inter', sans-serif;
    `;

    // Add close functionality
    const closeBtn = notification.querySelector('.notification__close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0;
        font-size: 1rem;
    `;

    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    });

    // Add notification to page
    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add notification animations to head
if (!document.querySelector('#notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .notification__content {
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }
        
        .notification__content i {
            font-size: 1.25rem;
        }
    `;
    document.head.appendChild(style);
}

/*==================== INTERSECTION OBSERVER ANIMATIONS ====================*/
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
        }
    });
}, observerOptions);

// Elements to animate
const animatedElements = document.querySelectorAll(`
    .service__card,
    .value__card,
    .contact__card,
    .stat,
    .ibiza__feature,
    .about__illustration
`);

animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    observer.observe(el);
});

// Add animation styles
if (!document.querySelector('#animation-styles')) {
    const animationStyle = document.createElement('style');
    animationStyle.id = 'animation-styles';
    animationStyle.textContent = `
        @keyframes fadeInUp {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .service__card,
        .value__card,
        .contact__card {
            transition: all 0.3s ease;
        }
    `;
    document.head.appendChild(animationStyle);
}

/*==================== COUNTER ANIMATION ====================*/
function animateCounters() {
    const counters = document.querySelectorAll('.stat__number');

    counters.forEach(counter => {
        const text = counter.textContent.trim();

        // Excluir elementos que contienen "/" (como 24/7) o ":" (como horarios)
        if (text.includes('/') || text.includes(':')) {
            return; // No animar este contador
        }

        // Extraer el número objetivo y el sufijo
        const target = parseInt(text.replace(/\D/g, ''));
        const suffix = text.replace(/[0-9]/g, '');

        // Validar que hay un número válido
        if (isNaN(target)) {
            return;
        }

        let current = 0;
        const increment = target / 100;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target + suffix;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current) + suffix;
            }
        }, 20);
    });
}

// Animate counters when home stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.home__stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

/*==================== LOADING ANIMATION ====================*/
window.addEventListener('load', () => {
    // Remove any loading screen if present
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 300);
    }

    // Animate header
    const header = document.querySelector('.header');
    header.style.transform = 'translateY(-100%)';
    setTimeout(() => {
        header.style.transition = 'transform 0.5s ease';
        header.style.transform = 'translateY(0)';
    }, 100);

    // Animate home content
    const homeTitle = document.querySelector('.home__title');
    const homeDescription = document.querySelector('.home__description');
    const homeButtons = document.querySelector('.home__buttons');

    if (homeTitle) {
        homeTitle.style.opacity = '0';
        homeTitle.style.transform = 'translateY(30px)';
        setTimeout(() => {
            homeTitle.style.transition = 'all 0.6s ease';
            homeTitle.style.opacity = '1';
            homeTitle.style.transform = 'translateY(0)';
        }, 200);
    }

    if (homeDescription) {
        homeDescription.style.opacity = '0';
        homeDescription.style.transform = 'translateY(30px)';
        setTimeout(() => {
            homeDescription.style.transition = 'all 0.6s ease';
            homeDescription.style.opacity = '1';
            homeDescription.style.transform = 'translateY(0)';
        }, 400);
    }

    if (homeButtons) {
        homeButtons.style.opacity = '0';
        homeButtons.style.transform = 'translateY(30px)';
        setTimeout(() => {
            homeButtons.style.transition = 'all 0.6s ease';
            homeButtons.style.opacity = '1';
            homeButtons.style.transform = 'translateY(0)';
        }, 600);
    }
});

/*==================== FLOATING ELEMENTS ANIMATION ====================*/
function initFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating-icon, .floating-note');

    floatingElements.forEach((element, index) => {
        // Random floating animation
        const randomDelay = Math.random() * 2;
        const randomDuration = 3 + Math.random() * 2;

        element.style.animationDelay = `${randomDelay}s`;
        element.style.animationDuration = `${randomDuration}s`;

        // Add hover effect
        element.addEventListener('mouseenter', () => {
            element.style.transform = 'scale(1.1)';
            element.style.transition = 'transform 0.2s ease';
        });

        element.addEventListener('mouseleave', () => {
            element.style.transform = 'scale(1)';
        });
    });
}

// Initialize floating elements when DOM is loaded
document.addEventListener('DOMContentLoaded', initFloatingElements);

/*==================== PARALLAX EFFECT ====================*/
function initParallax() {
    const parallaxElements = document.querySelectorAll('.home__blob, .ibiza__illustration');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;

        parallaxElements.forEach(element => {
            if (element.getBoundingClientRect().top < window.innerHeight &&
                element.getBoundingClientRect().bottom > 0) {
                element.style.transform = `translateY(${rate}px)`;
            }
        });
    });
}

// Initialize parallax effect
initParallax();

/*==================== FORM VALIDATION ====================*/
function initFormValidation() {
    const form = document.getElementById('contact-form');

    if (!form) return;

    const inputs = form.querySelectorAll('.form__input');

    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearErrors);
    });

    function validateField(e) {
        const field = e.target;
        const value = field.value.trim();

        // Remove existing error
        clearFieldError(field);

        // Validate based on field type
        if (field.hasAttribute('required') && !value) {
            showFieldError(field, 'Este campo es obligatorio');
            return false;
        }

        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showFieldError(field, 'Introduce un email válido');
                return false;
            }
        }

        if (field.type === 'tel' && value) {
            const phoneRegex = /^[+]?[0-9\s\-\(\)]{9,}$/;
            if (!phoneRegex.test(value)) {
                showFieldError(field, 'Introduce un teléfono válido');
                return false;
            }
        }

        return true;
    }

    function showFieldError(field, message) {
        field.style.borderColor = '#ef4444';

        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        errorElement.style.cssText = `
            color: #ef4444;
            font-size: 0.875rem;
            margin-top: 0.25rem;
            margin-bottom: 0.5rem;
        `;

        field.parentNode.appendChild(errorElement);
    }

    function clearFieldError(field) {
        field.style.borderColor = '';
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }

    function clearErrors(e) {
        clearFieldError(e.target);
    }
}

// Initialize form validation
document.addEventListener('DOMContentLoaded', initFormValidation);

/*==================== MOBILE MENU IMPROVEMENTS ====================*/
function initMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (!navToggle || !navMenu) return;

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navMenu.classList.remove('show-menu');
            const icon = navToggle.querySelector('i');
            if (icon) {
                icon.classList.replace('fa-times', 'fa-bars');
            }
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('show-menu')) {
            navMenu.classList.remove('show-menu');
            const icon = navToggle.querySelector('i');
            if (icon) {
                icon.classList.replace('fa-times', 'fa-bars');
            }
        }
    });
}

// Initialize mobile menu improvements
initMobileMenu();

/*==================== PERFORMANCE OPTIMIZATIONS ====================*/
// Throttle scroll events for better performance
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
const throttledScrollActive = throttle(scrollActive, 10);
const throttledScrollHeader = throttle(scrollHeader, 10);
const throttledScrollUp = throttle(scrollUp, 10);

// Replace existing scroll listeners
window.removeEventListener('scroll', scrollActive);
window.removeEventListener('scroll', scrollHeader);
window.removeEventListener('scroll', scrollUp);

window.addEventListener('scroll', throttledScrollActive);
window.addEventListener('scroll', throttledScrollHeader);
window.addEventListener('scroll', throttledScrollUp);

/*==================== ACCESSIBILITY IMPROVEMENTS ====================*/
function initAccessibility() {
    // Add keyboard navigation for buttons
    const buttons = document.querySelectorAll('.button');
    buttons.forEach(button => {
        button.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                button.click();
            }
        });
    });

    // Add focus indicators
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select');
    focusableElements.forEach(element => {
        element.addEventListener('focus', () => {
            element.style.outline = '2px solid #2563eb';
            element.style.outlineOffset = '2px';
        });

        element.addEventListener('blur', () => {
            element.style.outline = '';
            element.style.outlineOffset = '';
        });
    });
}

// Initialize accessibility improvements
initAccessibility();

/*==================== CONSOLE LOG FOR DEVELOPMENT ====================*/
console.log(`
🏠 FastRecord Website Loaded Successfully!
📱 Mobile-first responsive design
⚡ Optimized performance
🎯 Accessibility features enabled
📧 Contact form validation active
🚀 All animations and interactions ready
`);

// Export functions for potential external use
window.FastRecord = {
    showNotification,
    animateCounters,
    initFloatingElements,
    initParallax
};
/*==================== FAQ ACCORDION FUNCTIONALITY ====================*/
function initFAQ() {
    const faqItems = document.querySelectorAll(".faq__item");

    faqItems.forEach((item) => {
        const question = item.querySelector(".faq__question");

        question.addEventListener("click", () => {
            // Close all other items
            const isActive = item.classList.contains("active");
            
            faqItems.forEach((otherItem) => {
                otherItem.classList.remove("active");
            });

            // Toggle current item
            if (!isActive) {
                item.classList.add("active");
            }
        });
    });
}

// Initialize FAQ when DOM is loaded
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initFAQ);
} else {
    initFAQ();
}
