const filterBtns = document.querySelectorAll('.filter-btn');
const imageCards = document.querySelectorAll('.image-card');
const searchBox = document.getElementById('searchBox');
const themeToggle = document.getElementById('theme-toggle');
const lightbox = document.querySelector('.lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const lightboxCaption = document.querySelector('.lightbox-caption');
const closeBtn = document.querySelector('.close');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');
const images = document.querySelectorAll('.image-card img');
let currentIndex = 0;

// --- Filter buttons ---
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelector('.filter-btn.active').classList.remove('active');
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    imageCards.forEach(card => {
      card.style.display = (filter === 'all' || card.dataset.category === filter) ? 'block' : 'none';
    });
  });
});

// --- Search ---
searchBox.addEventListener('keyup', () => {
  const q = searchBox.value.toLowerCase();
  imageCards.forEach(card => {
    const text = card.querySelector('.caption').textContent.toLowerCase();
    card.style.display = text.includes(q) ? 'block' : 'none';
  });
});

// --- Dark mode ---
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  themeToggle.textContent = document.body.classList.contains('dark') ? '☀️ Light Mode' : '🌙 Dark Mode';
});

// --- Lightbox open ---
images.forEach((img, i) => {
  img.addEventListener('click', () => {
    lightbox.style.display = 'flex';
    currentIndex = i;
    showImage();
  });
});

function showImage(direction = 'none') {
  lightboxImg.classList.remove('show', 'slide-left', 'slide-right');
  
  const newSrc = images[currentIndex].src;
  const newAlt = images[currentIndex].alt;
  
  // Small timeout to reset animations
  setTimeout(() => {
    lightboxImg.src = newSrc;
    lightboxCaption.textContent = newAlt;
    lightboxImg.classList.add('show');
    
    if (direction === 'next') {
      lightboxImg.classList.add('slide-right');
    } else if (direction === 'prev') {
      lightboxImg.classList.add('slide-left');
    }
  }, 100);
}

// --- Lightbox controls ---
closeBtn.addEventListener('click', () => lightbox.style.display = 'none');

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % images.length;
  showImage('next');
});

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showImage('prev');
});

// --- Keyboard navigation ---
document.addEventListener('keydown', (e) => {
  if (lightbox.style.display === 'flex') {
    if (e.key === 'ArrowRight') {
      currentIndex = (currentIndex + 1) % images.length;
      showImage('next');
    } else if (e.key === 'ArrowLeft') {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      showImage('prev');
    } else if (e.key === 'Escape') {
      lightbox.style.display = 'none';
    }
  }
});



