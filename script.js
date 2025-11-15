document.addEventListener('DOMContentLoaded', function () {

    // Actualizar año en el footer
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Scroll suave para los enlaces de navegación
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Validación del formulario de contacto
    const contactForm = document.getElementById('contactForm');
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    const confirmationModal = new bootstrap.Modal(document.getElementById('confirmationModal'));

    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();
        event.stopPropagation();

        let isValid = true;

        // Validación de email con expresión regular
        const emailRegex = /^[^
@]+@[^
@]+\.[^
@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            emailInput.classList.add('is-invalid');
            emailError.textContent = 'Por favor, ingresa un formato de correo válido (ej: tu@correo.com).';
            isValid = false;
        } else {
            emailInput.classList.remove('is-invalid');
        }

        // Añadir validación de Bootstrap para otros campos
        if (!contactForm.checkValidity()) {
            isValid = false;
        }
        
        contactForm.classList.add('was-validated');

        if (isValid) {
            // Si el formulario es válido, simular el envío
            const nombre = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;
            const mensaje = document.getElementById('mensaje').value;

            // Crear el enlace mailto
            const subject = encodeURIComponent(`Consulta de ${nombre}`);
            const body = encodeURIComponent(`Nombre: ${nombre}\nEmail: ${email}\n\nMensaje:\n${mensaje}`);
            const mailtoLink = `mailto:info@patitasfelices.com?subject=${subject}&body=${body}`;

            // Mostrar la ventana modal de confirmación
            confirmationModal.show();
            
            // Intentar abrir el cliente de correo del usuario
            // Se hace después de mostrar el modal para una mejor experiencia
            setTimeout(() => {
                window.location.href = mailtoLink;
            }, 500); // Un pequeño retraso para que el modal se vea bien

            // Limpiar formulario
            contactForm.reset();
            contactForm.classList.remove('was-validated');
        }
    });
});
