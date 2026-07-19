/* ============================================
   IK STRATEGIC SHARED JAVASCRIPT
   Multi-Page Navigation & Common Functionality
   ============================================ */

// ============================================
// SMOOTH ANCHOR SCROLLING
// ============================================

function initializeSmoothScroll() {
    const anchors = document.querySelectorAll('[data-anchor]');
    anchors.forEach((anchor) => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = anchor.getAttribute('data-anchor');
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                closeMenus();
            }
        });
    });
}

// ============================================
// MOBILE MENU TOGGLE
// ============================================

function initializeMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (!menuToggle || !navMenu) return;

    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close menu when link is clicked
    document.querySelectorAll('.nav-menu a').forEach((link) => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// ============================================
// DROPDOWN MENU HANDLING
// ============================================

function initializeDropdowns() {
    const dropdowns = document.querySelectorAll('.nav-dropdown');

    dropdowns.forEach((dropdown) => {
        const toggle = dropdown.querySelector('a');

        if (toggle) {
            toggle.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                }
            });
        }
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-dropdown')) {
            dropdowns.forEach((dropdown) => {
                dropdown.classList.remove('active');
            });
        }
    });
}

function closeMenus() {
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) navMenu.classList.remove('active');
}

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================

function initializeNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ============================================
// FORM VALIDATION & HANDLING
// ============================================

function initializeForm(formSelector = '#contactForm') {
    const form = document.querySelector(formSelector);
    if (!form) return;

    const feedback = form.querySelector('.form-feedback');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const inputs = {};
        form.querySelectorAll('input, textarea').forEach((field) => {
            if (field.id) {
                inputs[field.id] = field.value.trim();
            }
        });

        // Validate
        if (!inputs.name) {
            showFeedback('Please enter your name', 'error', feedback);
            return;
        }

        if (!validateEmail(inputs.email)) {
            showFeedback('Please enter a valid email address', 'error', feedback);
            return;
        }

        if (!inputs.company) {
            showFeedback('Please enter your company name', 'error', feedback);
            return;
        }

        if (!inputs.message || inputs.message.length < 10) {
            showFeedback('Please enter a message (at least 10 characters)', 'error', feedback);
            return;
        }

        // Prepare mailto
        const subject = encodeURIComponent('IK Strategic Services - Project Inquiry');
        const body = encodeURIComponent(
            Object.entries(inputs)
                .map(([key, value]) => `${key}: ${value}`)
                .join('\n')
        );

        window.location.href = `mailto:info@ikstrategic.com?subject=${subject}&body=${body}`;

        if (feedback) {
            showFeedback('Thank you! Your inquiry has been sent.', 'success', feedback);
        }

        setTimeout(() => {
            form.reset();
            if (feedback) feedback.textContent = '';
        }, 2000);
    });
}

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function showFeedback(message, type, element) {
    if (!element) return;
    element.textContent = message;
    element.className = `form-feedback ${type}`;
    element.style.opacity = '1';
}

// ============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================

function initializeIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all cards and animated elements
    document.querySelectorAll('.card, .metric-card, .team-member, .case-study').forEach((el) => {
        observer.observe(el);
    });
}

// ============================================
// PAGE SCROLL ANIMATIONS
// ============================================

function initializePageAnimations() {
    // Animate hero on load
    const heroContainer = document.querySelector('.hero-container');
    if (heroContainer) {
        heroContainer.classList.add('fade-in-up');
    }

    // Section titles
    document.querySelectorAll('.section-title').forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;
        el.classList.add('fade-in-down');
    });
}

// ============================================
// PARALLAX SCROLL EFFECT
// ============================================

function initializeParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');

    if (parallaxElements.length === 0) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;

        parallaxElements.forEach((element) => {
            const speed = element.getAttribute('data-parallax') || 0.5;
            const offset = scrolled * speed;
            element.style.transform = `translateY(${offset}px)`;
        });
    });
}

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

function optimizeForPerformance() {
    // Respect prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.style.scrollBehavior = 'auto';
        document.querySelectorAll('[style*="transition"]').forEach((el) => {
            el.style.transition = 'none';
        });
    }

    // Lazy load images if supported
    if ('IntersectionObserver' in window) {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('data-src');
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach((img) => imageObserver.observe(img));
    }
}

// ============================================
// ACTIVE NAV LINK HIGHLIGHTING
// ============================================

function initializeActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-item a');

    navLinks.forEach((link) => {
        if (link.getAttribute('href') === currentPath ||
            link.getAttribute('href').includes(currentPath.split('/').pop())) {
            link.classList.add('active');
        }
    });
}

// ============================================
// INITIALIZE ALL ON DOM READY
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initializeSmoothScroll();
    initializeMobileMenu();
    initializeDropdowns();
    initializeNavbar();
    initializeForm();
    initializeIntersectionObserver();
    initializePageAnimations();
    initializeParallax();
    optimizeForPerformance();
    initializeActiveNavLink();

    console.log('IK Strategic - Premium Website Initialized');
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Smooth scroll utility
function scrollToElement(elementId, offset = 80) {
    const element = document.getElementById(elementId);
    if (element) {
        const offsetTop = element.offsetTop - offset;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Add animation class
function animateElement(element, animationClass) {
    element.classList.add(animationClass);
    element.addEventListener('animationend', () => {
        element.classList.remove(animationClass);
    }, { once: true });
}
