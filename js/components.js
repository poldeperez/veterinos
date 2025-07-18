// ===================================
// COMPONENTS LOADER SYSTEM
// ===================================

class ComponentsLoader {
    constructor() {
        this.componentsPath = 'components/';
        this.init();
    }

    async init() {
        await this.loadAllComponents();
        this.setActiveNavigation();
    }

    async loadAllComponents() {
        try {
            // Cargar header y footer en paralelo
            const [headerResponse, footerResponse] = await Promise.all([
                fetch(`${this.componentsPath}header.html`),
                fetch(`${this.componentsPath}footer.html`)
            ]);

            if (!headerResponse.ok || !footerResponse.ok) {
                throw new Error('Error loading components');
            }

            const [headerHTML, footerHTML] = await Promise.all([
                headerResponse.text(),
                footerResponse.text()
            ]);

            // Insertar componentes en el DOM
            this.insertComponent('header-placeholder', headerHTML);
            this.insertComponent('footer-placeholder', footerHTML);

            console.log('✅ Components loaded successfully');

        } catch (error) {
            console.error('❌ Error loading components:', error);
            this.fallbackToInlineComponents();
        }
    }

    insertComponent(placeholderId, html) {
        const placeholder = document.getElementById(placeholderId);
        if (placeholder) {
            placeholder.outerHTML = html;
        } else {
            console.warn(`Placeholder ${placeholderId} not found`);
        }
    }

    setActiveNavigation() {
        // Esperar a que el DOM se actualice
        setTimeout(() => {
            const currentPage = this.getCurrentPage();
            const navLinks = document.querySelectorAll('.nav-link');
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                
                // Detectar página actual y marcar como activa
                if (this.isActivePage(link.getAttribute('href'), currentPage)) {
                    link.classList.add('active');
                }
            });
        }, 100);
    }

    getCurrentPage() {
        const path = window.location.pathname;
        const fileName = path.split('/').pop() || 'index.html';
        return fileName === '' ? 'index.html' : fileName;
    }

    isActivePage(linkHref, currentPage) {
        // Para index.html o página principal
        if (currentPage === 'index.html' || currentPage === '') {
            return linkHref === 'index.html' || linkHref.startsWith('#');
        }
        
        // Para otras páginas
        return linkHref === currentPage;
    }

    fallbackToInlineComponents() {
        console.log('🔄 Using inline components fallback');
        // Aquí podrías mantener el HTML inline como fallback
        // Por ahora solo mostramos un mensaje
        const headerPlaceholder = document.getElementById('header-placeholder');
        const footerPlaceholder = document.getElementById('footer-placeholder');
        
        if (headerPlaceholder) {
            headerPlaceholder.innerHTML = '<p>Error cargando header</p>';
        }
        if (footerPlaceholder) {
            footerPlaceholder.innerHTML = '<p>Error cargando footer</p>';
        }
    }
}

// ===================================
// INICIALIZACIÓN
// ===================================

// Cargar componentes tan pronto como el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new ComponentsLoader();
});
