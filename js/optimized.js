// JAVASCRIPT OTIMIZADO E MODERNIZADO - PIZZARIA PAULISTA
// Mantém toda funcionalidade com melhor performance

class PizzariaPaulista {
    constructor() {
        this.init();
    }

    init() {
        // Inicializa todas as funcionalidades
        this.initNavigation();
        this.initSlider();
        this.initTabs();
        this.initTestimonials();
        this.initMobileMenu();
        this.initLazyLoading();
        this.initAccessibility();
        this.initPerformance();
    }

    // ===== NAVEGAÇÃO RESPONSIVA =====
    initNavigation() {
        const nav = document.querySelector('.navigation');

        // Navegação suave
        this.initSmoothScroll();
    }

    initSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');

        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');

                // Skip smooth-scroll behavior for tab controls inside the
                // service tabs ('.etabs' / '.serviceIntro') so clicking a tab
                // only toggles content instead of scrolling the page.
                if (link.closest('.etabs') || link.closest('.serviceIntro')) {
                    // let tab handler manage the behavior (no scrolling here)
                    return;
                }

                if (href !== '#') {
                    e.preventDefault();
                    const target = document.querySelector(href);

                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });
    }

    // ===== SLIDER OTIMIZADO =====
    initSlider() {
        const slider = document.querySelector('.flexslider');
        
        if (slider && typeof jQuery !== 'undefined') {
            jQuery(document).ready(function($) {
                $('.flexslider').flexslider({
                    animation: "slide",
                    controlNav: true,
                    directionNav: false,
                    slideshowSpeed: 5000,
                    animationSpeed: 600,
                    touch: true,
                    pauseOnHover: true
                });
            });
        } else {
            this.fallbackSlider();
        }
    }

    fallbackSlider() {
        const slides = document.querySelectorAll('.slides li');
        let currentSlide = 0;

        if (slides.length > 1) {
            // Esconde todas as slides exceto a primeira
            slides.forEach((slide, index) => {
                if (index !== 0) {
                    slide.style.display = 'none';
                }
            });

            // Rotação automática
            setInterval(() => {
                slides[currentSlide].style.display = 'none';
                currentSlide = (currentSlide + 1) % slides.length;
                slides[currentSlide].style.display = 'block';
            }, 5000);
        }
    }

    // ===== ABAS INTERATIVAS =====
    initTabs() {
        const tabs = document.querySelectorAll('.etabs li a');
        const tabContents = document.querySelectorAll('.tabcontent > div');

        tabs.forEach((tab, index) => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();

                // Remove classe active de todas as tabs
                tabs.forEach(t => t.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));

                // Adiciona classe active à tab clicada
                tab.classList.add('active');
                
                // Mostra conteúdo correspondente
                if (tabContents[index]) {
                    tabContents[index].classList.add('active');
                }
            });
        });

        // Ativa primeira tab por padrão
        if (tabs.length > 0 && tabContents.length > 0) {
            tabs[0].classList.add('active');
            tabContents[0].classList.add('active');
        }
    }

    // ===== DEPOIMENTOS CAROUSEL =====
    initTestimonials() {
        const carousel = document.querySelector('.carouselle');
        
        if (carousel && typeof jQuery !== 'undefined') {
            jQuery(document).ready(function($) {
                $('.carouselle.owl-carousel').owlCarousel({
                    items: 1,
                    loop: true,
                    autoplay: true,
                    autoplayTimeout: 6000,
                    autoplayHoverPause: true,
                    dots: true,
                    nav: true,
                    navText: ['<', '>'],
                    responsive: {
                        0: {
                            items: 1,
                            nav: false
                        },
                        768: {
                            items: 1,
                            nav: true
                        }
                    }
                });
            });
        } else {
            this.fallbackCarousel();
        }
    }

    fallbackCarousel() {
        const items = document.querySelectorAll('.carousel-item');
        let currentItem = 0;

        if (items.length > 1) {
            // Esconde todos os itens exceto o primeiro
            items.forEach((item, index) => {
                if (index !== 0) {
                    item.style.display = 'none';
                }
            });

            // Rotação automática
            setInterval(() => {
                items[currentItem].style.display = 'none';
                currentItem = (currentItem + 1) % items.length;
                items[currentItem].style.display = 'block';
            }, 6000);
        }
    }

    // ===== MENU MOBILE =====
    initMobileMenu() {
        const toggleBtn = document.querySelector('.nav-toggle');
        const triggerContainer = document.querySelector('.nav_trigger');
        const mobileMenu = document.querySelector('.nav_mobile');

        if ((toggleBtn || triggerContainer) && mobileMenu) {
            // Prefer the explicit button if present
            const opener = toggleBtn || triggerContainer;

            opener.addEventListener('click', (e) => {
                // If the opener is the container (legacy), prevent default
                if (e.target) e.preventDefault();
                e.stopPropagation();

                const btn = toggleBtn;
                const isOpen = mobileMenu.classList.contains('open');

                if (isOpen) {
                    mobileMenu.classList.remove('open');
                    if (btn) btn.setAttribute('aria-expanded', 'false');
                } else {
                    mobileMenu.classList.add('open');
                    if (btn) btn.setAttribute('aria-expanded', 'true');
                    mobileMenu.classList.add('slide-up');
                }
            });

            // Close menu when a link is clicked
            mobileMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.remove('open');
                    if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
                });
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (toggleBtn && !toggleBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                    mobileMenu.classList.remove('open');
                    toggleBtn.setAttribute('aria-expanded', 'false');
                }
            });
        }
    }

    // ===== LAZY LOADING PARA IMAGENS =====
    initLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    // ===== ACESSIBILIDADE =====
    initAccessibility() {
        // Foco visível para elementos interativos
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });

        // Skip to main content
        this.createSkipLink();
    }

    createSkipLink() {
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.className = 'skip-link sr-only';
        skipLink.textContent = 'Pular para o conteúdo principal';
        
        skipLink.addEventListener('click', (e) => {
            e.preventDefault();
            const mainContent = document.querySelector('.main_content') || document.querySelector('main');
            if (mainContent) {
                mainContent.setAttribute('tabindex', '-1');
                mainContent.focus();
            }
        });

        document.body.insertBefore(skipLink, document.body.firstChild);
    }

    // ===== OTIMIZAÇÕES DE PERFORMANCE =====
    initPerformance() {
        // Debounce para eventos de resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.handleResize();
            }, 250);
        });

        // Prefetch para links importantes
        this.prefetchImportantLinks();
    }

    handleResize() {
        // Ajustes específicos para diferentes tamanhos de tela
        const mobileMenu = document.querySelector('.nav_mobile');
        if (window.innerWidth > 768 && mobileMenu) {
            // Ensure menu is closed when switching to desktop width
            mobileMenu.classList.remove('open');
            const toggleBtn = document.querySelector('.nav-toggle');
            if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
        }
    }

    prefetchImportantLinks() {
        const importantLinks = [
            'cardapio.html',
            'contato.html',
            'pizzaria.html'
        ];

        importantLinks.forEach(link => {
            const prefetchLink = document.createElement('link');
            prefetchLink.rel = 'prefetch';
            prefetchLink.href = link;
            document.head.appendChild(prefetchLink);
        });
    }

    // ===== UTILITÁRIOS =====
    debounce(func, wait) {
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

    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', () => {
    // Inicializa a aplicação
    const pizzaria = new PizzariaPaulista();

    // Adiciona classe de carregamento para animações
    document.body.classList.add('loaded');

    // Remove loading spinner se existir
    const loadingSpinner = document.querySelector('.loading-spinner');
    if (loadingSpinner) {
        loadingSpinner.style.display = 'none';
    }
});

// ===== COMPATIBILIDADE COM CÓDIGO EXISTENTE =====
// Mantém funções globais existentes para compatibilidade
window.showPopup = function() {
    const popup = document.getElementById('popup');
    const overlay = document.getElementById('overlay');
    
    if (popup && overlay) {
        overlay.style.display = 'block';
        popup.style.display = 'block';
        setTimeout(() => {
            popup.style.opacity = '1';
        }, 50);
    }
};

window.closePopup = function() {
    const popup = document.getElementById('popup');
    const overlay = document.getElementById('overlay');
    
    if (popup && overlay) {
        popup.style.opacity = '0';
        setTimeout(() => {
            overlay.style.display = 'none';
            popup.style.display = 'none';
        }, 300);
    }
};

// Inicializa popup ao carregar (se existir)
if (document.getElementById('popup')) {
    window.addEventListener('load', window.showPopup);
}

// ===== SERVICE WORKER PARA CACHE (OPCIONAL) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('Erro capturado:', e.error);
});

// ===== PERFORMANCE MONITORING =====
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.timing;
            const loadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`Tempo de carregamento: ${loadTime}ms`);
        }, 0);
    });
}

// Accessibility: ensure owl carousel nav buttons have aria-labels for screen readers
document.addEventListener('DOMContentLoaded', () => {
    // Use a small timeout to let Owl Carousel initialize if it's being initialized on DOMContentLoaded
    setTimeout(() => {
        document.querySelectorAll('.carouselle.owl-carousel .owl-prev').forEach(btn => {
            btn.setAttribute('aria-label', 'Anterior');
            btn.setAttribute('title', 'Anterior');
        });
        document.querySelectorAll('.carouselle.owl-carousel .owl-next').forEach(btn => {
            btn.setAttribute('aria-label', 'Próximo');
            btn.setAttribute('title', 'Próximo');
        });
    }, 500);
});
