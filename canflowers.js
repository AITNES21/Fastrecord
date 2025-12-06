/*==================== GALLERY IMAGES ====================*/
const galleryImages = [
    // Exteriores de día
    'img/canflowers/casaexterior.webp',
    'img/canflowers/casaexteriorft2.webp',

    // Exteriores de noche
    'img/canflowers/casaexteriornoche.webp',
    'img/canflowers/casaexteriornocheft2.webp',

    // Piscina y áreas de relax
    'img/canflowers/piscinaychillout.webp',
    'img/canflowers/piscinaychilloutft2.webp',

    // Jardín y exteriores
    'img/canflowers/jardinyfuente.webp',
    'img/canflowers/puenteconrio.webp',

    // Salones
    'img/canflowers/salon.webp',
    'img/canflowers/salonft2.webp',
    'img/canflowers/saladeestar.webp',

    // Cocina y comedor
    'img/canflowers/cocina.webp',
    'img/canflowers/mesaprincipal.webp',

    // Habitaciones
    'img/canflowers/habitacion1.webp',
    'img/canflowers/habitacion2.webp',
    'img/canflowers/habitacion3.webp',
    'img/canflowers/habitacion4.webp',
    'img/canflowers/habitacioin5.webp',

    // Baño
    'img/canflowers/bano.webp',

    // Terrazas y vistas
    'img/canflowers/terrazaft1.webp',
    'img/canflowers/terrazaft2.webp',
    'img/canflowers/vistas.webp',
    'img/canflowers/vistasft2.webp',

    // Decoración
    'img/canflowers/decoracion.webp'
];

/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show-menu');

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

    navMenu.classList.remove('show-menu');

    const icon = navToggle.querySelector('i');
    icon.classList.replace('fa-times', 'fa-bars');
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader() {
    const nav = document.getElementById('header');
    if (this.scrollY >= 80) nav.classList.add('scroll-header');
    else nav.classList.remove('scroll-header');
}
window.addEventListener('scroll', scrollHeader);

/*==================== SHOW SCROLL UP ====================*/
function scrollUp() {
    const scrollUp = document.getElementById('scroll-up');
    if (this.scrollY >= 560) scrollUp.classList.add('show-scroll');
    else scrollUp.classList.remove('show-scroll');
}
window.addEventListener('scroll', scrollUp);

/*==================== SMOOTH SCROLL ====================*/
const scrollLinks = document.querySelectorAll('a[href^="#"]');

scrollLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            return;
        }

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

/*==================== GALLERY FUNCTIONALITY ====================*/
let currentImageIndex = 0;

// Initialize gallery
function initGallery() {
    const mainImg = document.getElementById('gallery-main-img');
    const thumbnailsContainer = document.getElementById('gallery-thumbnails');
    const currentImgSpan = document.getElementById('current-img');
    const totalImgsSpan = document.getElementById('total-imgs');
    const prevBtn = document.getElementById('gallery-prev');
    const nextBtn = document.getElementById('gallery-next');

    if (!mainImg || !thumbnailsContainer) return;

    // Set total images
    if (totalImgsSpan) {
        totalImgsSpan.textContent = galleryImages.length;
    }

    // Create thumbnails
    galleryImages.forEach((imagePath, index) => {
        const thumbnail = document.createElement('div');
        thumbnail.className = 'thumbnail';
        if (index === 0) thumbnail.classList.add('active');

        const img = document.createElement('img');
        img.src = imagePath;
        img.alt = `Can Flowers - Imagen ${index + 1}`;

        thumbnail.appendChild(img);
        thumbnailsContainer.appendChild(thumbnail);

        // Thumbnail click event
        thumbnail.addEventListener('click', () => {
            currentImageIndex = index;
            updateGallery();
        });
    });

    // Navigation buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
            updateGallery();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
            updateGallery();
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
            updateGallery();
        } else if (e.key === 'ArrowRight') {
            currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
            updateGallery();
        }
    });

    // Update gallery display
    function updateGallery() {
        // Update main image with fade effect
        mainImg.style.opacity = '0';
        setTimeout(() => {
            mainImg.src = galleryImages[currentImageIndex];
            mainImg.style.opacity = '1';
        }, 200);

        // Update counter
        if (currentImgSpan) {
            currentImgSpan.textContent = currentImageIndex + 1;
        }

        // Update active thumbnail
        const thumbnails = document.querySelectorAll('.thumbnail');
        thumbnails.forEach((thumb, index) => {
            if (index === currentImageIndex) {
                thumb.classList.add('active');
                // Scroll thumbnail into view
                thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            } else {
                thumb.classList.remove('active');
            }
        });
    }

    // Add transition to main image
    mainImg.style.transition = 'opacity 0.3s ease';
}

// Initialize gallery when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGallery);
} else {
    initGallery();
}

/*==================== FORM SUBMISSION ====================*/
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(this);
        const formObject = {};

        for (let [key, value] of formData.entries()) {
            formObject[key] = value;
        }

        // Show loading state
        const submitButton = this.querySelector('.form__submit');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitButton.disabled = true;

        // Simulate form submission
        setTimeout(() => {
            showNotification('¡Consulta enviada correctamente! Te contactaremos pronto.', 'success');

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
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

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

    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 1.25rem 2rem;
        border-radius: 0.75rem;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1.5rem;
        max-width: 450px;
        animation: slideIn 0.3s ease;
        font-family: 'Inter', sans-serif;
    `;

    const closeBtn = notification.querySelector('.notification__close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0;
        font-size: 1.25rem;
        transition: transform 0.2s ease;
    `;

    closeBtn.addEventListener('mouseover', () => {
        closeBtn.style.transform = 'scale(1.2)';
    });

    closeBtn.addEventListener('mouseout', () => {
        closeBtn.style.transform = 'scale(1)';
    });

    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    });

    document.body.appendChild(notification);

    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add notification animations
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
            gap: 1rem;
        }

        .notification__content i {
            font-size: 1.5rem;
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
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
        }
    });
}, observerOptions);

const animatedElements = document.querySelectorAll(`
    .quick-feature,
    .feature__category,
    .floor,
    .distance__item,
    .contact__info-card,
    .highlight__item
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
    `;
    document.head.appendChild(animationStyle);
}

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

        clearFieldError(field);

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
            margin-top: 0.5rem;
            font-weight: 500;
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

initFormValidation();

/*==================== MOBILE MENU IMPROVEMENTS ====================*/
function initMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (!navToggle || !navMenu) return;

    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navMenu.classList.remove('show-menu');
            const icon = navToggle.querySelector('i');
            if (icon) {
                icon.classList.replace('fa-times', 'fa-bars');
            }
        }
    });

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

initMobileMenu();

/*==================== LAZY LOADING IMAGES ====================*/
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });

    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}

/*==================== PERFORMANCE OPTIMIZATIONS ====================*/
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

const throttledScrollHeader = throttle(scrollHeader, 10);
const throttledScrollUp = throttle(scrollUp, 10);

window.removeEventListener('scroll', scrollHeader);
window.removeEventListener('scroll', scrollUp);

window.addEventListener('scroll', throttledScrollHeader);
window.addEventListener('scroll', throttledScrollUp);

/*==================== LOADING ANIMATION ====================*/
window.addEventListener('load', () => {
    const header = document.querySelector('.header');
    if (header) {
        header.style.transform = 'translateY(-100%)';
        setTimeout(() => {
            header.style.transition = 'transform 0.5s ease';
            header.style.transform = 'translateY(0)';
        }, 100);
    }
});

/*==================== CONSOLE LOG ====================*/
console.log(`
🏡 Can Flowers - Villa de Lujo en Ibiza
✨ Página cargada correctamente
📸 Galería con ${galleryImages.length} imágenes
🎯 Todas las funcionalidades activas
📱 Diseño responsive optimizado
`);

// Export functions for external use
window.CanFlowers = {
    showNotification,
    initGallery
};