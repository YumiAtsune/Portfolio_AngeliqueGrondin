// Fonctionnalités principales de l'application

// Neon toggle
let neonEnabled = true;
const toggleNeon = document.getElementById('toggleNeon');

if (toggleNeon) {
  const matrixCanvas = document.getElementById('matrix');
  const html = document.documentElement;
  
  toggleNeon.addEventListener('click', () => {
    neonEnabled = !neonEnabled;
    if (neonEnabled) {
      document.body.style.filter = 'none';
      if (matrixCanvas) {
        matrixCanvas.style.opacity = html.getAttribute('data-theme') === 'light' ? '.1' : '.35';
      }
      toggleNeon.innerHTML = 'Néon';
    } else {
      document.body.style.filter = 'brightness(1) saturate(1)';
      if (matrixCanvas) {
        matrixCanvas.style.opacity = '0';
      }
      toggleNeon.innerHTML = 'OFF';
    }
  });
}

// Search functionality
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');

if (searchBtn && searchInput) {
  searchBtn.addEventListener('click', performSearch);
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') performSearch();
  });
}

function performSearch() {
  const query = searchInput.value.toLowerCase();
  if (!query) return;

  document.querySelectorAll('mark.highlight').forEach(mark => {
    const parent = mark.parentNode;
    parent.replaceChild(document.createTextNode(mark.textContent), mark);
    parent.normalize();
  });

  if (query.length < 2) return;

  const main = document.querySelector('main');
  if (!main) return;

  const walker = document.createTreeWalker(
    main,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );

  const nodesToHighlight = [];
  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (node.textContent.toLowerCase().includes(query)) {
      nodesToHighlight.push(node);
    }
  }

  nodesToHighlight.forEach(node => {
    const parent = node.parentNode;
    if (parent.tagName === 'MARK') return;

    const regex = new RegExp(`(${query})`, 'gi');
    const html = node.textContent.replace(regex, '<mark class="highlight">$1</mark>');
    const temp = document.createElement('span');
    temp.innerHTML = html;
    
    while (temp.firstChild) {
      parent.insertBefore(temp.firstChild, node);
    }
    parent.removeChild(node);
  });

  const firstHighlight = document.querySelector('mark.highlight');
  if (firstHighlight) {
    firstHighlight.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    
    const payload = {
      name: document.getElementById('cf-name').value.trim(),
      email: document.getElementById('cf-email').value.trim(),
      message: document.getElementById('cf-message').value.trim(),
      consent: document.getElementById('cf-consent').checked
    };

    if (!payload.consent) {
      showToast('Veuillez accepter la politique de confidentialité');
      return;
    }

    try {
      const res = await fetch("https://formspree.io/f/movkwyqe", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (res.ok) {
        showToast('Merci ! Votre message a été envoyé.');
        e.target.reset();
      } else {
        showToast("Une erreur est survenue. Réessayez plus tard.");
      }
    } catch {
      showToast("Impossible d'envoyer le message (réseau).");
    }
  });
}

// Toast notification
function showToast(message) {
  const toast = document.getElementById("toast");
  if (toast) {
    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  }
}
