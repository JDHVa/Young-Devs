/* ============================================
   YOUNG DEVS - MANEJO DE FORMULARIOS
   ============================================ */

// Configuración de EmailJS
// IMPORTANTE: Debes crear una cuenta en https://www.emailjs.com/
// y reemplazar estos valores con los tuyos

const EMAILJS_CONFIG = {
    serviceID: 'TU_SERVICE_ID',      // Reemplazar
    templateID: 'TU_TEMPLATE_ID',    // Reemplazar
    publicKey: 'TU_PUBLIC_KEY'       // Reemplazar
};

// Inicializar EmailJS cuando el documento esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar EmailJS
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_CONFIG.publicKey);
    }
    
    // Inicializar todos los formularios
    initContactForm();
    initHelpForms();
    initVolunteerForm();
});

/* === FORMULARIO DE CONTACTO (INDEX) === */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formStatus = document.getElementById('formStatus');
        const submitButton = this.querySelector('.submit-button');
        
        // Deshabilitar botón
        submitButton.disabled = true;
        submitButton.textContent = 'Enviando...';
        
        // Obtener datos del formulario
        const formData = {
            nombre: document.getElementById('nombre').value,
            email: document.getElementById('email').value,
            telefono: document.getElementById('telefono').value || 'No proporcionado',
            mensaje: document.getElementById('mensaje').value,
            to_email: 'young.devs@gmail.com'
        };
        
        try {
            // Enviar con EmailJS
            const response = await emailjs.send(
                EMAILJS_CONFIG.serviceID,
                EMAILJS_CONFIG.templateID,
                formData
            );
            
            // Mostrar mensaje de éxito
            showFormStatus(formStatus, 'success', '¡Mensaje enviado con éxito! Te contactaremos pronto.');
            
            // Limpiar formulario
            contactForm.reset();
            
        } catch (error) {
            console.error('Error al enviar:', error);
            showFormStatus(formStatus, 'error', 'Hubo un error al enviar el mensaje. Por favor, intenta de nuevo o contáctanos directamente por email.');
        } finally {
            // Rehabilitar botón
            submitButton.disabled = false;
            submitButton.innerHTML = `
                Enviar Mensaje
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
            `;
        }
    });
}

/* === FORMULARIOS DE AYUDA (Te Ayudamos) === */
function initHelpForms() {
    const helpForm = document.getElementById('helpForm');
    
    if (!helpForm) return;
    
    helpForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formStatus = document.getElementById('formStatus');
        const submitButton = this.querySelector('.submit-button');
        
        submitButton.disabled = true;
        submitButton.textContent = 'Enviando...';
        
        const formData = {
            nombre: document.getElementById('nombre').value,
            email: document.getElementById('email').value,
            telefono: document.getElementById('telefono').value || 'No proporcionado',
            edad: document.getElementById('edad').value,
            area: document.getElementById('area') ? document.getElementById('area').value : 'General',
            dificultad: document.getElementById('dificultad') ? document.getElementById('dificultad').value : 'No especificado',
            mensaje: document.getElementById('mensaje').value,
            to_email: 'young.devs@gmail.com'
        };
        
        try {
            const response = await emailjs.send(
                EMAILJS_CONFIG.serviceID,
                'help_template', // Template específico para solicitudes de ayuda
                formData
            );
            
            showFormStatus(formStatus, 'success', '¡Solicitud enviada! Nos pondremos en contacto contigo muy pronto.');
            helpForm.reset();
            
        } catch (error) {
            console.error('Error:', error);
            showFormStatus(formStatus, 'error', 'Error al enviar la solicitud. Contacta directamente a young.devs@gmail.com');
        } finally {
            submitButton.disabled = false;
            submitButton.innerHTML = `
                Solicitar Ayuda
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
            `;
        }
    });
}

/* === FORMULARIO DE VOLUNTARIOS (Sumarse) === */
function initVolunteerForm() {
    const volunteerForm = document.getElementById('volunteerForm');
    
    if (!volunteerForm) return;
    
    volunteerForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formStatus = document.getElementById('formStatus');
        const submitButton = this.querySelector('.submit-button');
        
        submitButton.disabled = true;
        submitButton.textContent = 'Enviando...';
        
        const formData = {
            nombre: document.getElementById('nombre').value,
            email: document.getElementById('email').value,
            telefono: document.getElementById('telefono').value || 'No proporcionado',
            edad: document.getElementById('edad').value,
            area: document.getElementById('area').value,
            experiencia: document.getElementById('experiencia').value,
            mensaje: document.getElementById('mensaje') ? document.getElementById('mensaje').value : '',
            to_email: 'young.devs@gmail.com'
        };
        
        try {
            const response = await emailjs.send(
                EMAILJS_CONFIG.serviceID,
                'volunteer_template', // Template específico para voluntarios
                formData
            );
            
            showFormStatus(formStatus, 'success', '¡Gracias por querer ser parte de Young Devs! Te contactaremos pronto con más información.');
            volunteerForm.reset();
            
        } catch (error) {
            console.error('Error:', error);
            showFormStatus(formStatus, 'error', 'Error al enviar tu solicitud. Por favor, contáctanos a young.devs@gmail.com');
        } finally {
            submitButton.disabled = false;
            submitButton.innerHTML = `
                Unirme al Equipo
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
            `;
        }
    });
}

/* === FUNCIÓN AUXILIAR PARA MOSTRAR STATUS === */
function showFormStatus(element, type, message) {
    element.className = `form-status ${type}`;
    element.textContent = message;
    element.style.display = 'block';
    
    // Ocultar después de 5 segundos
    setTimeout(() => {
        element.style.display = 'none';
    }, 5000);
}

/* === VALIDACIÓN DE CAMPOS === */
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\d\s\-\+\(\)]+$/;
    return phone === '' || re.test(phone);
}

// Agregar validación en tiempo real
document.addEventListener('DOMContentLoaded', function() {
    const emailInputs = document.querySelectorAll('input[type="email"]');
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    
    emailInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value && !validateEmail(this.value)) {
                this.style.borderColor = '#EF4444';
                showInputError(this, 'Por favor ingresa un email válido');
            } else {
                this.style.borderColor = '';
                hideInputError(this);
            }
        });
    });
    
    phoneInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value && !validatePhone(this.value)) {
                this.style.borderColor = '#EF4444';
                showInputError(this, 'Por favor ingresa un teléfono válido');
            } else {
                this.style.borderColor = '';
                hideInputError(this);
            }
        });
    });
});

function showInputError(input, message) {
    let errorElement = input.parentElement.querySelector('.input-error');
    
    if (!errorElement) {
        errorElement = document.createElement('span');
        errorElement.className = 'input-error';
        errorElement.style.color = '#EF4444';
        errorElement.style.fontSize = '0.875rem';
        errorElement.style.marginTop = '0.25rem';
        errorElement.style.display = 'block';
        input.parentElement.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
}

function hideInputError(input) {
    const errorElement = input.parentElement.querySelector('.input-error');
    if (errorElement) {
        errorElement.remove();
    }
}