// ===================================
// MULTILANGUAGE SYSTEM
// ===================================

class MultiLanguage {
    constructor() {
        this.currentLanguage = 'es';
        this.translations = {};
        this.init();
    }

    async init() {
        // Detectar idioma del navegador o localStorage
        const savedLanguage = localStorage.getItem('selectedLanguage');
        const browserLanguage = navigator.language.substring(0, 2);
        
        if (savedLanguage && ['es', 'ca', 'en'].includes(savedLanguage)) {
            this.currentLanguage = savedLanguage;
        } else if (['es', 'ca', 'en'].includes(browserLanguage)) {
            this.currentLanguage = browserLanguage;
        }

        // Cargar traducciones
        await this.loadTranslations();
        
        // Aplicar traducciones
        this.applyTranslations();
        
        // Configurar selector de idioma
        this.setupLanguageSelector();
    }

    async loadTranslations() {
        try {
            const response = await fetch(`data/${this.currentLanguage}.json`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.translations = await response.json();
        } catch (error) {
            console.error('Error loading translations:', error);
            // Fallback a español si hay error
            if (this.currentLanguage !== 'es') {
                this.currentLanguage = 'es';
                try {
                    const response = await fetch('data/es.json');
                    this.translations = await response.json();
                } catch (fallbackError) {
                    console.error('Error loading fallback translations:', fallbackError);
                }
            }
        }
    }

    applyTranslations() {
        const elements = document.querySelectorAll('[data-text]');
        elements.forEach(element => {
            const key = element.getAttribute('data-text');
            if (this.translations[key]) {
                if (element.tagName === 'INPUT' && element.type === 'submit') {
                    element.value = this.translations[key];
                } else if (element.tagName === 'INPUT' && element.hasAttribute('placeholder')) {
                    element.placeholder = this.translations[key];
                } else {
                    element.textContent = this.translations[key];
                }
            }
        });

        // Actualizar meta tags
        this.updateMetaTags();
    }

    updateMetaTags() {
        document.documentElement.lang = this.currentLanguage;
        
        if (this.translations.meta_description) {
            const metaDescription = document.querySelector('meta[name="description"]');
            if (metaDescription) {
                metaDescription.content = this.translations.meta_description;
            }
        }
    }

    setupLanguageSelector() {
        // Selector móvil
        const languageSelect = document.getElementById('languageSelect');
        // Selector desktop  
        const languageSelectDesktop = document.getElementById('languageSelectDesktop');
        
        // Configurar selector móvil
        if (languageSelect) {
            languageSelect.value = this.currentLanguage;
            languageSelect.addEventListener('change', (e) => {
                this.changeLanguage(e.target.value);
                // Sincronizar con el selector desktop
                if (languageSelectDesktop) {
                    languageSelectDesktop.value = e.target.value;
                }
            });
        }
        
        // Configurar selector desktop
        if (languageSelectDesktop) {
            languageSelectDesktop.value = this.currentLanguage;
            languageSelectDesktop.addEventListener('change', (e) => {
                this.changeLanguage(e.target.value);
                // Sincronizar con el selector móvil
                if (languageSelect) {
                    languageSelect.value = e.target.value;
                }
            });
        }
    }

    async changeLanguage(newLanguage) {
        this.currentLanguage = newLanguage;
        localStorage.setItem('selectedLanguage', newLanguage);
        await this.loadTranslations();
        this.applyTranslations();
    }
}

// ===================================
// NAVIGATION
// ===================================

class Navigation {
    constructor() {
        this.mobileMenu = document.getElementById('mobile-menu');
        this.navMenu = document.getElementById('nav-menu');
        this.init();
    }

    init() {
        this.setupMobileMenu();
        this.setupSmoothScrolling();
        this.highlightActiveSection();
    }

    setupMobileMenu() {
        if (this.mobileMenu && this.navMenu) {
            this.mobileMenu.addEventListener('click', () => {
                this.mobileMenu.classList.toggle('active');
                this.navMenu.classList.toggle('active');
            });

            // Cerrar menú al hacer click en un enlace
            this.navMenu.addEventListener('click', (e) => {
                if (e.target.classList.contains('nav-link')) {
                    this.mobileMenu.classList.remove('active');
                    this.navMenu.classList.remove('active');
                }
            });

            // Cerrar menú al hacer click fuera
            document.addEventListener('click', (e) => {
                if (!this.mobileMenu.contains(e.target) && !this.navMenu.contains(e.target)) {
                    this.mobileMenu.classList.remove('active');
                    this.navMenu.classList.remove('active');
                }
            });
        }
    }

    setupSmoothScrolling() {
        // Scroll suave para enlaces internos
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    highlightActiveSection() {
        // Solo en la página principal
        if (window.location.pathname === '/' || window.location.pathname.includes('index.html')) {
            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('.nav-link');

            window.addEventListener('scroll', () => {
                let current = '';
                const headerHeight = document.querySelector('.header').offsetHeight;

                sections.forEach(section => {
                    const sectionTop = section.offsetTop - headerHeight - 100;
                    if (window.pageYOffset >= sectionTop) {
                        current = section.getAttribute('id');
                    }
                });

                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${current}`) {
                        link.classList.add('active');
                    }
                });
            });
        }
    }
}

// ===================================
// SCROLL TO TOP
// ===================================

class ScrollToTop {
    constructor() {
        this.button = document.getElementById('scrollToTop');
        this.init();
    }

    init() {
        if (!this.button) return;

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                this.button.classList.add('visible');
            } else {
                this.button.classList.remove('visible');
            }
        });

        this.button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ===================================
// FORM HANDLING
// ===================================

class ContactForm {
    constructor() {
        this.form = document.querySelector('form[name="contact"]');
        this.init();
    }

    init() {
        if (!this.form) return;

        this.form.addEventListener('submit', (e) => {
            if (!this.validateForm()) {
                e.preventDefault();
                return false;
            }
            
            // Mostrar mensaje de loading
            this.showLoadingState();
        });

        // Validación en tiempo real
        this.setupRealTimeValidation();
    }

    validateForm() {
        let isValid = true;
        const requiredFields = this.form.querySelectorAll('[required]');

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                this.showFieldError(field, 'Este campo es obligatorio');
                isValid = false;
            } else {
                this.clearFieldError(field);
            }
        });

        // Validar email
        const emailField = this.form.querySelector('input[type="email"]');
        if (emailField && emailField.value) {
            if (!this.isValidEmail(emailField.value)) {
                this.showFieldError(emailField, 'Por favor, introduce un email válido');
                isValid = false;
            }
        }

        // Validar teléfono
        const phoneField = this.form.querySelector('input[type="tel"]');
        if (phoneField && phoneField.value) {
            if (!this.isValidPhone(phoneField.value)) {
                this.showFieldError(phoneField, 'Por favor, introduce un teléfono válido');
                isValid = false;
            }
        }

        return isValid;
    }

    showFieldError(field, message) {
        this.clearFieldError(field);
        
        field.style.borderColor = '#dc3545';
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.style.color = '#dc3545';
        errorDiv.style.fontSize = '14px';
        errorDiv.style.marginTop = '5px';
        errorDiv.textContent = message;
        
        field.parentNode.appendChild(errorDiv);
    }

    clearFieldError(field) {
        field.style.borderColor = '';
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    }

    setupRealTimeValidation() {
        const emailField = this.form.querySelector('input[type="email"]');
        const phoneField = this.form.querySelector('input[type="tel"]');

        if (emailField) {
            emailField.addEventListener('blur', () => {
                if (emailField.value && !this.isValidEmail(emailField.value)) {
                    this.showFieldError(emailField, 'Por favor, introduce un email válido');
                } else {
                    this.clearFieldError(emailField);
                }
            });
        }

        if (phoneField) {
            phoneField.addEventListener('blur', () => {
                if (phoneField.value && !this.isValidPhone(phoneField.value)) {
                    this.showFieldError(phoneField, 'Por favor, introduce un teléfono válido');
                } else {
                    this.clearFieldError(phoneField);
                }
            });
        }
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    isValidPhone(phone) {
        const phoneRegex = /^[\+]?[\d\s\-\(\)]{9,}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    }

    showLoadingState() {
        const submitButton = this.form.querySelector('button[type="submit"]');
        if (submitButton) {
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Enviando...';
            submitButton.disabled = true;

            // Restaurar estado original después de un tiempo (por si hay error)
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 5000);
        }
    }
}

// ===================================
// LAZY LOADING IMAGES
// ===================================

class LazyLoading {
    constructor() {
        this.images = document.querySelectorAll('img[loading="lazy"]');
        this.init();
    }

    init() {
        if ('IntersectionObserver' in window) {
            this.imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                });
            });

            this.images.forEach(img => {
                this.imageObserver.observe(img);
            });
        } else {
            // Fallback para navegadores antiguos
            this.images.forEach(img => {
                img.classList.add('loaded');
            });
        }
    }
}

// ===================================
// ANIMATIONS
// ===================================

class ScrollAnimations {
    constructor() {
        this.animatedElements = document.querySelectorAll('.service-card, .team-member, .facility-card, .value-item, .tech-item');
        this.init();
    }

    init() {
        if ('IntersectionObserver' in window) {
            this.animationObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('fade-in-up');
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            this.animatedElements.forEach(element => {
                this.animationObserver.observe(element);
            });
        }
    }
}

// ===================================
// PERFORMANCE OPTIMIZATIONS
// ===================================

class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        // Preload critical resources
        this.preloadCriticalResources();
        
        // Optimize scroll events
        this.optimizeScrollEvents();
    }

    preloadCriticalResources() {
        // Preload next page likely to be visited
        const navLinks = document.querySelectorAll('.nav-link[href$=".html"]');
        navLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                const linkUrl = link.getAttribute('href');
                if (linkUrl && !document.querySelector(`link[href="${linkUrl}"]`)) {
                    const preloadLink = document.createElement('link');
                    preloadLink.rel = 'prefetch';
                    preloadLink.href = linkUrl;
                    document.head.appendChild(preloadLink);
                }
            });
        });
    }

    optimizeScrollEvents() {
        let ticking = false;

        function updateScrollDependentElements() {
            // Aquí van las funciones que dependen del scroll
            ticking = false;
        }

        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateScrollDependentElements);
                ticking = true;
            }
        }

        window.addEventListener('scroll', requestTick);
    }
}

// ===================================
// ACCESSIBILITY
// ===================================

class AccessibilityManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupKeyboardNavigation();
        this.setupFocusManagement();
        this.setupAriaLabels();
    }

    setupKeyboardNavigation() {
        // Escape key to close mobile menu
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const mobileMenu = document.getElementById('mobile-menu');
                const navMenu = document.getElementById('nav-menu');
                if (mobileMenu && navMenu) {
                    mobileMenu.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            }
        });
    }

    setupFocusManagement() {
        // Mejorar el foco visible
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
    }

    setupAriaLabels() {
        // Agregar aria-labels dinámicamente donde sea necesario
        const languageSelector = document.getElementById('languageSelect');
        const languageSelectDesktop = document.getElementById('languageSelectDesktop');
        
        if (languageSelector) {
            languageSelector.setAttribute('aria-label', 'Seleccionar idioma');
        }
        
        if (languageSelectDesktop) {
            languageSelectDesktop.setAttribute('aria-label', 'Seleccionar idioma');
        }

        const scrollToTopButton = document.getElementById('scrollToTop');
        if (scrollToTopButton) {
            scrollToTopButton.setAttribute('aria-label', 'Volver arriba');
        }
    }
}

// ===================================
// INITIALIZATION
// ===================================

// Función para inicializar todos los módulos
function initializeApp() {
    const multiLanguage = new MultiLanguage();
    const navigation = new Navigation();
    const scrollToTop = new ScrollToTop();
    const contactForm = new ContactForm();
    const lazyLoading = new LazyLoading();
    const scrollAnimations = new ScrollAnimations();
    const performanceOptimizer = new PerformanceOptimizer();
    const accessibilityManager = new AccessibilityManager();

    // Log de inicialización para debug
    console.log('Veterinarios website initialized successfully');
}

document.addEventListener('DOMContentLoaded', () => {
    // Esperar a que los componentes se carguen antes de inicializar
    document.addEventListener('componentsLoaded', () => {
        initializeApp();
    });
    
    // Fallback: si no hay componentes dinámicos, inicializar directamente
    setTimeout(() => {
        if (!document.querySelector('.header')) {
            initializeApp();
        }
    }, 100);
});

// ===================================
// SERVICE WORKER (opcional)
// ===================================

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
