/* ============================================
   YOUNG DEVS - JAVASCRIPT PRINCIPAL
   ============================================ */

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initNavbar();
    initMobileMenu();
    initThemeToggle();
    initSmoothScroll();
});

/* === NAVBAR === */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    
    // Inicialmente transparente en la página de inicio
    if (window.scrollY === 0) {
        navbar.classList.add('transparent');
    }
    
    // Cambiar navbar al hacer scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            navbar.classList.remove('transparent');
        } else {
            navbar.classList.remove('scrolled');
            navbar.classList.add('transparent');
        }
    });
}

/* === MOBILE MENU === */
function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
        
        // Cerrar menú al hacer click en un enlace
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            });
        });
        
        // Cerrar menú al hacer click fuera
        document.addEventListener('click', function(event) {
            const isClickInsideMenu = navMenu.contains(event.target);
            const isClickOnToggle = mobileMenuToggle.contains(event.target);
            
            if (!isClickInsideMenu && !isClickOnToggle && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        });
    }
}

/* === THEME TOGGLE (DARK MODE) === */
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    
    // Verificar si hay una preferencia guardada
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            
            // Guardar preferencia
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
    }
}

/* === SMOOTH SCROLL === */
function initSmoothScroll() {
    // Smooth scroll para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Solo aplicar smooth scroll si es un anchor válido
            if (href !== '#' && href.length > 1) {
                const target = document.querySelector(href);
                
                if (target) {
                    e.preventDefault();
                    
                    const navHeight = document.getElementById('navbar').offsetHeight;
                    const targetPosition = target.offsetTop - navHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

/* === ACTIVE NAV LINK === */
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// Inicializar active link si hay secciones
if (document.querySelectorAll('section[id]').length > 0) {
    updateActiveNavLink();
}

/* === VIDEO BACKGROUND === */
// Pausar video cuando no está visible (optimización)
function initVideoOptimization() {
    const videos = document.querySelectorAll('.video-background video');
    
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.play();
            } else {
                entry.target.pause();
            }
        });
    }, { threshold: 0.25 });
    
    videos.forEach(video => {
        videoObserver.observe(video);
    });
}

// Inicializar optimización de video si hay videos
if (document.querySelectorAll('.video-background video').length > 0) {
    initVideoOptimization();
}

/* === UTILITY FUNCTIONS === */
// Debounce function para optimizar eventos
function debounce(func, wait) {
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

// Throttle function para optimizar scroll
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