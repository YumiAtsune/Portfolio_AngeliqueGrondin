// ========================================
// CHATBOT INTELLIGENT MULTILINGUE
// ========================================

class SmartChatbot {
  constructor() {
    this.currentPage = this.detectCurrentPage();
    this.conversationHistory = [];
    this.isOpen = false;
    this.currentLang = localStorage.getItem('preferredLanguage') || 'fr';
    this.init();
  }

  // Détecter la page actuelle
  detectCurrentPage() {
    const path = window.location.pathname;
    
    if (path.includes('analyse-risques-ftth')) return 'ftth';
    if (path.includes('supervision-reseau')) return 'supervision';
    if (path.includes('monitoring-taaf')) return 'taaf';
    if (path.includes('infrastructure-wifi')) return 'wifi';
    if (path.includes('audit-securite')) return 'audit';
    if (path.includes('app-parking')) return 'parking';
    
    return 'home';
  }

  // Initialisation du chatbot
  init() {
    this.createChatbotUI();
    this.setupEventListeners();
    this.loadConversationHistory();
  }

  // Créer l'interface du chatbot
  createChatbotUI() {
    // Avatar 3D container
    const avatarContainer = document.createElement('div');
    avatarContainer.id = 'avatarContainer';
    avatarContainer.innerHTML = `
      <div id="avatarPulse"></div>
      <canvas id="avatar3D"></canvas>
      <div id="avatarLabel">
        <span class="avatar-icon">🤖</span>
        <span class="avatar-text" data-i18n="chatbot.help_text">Besoin d'aide ?</span>
      </div>
    `;

    // Chat container
    const chatContainer = document.createElement('div');
    chatContainer.id = 'chatContainer';
    chatContainer.className = 'chat-hidden';
    chatContainer.innerHTML = `
      <div class="chat-header">
        <div class="chat-header-info">
          <div class="chat-avatar-mini">
            <div class="avatar-status online"></div>
          </div>
          <div>
            <h4>Assistant IA</h4>
            <small data-i18n="chatbot.status_online">En ligne</small>
          </div>
        </div>
        <button class="chat-close-btn" aria-label="Fermer le chat">✕</button>
      </div>
      
      <div class="chat-messages" id="chatMessages"></div>
      
      <div class="chat-suggestions" id="chatSuggestions"></div>
      
      <div class="chat-input-container">
        <textarea 
          id="chatInput" 
          placeholder="Posez-moi une question..." 
          data-i18n-placeholder="chatbot.placeholder"
          rows="1"></textarea>
        <button class="chat-send-btn" id="chatSendBtn" aria-label="Envoyer">
          ➤
        </button>
      </div>
    `;

    document.body.appendChild(avatarContainer);
    document.body.appendChild(chatContainer);

    // Initialiser l'avatar 3D
    this.init3DAvatar();
  }

  // Initialiser l'avatar 3D simple
  init3DAvatar() {
    const canvas = document.getElementById('avatar3D');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = 120;
    canvas.height = 120;

    let rotation = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Dessiner un avatar simple mais stylé
      ctx.save();
      ctx.translate(60, 60);
      ctx.rotate(rotation);
      
      // Cercle extérieur
      ctx.beginPath();
      ctx.arc(0, 0, 45, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(16, 185, 129, 0.1)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.6)';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Cercle intérieur
      ctx.beginPath();
      ctx.arc(0, 0, 35, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(16, 185, 129, 0.2)';
      ctx.fill();
      
      // Icône robot
      ctx.font = '40px Arial';
      ctx.fillStyle = '#10b981';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('🤖', 0, 0);
      
      ctx.restore();
      
      rotation += 0.01;
      requestAnimationFrame(animate);
    };

    animate();
  }

  // Configuration des événements
  setupEventListeners() {
    const avatarContainer = document.getElementById('avatarContainer');
    const chatContainer = document.getElementById('chatContainer');
    const closeBtn = chatContainer.querySelector('.chat-close-btn');
    const sendBtn = document.getElementById('chatSendBtn');
    const input = document.getElementById('chatInput');

    // Ouvrir le chat
    avatarContainer.addEventListener('click', () => this.toggleChat());

    // Fermer le chat
    closeBtn.addEventListener('click', () => this.toggleChat());

    // Envoyer un message
    sendBtn.addEventListener('click', () => this.sendMessage());
    
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.sendMessage();
      }
    });

    // Auto-resize textarea
    input.addEventListener('input', (e) => {
      e.target.style.height = 'auto';
      e.target.style.height = Math.min(e.target.scrollHeight, 100) + 'px';
    });

    // Écouter les changements de langue
    window.addEventListener('languageChanged', (e) => {
      this.currentLang = e.detail.lang;
      this.updateChatTranslations();
    });
  }

  // Basculer le chat
  toggleChat() {
    this.isOpen = !this.isOpen;
    const chatContainer = document.getElementById('chatContainer');
    const avatarContainer = document.getElementById('avatarContainer');

    if (this.isOpen) {
      chatContainer.classList.remove('chat-hidden');
      chatContainer.classList.add('chat-visible');
      avatarContainer.classList.add('avatar-minimized');
      
      // Afficher le message de bienvenue si premier message
      if (this.conversationHistory.length === 0) {
        this.showWelcomeMessage();
      }
    } else {
      chatContainer.classList.remove('chat-visible');
      chatContainer.classList.add('chat-hidden');
      avatarContainer.classList.remove('avatar-minimized');
    }
  }

  // Afficher le message de bienvenue
  showWelcomeMessage() {
    const welcomeMessage = this.getContextualWelcome();
    this.addMessage(welcomeMessage, 'bot');
    this.showSuggestions();
  }

  // Obtenir un message de bienvenue contextuel
  getContextualWelcome() {
    const welcomeMessages = {
      fr: {
        home: "Bonjour ! 👋 Je suis l'assistant virtuel d'Angélique. Je peux vous aider à naviguer dans son portfolio, répondre à vos questions sur ses projets de cybersécurité, ou vous rediriger vers les bonnes sections.",
        ftth: "Bienvenue sur le projet d'Analyse de Risques FTTH ! 🔒 Je peux répondre à vos questions sur la méthodologie EBIOS RM, les risques identifiés, ou les mesures de sécurité recommandées.",
        supervision: "Bienvenue sur le projet de Supervision Réseau ! 📊 Je peux vous expliquer l'architecture avec Centreon, GLPI et Wazuh, ou les défis techniques rencontrés.",
        taaf: "Bienvenue sur le projet Monitoring TAAF ! 🌍 Je peux vous parler de la stack d'observabilité avec Falco et Wazuh, ou de la gestion du projet.",
        wifi: "Bienvenue sur le projet Infrastructure WiFi ! 📡 Je peux vous renseigner sur le déploiement dans les zones isolées de La Réunion.",
        audit: "Bienvenue sur le projet Audit de Sécurité ! 🔓 Je peux vous détailler l'exploitation de la CVE-2008-1930 ou les recommandations de remédiation.",
        parking: "Bienvenue sur l'Application Parking ! 🅿️ Je peux vous expliquer le système de détection de fraude ou l'architecture sécurisée."
      },
      en: {
        home: "Hello! 👋 I'm Angélique's virtual assistant. I can help you navigate her portfolio, answer questions about her cybersecurity projects, or redirect you to the right sections.",
        ftth: "Welcome to the FTTH Risk Analysis project! 🔒 I can answer your questions about EBIOS RM methodology, identified risks, or recommended security measures.",
        supervision: "Welcome to the Network Monitoring project! 📊 I can explain the architecture with Centreon, GLPI and Wazuh, or the technical challenges encountered.",
        taaf: "Welcome to the TAAF Monitoring project! 🌍 I can tell you about the observability stack with Falco and Wazuh, or project management.",
        wifi: "Welcome to the WiFi Infrastructure project! 📡 I can inform you about deployment in isolated areas of La Réunion.",
        audit: "Welcome to the Security Audit project! 🔓 I can detail the exploitation of CVE-2008-1930 or remediation recommendations.",
        parking: "Welcome to the Parking Application! 🅿️ I can explain the fraud detection system or secure architecture."
      },
      es: {
        home: "¡Hola! 👋 Soy el asistente virtual de Angélique. Puedo ayudarte a navegar por su portafolio, responder preguntas sobre sus proyectos de ciberseguridad o redirigirte a las secciones correctas.",
        ftth: "¡Bienvenido al proyecto de Análisis de Riesgos FTTH! 🔒 Puedo responder tus preguntas sobre la metodología EBIOS RM, los riesgos identificados o las medidas de seguridad recomendadas.",
        supervision: "¡Bienvenido al proyecto de Supervisión de Red! 📊 Puedo explicarte la arquitectura con Centreon, GLPI y Wazuh, o los desafíos técnicos encontrados.",
        taaf: "¡Bienvenido al proyecto de Monitoreo TAAF! 🌍 Puedo hablarte sobre el stack de observabilidad con Falco y Wazuh, o la gestión del proyecto.",
        wifi: "¡Bienvenido al proyecto de Infraestructura WiFi! 📡 Puedo informarte sobre el despliegue en zonas aisladas de La Réunion.",
        audit: "¡Bienvenido al proyecto de Auditoría de Seguridad! 🔓 Puedo detallar la explotación del CVE-2008-1930 o las recomendaciones de remediación.",
        parking: "¡Bienvenido a la Aplicación de Estacionamiento! 🅿️ Puedo explicar el sistema de detección de fraude o la arquitectura segura."
      },
      it: {
        home: "Ciao! 👋 Sono l'assistente virtuale di Angélique. Posso aiutarti a navigare nel suo portfolio, rispondere alle domande sui suoi progetti di cybersicurezza o reindirizzarti alle sezioni giuste.",
        ftth: "Benvenuto nel progetto di Analisi dei Rischi FTTH! 🔒 Posso rispondere alle tue domande sulla metodologia EBIOS RM, i rischi identificati o le misure di sicurezza raccomandate.",
        supervision: "Benvenuto nel progetto di Supervisione della Rete! 📊 Posso spiegare l'architettura con Centreon, GLPI e Wazuh, o le sfide tecniche incontrate.",
        taaf: "Benvenuto nel progetto di Monitoraggio TAAF! 🌍 Posso parlarti dello stack di osservabilità con Falco e Wazuh, o della gestione del progetto.",
        wifi: "Benvenuto nel progetto Infrastruttura WiFi! 📡 Posso informarti sul dispiegamento nelle zone isolate di La Réunion.",
        audit: "Benvenuto nel progetto di Audit di Sicurezza! 🔓 Posso dettagliare lo sfruttamento del CVE-2008-1930 o le raccomandazioni di rimedio.",
        parking: "Benvenuto nell'Applicazione Parcheggio! 🅿️ Posso spiegare il sistema di rilevamento frodi o l'architettura sicura."
      },
      ru: {
        home: "Привет! 👋 Я виртуальный помощник Анжелики. Я могу помочь вам ориентироваться в её портфолио, ответить на вопросы о её проектах по кибербезопасности или перенаправить вас в нужные разделы.",
        ftth: "Добро пожаловать в проект Анализа Рисков FTTH! 🔒 Я могу ответить на ваши вопросы о методологии EBIOS RM, выявленных рисках или рекомендуемых мерах безопасности.",
        supervision: "Добро пожаловать в проект Мониторинга Сети! 📊 Я могу объяснить архитектуру с Centreon, GLPI и Wazuh, или технические проблемы.",
        taaf: "Добро пожаловать в проект Мониторинга TAAF! 🌍 Я могу рассказать о стеке наблюдаемости с Falco и Wazuh, или управлении проектом.",
        wifi: "Добро пожаловать в проект Инфраструктуры WiFi! 📡 Я могу рассказать о развертывании в изолированных районах Ла Реюньон.",
        audit: "Добро пожаловать в проект Аудита Безопасности! 🔓 Я могу детализировать эксплуатацию CVE-2008-1930 или рекомендации по устранению.",
        parking: "Добро пожаловать в Приложение Парковки! 🅿️ Я могу объяснить систему обнаружения мошенничества или безопасную архитектуру."
      },
      zh: {
        home: "你好！👋 我是Angélique的虚拟助手。我可以帮助您浏览她的作品集，回答有关她的网络安全项目的问题，或将您重定向到正确的部分。",
        ftth: "欢迎来到FTTH风险分析项目！🔒 我可以回答您关于EBIOS RM方法论、已识别风险或推荐安全措施的问题。",
        supervision: "欢迎来到网络监控项目！📊 我可以解释Centreon、GLPI和Wazuh的架构，或遇到的技术挑战。",
        taaf: "欢迎来到TAAF监控项目！🌍 我可以告诉您有关Falco和Wazuh的可观察性堆栈或项目管理的信息。",
        wifi: "欢迎来到WiFi基础设施项目！📡 我可以告诉您在留尼汪岛偏远地区的部署情况。",
        audit: "欢迎来到安全审计项目！🔓 我可以详细说明CVE-2008-1930的利用或补救建议。",
        parking: "欢迎来到停车应用程序！🅿️ 我可以解释欺诈检测系统或安全架构。"
      },
      ja: {
        home: "こんにちは！👋 私はAngéliqueのバーチャルアシスタントです。彼女のポートフォリオのナビゲート、サイバーセキュリティプロジェクトに関する質問への回答、または適切なセクションへのリダイレクトをお手伝いできます。",
        ftth: "FTTHリスク分析プロジェクトへようこそ！🔒 EBIOS RM方法論、特定されたリスク、または推奨されるセキュリティ対策に関する質問にお答えできます。",
        supervision: "ネットワーク監視プロジェクトへようこそ！📊 Centreon、GLPI、Wazuhを使用したアーキテクチャ、または遭遇した技術的課題について説明できます。",
        taaf: "TAAF監視プロジェクトへようこそ！🌍 FalcoとWazuhを使用した観測可能性スタック、またはプロジェクト管理についてお話しできます。",
        wifi: "WiFiインフラプロジェクトへようこそ！📡 レユニオン島の孤立地域での展開についてご案内できます。",
        audit: "セキュリティ監査プロジェクトへようこそ！🔓 CVE-2008-1930の悪用または修復の推奨事項について詳しく説明できます。",
        parking: "駐車場アプリケーションへようこそ！🅿️ 不正検出システムまたはセキュアアーキテクチャについて説明できます。"
      }
    };

    const langMessages = welcomeMessages[this.currentLang] || welcomeMessages.fr;
    return langMessages[this.currentPage] || langMessages.home;
  }

  // Afficher les suggestions
  showSuggestions() {
    const suggestionsContainer = document.getElementById('chatSuggestions');
    suggestionsContainer.innerHTML = '';

    const suggestions = this.getContextualSuggestions();

    suggestions.forEach(suggestion => {
      const btn = document.createElement('button');
      btn.className = 'suggestion-btn';
      btn.textContent = suggestion;
      btn.addEventListener('click', () => {
        document.getElementById('chatInput').value = suggestion;
        this.sendMessage();
      });
      suggestionsContainer.appendChild(btn);
    });
  }

  // Obtenir des suggestions contextuelles
  getContextualSuggestions() {
    const suggestions = {
      fr: {
        home: [
          "Quels sont les projets ?",
          "Quelles compétences techniques ?",
          "Comment la contacter ?"
        ],
        ftth: [
          "Quelle méthodologie utilisée ?",
          "Quels risques identifiés ?",
          "Télécharger le rapport"
        ],
        supervision: [
          "Architecture de la solution ?",
          "Quels outils utilisés ?",
          "Défis techniques ?"
        ],
        taaf: [
          "Stack technologique ?",
          "Résultats du projet ?",
          "Gestion de projet ?"
        ],
        wifi: [
          "Contraintes du projet ?",
          "Mesures de sécurité ?",
          "Résultats obtenus ?"
        ],
        audit: [
          "Méthodologie d'audit ?",
          "Vulnérabilités découvertes ?",
          "Recommandations ?"
        ],
        parking: [
          "Système de fraude ?",
          "Architecture technique ?",
          "Technologies utilisées ?"
        ]
      },
      en: {
        home: [
          "What are the projects?",
          "What technical skills?",
          "How to contact her?"
        ],
        ftth: [
          "What methodology used?",
          "What risks identified?",
          "Download the report"
        ],
        supervision: [
          "Solution architecture?",
          "What tools used?",
          "Technical challenges?"
        ],
        taaf: [
          "Technology stack?",
          "Project results?",
          "Project management?"
        ],
        wifi: [
          "Project constraints?",
          "Security measures?",
          "Results obtained?"
        ],
        audit: [
          "Audit methodology?",
          "Discovered vulnerabilities?",
          "Recommendations?"
        ],
        parking: [
          "Fraud system?",
          "Technical architecture?",
          "Technologies used?"
        ]
      }
    };

    const langSuggestions = suggestions[this.currentLang] || suggestions.fr;
    return langSuggestions[this.currentPage] || langSuggestions.home;
  }

  // Ajouter un message
  addMessage(text, sender = 'bot') {
    const messagesContainer = document.getElementById('chatMessages');
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;

    if (sender === 'bot') {
      messageDiv.innerHTML = `
        <div class="message-avatar">🤖</div>
        <div class="message-content">${text}</div>
      `;
    } else {
      messageDiv.innerHTML = `
        <div class="message-content">${text}</div>
      `;
    }

    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Sauvegarder l'historique
    this.conversationHistory.push({ sender, text, timestamp: Date.now() });
    this.saveConversationHistory();
  }

  // Afficher l'indicateur de saisie
  showTypingIndicator() {
    const messagesContainer = document.getElementById('chatMessages');
    
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message typing-indicator';
    typingDiv.id = 'typingIndicator';
    typingDiv.innerHTML = `
      <div class="message-avatar">🤖</div>
      <div class="message-content">
        <div class="typing-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    `;

    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  // Masquer l'indicateur de saisie
  hideTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) {
      indicator.remove();
    }
  }

  // Envoyer un message
  async sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();

    if (!message) return;

    // Ajouter le message de l'utilisateur
    this.addMessage(message, 'user');
    input.value = '';
    input.style.height = 'auto';

    // Afficher l'indicateur de saisie
    this.showTypingIndicator();

    // Attendre un peu pour simuler la réflexion
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Obtenir la réponse
    const response = this.getResponse(message);

    // Masquer l'indicateur et afficher la réponse
    this.hideTypingIndicator();
    this.addMessage(response, 'bot');
  }

  // Obtenir une réponse intelligente
  getResponse(message) {
    const lowerMessage = message.toLowerCase();

    // Détection de la langue et réponses multilingues
    const responses = {
      fr: this.getFrenchResponses(),
      en: this.getEnglishResponses(),
      es: this.getSpanishResponses(),
      it: this.getItalianResponses(),
      ru: this.getRussianResponses(),
      zh: this.getChineseResponses(),
      ja: this.getJapaneseResponses()
    };

    const langResponses = responses[this.currentLang] || responses.fr;

    // Redirection vers d'autres projets
    if (lowerMessage.includes('projet') || lowerMessage.includes('project') || 
        lowerMessage.includes('другой') || lowerMessage.includes('其他') || 
        lowerMessage.includes('別の')) {
      return langResponses.otherProjects;
    }

    // Téléchargement du rapport
    if (lowerMessage.includes('télécharger') || lowerMessage.includes('download') || 
        lowerMessage.includes('descargar') || lowerMessage.includes('scaricare') ||
        lowerMessage.includes('скачать') || lowerMessage.includes('下载') ||
        lowerMessage.includes('ダウンロード')) {
      return langResponses.download;
    }

    // Réponses spécifiques à la page
    const pageResponses = langResponses[this.currentPage];
    if (pageResponses) {
      for (const [key, response] of Object.entries(pageResponses)) {
        if (lowerMessage.includes(key)) {
          return response;
        }
      }
    }

    // Réponse par défaut
    return langResponses.default;
  }

  // Réponses en français
  getFrenchResponses() {
    return {
      default: "Je suis là pour vous aider ! Pouvez-vous reformuler votre question ou choisir une des suggestions ci-dessous ?",
      otherProjects: "Vous pouvez consulter tous les projets d'Angélique en cliquant sur le bouton '← Retour aux projets' en bas de la page, ou en retournant à la page d'accueil du portfolio.",
      download: "Vous trouverez un bouton '📥 Télécharger le rapport' en haut de la page projet pour accéder au compte rendu complet au format PDF.",
      home: {
        compétence: "Angélique maîtrise plusieurs domaines : Pentesting, SIEM & Monitoring (Wazuh, Falco), Architecture sécurisée, Forensics, Réseaux (Cisco, pfSense), et Développement sécurisé (Python, Flask).",
        projet: "Les projets principaux incluent : Analyse de Risques FTTH (EBIOS RM), Supervision Réseau (Centreon/GLPI/Wazuh), Monitoring TAAF (Falco/Grafana), Infrastructure WiFi sécurisée, Audit de Sécurité, et Application Parking sécurisée.",
        contact: "Vous pouvez contacter Angélique via le formulaire de contact en bas de la page d'accueil, ou directement par email."
      },
      ftth: {
        ebios: "Le projet utilise la méthodologie EBIOS Risk Manager de l'ANSSI en 5 ateliers : Socle de sécurité, Sources de risques, Scénarios stratégiques, Scénarios opérationnels, et Traitement des risques.",
        risque: "Les risques majeurs identifiés incluent : Compromission des OLT (criticité ÉLEVÉE), Attaques DDoS (criticité ÉLEVÉE), Sabotage physique (criticité MOYENNE), et Interception de données (criticité MOYENNE).",
        mesure: "28 mesures de sécurité ont été définies, incluant le durcissement des équipements, le chiffrement, la segmentation réseau, le monitoring continu, et des procédures de réponse aux incidents."
      },
      supervision: {
        architecture: "La solution combine Centreon (monitoring infrastructure), GLPI (gestion d'incidents ITSM), et Wazuh (SIEM & sécurité) sur 3 VMs Debian avec intégrations bidirectionnelles.",
        outil: "Stack complète : Centreon, GLPI, Wazuh, Debian 11, MariaDB, PHP, Apache, SNMP, SSH, LDAP, Elasticsearch, Kibana, Python, Bash, APIs REST.",
        défi: "Défis techniques : Authentification MySQL, connectivité SNMP, agents Wazuh déconnectés, rate limiting API GLPI. Tous résolus avec des solutions documentées."
      },
      taaf: {
        stack: "Stack d'observabilité DockerISée : Grafana Loki (logs), Prometheus (métriques), Falco IDS, Wazuh SIEM, Grafana Alloy (agent), orchestré avec Docker Compose.",
        résultat: "Résultats : Temps de détection < 2 min, 12 vulnérabilités critiques détectées, visibilité 100%, 0 non-conformité critique à l'audit ANSSI.",
        gestion: "Projet géré en 4 phases sur 12 semaines : Analyse & Conception, Déploiement Infrastructure, Configuration SIEM, Dashboards & Documentation."
      },
      wifi: {
        contrainte: "Contraintes : Relief montagneux, climat tropical (cyclones, humidité), zones isolées, accès publics non sécurisés. Solutions : APs outdoor, liaisons PtP, mesh network, panneaux solaires.",
        sécurité: "Sécurité : WPA3-Enterprise avec RADIUS, isolation clients, VLANs séparés, portail captif conforme LCEN, monitoring UniFi, durcissement (désactivation WPS).",
        résultat: "Résultats : Couverture 98%, débit moyen 80 Mbps, ~300 utilisateurs/jour, uptime 99.5%, 0 incident de sécurité, conformité RGPD/LCEN."
      },
      audit: {
        méthodologie: "Méthodologie en 5 phases : Reconnaissance (Nmap), Scan de vulnérabilités (Nikto, OpenVAS), Exploitation (CVE-2008-1930), Post-exploitation, Reporting complet (68 pages).",
        vulnérabilité: "Vulnérabilités découvertes : CVE-2008-1930 RCE Joomla (CVSS 9.8), mots de passe faibles, injection SQL, directory listing activé.",
        recommandation: "Recommandations : Mise à jour Joomla 4.x, politique mots de passe forts + MFA, WAF ModSecurity, hardening Apache, IDS/IPS Suricata, migration HTTPS TLS 1.3."
      },
      parking: {
        fraude: "Système de détection de fraude en temps réel : Vérification unicité QR codes, analyse comportementale, validation géographique, alerting automatique, blocage préventif.",
        architecture: "API REST Python/Flask, authentification JWT, PostgreSQL avec ORM SQLAlchemy, QR codes signés HMAC-SHA256, RBAC avec 4 rôles, rate limiting.",
        technologie: "Stack : Python, Flask, PostgreSQL, SQLAlchemy, JWT, Bcrypt, AES-256, HMAC-SHA256, Docker, Nginx, Pytest."
      }
    };
  }

  // Réponses en anglais (version simplifiée - à compléter)
  getEnglishResponses() {
    return {
      default: "I'm here to help! Can you rephrase your question or choose one of the suggestions below?",
      otherProjects: "You can view all of Angélique's projects by clicking the '← Back to projects' button at the bottom of the page, or by returning to the portfolio homepage.",
      download: "You'll find a '📥 Download report' button at the top of the project page to access the complete PDF report.",
      home: {},
      ftth: {},
      supervision: {},
      taaf: {},
      wifi: {},
      audit: {},
      parking: {}
    };
  }

  // Réponses en espagnol (version simplifiée)
  getSpanishResponses() {
    return {
      default: "¡Estoy aquí para ayudar! ¿Puedes reformular tu pregunta o elegir una de las sugerencias a continuación?",
      otherProjects: "Puedes consultar todos los proyectos de Angélique haciendo clic en el botón '← Volver a proyectos' en la parte inferior de la página, o volviendo a la página de inicio del portafolio.",
      download: "Encontrarás un botón '📥 Descargar informe' en la parte superior de la página del proyecto para acceder al informe completo en PDF.",
      home: {},
      ftth: {},
      supervision: {},
      taaf: {},
      wifi: {},
      audit: {},
      parking: {}
    };
  }

  // Méthodes similaires pour IT, RU, ZH, JA (versions simplifiées)
  getItalianResponses() { return this.getEnglishResponses(); }
  getRussianResponses() { return this.getEnglishResponses(); }
  getChineseResponses() { return this.getEnglishResponses(); }
  getJapaneseResponses() { return this.getEnglishResponses(); }

  // Mettre à jour les traductions du chat
  updateChatTranslations() {
    // Mettre à jour le placeholder
    const input = document.getElementById('chatInput');
    if (input && i18n) {
      input.placeholder = i18n.t('chatbot.placeholder');
    }

    // Mettre à jour le statut
    const statusText = document.querySelector('.chat-header small');
    if (statusText && i18n) {
      statusText.textContent = i18n.t('chatbot.status_online');
    }

    // Mettre à jour le label de l'avatar
    const helpText = document.querySelector('.avatar-text');
    if (helpText && i18n) {
      helpText.textContent = i18n.t('chatbot.help_text');
    }
  }

  // Sauvegarder l'historique
  saveConversationHistory() {
    try {
      localStorage.setItem('chatHistory', JSON.stringify(this.conversationHistory));
    } catch (e) {
      console.error('Error saving conversation history:', e);
    }
  }

  // Charger l'historique
  loadConversationHistory() {
    try {
      const history = localStorage.getItem('chatHistory');
      if (history) {
        this.conversationHistory = JSON.parse(history);
        
        // Restaurer les messages dans l'interface
        const messagesContainer = document.getElementById('chatMessages');
        if (messagesContainer && this.conversationHistory.length > 0) {
          this.conversationHistory.forEach(msg => {
            this.addMessage(msg.text, msg.sender);
          });
        }
      }
    } catch (e) {
      console.error('Error loading conversation history:', e);
    }
  }
}

// Initialiser le chatbot au chargement
document.addEventListener('DOMContentLoaded', () => {
  window.smartChatbot = new SmartChatbot();
});
