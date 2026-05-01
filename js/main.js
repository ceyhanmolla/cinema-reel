// Film data
const films = [
  {
    id: 1,
    year: "2024",
    category: "HYBRID DOCUMENTARY",
    title: "BLUEPRINT NO. 7",
    director: "SAM BINNS",
    image: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/fa51902b-c2a4-4c33-a96e-a8f1ef67edc6_1600w.jpg",
    awards: ["HYBRID DOCUMENTARY", "BEST FIRST FEATURE", "RAW & UNNERVING", "CRITICS PRIZE", "ESSENTIAL VIEWING"],
    quote: { text: "A PORTRAIT OF NOW", source: "TRUE LIFE FUND" }
  },
  {
    id: 2,
    year: "2023",
    category: "ESSAY FILM",
    title: "ATLAS UNFOLDS",
    director: "ELIAS NORÉN",
    image: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/d14dc069-558a-4c51-8aad-5cc237f9b61d_1600w.jpg",
    awards: ["BERLINALE ENCOUNTERS", "BEST CINEMATOGRAPHY", "AN OPULENT CANVAS", "ENCOUNTERS PRIZE", "STUNNING IN RESTRAINT", "FIPRESCI PRIZE"],
    quote: { text: "AN OPULENT CANVAS", source: "BERLINALE" }
  },
  {
    id: 3,
    year: "2024",
    category: "OBSERVATIONAL",
    title: "THE LONG QUIET",
    director: "AMARA OKAFOR",
    image: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/4734259a-bad7-422f-981e-ce01e79184f2_1600w.jpg",
    awards: ["TIFF DOCS PLATFORM", "PLATFORM PRIZE", "DEEPLY MOVING", "BEST DIRECTOR", "QUIETLY DEVASTATING"],
    quote: { text: "DEEPLY MOVING", source: "TIFF" }
  },
  {
    id: 4,
    year: "2025",
    category: "CHARACTER STUDY",
    title: "EMBER & ASH",
    director: "MILO HAVERSTEIN",
    image: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/724142aa-44a6-48d3-9cf3-761e00d05b78_1600w.jpg",
    awards: ["VENICE ORIZZONTI", "BEST ACTRESS", "SHE BURNS THE FRAME", "ORIZZONTI PRIZE", "HAUNTING & PRECISE"],
    quote: { text: "SHE BURNS THE FRAME", source: "VENICE" }
  },
  {
    id: 5,
    year: "2022",
    category: "EXPERIMENTAL",
    title: "CAVERN",
    director: "SØREN HOLT",
    image: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/005600e5-f6ab-4e59-bc86-eaeb02797dfa_1600w.jpg",
    awards: ["IFFR TIGER COMPETITION", "TIGER AWARD", "ARCHITECTURE OF FEELING", "VPRO BIG SCREEN", "OBSESSIVELY COMPOSED"],
    quote: { text: "ARCHITECTURE OF FEELING", source: "IFFR" }
  },
  {
    id: 6,
    year: "2024",
    category: "LYRICAL DOCUMENTARY",
    title: "WHERE LIGHT BREAKS",
    director: "INGRID HALLE",
    image: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/e534354d-c5f2-4399-a1d9-2f50338e8c47_1600w.jpg",
    awards: ["CANNES DIRECTORS FORTNIGHT", "ART CINEMA AWARD", "A PRAYER OF A FILM", "BEST CINEMATOGRAPHY"],
    quote: { text: "A PRAYER OF A FILM", source: "CANNES" }
  }
];

// State
let currentIndex = 0;
let isScrolling = false;
let scrollStartY = 0;
let scrollStartTime = 0;

// DOM Elements
const filmStrip = document.getElementById('filmStrip');
const navDots = document.querySelectorAll('.nav-dot');
const infoPanel = document.getElementById('infoPanel');

// Create star SVG
function createStarSVG() {
  return `<svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`;
}

// Initialize film cards with corner layout
function initFilmCards() {
  
  filmStrip.innerHTML = films.map((film, index) => `
    <div class="film-card-wrapper">
      <div class="film-card" data-index="${index % films.length}">
        <div class="film-card-image">
          <img src="${film.image}" alt="${film.title}" loading="eager">
        </div>
        <div class="film-card-overlay"></div>
        
        <div class="film-card-content">
          <!-- Üst Sol: Yıl ve Kaynak -->
          <div class="card-corner top-left">
            <span class="card-year">${film.year}</span>
            <span class="card-source">${film.quote.source}</span>
            <div class="award-badge">
                <span class="badge-text">Award-Winning Reel</span>
                <div class="stars">${createStarSVG().repeat(5)}</div>
            </div>
          </div>

          <!-- Üst Sağ: Ödül Detayları -->
          <div class="card-corner top-right">
             ${film.awards.slice(0, 3).map(award => `
                <div class="award-item">
                    <div class="stars">${createStarSVG().repeat(5)}</div>
                    <span class="award-category">${award}</span>
                </div>
             `).join('')}
          </div>

          <!-- Alt Sol: Ana Başlık ve Künye -->
          <div class="card-corner bottom-left">
            <span class="card-category-label">${film.category}</span>
            <h2 class="film-card-title">${film.title}</h2>
            <div class="card-credits">
                <div class="credit-item">
                    <span class="label">DIRECTOR</span>
                    <span class="value">${film.director}</span>
                </div>
                <div class="credit-item">
                    <span class="label">CATEGORY</span>
                    <span class="value">${film.category}</span>
                </div>
            </div>
          </div>

          <!-- Alt Sağ: Explore Butonu -->
          <div class="card-corner bottom-right">
            <button class="explore-btn-cinematic">
                EXPLORE <span class="arrow">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

// Update info panel (if exists)
function updateInfoPanel(film) {
  if (!infoPanel) return;
  
  const yearEl = infoPanel.querySelector('.info-year');
  const categoryEl = infoPanel.querySelector('.info-category');
  const titleEl = infoPanel.querySelector('.info-title');
  const directorLabelEl = infoPanel.querySelector('.info-director-label');
  const directorEl = infoPanel.querySelector('.info-director');
  const categoryLabelEl = infoPanel.querySelector('.info-category-label');
  const categoryTextEl = infoPanel.querySelector('.info-category-text');
  const starsEl = infoPanel.querySelector('.stars');
  const awardsListEl = infoPanel.querySelector('.awards-list');
  const quoteEl = infoPanel.querySelector('.info-quote');
  
  if (yearEl) yearEl.textContent = film.year;
  if (categoryEl) categoryEl.textContent = film.category;
  if (titleEl) titleEl.textContent = film.title;
  if (directorLabelEl) directorLabelEl.textContent = 'DIRECTOR';
  if (directorEl) directorEl.textContent = film.director;
  if (categoryLabelEl) categoryLabelEl.textContent = 'CATEGORY';
  if (categoryTextEl) categoryTextEl.textContent = film.category;
  if (starsEl) starsEl.innerHTML = createStarSVG().repeat(5);
  if (awardsListEl) awardsListEl.innerHTML = film.awards.map(award => `
    <span class="award-tag">${award}</span>
  `).join('');
  if (quoteEl) quoteEl.innerHTML = `
    <p class="info-quote-text">"${film.quote.text}"</p>
    <p class="info-quote-source">— ${film.quote.source}</p>
  `;
}

// Calculate scroll position based on fixed card height
function getScrollPositionForIndex(index) {
  const viewportHeight = window.innerHeight;
  const cardTotalHeight = (viewportHeight * 0.8) + (viewportHeight * 0.05); // 80dvh + 5dvh
  return (index % films.length) * cardTotalHeight;
}

// Navigate to film
function navigateToFilm(index, smooth = true) {
  currentIndex = index;
  
  // Update nav dots
  navDots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
  
  // Update info panel
  updateInfoPanel(films[index]);
  if (infoPanel) infoPanel.classList.add('visible');
  
  // Scroll to position
  const scrollPosition = getScrollPositionForIndex(index);
  window.scrollTo({
    top: scrollPosition,
    behavior: smooth ? 'smooth' : 'auto'
  });
}

// State for velocity tracking
let lastScrollTop = 0;
let velocity = 0;

// Handle scroll with cinematic effects
function handleScroll() {
  
  // Scroll başlayınca indicator gizle
  document.body.classList.add('scrolling');
  clearTimeout(window.scrollTimeout);
  window.scrollTimeout = setTimeout(() => {
    document.body.classList.remove('scrolling');
  }, 1000);
  
  const scrollTop = window.scrollY;
  const viewportHeight = window.innerHeight;
  
  // 1. Velocity Calculation (for effect intensity)
  velocity = scrollTop - lastScrollTop;
  lastScrollTop = scrollTop;

  const cardHeight = viewportHeight * 0.8;
  const gap = viewportHeight * 0.05;
  const cardTotalHeight = cardHeight + gap;
  
  // Hangi kartın aktif olduğunu bul (0.5 ekliyoruz ki kart yarıyı geçince aktifleşsin)
  const rawPosition = scrollTop / cardTotalHeight;
  const totalCards = getPageCardCount();
  const newIndex = Math.floor(rawPosition + 0.5) % totalCards;
  
  if (newIndex !== currentIndex) {
    currentIndex = newIndex;
    
    // Update nav dots
    navDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
    
    // Update scroll progress bar
    updateScrollProgress(currentIndex);
    
    // Update info panel (if exists and on index page)
    const path = window.location.pathname;
    const isIndex = path.includes('index.html') || path === '/' || path.endsWith('index.html');
    if (infoPanel && isIndex && films) {
      updateInfoPanel(films[currentIndex]);
      infoPanel.classList.add('visible');
    }
  }
  
  // 2. SİNEMATİK EFEKT UYGULAMA (Kamera Filmi Mantığı)
  const cards = document.querySelectorAll('.film-card-wrapper');
  
  cards.forEach((card, index) => {
    const rect = card.getBoundingClientRect();
    const centerOffset = (rect.top + rect.height / 2) - (viewportHeight / 2);
    const normalizedOffset = centerOffset / viewportHeight; // -0.5 ile 0.5 arası

    const img = card.querySelector('.film-card-image img');
    const content = card.querySelector('.film-card-content');

    // Görsel Paralaks: Resim içeride ters yöne kayar
    if (img) {
      img.style.transform = `translate3d(-50%, ${normalizedOffset * 50}px, 0) scale(1.1)`;
    }

    // İçerik Gecikmesi ve Opaklık: Yazılar resimden farklı hızda hareket eder
    if (content) {
      content.style.transform = `translate3d(0, ${normalizedOffset * -30}px, 0)`;
      content.style.opacity = 1 - Math.abs(normalizedOffset) * 1.5;
    }
  });

  // Ana şeridi kaydır
  filmStrip.style.transform = `translate3d(0, -${scrollTop}px, 0)`;
}

// Nav dots click handlers
function initNavDots() {
  navDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      const totalCards = getPageCardCount();
      navigateToFilm(index % totalCards);
    });
  });
}

// Initialize
function init() {
  const filmStrip = document.getElementById('filmStrip');
  
  // Skip slider logic on pages without the film strip
  if (!filmStrip) return;
  
  const path = window.location.pathname;
  const isIndex = path.includes('index.html') || path === '/' || path.endsWith('index.html');
  
  // 1. Ana sayfadaysak kartları dinamik oluştur
  if (isIndex) {
    initFilmCards();
  }
  
  initNavDots();

  // 2. Sayfa yüksekliğini mevcut kart sayısına göre hesapla
  setTimeout(() => {
    const viewportHeight = window.innerHeight;
    const cardHeight = viewportHeight * 0.8;
    const gap = viewportHeight * 0.05;
    const cardTotalHeight = cardHeight + gap;

    const actualCards = document.querySelectorAll('.film-card-wrapper');
    const totalCardsCount = actualCards.length;
    
    const totalHeight = (totalCardsCount * cardTotalHeight) + (viewportHeight - cardTotalHeight);

    document.body.style.height = totalHeight + 'px';
    console.log('Body height:', totalHeight, 'cards:', totalCardsCount, 'isIndex:', isIndex);
  }, 100);

  window.addEventListener('scroll', handleScroll, { passive: true });
  setTimeout(handleScroll, 200);
}

// Start
document.addEventListener('DOMContentLoaded', init);

// Stat Counter Animation
function animateStats() {
  const stats = document.querySelectorAll('.stat-item');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const statItem = entry.target;
        const targetValue = parseInt(statItem.dataset.value);
        const statNumber = statItem.querySelector('.stat-number');
        const hasPlus = statNumber.textContent.includes('+');
        
        let current = 0;
        const duration = 2000;
        const step = targetValue / (duration / 16);
        
        const timer = setInterval(() => {
          current += step;
          if (current >= targetValue) {
            current = targetValue;
            clearInterval(timer);
          }
          statNumber.textContent = Math.floor(current) + (hasPlus ? '+' : '');
        }, 16);
        
        observer.unobserve(statItem);
      }
    });
  }, { threshold: 0.5 });
  
  stats.forEach(stat => observer.observe(stat));
}

// Initialize stats animation on page load
setTimeout(animateStats, 500);

// ========== SCROLL PROGRESS BAR ==========
function getPageCardCount() {
  const path = window.location.pathname;
  
  // Index page - 6 films
  if (path.includes('index.html') || path === '/' || path.endsWith('index.html')) {
    return films ? films.length : 6;
  }
  // Contact page - 4 cards
  if (path.includes('contact.html')) {
    return 4;
  }
  // About and other pages - 6 cards
  return 6;
}

function updateScrollProgress(index) {
  const progressFill = document.getElementById('scrollProgressFill');
  const progressText = document.getElementById('scrollProgressText');
  const totalCards = getPageCardCount();
  
  if (progressFill && progressText) {
    const percentage = ((index + 1) / totalCards) * 100;
    progressFill.style.width = percentage + '%';
    progressText.textContent = String(index + 1).padStart(2, '0') + ' / ' + String(totalCards).padStart(2, '0');
  }
}

// Initialize progress bar on load
function initProgressBar() {
  const progressFill = document.getElementById('scrollProgressFill');
  const progressText = document.getElementById('scrollProgressText');
  const totalCards = getPageCardCount();
  
  if (progressFill && progressText) {
    const percentage = ((currentIndex + 1) / totalCards) * 100;
    progressFill.style.width = percentage + '%';
    progressText.textContent = String(currentIndex + 1).padStart(2, '0') + ' / ' + String(totalCards).padStart(2, '0');
  }
}

// ========== KEYBOARD NAVIGATION ==========
function initKeyboardNav() {
  document.addEventListener('keydown', (e) => {
    // Only handle arrow keys for card navigation
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === 'PageDown') {
      e.preventDefault();
      const path = window.location.pathname;
      const isIndex = path.includes('index.html') || path === '/' || path.endsWith('index.html');
      if (isIndex && films.length > 0) {
        navigateToFilm((currentIndex + 1) % films.length);
      }
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'PageUp') {
      e.preventDefault();
      const path = window.location.pathname;
      const isIndex = path.includes('index.html') || path === '/' || path.endsWith('index.html');
      if (isIndex && films.length > 0) {
        navigateToFilm((currentIndex - 1 + films.length) % films.length);
      }
    } else if (e.key === 'Home') {
      e.preventDefault();
      const path = window.location.pathname;
      const isIndex = path.includes('index.html') || path === '/' || path.endsWith('index.html');
      if (isIndex) {
        navigateToFilm(0);
      }
    } else if (e.key === 'End') {
      e.preventDefault();
      const path = window.location.pathname;
      const isIndex = path.includes('index.html') || path === '/' || path.endsWith('index.html');
      if (isIndex && films.length > 0) {
        navigateToFilm(films.length - 1);
      }
    }
  });
}

// ========== TOUCH GESTURES ==========
function initTouchGestures() {
  let touchStartY = 0;
  let touchStartTime = 0;
  
  document.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
    touchStartTime = Date.now();
  }, { passive: true });
  
  document.addEventListener('touchend', (e) => {
    const path = window.location.pathname;
    const isIndex = path.includes('index.html') || path === '/' || path.endsWith('index.html');
    
    if (!isIndex || films.length === 0) return;
    
    const touchEndY = e.changedTouches[0].clientY;
    const touchEndTime = Date.now();
    const diffY = touchStartY - touchEndY;
    const diffTime = touchEndTime - touchStartTime;
    
    // Minimum swipe distance: 50px
    // Velocity check: swipe must be fast enough (less than 300ms)
    if (Math.abs(diffY) > 50 && diffTime < 300) {
      // Swipe speed check - faster = more responsive
      const velocity = Math.abs(diffY) / diffTime;
      
      if (velocity > 0.3) { // Minimum velocity threshold
        if (diffY > 0) {
          // Swipe up - next card
          navigateToFilm((currentIndex + 1) % films.length);
        } else {
          // Swipe down - previous card
          navigateToFilm((currentIndex - 1 + films.length) % films.length);
        }
      }
    }
  }, { passive: true });
}

// ========== IMAGE PRELOADING ==========
function initImagePreload() {
  function preloadImages(index) {
    if (!films.length) return;
    
    const nextIndex = (index + 1) % films.length;
    const prevIndex = (index - 1 + films.length) % films.length;
    
    [nextIndex, prevIndex].forEach(i => {
      if (films[i] && films[i].image) {
        const img = new Image();
        img.src = films[i].image;
      }
    });
  }
  
  // Preload on init
  setTimeout(() => preloadImages(0), 1000);
  
  // Preload on index change
  const originalNavigate = navigateToFilm;
  navigateToFilm = function(index, smooth) {
    originalNavigate(index, smooth);
    setTimeout(() => preloadImages(index), 500);
  };
}

// Initialize all improvements
setTimeout(() => {
  initProgressBar();
  initKeyboardNav();
  initTouchGestures();
  initImagePreload();
}, 200);