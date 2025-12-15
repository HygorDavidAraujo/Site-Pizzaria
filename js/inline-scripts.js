// Carregar mapa do Google sob demanda
document.addEventListener('DOMContentLoaded', function() {
  const loadMapBtn = document.getElementById('load-map-btn');
  const mapPlaceholder = document.getElementById('map-placeholder');
  const mapIframe = document.getElementById('google-map-iframe');
  
  // Auto-load the Google Map on pages that include the map placeholder.
  // This replaces the previous behavior where the map was loaded only after
  // the user clicked a button. We still keep the button in the markup for
  // accessibility/fallback, but we hide/disable it once the iframe starts
  // loading to avoid duplicate actions.
  if (mapIframe && mapPlaceholder) {
    const mapUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3821.725546922449!2d-49.270615484582414!3d-16.690611888499646!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935ef11d9d555551%3A0xcf5fdbfb3fec51f8!2sPizzaria%20Paulista%20-%20A%20melhor%20pizza%20de%20Goi%C3%A2nia!5e0!3m2!1spt-BR!2sbr!4v1579896315096!5m2!1spt-BR!2sbr';

    // Show loading state on the button (if present)
    if (loadMapBtn) {
      loadMapBtn.textContent = 'Carregando...';
      loadMapBtn.disabled = true;
    }

    // Start loading the iframe immediately
    mapIframe.src = mapUrl;
    mapIframe.onload = function() {
      // Hide placeholder and show iframe when ready
      mapPlaceholder.style.display = 'none';
      mapIframe.style.display = 'block';

      // Hide the button since map is already loaded
      if (loadMapBtn) {
        loadMapBtn.style.display = 'none';
      }
    };
  } else if (loadMapBtn) {
    // Fallback: if the iframe/placeholder are not present but the button is,
    // keep the old click-to-load behavior.
    loadMapBtn.addEventListener('click', function() {
      // Mostrar loading
      loadMapBtn.textContent = 'Carregando...';
      loadMapBtn.disabled = true;
      
      // Carregar o iframe do mapa
      if (mapIframe) {
        mapIframe.src = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3821.725546922449!2d-49.270615484582414!3d-16.690611888499646!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935ef11d9d555551%3A0xcf5fdbfb3fec51f8!2sPizzaria%20Paulista%20-%20A%20melhor%20pizza%20de%20Goi%C3%A2nia!5e0!3m2!1spt-BR!2sbr!4v1579896315096!5m2!1spt-BR!2sbr';
        mapIframe.onload = function() {
          if (mapPlaceholder) mapPlaceholder.style.display = 'none';
          mapIframe.style.display = 'block';
        };
      }
    });
  }
});

// Função para fechar pop-up (se necessário)
function closePopup() {
  const popup = document.getElementById('popup');
  const overlay = document.getElementById('overlay');
  
  if (popup) {
    popup.style.opacity = '0';
    setTimeout(() => {
      popup.style.display = 'none';
      if (overlay) overlay.style.display = 'none';
    }, 300);
  }
}

// Função para abrir pop-up (se necessário)
function openPopup() {
  const popup = document.getElementById('popup');
  const overlay = document.getElementById('overlay');
  
  if (popup) {
    popup.style.display = 'block';
    if (overlay) overlay.style.display = 'block';
    setTimeout(() => {
      popup.style.opacity = '1';
    }, 10);
  }
}

// Inicialização do Facebook Chat (se necessário)
function initializeFacebookChat() {
  // O código do Facebook já está sendo carregado via SDK
  // Esta função pode ser usada para inicializações adicionais se necessário
}

// Sistema de slides por categoria para o cardápio
function initializeCategorySliders() {
  const categorySliders = document.querySelectorAll('.category-slider');
  
  if (categorySliders.length === 0) return;

  // Definir todas as imagens por categoria
  const imagesByCategory = {
    'cervejas': [
      'img/service/ser1.jpg',
      'img/service/ser2.jpg',
      'img/service/ser3.jpg',
      'img/service/ser31.jpg'
    ],
    'bebidas': [
      'img/service/ser4.jpg',
      'img/service/ser5.jpg',
      'img/service/ser6.jpg',
      'img/service/ser7.jpg',
      'img/service/ser8.jpg',
      'img/service/ser9.jpg'
    ],
    'entradas': [
      'img/service/ser10.jpg',
      'img/service/ser11.jpg',
      'img/service/ser12.jpg'
    ],
    'massas': [
      'img/service/ser13.jpg',
      'img/service/ser14.jpg',
      'img/service/ser15.jpg'
    ],
    'pizzas-individuais': [
      'img/service/ser19.jpg',
      'img/service/ser20.jpg',
      'img/service/ser21.jpg'
    ],
    'pizzas-tradicionais': [
      'img/service/ser16.jpg',
      'img/service/ser17.jpg',
      'img/service/ser18.jpg'
    ],
    'sobremesas': [
      'img/service/ser22.jpg',
      'img/service/ser23.jpg',
      'img/service/ser24.jpg'
    ]
  };

  // Inicializar cada slider de categoria
  categorySliders.forEach(slider => {
    const category = slider.getAttribute('data-category');
    const images = imagesByCategory[category] || [];
    let currentIndex = 0;

    // Elementos do slider
    const slideImage = slider.querySelector('.slide-image');
    const slideCounter = slider.querySelector('.slide-counter');
    const prevBtn = slider.querySelector('.prev-btn');
    const nextBtn = slider.querySelector('.next-btn');

    // Atualizar slide
    function updateSlide() {
      if (images.length === 0) {
        slideImage.src = '';
        slideImage.alt = 'Nenhuma imagem disponível';
        slideCounter.textContent = '0/0';
        prevBtn.disabled = true;
        nextBtn.disabled = true;
        return;
      }

      slideImage.src = images[currentIndex];
      slideCounter.textContent = `${currentIndex + 1}/${images.length}`;

      // Atualizar estado dos botões
      prevBtn.disabled = currentIndex === 0;
      nextBtn.disabled = currentIndex === images.length - 1;
    }

    // Navegação
    function nextSlide() {
      if (currentIndex < images.length - 1) {
        currentIndex++;
        updateSlide();
      }
    }

    function prevSlide() {
      if (currentIndex > 0) {
        currentIndex--;
        updateSlide();
      }
    }

    // Event listeners
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    // Inicializar
    updateSlide();

    // Auto-slide (opcional)
    let autoSlideInterval;
    function startAutoSlide() {
      autoSlideInterval = setInterval(() => {
        if (currentIndex < images.length - 1) {
          nextSlide();
        } else {
          currentIndex = 0;
          updateSlide();
        }
      }, 4000); // Muda a cada 4 segundos
    }

    function stopAutoSlide() {
      clearInterval(autoSlideInterval);
    }

    // Iniciar auto-slide
    startAutoSlide();

    // Pausar auto-slide quando o mouse estiver sobre o slider
    slider.addEventListener('mouseenter', stopAutoSlide);
    slider.addEventListener('mouseleave', startAutoSlide);
  });
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
  // Inicializar funcionalidades específicas da página
  initializeFacebookChat();
  initializeCategorySliders();
});

// ===== Theme (dark / light) toggle with persistence and logo swap =====
function applyTheme(theme) {
  const isDark = theme === 'dark';
  document.documentElement.classList.toggle('dark-mode', isDark);

  const btn = document.getElementById('theme-toggle');
  if (btn) {
    btn.setAttribute('aria-pressed', String(isDark));
    // Use simple icons: moon for light -> switch to sun when dark, and vice-versa
    btn.textContent = isDark ? '☀️' : '🌙';
  }

  // Swap logos if present. User said logos are renamed to logoModoClaro / logoModoEscuro
  const logo = document.querySelector('.logo_wrap img');
  if (logo) {
    try {
      const src = logo.getAttribute('src') || '';
      const dir = src.includes('/') ? src.substring(0, src.lastIndexOf('/') + 1) : '';
      const ext = src.includes('.') ? src.substring(src.lastIndexOf('.')) : '.png';
      const name = isDark ? 'logoModoEscuro' : 'logoModoClaro';
      const newSrc = dir + name + ext;
      // Only change if different to avoid reloading unnecessarily
      if (logo.getAttribute('src') !== newSrc) logo.setAttribute('src', newSrc);
    } catch (e) {
      console.warn('Theme logo swap failed:', e);
    }
  }
}

function toggleTheme() {
  const current = localStorage.getItem('pp-theme') || (document.documentElement.classList.contains('dark-mode') ? 'dark' : 'light');
  const next = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  try { localStorage.setItem('pp-theme', next); } catch (e) { /* ignore */ }
}

// Init theme on DOMContentLoaded (separate listener to keep concerns isolated)
document.addEventListener('DOMContentLoaded', function() {
  const saved = localStorage.getItem('pp-theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = saved || (prefersDark ? 'dark' : 'light');
  applyTheme(theme);

  // We use event delegation below so the toggle works even if the
  // button is replaced after DOMContentLoaded. However, set the
  // initial aria-pressed state if the element exists now.
  const toggle = document.getElementById('theme-toggle');
  if (toggle) {
    toggle.setAttribute('aria-pressed', String(document.documentElement.classList.contains('dark-mode')));
  }
  
  // Robust delegation: if the theme toggle button is replaced or inserted later
  // (some pages run legacy scripts that may re-render header), handle clicks via
  // event delegation so the control still works.
  document.addEventListener('click', function (e) {
    const btn = e.target.closest && e.target.closest('.theme-toggle');
    if (btn) {
      e.preventDefault();
      toggleTheme();
    }
  });

  // Keyboard support for delegated control (Enter / Space)
  document.addEventListener('keydown', function (e) {
    const active = document.activeElement;
    if (active && active.classList && active.classList.contains('theme-toggle')) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleTheme();
      }
    }
  });

    /* Auto-update copyright year: find footer elements with class 'copyright'
       and replace the first 4-digit year with the current year so the site
       updates automatically each year. Runs on DOMContentLoaded. */
    function updateCopyrightYear() {
      try {
        const now = new Date();
        const year = now.getFullYear();
        const els = document.querySelectorAll('.copyright');
        els.forEach(el => {
          const html = el.innerHTML;
          // Match a 4-digit year optionally followed/preceded by a range separator and another 4-digit year
          const match = html.match(/(\d{4})(?:\s*[–—-]\s*(\d{4}))?/);
          // Always use the foundation year 2002 as the start and show range until current year
          const foundation = 2002;
          const range = foundation < year ? `${foundation} — ${year}` : String(year);
          if (match) {
            // Replace any existing year or year-range with the foundation-to-current range
            el.innerHTML = html.replace(/(\d{4}(?:\s*[–—-]\s*\d{4})?)/, range);
          } else {
            // No year found: prepend a readable copyright line preserving existing content
            el.innerHTML = `Copyright © ${range} - ${html}`;
          }
        });
      } catch (e) {
        console.warn('Failed to update copyright year:', e);
      }
    }

    // Run once on load
    updateCopyrightYear();
});
