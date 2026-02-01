# 🔐 Portfolio Cybersécurité - Angélique

Portfolio professionnel avec chatbot 3D interactif et support multilingue (7 langues).

## 🚀 Fonctionnalités

- 🤖 **Chatbot 3D intelligent** avec avatar stylisé (Three.js)
- 🌍 **Support multilingue** : FR, EN, ES, IT, RU, ZH, JA
- 🎨 **Mode sombre/clair** avec thème violet/émeraude
- ✨ **Effets néon** activables
- 🔍 **Recherche** dans le contenu
- 📱 **Responsive** design
- ♿ **Accessible** (ARIA, navigation clavier)

## 📁 Structure

```
portfolio/
├── index.html
├── styles/
│   ├── main.css
│   ├── chatbot.css
│   └── lang-selector.css
└── scripts/
    ├── animations.js
    ├── app.js
    ├── chatbot.js
    ├── i18n.js
    └── translations.js
```

## 🎯 Utilisation

1. Ouvrir `index.html` dans un navigateur moderne
2. Ou utiliser un serveur local :
   ```bash
   python -m http.server 8000
   # ou
   npx serve
   ```

## 🛠️ Technologies

- **Three.js r128** - Rendu 3D de l'avatar
- **Vanilla JavaScript** (ES6+)
- **CSS3** avec variables CSS
- **Canvas API** - Animations de fond

## 📝 Personnalisation

- **Traductions** : Éditer `scripts/translations.js`
- **Couleurs** : Variables CSS dans `styles/main.css`
- **Avatar** : Personnaliser dans `scripts/chatbot.js`

---

**© 2025 Angélique — Portfolio Cybersécurité**
