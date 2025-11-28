/**
 * Script principal para la plantilla personalizada de Hugo
 * Maneja la funcionalidad del menú móvil, efectos de scroll y otras interacciones
 */

(function() {
    'use strict';

    /**
     * Inicialización cuando el DOM está listo
     */
    document.addEventListener('DOMContentLoaded', function() {
        initMobileMenu();
        initSmoothScroll();
        initScrollAnimations();
    });

    /**
     * Función para inicializar el menú móvil
     * Permite abrir/cerrar el menú de navegación en dispositivos móviles
     */
    function initMobileMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        const navMenu = document.querySelector('.nav-menu');

        if (!menuToggle || !navMenu) {
            return;
        }

        // Toggle del menú al hacer clic en el botón
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
            
            // Animación del icono hamburguesa
            const spans = menuToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Cerrar el menú al hacer clic en un enlace
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                
                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });

        // Cerrar el menú al hacer clic fuera de él
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target);
            const isClickOnToggle = menuToggle.contains(event.target);

            if (!isClickInsideNav && !isClickOnToggle && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                
                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    /**
     * Función para inicializar el scroll suave
     * Mejora la experiencia de navegación con scroll suave
     */
    function initSmoothScroll() {
        // El scroll suave ya está habilitado en CSS con scroll-behavior: smooth
        // Esta función puede extenderse para funcionalidades adicionales
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(function(link) {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Solo procesar enlaces que apuntan a elementos en la misma página
                if (href !== '#' && document.querySelector(href)) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    /**
     * Función para agregar efectos de animación al hacer scroll
     * Efecto de "Lectura Guiada" automático si el usuario no mueve el mouse
     */
    function initScrollAnimations() {
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -20% 0px', // El área activa es el centro de la pantalla
            threshold: 0.1
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    // Solo aplicar si no hay hover activo
                    const streamContainer = document.querySelector('.stream-container');
                    if (streamContainer && !streamContainer.matches(':hover')) {
                        entry.target.style.opacity = '1';
                        entry.target.style.filter = 'blur(0)';
                    }
                }
            });
        }, observerOptions);

        // Observar todas las secciones
        const sections = document.querySelectorAll('section');
        sections.forEach(function(section) {
            observer.observe(section);
        });
    }

})();

