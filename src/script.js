// Language Switching
const langToggle = document.getElementById('lang-toggle');
let currentLang = localStorage.getItem('language') || 'en';

function switchLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('language', lang);

  // Update toggle checkbox state
  langToggle.checked = lang === 'pt';

  // Update text content
  document.querySelectorAll('[data-en]').forEach(el => {
    if (el.dataset.en && el.dataset.pt) {
      el.textContent = lang === 'en' ? el.dataset.en : el.dataset.pt;
    }
  });

  // Update form placeholders
  document.querySelectorAll('[data-en-placeholder]').forEach(el => {
    el.placeholder = lang === 'en' ? el.dataset.enPlaceholder : el.dataset.ptPlaceholder;
  });

  // Update button text
  const submitBtn = document.querySelector('.contact-form .btn');
  if (submitBtn) {
    submitBtn.textContent = lang === 'en' ? submitBtn.dataset.en : submitBtn.dataset.pt;
  }
}

// Language toggle listener
langToggle.addEventListener('change', () => {
  switchLanguage(langToggle.checked ? 'pt' : 'en');
});

// Set initial language
switchLanguage(currentLang);

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });
}

// Close menu when a link is clicked
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
  });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      const target = document.querySelector(href);
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Apply observer to project cards and skill categories
document.querySelectorAll('.project-card, .skill-category, .highlight-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// Form submission handler
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const message = this.querySelector('textarea').value;

    // Create mailto link
    const mailtoLink = `mailto:filipesales2017@gmail.com?subject=New message from ${encodeURIComponent(name)}&body=${encodeURIComponent(message)}%0A%0AFrom: ${encodeURIComponent(email)}`;

    // Open email client or show success message
    window.location.href = mailtoLink;

    // Reset form
    this.reset();

    // Show success message
    const button = this.querySelector('.btn');
    const originalText = button.textContent;
    button.textContent = 'Message sent! ✨';
    button.style.background = 'linear-gradient(135deg, #10b981, #6ee7b7)';

    setTimeout(() => {
      button.textContent = originalText;
      button.style.background = '';
    }, 3000);
  });
}

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.style.boxShadow = '0 0 30px rgba(217, 70, 239, 0.3)';
  } else {
    navbar.style.boxShadow = 'none';
  }
});

// Add scroll indicator animation
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

  // Optional: Add scroll progress bar
  if (!document.querySelector('.scroll-progress-bar')) {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress-bar';
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      height: 3px;
      background: linear-gradient(90deg, #d946ef, #10b981);
      width: ${scrollPercent}%;
      z-index: 2000;
      transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
  } else {
    document.querySelector('.scroll-progress-bar').style.width = scrollPercent + '%';
  }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero');
  if (hero) {
    const scrollPosition = window.scrollY;
    hero.style.backgroundPosition = `0px ${scrollPosition * 0.5}px`;
  }
});

console.log('Portfolio loaded successfully! 🚀');
