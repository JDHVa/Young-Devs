/* ============================================
   YOUNG DEVS - ANIMACIONES
   ============================================ */

// Inicializar AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    // Verificar si AOS está disponible
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100,
            delay: 50
        });
    }
    
    // Inicializar animaciones personalizadas
    initCounterAnimation();
    initTestimonialMobileFlip();  // ← Solo para móviles
    initParallaxEffect();
});

/* === CONTADOR ANIMADO === */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number, .card-number');
    
    const observerOptions = {
        threshold: 0.05,
        rootMargin: '10px'
    };
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                animateCounter(entry.target);
                entry.target.classList.add('counted');
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(element) {
    const text = element.textContent;
    const hasPlus = text.includes('+');
    const hasPercent = text.includes('%');
    const hasDollar = text.includes('$');
    
    // Extraer el número
    let number = parseInt(text.replace(/\D/g, ''));
    
    if (isNaN(number)) return;
    
    const duration = 2000; // 2 segundos
    const steps = 60;
    const increment = number / steps;
    const stepDuration = duration / steps;
    
    let current = 0;
    element.textContent = '0';
    
    const timer = setInterval(() => {
        current += increment;
        
        if (current >= number) {
            current = number;
            clearInterval(timer);
        }
        
        let displayText = Math.floor(current).toString();
        
        if (hasDollar) displayText = 'COSTO $' + displayText;
        if (hasPlus) displayText += '+';
        if (hasPercent) displayText += '%';
        
        element.textContent = displayText;
    }, stepDuration);
}

/* === FLIP DE TARJETAS EN MÓVILES (SOLO TÁCTIL) === */
function initTestimonialMobileFlip() {
    // Solo activar en dispositivos táctiles
    if (!('ontouchstart' in window)) return;
    
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    testimonialCards.forEach(card => {
        let isFlipped = false;
        
        card.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Toggle clase flipped
            if (!isFlipped) {
                this.classList.add('flipped');
                isFlipped = true;
            } else {
                this.classList.remove('flipped');
                isFlipped = false;
            }
        });
    });
}

/* === EFECTO PARALLAX SUAVE === */
function initParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.hero-content, .nosotros-image');
    
    if (parallaxElements.length === 0) return;
    
    window.addEventListener('scroll', throttle(function() {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.008;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }, 10));
}

/* === ANIMACIÓN DE ENTRADA DE ELEMENTOS === */
function initFadeInElements() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px 0px 0px'
    });
    
    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });
}

// Llamar fade in si hay elementos
if (document.querySelectorAll('.fade-in').length > 0) {
    initFadeInElements();
}

/* === ANIMACIÓN DE HOVER EN CARDS === */
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.impacto-card, .contact-item, .stat-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
});

/* === SCROLL REVEAL PERSONALIZADO === */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
}

// Utility: Throttle para optimizar scroll
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/* === ANIMACIÓN DEL BOTÓN CTA === */
document.addEventListener('DOMContentLoaded', function() {
    const ctaButtons = document.querySelectorAll('.hero-cta, .cta-button-primary, .cta-button-secondary');
    
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            const icon = this.querySelector('svg');
            if (icon) {
                icon.style.transform = 'translateX(5px)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            const icon = this.querySelector('svg');
            if (icon) {
                icon.style.transform = 'translateX(0)';
            }
        });
    });
});

/* === LOADING ANIMATION === */
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Trigger AOS refresh después de que todo cargue
    if (typeof AOS !== 'undefined') {
        setTimeout(() => {
            AOS.refresh();
        }, 100);
    }
});