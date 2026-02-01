// ========================================
// AVATAR 3D + CHATBOT INTELLIGENT
// ========================================

class AvatarChatbot {
  constructor() {
    this.isOpen = false;
    this.isTyping = false;
    this.conversationHistory = [];
    this.init();
  }

  init() {
    this.createAvatarContainer();
    this.createChatInterface();
    this.create3DAvatar();
    this.setupEventListeners();
    this.initializeKnowledgeBase();
  }

  // ========================================
  // BASE DE CONNAISSANCES
  // ========================================
  initializeKnowledgeBase() {
    this.knowledgeBase = {
      // Informations personnelles
      profile: {
        name: "Angélique",
        age: "20ans",
        permis: "Permis B en cours de preparation",
        role: "Alternante Chargée d'affaires FTTH chez Orange",
        education: "3ème année BUT Réseaux & Télécoms (parcours cybersécurité) - IUT La Réunion",
        location: "Saint-Pierre, Réunion",
        availability: "Disponible en alternance et stage"
      },

      // Compétences techniques
      skills: {
        cybersecurity: ["Wazuh SIEM", "Falco IDS", "OPNsense", "EBIOS"],
        observability: ["Grafana", "Prometheus", "Loki", "Centreon"],
        networks: ["FTTH", "WiFi Infrastructure", "Network Monitoring", "SNMP"],
        development: ["SQL", "Docker", "Bash scripting"],
        tools: ["Git", "Linux", "Docker Compose", "Typst"]
      },

      // Projets principaux
      projects: {
        "monitoring taaf": "Stack d'observabilité complète avec Grafana, Loki, Prometheus pour les TAAF. SIEM avec Wazuh et Falco IDS. Détection d'incidents en moins de 2 minutes.",
        "supervision réseau": "Intégration Centreon + GLPI + Wazuh pour supervision réseau critique. Ticketing automatique et corrélation d'événements.",
        "analyse risques ftth": "Analyse de risques selon EBIOS Risk Manager pour infrastructure FTTH. 28 mesures de sécurité définies, ROI 18 mois.",
        "infrastructure wifi": "Déploiement WiFi sécurisé (WPA3-Enterprise) pour sites isolés à La Réunion. Couverture 98%, disponibilité 99.5%.",
        "app parking": "Application sécurisée avec détection de fraude, chiffrement AES-256, authentification JWT, RGPD compliant.",
        "audit sécurité": "Pentest complet avec exploitation CVE-2008-1930. Rapport d'audit 68 pages, plan de remédiation."
      },

      // Expérience professionnelle
      experience: {
        orange: "Coordination chantiers FTTH, suivi fournisseurs, conformité qualité & sécurité, intégration d'indicateurs (SLA, MTTR). Mise en place de contrôles de sécurité.",
        academic: "Projets cybersécurité : SOC virtuel avec Wazuh, forensics réseau, pentesting, analyse malware, automatisation."
      },

      // Motivations et objectifs
      motivation: "Passionnée par la cybersécurité et les réseaux, je souhaite contribuer à la sécurisation des infrastructures critiques. Mon expérience en FTTH chez Orange m'a permis de comprendre les enjeux terrain, tandis que mes projets académiques m'ont formée aux aspects techniques de la sécurité.",

      // Qualités professionnelles
      qualities: ["Rigueur", "Esprit d'équipe", "Autonomie", "Capacité d'analyse", "Communication", "Résolution de problèmes"]
    };
  }

  // ========================================
  // CRÉATION CONTENEUR AVATAR
  // ========================================
  createAvatarContainer() {
    const container = document.createElement('div');
    container.id = 'avatarContainer';
    container.innerHTML = `
      <div id="avatar3D"></div>
      <div id="avatarPulse"></div>
      <div id="avatarLabel">
        <span class="avatar-icon">💬</span>
        <span class="avatar-text">Posez-moi vos questions !</span>
      </div>
    `;
    document.body.appendChild(container);
  }

  // ========================================
  // CRÉATION INTERFACE CHAT
  // ========================================
  createChatInterface() {
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
            <h4>Angélique - Assistant Virtuel</h4>
            <small>Étudiante en Cybersécurité</small>
          </div>
        </div>
        <button id="closeChat" class="chat-close-btn" aria-label="Fermer le chat">✕</button>
      </div>
      <div id="chatMessages" class="chat-messages">
        <div class="message bot-message">
          <div class="message-avatar">🤖</div>
          <div class="message-content">
            <p>Bonjour ! Je suis l'assistant virtuel d'Angélique. 👋</p>
            <p>Je peux répondre à vos questions sur :</p>
            <ul>
              <li> Son parcours et ses compétences</li>
              <li> Son expérience professionnelle</li>
              <li> Ses projets en cybersécurité</li>
              <li> Sa disponibilité et ses motivations</li>
            </ul>
            <p>N'hésitez pas à me poser vos questions !</p>
          </div>
        </div>
      </div>
      <div class="chat-suggestions" id="chatSuggestions">
        <button class="suggestion-btn" data-question="Parle-moi de ton parcours"> Parcours</button>
        <button class="suggestion-btn" data-question="Quelles sont tes compétences techniques ?"> Compétences</button>
        <button class="suggestion-btn" data-question="Présente-moi tes projets"> Projets</button>
        <button class="suggestion-btn" data-question="Quelle est ta disponibilité ?"> Disponibilité</button>
      </div>
      <div class="chat-input-container">
        <textarea 
          id="chatInput" 
          placeholder="Posez votre question..." 
          rows="1"
          maxlength="500"
        ></textarea>
        <button id="sendMessage" class="chat-send-btn" aria-label="Envoyer">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>
    `;
    document.body.appendChild(chatContainer);
  }

  // ========================================
  // CRÉATION AVATAR 3D STYLISÉ
  // ========================================
  create3DAvatar() {
    const container = document.getElementById('avatar3D');
    
    // Scene
    this.scene = new THREE.Scene();
    
    // Camera avec perspective pour style cartoon
    this.camera = new THREE.PerspectiveCamera(35, 1, 0.1, 1000);
    this.camera.position.set(0, 2, 10);
    this.camera.lookAt(0, 1.5, 0);
    
    // Renderer avec antialiasing pour des bords lisses
    this.renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true 
    });
    this.renderer.setSize(120, 120);
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.shadowMap.enabled = true;
    container.appendChild(this.renderer.domElement);
    
    // Lumières pour style cartoon
    const ambient = new THREE.AmbientLight(0xffffff, 0.8);
    this.scene.add(ambient);
    
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
    keyLight.position.set(5, 8, 5);
    this.scene.add(keyLight);
    
    const fillLight = new THREE.DirectionalLight(0xadd8e6, 0.4);
    fillLight.position.set(-5, 3, 5);
    this.scene.add(fillLight);
    
    const rimLight = new THREE.PointLight(0x10b981, 0.8, 50);
    rimLight.position.set(0, 5, -5);
    this.scene.add(rimLight);
    
    // Création du personnage stylisé
    this.createCharacter();
    
    // Animation loop
    this.animate();
  }

  createCharacter() {
    // Groupe principal pour le personnage (style chibi)
    this.character = new THREE.Group();
    this.scene.add(this.character);
    
    // === TÊTE (proportions chibi - grosse tête) ===
    const headGeometry = new THREE.SphereGeometry(1, 32, 32);
    const skinMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xffe0bd,  // Teint clair/pêche
      shininess: 20,
      flatShading: false
    });
    this.head = new THREE.Mesh(headGeometry, skinMaterial);
    this.head.position.y = 1.8;
    this.head.scale.set(1, 1.1, 0.95); // Légèrement allongé
    this.character.add(this.head);
    
    // === CHEVEUX COURTS GRIS/BLANCS FLUIDES ===
    // Calotte principale (cheveux courts)
    const hairTopGeometry = new THREE.SphereGeometry(1.08, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.65);
    const hairMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xa8b3c7,  // Gris-bleu clair (comme la photo)
      shininess: 60,
      flatShading: false
    });
    this.hairTop = new THREE.Mesh(hairTopGeometry, hairMaterial);
    this.hairTop.position.y = 2.1;
    this.hairTop.scale.set(1, 0.9, 1);
    this.character.add(this.hairTop);
    
    // Mèches volumineuses sur les côtés (gauche)
    const sideHairGeometry = new THREE.SphereGeometry(0.35, 16, 16);
    const leftSideHair = new THREE.Mesh(sideHairGeometry, hairMaterial);
    leftSideHair.position.set(-0.85, 1.9, 0.3);
    leftSideHair.scale.set(1, 1.3, 0.8);
    this.character.add(leftSideHair);
    
    // Mèches volumineuses (droite)
    const rightSideHair = new THREE.Mesh(sideHairGeometry, hairMaterial);
    rightSideHair.position.set(0.85, 1.9, 0.3);
    rightSideHair.scale.set(1, 1.3, 0.8);
    this.character.add(rightSideHair);
    
    // Mèches avant (frange fluide)
    const bangGeometry = new THREE.SphereGeometry(0.3, 16, 16);
    
    const bang1 = new THREE.Mesh(bangGeometry, hairMaterial);
    bang1.position.set(-0.35, 2.15, 0.85);
    bang1.scale.set(0.8, 1.2, 0.6);
    this.character.add(bang1);
    
    const bang2 = new THREE.Mesh(bangGeometry, hairMaterial);
    bang2.position.set(0, 2.2, 0.9);
    bang2.scale.set(0.9, 1.3, 0.6);
    this.character.add(bang2);
    
    const bang3 = new THREE.Mesh(bangGeometry, hairMaterial);
    bang3.position.set(0.35, 2.15, 0.85);
    bang3.scale.set(0.8, 1.2, 0.6);
    this.character.add(bang3);
    
    // Arrière des cheveux (volume)
    const backHairGeometry = new THREE.SphereGeometry(0.4, 16, 16);
    const backHair = new THREE.Mesh(backHairGeometry, hairMaterial);
    backHair.position.set(0, 1.9, -0.85);
    backHair.scale.set(1.2, 1, 1);
    this.character.add(backHair);
    
    // === LUNETTES RONDES (style comme la photo) ===
    const glassFrameGeometry = new THREE.TorusGeometry(0.28, 0.04, 16, 32);
    const glassMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x1a1a1a,  // Noir
      shininess: 100
    });
    
    // Monture gauche
    this.leftGlassFrame = new THREE.Mesh(glassFrameGeometry, glassMaterial);
    this.leftGlassFrame.position.set(-0.38, 1.85, 0.88);
    this.character.add(this.leftGlassFrame);
    
    // Monture droite
    this.rightGlassFrame = new THREE.Mesh(glassFrameGeometry, glassMaterial);
    this.rightGlassFrame.position.set(0.38, 1.85, 0.88);
    this.character.add(this.rightGlassFrame);
    
    // Pont des lunettes
    const bridgeGeometry = new THREE.CylinderGeometry(0.025, 0.025, 0.2, 8);
    const bridge = new THREE.Mesh(bridgeGeometry, glassMaterial);
    bridge.rotation.z = Math.PI / 2;
    bridge.position.set(0, 1.85, 0.88);
    this.character.add(bridge);
    
    // Branches des lunettes
    const templeGeometry = new THREE.CylinderGeometry(0.025, 0.025, 0.6, 8);
    
    const leftTemple = new THREE.Mesh(templeGeometry, glassMaterial);
    leftTemple.rotation.z = Math.PI / 2;
    leftTemple.position.set(-0.65, 1.85, 0.7);
    this.character.add(leftTemple);
    
    const rightTemple = new THREE.Mesh(templeGeometry, glassMaterial);
    rightTemple.rotation.z = Math.PI / 2;
    rightTemple.position.set(0.65, 1.85, 0.7);
    this.character.add(rightTemple);
    
    // Verres des lunettes (transparents avec reflet)
    const lensGeometry = new THREE.CircleGeometry(0.28, 32);
    const lensMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xadd8e6,
      transparent: true,
      opacity: 0.25,
      shininess: 100,
      side: THREE.DoubleSide
    });
    
    const leftLens = new THREE.Mesh(lensGeometry, lensMaterial);
    leftLens.position.set(-0.38, 1.85, 0.89);
    this.character.add(leftLens);
    
    const rightLens = new THREE.Mesh(lensGeometry, lensMaterial);
    rightLens.position.set(0.38, 1.85, 0.89);
    this.character.add(rightLens);
    
    // === YEUX STYLE CARTOON (grands yeux) ===
    // Blanc des yeux
    const eyeWhiteGeometry = new THREE.SphereGeometry(0.22, 16, 16);
    const eyeWhiteMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xffffff,
      shininess: 30
    });
    
    this.leftEyeWhite = new THREE.Mesh(eyeWhiteGeometry, eyeWhiteMaterial);
    this.leftEyeWhite.position.set(-0.38, 1.82, 0.8);
    this.leftEyeWhite.scale.set(1, 1.1, 0.5);
    this.character.add(this.leftEyeWhite);
    
    this.rightEyeWhite = new THREE.Mesh(eyeWhiteGeometry, eyeWhiteMaterial);
    this.rightEyeWhite.position.set(0.38, 1.82, 0.8);
    this.rightEyeWhite.scale.set(1, 1.1, 0.5);
    this.character.add(this.rightEyeWhite);
    
    // Iris (marron/noisette)
    const irisGeometry = new THREE.SphereGeometry(0.13, 16, 16);
    const irisMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x5d4e37,
      shininess: 50
    });
    
    this.leftIris = new THREE.Mesh(irisGeometry, irisMaterial);
    this.leftIris.position.set(-0.38, 1.82, 0.95);
    this.character.add(this.leftIris);
    
    this.rightIris = new THREE.Mesh(irisGeometry, irisMaterial);
    this.rightIris.position.set(0.38, 1.82, 0.95);
    this.character.add(this.rightIris);
    
    // Pupilles
    const pupilGeometry = new THREE.SphereGeometry(0.08, 12, 12);
    const pupilMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    
    this.leftPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
    this.leftPupil.position.set(-0.38, 1.82, 1.02);
    this.character.add(this.leftPupil);
    
    this.rightPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
    this.rightPupil.position.set(0.38, 1.82, 1.02);
    this.character.add(this.rightPupil);
    
    // Reflets brillants dans les yeux
    const highlightGeometry = new THREE.SphereGeometry(0.05, 8, 8);
    const highlightMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xffffff,
      transparent: true,
      opacity: 0.9
    });
    
    const leftHighlight1 = new THREE.Mesh(highlightGeometry, highlightMaterial);
    leftHighlight1.position.set(-0.42, 1.88, 1.05);
    this.character.add(leftHighlight1);
    
    const leftHighlight2 = new THREE.Mesh(highlightGeometry, highlightMaterial);
    leftHighlight2.position.set(-0.32, 1.78, 1.05);
    leftHighlight2.scale.set(0.6, 0.6, 0.6);
    this.character.add(leftHighlight2);
    
    const rightHighlight1 = new THREE.Mesh(highlightGeometry, highlightMaterial);
    rightHighlight1.position.set(0.34, 1.88, 1.05);
    this.character.add(rightHighlight1);
    
    const rightHighlight2 = new THREE.Mesh(highlightGeometry, highlightMaterial);
    rightHighlight2.position.set(0.44, 1.78, 1.05);
    rightHighlight2.scale.set(0.6, 0.6, 0.6);
    this.character.add(rightHighlight2);
    
    // === SOURCILS ===
    const eyebrowGeometry = new THREE.BoxGeometry(0.35, 0.06, 0.05);
    const eyebrowMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x8a9099  // Gris assorti aux cheveux
    });
    
    this.leftEyebrow = new THREE.Mesh(eyebrowGeometry, eyebrowMaterial);
    this.leftEyebrow.position.set(-0.38, 2.12, 0.92);
    this.leftEyebrow.rotation.z = 0.1;
    this.character.add(this.leftEyebrow);
    
    this.rightEyebrow = new THREE.Mesh(eyebrowGeometry, eyebrowMaterial);
    this.rightEyebrow.position.set(0.38, 2.12, 0.92);
    this.rightEyebrow.rotation.z = -0.1;
    this.character.add(this.rightEyebrow);
    
    // === NEZ (petit et discret) ===
    const noseGeometry = new THREE.SphereGeometry(0.1, 12, 12);
    const noseMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xffcba4,
      shininess: 10
    });
    this.nose = new THREE.Mesh(noseGeometry, noseMaterial);
    this.nose.position.set(0, 1.65, 0.95);
    this.nose.scale.set(0.8, 0.8, 0.6);
    this.character.add(this.nose);
    
    // === BOUCHE (sourire doux) ===
    const mouthCurve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(-0.15, 0, 0),
      new THREE.Vector3(0, -0.08, 0),
      new THREE.Vector3(0.15, 0, 0)
    );
    const mouthPoints = mouthCurve.getPoints(20);
    const mouthGeometry = new THREE.BufferGeometry().setFromPoints(mouthPoints);
    const mouthMaterial = new THREE.LineBasicMaterial({ 
      color: 0xd97777,
      linewidth: 3
    });
    this.mouth = new THREE.Line(mouthGeometry, mouthMaterial);
    this.mouth.position.set(0, 1.48, 0.93);
    this.character.add(this.mouth);
    
    // === COU ===
    const neckGeometry = new THREE.CylinderGeometry(0.28, 0.32, 0.35, 16);
    this.neck = new THREE.Mesh(neckGeometry, skinMaterial);
    this.neck.position.y = 0.92;
    this.character.add(this.neck);
    
    // === CORPS (T-shirt gris foncé) ===
    const bodyGeometry = new THREE.SphereGeometry(0.65, 16, 16);
    const shirtMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x4a4e54,  // Gris anthracite
      shininess: 10
    });
    this.body = new THREE.Mesh(bodyGeometry, shirtMaterial);
    this.body.position.y = 0.45;
    this.body.scale.set(1, 1.2, 0.9);
    this.character.add(this.body);
    
    // === BRAS (style chibi - courts) ===
    const armGeometry = new THREE.CylinderGeometry(0.12, 0.1, 0.6, 12);
    
    this.leftArm = new THREE.Mesh(armGeometry, shirtMaterial);
    this.leftArm.position.set(-0.65, 0.35, 0);
    this.leftArm.rotation.z = 0.4;
    this.character.add(this.leftArm);
    
    this.rightArm = new THREE.Mesh(armGeometry, shirtMaterial);
    this.rightArm.position.set(0.65, 0.35, 0);
    this.rightArm.rotation.z = -0.4;
    this.character.add(this.rightArm);
    
    // Mains
    const handGeometry = new THREE.SphereGeometry(0.13, 12, 12);
    const handMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xffe0bd,
      shininess: 20
    });
    
    this.leftHand = new THREE.Mesh(handGeometry, handMaterial);
    this.leftHand.position.set(-0.85, 0.05, 0.15);
    this.character.add(this.leftHand);
    
    this.rightHand = new THREE.Mesh(handGeometry, handMaterial);
    this.rightHand.position.set(0.85, 0.05, 0.15);
    this.character.add(this.rightHand);
    
    // === EFFET GLOW CYBER (discret) ===
    const glowGeometry = new THREE.SphereGeometry(1.15, 16, 16);
    const glowMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x10b981,
      wireframe: true,
      transparent: true,
      opacity: 0.12
    });
    this.wireframe = new THREE.Mesh(glowGeometry, glowMaterial);
    this.wireframe.position.y = 1.8;
    this.character.add(this.wireframe);
    
    // Positionner le personnage (style chibi - plus bas)
    this.character.position.y = -0.2;
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    
    const time = Date.now() * 0.001;
    
    // Rotation douce du personnage entier (style chibi)
    if (this.character) {
      this.character.rotation.y = Math.sin(time * 0.35) * 0.2;
      
      // Légère oscillation verticale (respiration)
      this.character.position.y = -0.2 + Math.sin(time * 1.8) * 0.04;
    }
    
    // Rotation du wireframe glow
    if (this.wireframe) {
      this.wireframe.rotation.y += 0.008;
      this.wireframe.rotation.x = Math.sin(time * 0.5) * 0.1;
    }
    
    // Clignotement des yeux
    const blinkTiming = Math.sin(time * 2.8);
    if (blinkTiming > 0.98) {
      // Cligner tous les éléments des yeux
      if (this.leftEyeWhite) this.leftEyeWhite.scale.y = 0.1;
      if (this.rightEyeWhite) this.rightEyeWhite.scale.y = 0.1;
      if (this.leftIris) this.leftIris.scale.y = 0.1;
      if (this.rightIris) this.rightIris.scale.y = 0.1;
      if (this.leftPupil) this.leftPupil.scale.y = 0.1;
      if (this.rightPupil) this.rightPupil.scale.y = 0.1;
    } else {
      if (this.leftEyeWhite) this.leftEyeWhite.scale.y = 1;
      if (this.rightEyeWhite) this.rightEyeWhite.scale.y = 1;
      if (this.leftIris) this.leftIris.scale.y = 1;
      if (this.rightIris) this.rightIris.scale.y = 1;
      if (this.leftPupil) this.leftPupil.scale.y = 1;
      if (this.rightPupil) this.rightPupil.scale.y = 1;
    }
    
    // Animation des sourcils (expressions)
    if (this.leftEyebrow && this.rightEyebrow) {
      this.leftEyebrow.rotation.z = 0.1 + Math.sin(time * 0.7) * 0.04;
      this.rightEyebrow.rotation.z = -0.1 - Math.sin(time * 0.7) * 0.04;
    }
    
    // Légère rotation de la tête
    if (this.head) {
      this.head.rotation.x = Math.sin(time * 0.9) * 0.03;
      this.head.rotation.z = Math.cos(time * 0.6) * 0.025;
    }
    
    // Animation de la bouche quand le bot parle
    if (this.isTyping && this.mouth) {
      this.mouth.position.y = 1.48 + Math.sin(time * 12) * 0.015;
      this.mouth.scale.y = 1 + Math.sin(time * 12) * 0.25;
    } else if (this.mouth) {
      this.mouth.position.y = 1.48;
      this.mouth.scale.y = 1;
    }
    
    // Mouvement subtil des bras
    if (this.leftArm) {
      this.leftArm.rotation.z = 0.4 + Math.sin(time * 1.3) * 0.06;
    }
    if (this.rightArm) {
      this.rightArm.rotation.z = -0.4 - Math.sin(time * 1.3) * 0.06;
    }
    
    // Mouvement des mains
    if (this.leftHand) {
      this.leftHand.rotation.z = Math.sin(time * 1.5) * 0.1;
    }
    if (this.rightHand) {
      this.rightHand.rotation.z = -Math.sin(time * 1.5) * 0.1;
    }
    
    // Légère animation des cheveux (simulation de mouvement)
    if (this.hairTop) {
      this.hairTop.rotation.x = Math.sin(time * 0.8) * 0.02;
    }
    
    // Animation subtile des lunettes avec la tête
    if (this.leftGlassFrame && this.rightGlassFrame && this.head) {
      const headRotation = this.head.rotation;
      this.leftGlassFrame.rotation.x = headRotation.x * 0.5;
      this.rightGlassFrame.rotation.x = headRotation.x * 0.5;
    }
    
    this.renderer.render(this.scene, this.camera);
  }

  // ========================================
  // EVENT LISTENERS
  // ========================================
  setupEventListeners() {
    // Ouvrir/fermer le chat
    document.getElementById('avatarContainer').addEventListener('click', () => {
      this.toggleChat();
    });
    
    document.getElementById('closeChat').addEventListener('click', () => {
      this.toggleChat();
    });
    
    // Envoyer message
    document.getElementById('sendMessage').addEventListener('click', () => {
      this.sendMessage();
    });
    
    document.getElementById('chatInput').addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.sendMessage();
      }
    });
    
    // Auto-resize textarea
    document.getElementById('chatInput').addEventListener('input', (e) => {
      e.target.style.height = 'auto';
      e.target.style.height = Math.min(e.target.scrollHeight, 100) + 'px';
    });
    
    // Suggestions
    document.querySelectorAll('.suggestion-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const question = btn.getAttribute('data-question');
        document.getElementById('chatInput').value = question;
        this.sendMessage();
      });
    });
  }

  // ========================================
  // TOGGLE CHAT
  // ========================================
  toggleChat() {
    this.isOpen = !this.isOpen;
    const chatContainer = document.getElementById('chatContainer');
    const avatarContainer = document.getElementById('avatarContainer');
    
    if (this.isOpen) {
      chatContainer.classList.remove('chat-hidden');
      chatContainer.classList.add('chat-visible');
      avatarContainer.classList.add('avatar-minimized');
      document.getElementById('chatInput').focus();
    } else {
      chatContainer.classList.remove('chat-visible');
      chatContainer.classList.add('chat-hidden');
      avatarContainer.classList.remove('avatar-minimized');
    }
  }

  // ========================================
  // ENVOI MESSAGE
  // ========================================
  async sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Ajouter message utilisateur
    this.addMessage(message, 'user');
    input.value = '';
    input.style.height = 'auto';
    
    // Masquer suggestions après premier message
    document.getElementById('chatSuggestions').style.display = 'none';
    
    // Réponse du bot
    await this.generateResponse(message);
  }

  // ========================================
  // GÉNÉRATION RÉPONSE
  // ========================================
  async generateResponse(userMessage) {
    this.isTyping = true;
    this.showTypingIndicator();
    
    // Attendre un peu pour simuler la réflexion
    await this.delay(1000);
    
    const response = this.getSmartResponse(userMessage.toLowerCase());
    
    this.hideTypingIndicator();
    this.addMessage(response, 'bot');
    this.isTyping = false;
  }

  getSmartResponse(message) {
    const kb = this.knowledgeBase;
    
    // Détection d'intention par mots-clés
    if (this.matchKeywords(message, ['parcours', 'formation', 'études', 'diplôme', 'iut'])) {
      return `Je suis actuellement en <strong>3ème année de BUT Réseaux & Télécommunications</strong> avec une spécialisation en <strong>cybersécurité</strong> à l'IUT de La Réunion.<br><br>
              Mon parcours m'a permis d'acquérir des compétences solides en :<br>
              • Sécurité des systèmes et réseaux<br>
              • Monitoring et observabilité<br>
              • Infrastructures FTTH<br>
              • Gestion de projets techniques`;
    }
    
    if (this.matchKeywords(message, ['compétences', 'skills', 'savoir-faire', 'technologies', 'maîtrise'])) {
      return `Mes <strong>compétences techniques</strong> incluent :<br><br>
              <strong>🔐 Cybersécurité :</strong> Wazuh SIEM, Falco IDS, OPNsense, Pentest, EBIOS Risk Manager<br><br>
              <strong>📊 Observabilité :</strong> Grafana, Prometheus, Loki, Centreon<br><br>
              <strong>🌐 Réseaux :</strong> FTTH, WiFi, Network Monitoring, SNMP<br><br>
              <strong>💻 Développement :</strong> Python, SQL, Docker, Bash, API REST`;
    }
    
    if (this.matchKeywords(message, ['projets', 'réalisations', 'expérience projet'])) {
      return `Voici mes <strong>principaux projets</strong> :<br><br>
              <strong>1. Monitoring TAAF</strong> - Stack d'observabilité avec SIEM (Wazuh + Falco)<br>
              <strong>2. Supervision Réseau</strong> - Intégration Centreon + GLPI + Wazuh<br>
              <strong>3. Analyse Risques FTTH</strong> - Méthode EBIOS Risk Manager<br>
              <strong>4. Infrastructure WiFi</strong> - Déploiement sécurisé zones isolées<br>
              <strong>5. App Parking</strong> - Backend sécurisé avec détection fraude<br>
              <strong>6. Audit Sécurité</strong> - Pentest & exploitation CVE-2008-1930<br><br>
              Vous pouvez consulter les détails de chaque projet dans mon portfolio !`;
    }
    
    if (this.matchKeywords(message, ['orange', 'alternance', 'ftth', 'entreprise', 'travail'])) {
      return `Je travaille actuellement chez <strong>Orange</strong> en tant que <strong>Chargée d'affaires FTTH</strong>.<br><br>
              Mes missions incluent :<br>
              • Coordination des chantiers de déploiement fibre<br>
              • Suivi des fournisseurs et sous-traitants<br>
              • Conformité qualité et sécurité<br>
              • Intégration d'indicateurs (SLA, MTTR)<br>
              • Mise en place de contrôles de sécurité<br><br>
              Cette expérience me permet d'allier compétences techniques et gestion de projet !`;
    }
    
    if (this.matchKeywords(message, ['disponibilité', 'disponible', 'stage', 'embauche', 'recrutement'])) {
      return `Je suis actuellement <strong>en alternance chez Orange</strong> et serai <strong>disponible</strong> pour :<br><br>
              • Un stage de fin d'études (à partir de 2025)<br>
              • Une alternance en cybersécurité/réseaux<br>
              • Un CDI après validation de mon diplôme<br><br>
              Je suis particulièrement intéressée par les postes liés à la <strong>sécurité des infrastructures</strong>, 
              le <strong>SIEM</strong>, et la <strong>gestion de projets techniques</strong>.`;
    }
    
    if (this.matchKeywords(message, ['motivation', 'pourquoi', 'intérêt', 'passion'])) {
      return `${kb.motivation}<br><br>
              Mes <strong>qualités professionnelles</strong> : ${kb.qualities.join(', ')}.`;
    }
    
    if (this.matchKeywords(message, ['contact', 'joindre', 'email', 'linkedin', 'rencontrer'])) {
      return `Vous pouvez me contacter via :<br><br>
              📧 <strong>Email :</strong> Utilisez le formulaire de contact sur cette page<br>
              💼 <strong>LinkedIn :</strong> Consultez le lien dans le footer<br>
              📄 <strong>CV :</strong> Téléchargeable sur la page d'accueil<br><br>
              Je serais ravie d'échanger avec vous sur vos opportunités !`;
    }
    
    if (this.matchKeywords(message, ['siem', 'wazuh', 'falco', 'monitoring'])) {
      return `Mon expertise en <strong>SIEM</strong> inclut :<br><br>
              • Déploiement et configuration <strong>Wazuh SIEM</strong><br>
              • Intégration <strong>Falco IDS</strong> pour runtime security<br>
              • Création de règles de détection personnalisées<br>
              • Corrélation d'événements multi-sources<br>
              • Dashboards Grafana pour visualisation<br>
              • Alerting multi-canaux avec escalade<br><br>
              J'ai notamment réduit le temps de détection d'incidents de &gt;2h à &lt;2min sur le projet TAAF !`;
    }
    
    // Réponse par défaut
    return `Merci pour votre question ! Je peux vous parler de :<br><br>
            • Mon <strong>parcours</strong> et ma <strong>formation</strong><br>
            • Mes <strong>compétences techniques</strong><br>
            • Mes <strong>projets</strong> en cybersécurité<br>
            • Mon expérience chez <strong>Orange</strong><br>
            • Ma <strong>disponibilité</strong> et mes <strong>motivations</strong><br><br>
            N'hésitez pas à reformuler ou à cliquer sur les suggestions ci-dessus !`;
  }

  matchKeywords(message, keywords) {
    return keywords.some(keyword => message.includes(keyword));
  }

  // ========================================
  // AFFICHAGE MESSAGES
  // ========================================
  addMessage(text, sender) {
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
  }

  showTypingIndicator() {
    const messagesContainer = document.getElementById('chatMessages');
    const typingDiv = document.createElement('div');
    typingDiv.id = 'typingIndicator';
    typingDiv.className = 'message bot-message';
    typingDiv.innerHTML = `
      <div class="message-avatar">🤖</div>
      <div class="message-content">
        <div class="typing-dots">
          <span></span><span></span><span></span>
        </div>
      </div>
    `;
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  hideTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) indicator.remove();
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Initialisation au chargement de la page avec réessais
let avatarChatbot;
let initAttempts = 0;
const maxAttempts = 10;

function initChatbot() {
  initAttempts++;
  
  if (typeof THREE !== 'undefined') {
    console.log('✅ Three.js détecté, initialisation du chatbot...');
    try {
      avatarChatbot = new AvatarChatbot();
      console.log('✅ Chatbot initialisé avec succès !');
    } catch (error) {
      console.error('❌ Erreur lors de l\'initialisation du chatbot:', error);
    }
  } else {
    if (initAttempts < maxAttempts) {
      console.log(`⏳ Three.js pas encore chargé. Tentative ${initAttempts}/${maxAttempts}...`);
      setTimeout(initChatbot, 500);
    } else {
      console.error('❌ Three.js n\'a pas pu être chargé après', maxAttempts, 'tentatives.');
      console.error('Vérifiez que le CDN Three.js est accessible.');
    }
  }
}

// Attendre que le DOM soit chargé
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initChatbot);
} else {
  // DOM déjà chargé
  initChatbot();
}
