// ============================================
// IK STRATEGIC MODERN DESIGN - PARTICLE ENGINE
// Canvas-based interactive background with constellation effect
// ============================================

class ParticleEngine {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 100;
        this.connectionDistance = 150;
        this.mouse = { x: 0, y: 0, radius: 150 };
        this.isActive = true;

        // Initialize
        this.resizeCanvas();
        this.initializeParticles();
        this.attachEventListeners();
        this.animate();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    initializeParticles() {
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 1.5 + 0.5,
                opacity: Math.random() * 0.5 + 0.2,
                originalOpacity: Math.random() * 0.5 + 0.2
            });
        }
    }

    attachEventListeners() {
        // Track mouse movement
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });

        // Handle window resize with debounce
        window.addEventListener('resize', () => {
            clearTimeout(this.resizeTimeout);
            this.resizeTimeout = setTimeout(() => {
                this.resizeCanvas();
            }, 150);
        });

        // Pause particle animation when scrolled past hero
        window.addEventListener('scroll', () => {
            const heroHeight = window.innerHeight;
            const scrolled = window.scrollY;
            this.isActive = scrolled < heroHeight * 0.8;
        });
    }

    updateParticles() {
        if (!this.isActive) return;

        for (let particle of this.particles) {
            // Apply mouse interaction
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.mouse.radius) {
                const angle = Math.atan2(dy, dx);
                const force = (1 - distance / this.mouse.radius) * 0.3;
                particle.vx -= Math.cos(angle) * force;
                particle.vy -= Math.sin(angle) * force;
                particle.opacity = Math.min(particle.originalOpacity + 0.3, 1);
            } else {
                particle.opacity = particle.originalOpacity;
            }

            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Apply damping
            particle.vx *= 0.98;
            particle.vy *= 0.98;

            // Wrap around screen edges
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;

            // Gentle drift downward (optional)
            particle.vy += 0.02;
        }
    }

    drawParticles() {
        for (let particle of this.particles) {
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
            this.ctx.fill();
        }
    }

    drawConstellations() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.connectionDistance) {
                    const opacity = (1 - distance / this.connectionDistance) * 0.15;
                    this.ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
    }

    animate() {
        // Clear canvas
        this.ctx.fillStyle = 'rgba(9, 13, 22, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Update and draw
        if (this.isActive) {
            this.updateParticles();
            this.drawConstellations();
        }
        this.drawParticles();

        // Continue animation loop
        requestAnimationFrame(() => this.animate());
    }
}

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
            }
        });
    });
}

// ============================================
// FORM HANDLING & VALIDATION
// ============================================

function initializeForm() {
    const form = document.getElementById('contactForm');
    const feedback = document.getElementById('formFeedback');

    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Validate inputs
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const company = document.getElementById('company').value.trim();
        const message = document.getElementById('message').value.trim();

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!name) {
            showFeedback('Please enter your name', 'error', feedback);
            return;
        }

        if (!emailRegex.test(email)) {
            showFeedback('Please enter a valid email address', 'error', feedback);
            return;
        }

        if (!company) {
            showFeedback('Please enter your company name', 'error', feedback);
            return;
        }

        if (!message || message.length < 10) {
            showFeedback('Please enter a message (at least 10 characters)', 'error', feedback);
            return;
        }

        // Prepare data for mailto
        const subject = encodeURIComponent('IK Strategic Services - Project Inquiry');
        const body = encodeURIComponent(
            `Name: ${name}\nEmail: ${email}\nCompany: ${company}\n\nMessage:\n${message}`
        );

        // Send via mailto (GitHub Pages alternative - no backend)
        window.location.href = `mailto:info@ikstrategic.com?subject=${subject}&body=${body}`;

        // Show success feedback
        showFeedback(
            'Thank you! Your inquiry has been sent. We will respond shortly.',
            'success',
            feedback
        );

        // Reset form after delay
        setTimeout(() => {
            form.reset();
            feedback.textContent = '';
        }, 2000);
    });
}

function showFeedback(message, type, element) {
    element.textContent = message;
    element.className = `form-feedback ${type}`;
    element.style.opacity = '1';
}

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================

function initializeNavbar() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        if (currentScroll > 50) {
            navbar.style.background = 'rgba(9, 13, 22, 0.95)';
            navbar.style.boxShadow = '0 4px 20px rgba(99, 102, 241, 0.1)';
        } else {
            navbar.style.background = 'rgba(9, 13, 22, 0.7)';
            navbar.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });
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

    // Observe service cards and metric cards
    document.querySelectorAll('.service-card, .metric-card').forEach((el) => {
        observer.observe(el);
    });
}

// ============================================
// INITIALIZE ON DOM READY
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize particle engine
    const engine = new ParticleEngine('particle-canvas');

    // Initialize other features
    initializeSmoothScroll();
    initializeForm();
    initializeNavbar();
    initializeIntersectionObserver();

    // Add initial fade-in to hero content
    const heroContainer = document.querySelector('.hero-container');
    if (heroContainer) {
        heroContainer.classList.add('fade-in-up');
    }
});

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Reduce animations on low-powered devices
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.scrollBehavior = 'auto';
    document.querySelectorAll('[style*="transition"]').forEach((el) => {
        el.style.transition = 'none';
    });
}
