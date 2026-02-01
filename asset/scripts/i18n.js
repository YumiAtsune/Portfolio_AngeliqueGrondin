// ========================================
// SYSTÈME DE GESTION DES TRADUCTIONS (i18n)
// ========================================

class I18n {
  constructor() {
    this.currentLang = this.getSavedLanguage() || 'fr';
    this.translations = translations || {};
    this.init();
  }

  // Initialisation du système de traduction
  init() {
    this.translatePage();
    this.setupLanguageSelector();
    this.updateLanguageSelector();
  }

  // Récupération de la langue sauvegardée
  getSavedLanguage() {
    return localStorage.getItem('preferredLanguage') || this.detectBrowserLanguage();
  }

  // Détection de la langue du navigateur
  detectBrowserLanguage() {
    const browserLang = navigator.language || navigator.userLanguage;
    const langCode = browserLang.split('-')[0].toLowerCase();
    
    // Vérifier si la langue est supportée
    const supportedLangs = ['fr', 'en', 'es', 'it', 'ru', 'zh', 'ja'];
    return supportedLangs.includes(langCode) ? langCode : 'fr';
  }

  // Sauvegarde de la langue
  saveLanguage(lang) {
    localStorage.setItem('preferredLanguage', lang);
    this.currentLang = lang;
  }

  // Obtenir une traduction par chemin (ex: "nav.about")
  t(path) {
    const keys = path.split('.');
    let value = this.translations[this.currentLang];
    
    for (const key of keys) {
      if (value && typeof value === 'object') {
        value = value[key];
      } else {
        return path; // Retourner le chemin si la traduction n'existe pas
      }
    }
    
    return value || path;
  }

  // Traduire tous les éléments avec data-i18n
  translatePage() {
    // Traduire les éléments avec data-i18n
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      const translation = this.t(key);
      
      if (translation) {
        element.textContent = translation;
      }
    });

    // Traduire les placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
      const key = element.getAttribute('data-i18n-placeholder');
      const translation = this.t(key);
      
      if (translation) {
        element.placeholder = translation;
      }
    });

    // Traduire les attributs title
    document.querySelectorAll('[data-i18n-title]').forEach(element => {
      const key = element.getAttribute('data-i18n-title');
      const translation = this.t(key);
      
      if (translation) {
        element.title = translation;
      }
    });

    // Traduire les attributs aria-label
    document.querySelectorAll('[data-i18n-aria]').forEach(element => {
      const key = element.getAttribute('data-i18n-aria');
      const translation = this.t(key);
      
      if (translation) {
        element.setAttribute('aria-label', translation);
      }
    });
  }

  // Changer la langue
  changeLanguage(lang) {
    if (this.translations[lang]) {
      this.saveLanguage(lang);
      this.translatePage();
      this.updateLanguageSelector();
      
      // Émettre un événement personnalisé pour notifier le changement de langue
      window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
      
      // Afficher une notification
      if (typeof showToast === 'function') {
        const langNames = {
          fr: 'Français',
          en: 'English',
          es: 'Español',
          it: 'Italiano',
          ru: 'Русский',
          zh: '中文',
          ja: '日本語'
        };
        showToast(`${langNames[lang]} ✓`);
      }
    }
  }

  // Créer et configurer le sélecteur de langue
  setupLanguageSelector() {
    const container = document.getElementById('languageSelector');
    if (!container) return;

    const languages = [
      { code: 'fr', name: 'Français', flag: '🇫🇷' },
      { code: 'en', name: 'English', flag: '🇬🇧' },
      { code: 'es', name: 'Español', flag: '🇪🇸' },
      { code: 'it', name: 'Italiano', flag: '🇮🇹' },
      { code: 'ru', name: 'Русский', flag: '🇷🇺' },
      { code: 'zh', name: '中文', flag: '🇨🇳' },
      { code: 'ja', name: '日本語', flag: '🇯🇵' }
    ];

    // Créer le bouton principal
    const button = document.createElement('button');
    button.className = 'theme-toggle lang-toggle';
    button.id = 'langToggleBtn';
    button.setAttribute('aria-label', 'Changer la langue');
    button.innerHTML = `<span class="lang-flag"></span> <span class="lang-code"></span>`;

    // Créer le menu déroulant
    const dropdown = document.createElement('div');
    dropdown.className = 'lang-dropdown';
    dropdown.id = 'langDropdown';

    languages.forEach(lang => {
      const option = document.createElement('button');
      option.className = 'lang-option';
      option.setAttribute('data-lang', lang.code);
      option.innerHTML = `<span class="lang-flag">${lang.flag}</span> <span class="lang-name">${lang.name}</span>`;
      option.addEventListener('click', () => {
        this.changeLanguage(lang.code);
        this.closeDropdown();
      });
      dropdown.appendChild(option);
    });

    container.appendChild(button);
    container.appendChild(dropdown);

    // Gérer l'ouverture/fermeture du dropdown
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleDropdown();
    });

    // Fermer le dropdown en cliquant ailleurs
    document.addEventListener('click', () => {
      this.closeDropdown();
    });

    // Empêcher la fermeture en cliquant dans le dropdown
    dropdown.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }

  // Mettre à jour l'affichage du sélecteur de langue
  updateLanguageSelector() {
    const button = document.getElementById('langToggleBtn');
    if (!button) return;

    const flags = {
      fr: '🇫🇷',
      en: '🇬🇧',
      es: '🇪🇸',
      it: '🇮🇹',
      ru: '🇷🇺',
      zh: '🇨🇳',
      ja: '🇯🇵'
    };

    const flagSpan = button.querySelector('.lang-flag');
    const codeSpan = button.querySelector('.lang-code');

    if (flagSpan) flagSpan.textContent = flags[this.currentLang] || '🌐';
    if (codeSpan) codeSpan.textContent = this.currentLang.toUpperCase();

    // Mettre à jour les options actives
    document.querySelectorAll('.lang-option').forEach(option => {
      const lang = option.getAttribute('data-lang');
      if (lang === this.currentLang) {
        option.classList.add('active');
      } else {
        option.classList.remove('active');
      }
    });
  }

  // Basculer le dropdown
  toggleDropdown() {
    const dropdown = document.getElementById('langDropdown');
    if (dropdown) {
      dropdown.classList.toggle('show');
    }
  }

  // Fermer le dropdown
  closeDropdown() {
    const dropdown = document.getElementById('langDropdown');
    if (dropdown) {
      dropdown.classList.remove('show');
    }
  }

  // Obtenir la langue actuelle
  getCurrentLanguage() {
    return this.currentLang;
  }

  // Obtenir toutes les langues supportées
  getSupportedLanguages() {
    return Object.keys(this.translations);
  }
}

// Initialisation automatique au chargement de la page
let i18n;

document.addEventListener('DOMContentLoaded', () => {
  i18n = new I18n();
});

// Export pour utilisation dans d'autres fichiers
if (typeof module !== 'undefined' && module.exports) {
  module.exports = I18n;
}
