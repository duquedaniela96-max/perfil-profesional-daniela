const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;
const themeIcon = document.querySelector('.theme-icon');
const filterButtons = document.querySelectorAll('.filter-button');
const projectCards = document.querySelectorAll('.project-card');
const emailButton = document.querySelector('.email-button');
const copyFeedback = document.querySelector('.copy-feedback');
const contactForm = document.querySelector('#contact-form');
const formFeedback = document.querySelector('.form-feedback');
const navLinks = document.querySelectorAll('.nav-link');

if (localStorage.getItem('daniela-theme') === 'dark') {
  body.classList.add('dark-mode');
  themeIcon.textContent = '◑';
}

themeToggle.addEventListener('click', () => {
  const isDark = body.classList.toggle('dark-mode');
  themeIcon.textContent = isDark ? '◑' : '◐';
  localStorage.setItem('daniela-theme', isDark ? 'dark' : 'light');
});

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((item) => item.classList.remove('is-selected'));
    button.classList.add('is-selected');
    const filter = button.dataset.filter;
    projectCards.forEach((card) => {
      card.classList.toggle('is-hidden', filter !== 'todos' && card.dataset.category !== filter);
    });
  });
});

emailButton.addEventListener('click', async () => {
  const email = emailButton.dataset.email;
  try {
    await navigator.clipboard.writeText(email);
    copyFeedback.textContent = 'Email copiado al portapapeles.';
  } catch {
    copyFeedback.textContent = `Escríbeme a ${email}`;
  }
  setTimeout(() => { copyFeedback.textContent = ''; }, 3000);
});

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.querySelector('#name').value.trim();
  formFeedback.textContent = `Gracias, ${name}. Tu mensaje está listo para enviar.`;
  contactForm.reset();
  setTimeout(() => { formFeedback.textContent = ''; }, 5000);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('is-visible');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navLinks.forEach((link) => link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`));
    }
  });
}, { rootMargin: '-35% 0px -55% 0px' });

document.querySelectorAll('section[id]').forEach((section) => sectionObserver.observe(section));
