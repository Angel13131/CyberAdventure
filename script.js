document.addEventListener('DOMContentLoaded', () => {
    // Script para modal de imagen
    const imageModal = document.getElementById('imageModal');
    imageModal.addEventListener('show.bs.modal', event => {
        const button = event.relatedTarget;
        const imageSrc = button.getAttribute('data-image-src');
        const modalImage = imageModal.querySelector('#modalImage');
        modalImage.src = imageSrc;
    });

    // SCRIPT PARA ANIMACIONES DE FADE IN AL SCROLL
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.2 // El elemento es visible en un 20%
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Añade la clase 'is-visible' con un retraso escalonado
                const delay = parseFloat(entry.target.style.transitionDelay || '0');
                setTimeout(() => {
                    entry.target.classList.add('is-visible');
                }, delay * 1000); // Convierte segundos a milisegundos
                
                observer.unobserve(entry.target); // Detener la observación después de la animación
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Script para el menú de árbol fijo
    const treeMenuItems = document.querySelectorAll('#fixed-tree-menu .has-submenu > .tree-menu-link');
    treeMenuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Check if the link itself is not a direct page link (e.g., "#")
            const href = this.getAttribute('href');
            if (href === '#' || href.endsWith('.html') || href.startsWith('mailto:') || href.startsWith('tel:')) {
                // Allow direct navigation for actual page links or external links
                // For submenus, prevent default and toggle submenu
                if (href === '#') { // Only prevent default if it's a dummy hash link
                    e.preventDefault();
                }
                const submenu = this.nextElementSibling;
                const icon = this.querySelector('.tree-icon');
                
                if (submenu && submenu.classList.contains('submenu')) { // Ensure it's actually a submenu
                    if (submenu.style.display === 'block') {
                        submenu.style.display = 'none';
                        icon.classList.remove('fa-chevron-down');
                        icon.classList.add('fa-chevron-right');
                    } else {
                        // Close all other open submenus at the same level
                        this.closest('.tree-menu-list, .submenu').querySelectorAll('.submenu').forEach(otherSubmenu => {
                            if (otherSubmenu !== submenu && otherSubmenu.style.display === 'block') {
                                otherSubmenu.style.display = 'none';
                                const otherIcon = otherSubmenu.previousElementSibling.querySelector('.tree-icon');
                                if (otherIcon) {
                                    otherIcon.classList.remove('fa-chevron-down');
                                    otherIcon.classList.add('fa-chevron-right');
                                }
                            }
                        });

                        submenu.style.display = 'block';
                        icon.classList.remove('fa-chevron-right');
                        icon.classList.add('fa-chevron-down');
                    }
                }
            }
        });
    });

    // Toggle fixed menu on smaller screens
    const fixedMenu = document.getElementById('fixed-tree-menu');
    const openMenuBtn = document.querySelector('.btn-open-menu');
    const closeMenuBtn = document.querySelector('.btn-close-menu');

    if (openMenuBtn && fixedMenu && closeMenuBtn) { // Check if elements exist
        openMenuBtn.addEventListener('click', () => {
            fixedMenu.classList.add('show-menu');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
        });

        closeMenuBtn.addEventListener('click', () => {
            fixedMenu.classList.remove('show-menu');
            document.body.style.overflow = ''; // Allow scrolling
        });

        // Close menu when a link is clicked
        fixedMenu.querySelectorAll('.tree-menu-link').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth < 992) { // Only for smaller screens where the menu is hidden
                    // Check if it's a direct page link (not just a submenu toggle)
                    const href = link.getAttribute('href');
                    if (href !== '#' && !link.closest('.has-submenu')) {
                        fixedMenu.classList.remove('show-menu');
                        document.body.style.overflow = '';
                    }
                }
            });
        });
    }
});
