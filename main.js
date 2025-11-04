document.addEventListener('DOMContentLoaded', () => {
    // --- Lógica para el cambio de tema (Modo Oscuro/Claro) ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const logoImg = document.getElementById('logo-img');
    
    const lightLogo = 'images/logo.jpg';
    const darkLogo = 'images/logo-dark.png';
    const sunIcon = '&#x2600;'; // ☀️
    const moonIcon = '&#x1F319;'; // 🌙

    // Función que aplica el tema (clase, logo e ícono)
    function applyTheme(theme) {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            themeToggle.innerHTML = sunIcon;
            if (logoImg) logoImg.src = darkLogo;
        } else {
            body.classList.remove('dark-mode');
            themeToggle.innerHTML = moonIcon;
            if (logoImg) logoImg.src = lightLogo;
        }
    }

    // Al cargar la página, comprueba si hay un tema guardado
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);

    // Evento de clic para el botón de cambio de tema
    themeToggle.addEventListener('click', () => {
        const currentTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    });

    // --- Lógica para el Carrusel de Imágenes ---
    const slides = document.querySelectorAll('.slide');
    if (slides.length > 0) {
        let currentSlide = 0;

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.remove('active');
                if (i === index) {
                    slide.classList.add('active');
                }
            });
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }

        // Inicia el carrusel
        setInterval(nextSlide, 5000); // Cambia la imagen cada 5 segundos
    }

    // --- Lógica para el botón Volver Arriba ---
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    // --- Lógica para el menú de navegación inteligente ---
    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 // Se activa cuando el 50% de la sección es visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').substring(1) === entry.target.id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
});