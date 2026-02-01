// ========================================
// FICHIER DE TRADUCTIONS
// ========================================

const translations = {
  fr: {
    // Navigation
    nav: {
      brand: "CYBER • PORTFOLIO",
      about: "À propos",
      skills: "Compétences",
      projects: "Projets",
      experience: "Expérience",
      contact: "Contact",
      neon: " Néon"
    },
    
    // Commun
    common: {
      search: "Rechercher dans le portfolio...",
      searchBtn: "Chercher"
    },
    
    // Hero
    hero: {
      badge: "[ Étudiante en Cybersécurité ]",
      title: "Angélique",
      subtitle: "Alternante Chargée d'affaires FTTH",
      at: "chez",
      company: "Orange",
      description: "Sécuriser les réseaux, FTTH & cybersécurité pour bâtir des infrastructures résilientes.",
      cta: {
        cv: "Mon CV",
        video: "Mon CV Vidéo",
        contact: "Me contacter"
      }
    },
    
    // Sections
    sections: {
      about: {
        title: "À propos",
        intro: "Étudiante en 3ᵉ année Réseaux & Télécoms (parcours cybersécurité), je travaille chez Orange en tant que Chargée d'affaires FTTH. Mon rôle : piloter des projets fibre optique, coordonner les équipes terrain, assurer la qualité de service.",
        detail: "Je conçois des tableaux de bord (Grafana), alimente des pipelines d'observabilité (Prometheus/Loki), et déploie des contrôles de sécurité (Wazuh, OPNsense). J'aime transformer les risques en contrôles concrets.",
        focus: {
          title: "Focus FTTH + Sécu",
          item1: "Planification déploiements PBO/PM",
          item2: "Supervision réseau en temps réel",
          item3: "Détection d'anomalies & incidents",
          item4: "Automatisation & scripting"
        }
      },
      skills: {
        title: "Compétences",
        cybersecurity: "Cybersécurité",
        networks: "FTTH & Réseaux",
        observability: "Observabilité (Grafana/Loki)",
        linux: "Linux / Scripting",
        firewall: "Firewall & IDS"
      },
      projects: {
        title: "Projets",
        viewProject: "Voir le projet →"
      },
      experience: {
        title: "Expérience",
        orange: {
          title: "Orange — Chargée d'affaires FTTH",
          period: "2024 — 2025",
          description: "Coordination chantiers, suivi fournisseurs, conformité qualité & sécurité, intégration d'indicateurs (SLA, MTTR, conformité). Mise en place de contrôles de sécurité : durcissement, supervision, alerting."
        },
        academic: {
          title: "Projets académiques cybersécurité",
          period: "2023 — 2024",
          description: "SOC virtuel avec Wazuh, forensics réseau, pentesting, analyse malware, développement d'outils de monitoring et d'automatisation."
        }
      },
      contact: {
        title: "Envoyer un message",
        name: "Nom",
        namePlaceholder: "Votre nom",
        email: "Email",
        emailPlaceholder: "vous@exemple.com",
        message: "Message",
        messagePlaceholder: "Votre message…",
        consent: "J'accepte la politique de confidentialité.",
        submit: "Envoyer"
      }
    },
    
    // Projets
    projects: {
      monitoringTaaf: {
        title: "Monitoring TAAF — Grafana, Loki, Alloy",
        description: "Stack Dockerisée d'observabilité pour stations (metrics, logs, alerting), dashboards KPI opérationnels."
      },
      supervision: {
        title: "Supervision Réseau — Centreon, GLPI, Wazuh",
        description: "Plateforme intégrée de supervision réseau avec corrélation d'événements et gestion d'incidents pour infrastructure critique."
      },
      risquesFtth: {
        title: "Analyse de risques FTTH — EBIOS RM",
        description: "Méthodo risques + contrôles (durcissement équipements d'accès, journalisation, détection anomalies) selon EBIOS Risk Manager."
      },
      wifi: {
        title: "Infrastructure WiFi — Sites Isolés Réunion",
        description: "Planification et déploiement d'infrastructure WiFi sécurisée pour zones rurales avec contraintes géographiques et climatiques."
      },
      parking: {
        title: "App Cagnotte Parking — Sécurité & Fraude",
        description: "Back-end + SQL + QR codes, rôles, journalisation, détection fraude, chiffrement de secrets avec architecture sécurisée."
      },
      audit: {
        title: "Audit de Sécurité — CVE-2008-1930",
        description: "Exploitation de vulnérabilité, tests d'intrusion, rapport d'audit et recommandations de remédiation complètes."
      }
    },
    
    // Footer
    footer: {
      copyright: "© 2025 Angélique — Portfolio Cybersécurité"
    }
  },
  
  en: {
    // Navigation
    nav: {
      brand: "CYBER • PORTFOLIO",
      about: "About",
      skills: "Skills",
      projects: "Projects",
      experience: "Experience",
      contact: "Contact",
      neon: "Neon"
    },
    
    // Common
    common: {
      search: "Search in portfolio...",
      searchBtn: "Search"
    },
    
    // Hero
    hero: {
      badge: "[ Cybersecurity Student ]",
      title: "Angélique",
      subtitle: "FTTH Business Manager Apprentice",
      at: "at",
      company: "Orange",
      description: "Securing networks, FTTH & cybersecurity to build resilient infrastructures.",
      cta: {
        cv: "My Resume",
        video: "My Video Resume",
        contact: "Contact me"
      }
    },
    
    // Sections
    sections: {
      about: {
        title: "About",
        intro: "3rd year student in Networks & Telecommunications (cybersecurity track), I work at Orange as an FTTH Business Manager. My role: manage fiber optic projects, coordinate field teams, ensure quality of service.",
        detail: "I design dashboards (Grafana), feed observability pipelines (Prometheus/Loki), and deploy security controls (Wazuh, OPNsense). I love turning risks into concrete controls.",
        focus: {
          title: "FTTH + Security Focus",
          item1: "PBO/PM deployment planning",
          item2: "Real-time network monitoring",
          item3: "Anomaly & incident detection",
          item4: "Automation & scripting"
        }
      },
      skills: {
        title: "Skills",
        cybersecurity: "Cybersecurity",
        networks: "FTTH & Networks",
        observability: "Observability (Grafana/Loki)",
        linux: "Linux / Scripting",
        firewall: "Firewall & IDS"
      },
      projects: {
        title: "Projects",
        viewProject: "View project →"
      },
      experience: {
        title: "Experience",
        orange: {
          title: "Orange — FTTH Business Manager",
          period: "2024 — 2025",
          description: "Construction site coordination, supplier monitoring, quality & security compliance, KPI integration (SLA, MTTR, compliance). Implementation of security controls: hardening, monitoring, alerting."
        },
        academic: {
          title: "Academic cybersecurity projects",
          period: "2023 — 2024",
          description: "Virtual SOC with Wazuh, network forensics, pentesting, malware analysis, development of monitoring and automation tools."
        }
      },
      contact: {
        title: "Send a message",
        name: "Name",
        namePlaceholder: "Your name",
        email: "Email",
        emailPlaceholder: "you@example.com",
        message: "Message",
        messagePlaceholder: "Your message…",
        consent: "I accept the privacy policy.",
        submit: "Send"
      }
    },
    
    // Projects
    projects: {
      monitoringTaaf: {
        title: "TAAF Monitoring — Grafana, Loki, Alloy",
        description: "Dockerized observability stack for stations (metrics, logs, alerting), operational KPI dashboards."
      },
      supervision: {
        title: "Network Supervision — Centreon, GLPI, Wazuh",
        description: "Integrated network monitoring platform with event correlation and incident management for critical infrastructure."
      },
      risquesFtth: {
        title: "FTTH Risk Analysis — EBIOS RM",
        description: "Risk methodology + controls (access equipment hardening, logging, anomaly detection) according to EBIOS Risk Manager."
      },
      wifi: {
        title: "WiFi Infrastructure — Isolated Sites Reunion",
        description: "Planning and deployment of secure WiFi infrastructure for rural areas with geographical and climatic constraints."
      },
      parking: {
        title: "Parking Pool App — Security & Fraud",
        description: "Back-end + SQL + QR codes, roles, logging, fraud detection, secret encryption with secure architecture."
      },
      audit: {
        title: "Security Audit — CVE-2008-1930",
        description: "Vulnerability exploitation, penetration testing, audit report and complete remediation recommendations."
      }
    },
    
    // Footer
    footer: {
      copyright: "© 2025 Angélique — Cybersecurity Portfolio"
    }
  },
  
  es: {
    // Navigation
    nav: {
      brand: "CYBER • PORTFOLIO",
      about: "Acerca de",
      skills: "Habilidades",
      projects: "Proyectos",
      experience: "Experiencia",
      contact: "Contacto",
      neon: "Neón"
    },
    
    // Common
    common: {
      search: "Buscar en el portafolio...",
      searchBtn: "Buscar"
    },
    
    // Hero
    hero: {
      badge: "[ Estudiante de Ciberseguridad ]",
      title: "Angélique",
      subtitle: "Aprendiz Gerente de Negocios FTTH",
      at: "en",
      company: "Orange",
      description: "Asegurar redes, FTTH y ciberseguridad para construir infraestructuras resilientes.",
      cta: {
        cv: "Mi CV",
        video: "Mi CV en Vídeo",
        contact: "Contáctame"
      }
    },
    
    // Sections
    sections: {
      about: {
        title: "Acerca de",
        intro: "Estudiante de 3er año en Redes y Telecomunicaciones (especialización en ciberseguridad), trabajo en Orange como Gerente de Negocios FTTH. Mi rol: gestionar proyectos de fibra óptica, coordinar equipos de campo, asegurar la calidad del servicio.",
        detail: "Diseño paneles de control (Grafana), alimento pipelines de observabilidad (Prometheus/Loki) y despliego controles de seguridad (Wazuh, OPNsense). Me encanta transformar riesgos en controles concretos.",
        focus: {
          title: "Enfoque FTTH + Seguridad",
          item1: "Planificación despliegues PBO/PM",
          item2: "Supervisión de red en tiempo real",
          item3: "Detección de anomalías e incidentes",
          item4: "Automatización y scripting"
        }
      },
      skills: {
        title: "Habilidades",
        cybersecurity: "Ciberseguridad",
        networks: "FTTH y Redes",
        observability: "Observabilidad (Grafana/Loki)",
        linux: "Linux / Scripting",
        firewall: "Firewall e IDS"
      },
      projects: {
        title: "Proyectos",
        viewProject: "Ver proyecto →"
      },
      experience: {
        title: "Experiencia",
        orange: {
          title: "Orange — Gerente de Negocios FTTH",
          period: "2024 — 2025",
          description: "Coordinación de obras, seguimiento de proveedores, cumplimiento de calidad y seguridad, integración de indicadores (SLA, MTTR, cumplimiento). Implementación de controles de seguridad: endurecimiento, supervisión, alertas."
        },
        academic: {
          title: "Proyectos académicos de ciberseguridad",
          period: "2023 — 2024",
          description: "SOC virtual con Wazuh, forense de red, pentesting, análisis de malware, desarrollo de herramientas de monitoreo y automatización."
        }
      },
      contact: {
        title: "Enviar un mensaje",
        name: "Nombre",
        namePlaceholder: "Tu nombre",
        email: "Correo electrónico",
        emailPlaceholder: "tu@ejemplo.com",
        message: "Mensaje",
        messagePlaceholder: "Tu mensaje…",
        consent: "Acepto la política de privacidad.",
        submit: "Enviar"
      }
    },
    
    // Projects
    projects: {
      monitoringTaaf: {
        title: "Monitoreo TAAF — Grafana, Loki, Alloy",
        description: "Stack Dockerizado de observabilidad para estaciones (métricas, logs, alertas), paneles KPI operacionales."
      },
      supervision: {
        title: "Supervisión de Red — Centreon, GLPI, Wazuh",
        description: "Plataforma integrada de supervisión de red con correlación de eventos y gestión de incidentes para infraestructura crítica."
      },
      risquesFtth: {
        title: "Análisis de Riesgos FTTH — EBIOS RM",
        description: "Metodología de riesgos + controles (endurecimiento de equipos de acceso, registro, detección de anomalías) según EBIOS Risk Manager."
      },
      wifi: {
        title: "Infraestructura WiFi — Sitios Aislados Reunión",
        description: "Planificación y despliegue de infraestructura WiFi segura para zonas rurales con restricciones geográficas y climáticas."
      },
      parking: {
        title: "App Bote Parking — Seguridad y Fraude",
        description: "Back-end + SQL + códigos QR, roles, registro, detección de fraude, cifrado de secretos con arquitectura segura."
      },
      audit: {
        title: "Auditoría de Seguridad — CVE-2008-1930",
        description: "Explotación de vulnerabilidad, pruebas de penetración, informe de auditoría y recomendaciones de remediación completas."
      }
    },
    
    // Footer
    footer: {
      copyright: "© 2025 Angélique — Portafolio de Ciberseguridad"
    }
  },
  
  it: {
    // Navigation
    nav: {
      brand: "CYBER • PORTFOLIO",
      about: "Chi sono",
      skills: "Competenze",
      projects: "Progetti",
      experience: "Esperienza",
      contact: "Contatto",
      neon: " Neon"
    },
    
    // Common
    common: {
      search: "Cerca nel portfolio...",
      searchBtn: "Cerca"
    },
    
    // Hero
    hero: {
      badge: "[ Studentessa di Cybersecurity ]",
      title: "Angélique",
      subtitle: "Apprendista Business Manager FTTH",
      at: "presso",
      company: "Orange",
      description: "Proteggere le reti, FTTH e cybersecurity per costruire infrastrutture resilienti.",
      cta: {
        cv: "Il mio CV",
        video: "Il mio CV Video",
        contact: "Contattami"
      }
    },
    
    // Sections
    sections: {
      about: {
        title: "Chi sono",
        intro: "Studentessa del 3° anno in Reti e Telecomunicazioni (specializzazione cybersecurity), lavoro presso Orange come Business Manager FTTH. Il mio ruolo: gestire progetti in fibra ottica, coordinare team sul campo, garantire la qualità del servizio.",
        detail: "Progetto dashboard (Grafana), alimento pipeline di osservabilità (Prometheus/Loki) e implemento controlli di sicurezza (Wazuh, OPNsense). Amo trasformare i rischi in controlli concreti.",
        focus: {
          title: "Focus FTTH + Sicurezza",
          item1: "Pianificazione implementazioni PBO/PM",
          item2: "Monitoraggio rete in tempo reale",
          item3: "Rilevamento anomalie e incidenti",
          item4: "Automazione e scripting"
        }
      },
      skills: {
        title: "Competenze",
        cybersecurity: "Cybersecurity",
        networks: "FTTH e Reti",
        observability: "Osservabilità (Grafana/Loki)",
        linux: "Linux / Scripting",
        firewall: "Firewall e IDS"
      },
      projects: {
        title: "Progetti",
        viewProject: "Vedi progetto →"
      },
      experience: {
        title: "Esperienza",
        orange: {
          title: "Orange — Business Manager FTTH",
          period: "2024 — 2025",
          description: "Coordinamento cantieri, monitoraggio fornitori, conformità qualità e sicurezza, integrazione indicatori (SLA, MTTR, conformità). Implementazione controlli di sicurezza: hardening, monitoraggio, alerting."
        },
        academic: {
          title: "Progetti accademici cybersecurity",
          period: "2023 — 2024",
          description: "SOC virtuale con Wazuh, forensics di rete, pentesting, analisi malware, sviluppo di strumenti di monitoraggio e automazione."
        }
      },
      contact: {
        title: "Invia un messaggio",
        name: "Nome",
        namePlaceholder: "Il tuo nome",
        email: "Email",
        emailPlaceholder: "tu@esempio.com",
        message: "Messaggio",
        messagePlaceholder: "Il tuo messaggio…",
        consent: "Accetto la privacy policy.",
        submit: "Invia"
      }
    },
    
    // Projects
    projects: {
      monitoringTaaf: {
        title: "Monitoraggio TAAF — Grafana, Loki, Alloy",
        description: "Stack Dockerizzato di osservabilità per stazioni (metriche, log, alerting), dashboard KPI operativi."
      },
      supervision: {
        title: "Supervisione Rete — Centreon, GLPI, Wazuh",
        description: "Piattaforma integrata di supervisione rete con correlazione eventi e gestione incidenti per infrastruttura critica."
      },
      risquesFtth: {
        title: "Analisi Rischi FTTH — EBIOS RM",
        description: "Metodologia rischi + controlli (hardening equipaggiamenti accesso, logging, rilevamento anomalie) secondo EBIOS Risk Manager."
      },
      wifi: {
        title: "Infrastruttura WiFi — Siti Isolati Riunione",
        description: "Pianificazione e implementazione infrastruttura WiFi sicura per zone rurali con vincoli geografici e climatici."
      },
      parking: {
        title: "App Raccolta Parking — Sicurezza e Frode",
        description: "Back-end + SQL + QR code, ruoli, logging, rilevamento frode, cifratura segreti con architettura sicura."
      },
      audit: {
        title: "Audit di Sicurezza — CVE-2008-1930",
        description: "Sfruttamento vulnerabilità, test di penetrazione, report audit e raccomandazioni di remediation complete."
      }
    },
    
    // Footer
    footer: {
      copyright: "© 2025 Angélique — Portfolio Cybersecurity"
    }
  },
  
  ru: {
    // Navigation
    nav: {
      brand: "CYBER • PORTFOLIO",
      about: "Обо мне",
      skills: "Навыки",
      projects: "Проекты",
      experience: "Опыт",
      contact: "Контакт",
      neon: " Неон"
    },
    
    // Common
    common: {
      search: "Поиск в портфолио...",
      searchBtn: "Искать"
    },
    
    // Hero
    hero: {
      badge: "[ Студентка кибербезопасности ]",
      title: "Анжелик",
      subtitle: "Стажер бизнес-менеджер FTTH",
      at: "в",
      company: "Orange",
      description: "Защита сетей, FTTH и кибербезопасность для построения устойчивых инфраструктур.",
      cta: {
        cv: "Моё резюме",
        video: "Моё видео-резюме",
        contact: "Связаться"
      }
    },
    
    // Sections
    sections: {
      about: {
        title: "Обо мне",
        intro: "Студентка 3-го курса по специальности Сети и Телекоммуникации (специализация кибербезопасность), работаю в Orange бизнес-менеджером FTTH. Моя роль: управление проектами оптоволокна, координация полевых команд, обеспечение качества обслуживания.",
        detail: "Проектирую дашборды (Grafana), питаю пайплайны наблюдаемости (Prometheus/Loki) и развертываю средства безопасности (Wazuh, OPNsense). Люблю превращать риски в конкретные контроли.",
        focus: {
          title: "Фокус FTTH + Безопасность",
          item1: "Планирование развертываний PBO/PM",
          item2: "Мониторинг сети в реальном времени",
          item3: "Обнаружение аномалий и инцидентов",
          item4: "Автоматизация и скриптинг"
        }
      },
      skills: {
        title: "Навыки",
        cybersecurity: "Кибербезопасность",
        networks: "FTTH и Сети",
        observability: "Наблюдаемость (Grafana/Loki)",
        linux: "Linux / Скриптинг",
        firewall: "Firewall и IDS"
      },
      projects: {
        title: "Проекты",
        viewProject: "Посмотреть проект →"
      },
      experience: {
        title: "Опыт",
        orange: {
          title: "Orange — Бизнес-менеджер FTTH",
          period: "2024 — 2025",
          description: "Координация строительных объектов, мониторинг поставщиков, соответствие качеству и безопасности, интеграция показателей (SLA, MTTR, соответствие). Внедрение средств безопасности: закалка, мониторинг, оповещения."
        },
        academic: {
          title: "Академические проекты кибербезопасности",
          period: "2023 — 2024",
          description: "Виртуальный SOC с Wazuh, сетевая криминалистика, пентестинг, анализ вредоносов, разработка инструментов мониторинга и автоматизации."
        }
      },
      contact: {
        title: "Отправить сообщение",
        name: "Имя",
        namePlaceholder: "Ваше имя",
        email: "Email",
        emailPlaceholder: "вы@пример.com",
        message: "Сообщение",
        messagePlaceholder: "Ваше сообщение…",
        consent: "Я принимаю политику конфиденциальности.",
        submit: "Отправить"
      }
    },
    
    // Projects
    projects: {
      monitoringTaaf: {
        title: "Мониторинг TAAF — Grafana, Loki, Alloy",
        description: "Dockerized стек наблюдаемости для станций (метрики, логи, оповещения), операционные KPI дашборды."
      },
      supervision: {
        title: "Надзор за сетью — Centreon, GLPI, Wazuh",
        description: "Интегрированная платформа надзора за сетью с корреляцией событий и управлением инцидентами для критической инфраструктуры."
      },
      risquesFtth: {
        title: "Анализ рисков FTTH — EBIOS RM",
        description: "Методология рисков + контроли (закалка оборудования доступа, логирование, обнаружение аномалий) по EBIOS Risk Manager."
      },
      wifi: {
        title: "WiFi инфраструктура — Изолированные объекты Реюньон",
        description: "Планирование и развертывание безопасной WiFi инфраструктуры для сельских районов с географическими и климатическими ограничениями."
      },
      parking: {
        title: "Приложение копилка парковки — Безопасность и мошенничество",
        description: "Бэк-энд + SQL + QR-коды, роли, логирование, обнаружение мошенничества, шифрование секретов с безопасной архитектурой."
      },
      audit: {
        title: "Аудит безопасности — CVE-2008-1930",
        description: "Эксплуатация уязвимости, тесты на проникновение, отчет об аудите и полные рекомендации по исправлению."
      }
    },
    
    // Footer
    footer: {
      copyright: "© 2025 Анжелик — Портфолио кибербезопасности"
    }
  },
  
  zh: {
    // Navigation
    nav: {
      brand: "网络安全 • 作品集",
      about: "关于",
      skills: "技能",
      projects: "项目",
      experience: "经验",
      contact: "联系",
      neon: " 霓虹"
    },
    
    // Common
    common: {
      search: "在作品集中搜索...",
      searchBtn: "搜索"
    },
    
    // Hero
    hero: {
      badge: "[ 网络安全学生 ]",
      title: "安杰丽克",
      subtitle: "FTTH业务经理学徒",
      at: "在",
      company: "Orange",
      description: "保护网络、FTTH和网络安全，构建弹性基础设施。",
      cta: {
        cv: "我的简历",
        video: "我的视频简历",
        contact: "联系我"
      }
    },
    
    // Sections
    sections: {
      about: {
        title: "关于",
        intro: "网络与电信专业三年级学生（网络安全方向），在Orange担任FTTH业务经理。我的角色：管理光纤项目、协调现场团队、确保服务质量。",
        detail: "我设计仪表板（Grafana）、提供可观察性管道（Prometheus/Loki），并部署安全控制（Wazuh、OPNsense）。我喜欢将风险转化为具体控制。",
        focus: {
          title: "FTTH + 安全焦点",
          item1: "PBO/PM部署规划",
          item2: "实时网络监控",
          item3: "异常和事件检测",
          item4: "自动化和脚本"
        }
      },
      skills: {
        title: "技能",
        cybersecurity: "网络安全",
        networks: "FTTH和网络",
        observability: "可观察性（Grafana/Loki）",
        linux: "Linux / 脚本",
        firewall: "防火墙和IDS"
      },
      projects: {
        title: "项目",
        viewProject: "查看项目 →"
      },
      experience: {
        title: "经验",
        orange: {
          title: "Orange — FTTH业务经理",
          period: "2024 — 2025",
          description: "协调建筑工地、监控供应商、质量和安全合规、KPI集成（SLA、MTTR、合规）。实施安全控制：加固、监控、警报。"
        },
        academic: {
          title: "学术网络安全项目",
          period: "2023 — 2024",
          description: "使用Wazuh的虚拟SOC、网络取证、渗透测试、恶意软件分析、监控和自动化工具开发。"
        }
      },
      contact: {
        title: "发送消息",
        name: "姓名",
        namePlaceholder: "您的姓名",
        email: "电子邮件",
        emailPlaceholder: "you@example.com",
        message: "消息",
        messagePlaceholder: "您的消息…",
        consent: "我接受隐私政策。",
        submit: "发送"
      }
    },
    
    // Projects
    projects: {
      monitoringTaaf: {
        title: "TAAF监控 — Grafana、Loki、Alloy",
        description: "用于站点（指标、日志、警报）、操作KPI仪表板的Docker化可观察性堆栈。"
      },
      supervision: {
        title: "网络监督 — Centreon、GLPI、Wazuh",
        description: "集成网络监控平台，具有事件关联和关键基础设施的事件管理。"
      },
      risquesFtth: {
        title: "FTTH风险分析 — EBIOS RM",
        description: "根据EBIOS Risk Manager的风险方法论+控制（访问设备加固、日志记录、异常检测）。"
      },
      wifi: {
        title: "WiFi基础设施 — 留尼汪孤立站点",
        description: "规划和部署安全的WiFi基础设施，用于具有地理和气候限制的农村地区。"
      },
      parking: {
        title: "停车池应用 — 安全和欺诈",
        description: "后端 + SQL + 二维码、角色、日志记录、欺诈检测、安全架构的秘密加密。"
      },
      audit: {
        title: "安全审计 — CVE-2008-1930",
        description: "漏洞利用、渗透测试、审计报告和完整的修复建议。"
      }
    },
    
    // Footer
    footer: {
      copyright: "© 2025 安杰丽克 — 网络安全作品集"
    }
  },
  
  ja: {
    // Navigation
    nav: {
      brand: "サイバー • ポートフォリオ",
      about: "について",
      skills: "スキル",
      projects: "プロジェクト",
      experience: "経験",
      contact: "連絡先",
      neon: " ネオン"
    },
    
    // Common
    common: {
      search: "ポートフォリオを検索...",
      searchBtn: "検索"
    },
    
    // Hero
    hero: {
      badge: "[ サイバーセキュリティ学生 ]",
      title: "アンジェリーク",
      subtitle: "FTTHビジネスマネージャー見習い",
      at: "で",
      company: "Orange",
      description: "ネットワーク、FTTH、サイバーセキュリティを保護して、回復力のあるインフラストラクチャを構築します。",
      cta: {
        cv: "私の履歴書",
        video: "私のビデオ履歴書",
        contact: "お問い合わせ"
      }
    },
    
    // Sections
    sections: {
      about: {
        title: "について",
        intro: "ネットワークおよび通信（サイバーセキュリティコース）の3年生で、OrangeでFTTHビジネスマネージャーとして働いています。私の役割：光ファイバープロジェクトの管理、現場チームの調整、サービス品質の確保。",
        detail: "ダッシュボード（Grafana）を設計し、可観測性パイプライン（Prometheus/Loki）を供給し、セキュリティ制御（Wazuh、OPNsense）を展開します。リスクを具体的な制御に変換するのが好きです。",
        focus: {
          title: "FTTH + セキュリティフォーカス",
          item1: "PBO/PM展開計画",
          item2: "リアルタイムネットワーク監視",
          item3: "異常およびインシデントの検出",
          item4: "自動化とスクリプティング"
        }
      },
      skills: {
        title: "スキル",
        cybersecurity: "サイバーセキュリティ",
        networks: "FTTHおよびネットワーク",
        observability: "可観測性（Grafana/Loki）",
        linux: "Linux / スクリプティング",
        firewall: "ファイアウォールおよびIDS"
      },
      projects: {
        title: "プロジェクト",
        viewProject: "プロジェクトを見る →"
      },
      experience: {
        title: "経験",
        orange: {
          title: "Orange — FTTHビジネスマネージャー",
          period: "2024 — 2025",
          description: "建設現場の調整、サプライヤーの監視、品質とセキュリティのコンプライアンス、KPI統合（SLA、MTTR、コンプライアンス）。セキュリティ制御の実装：ハードニング、監視、アラート。"
        },
        academic: {
          title: "アカデミックサイバーセキュリティプロジェクト",
          period: "2023 — 2024",
          description: "Wazuhを使用した仮想SOC、ネットワークフォレンジック、ペンテスティング、マルウェア分析、監視および自動化ツールの開発。"
        }
      },
      contact: {
        title: "メッセージを送信",
        name: "名前",
        namePlaceholder: "あなたの名前",
        email: "メール",
        emailPlaceholder: "you@example.com",
        message: "メッセージ",
        messagePlaceholder: "あなたのメッセージ…",
        consent: "プライバシーポリシーに同意します。",
        submit: "送信"
      }
    },
    
    // Projects
    projects: {
      monitoringTaaf: {
        title: "TAAF監視 — Grafana、Loki、Alloy",
        description: "ステーション（メトリクス、ログ、アラート）、運用KPIダッシュボード用のDockerized可観測性スタック。"
      },
      supervision: {
        title: "ネットワーク監督 — Centreon、GLPI、Wazuh",
        description: "イベント相関と重要インフラストラクチャのインシデント管理を備えた統合ネットワーク監視プラットフォーム。"
      },
      risquesFtth: {
        title: "FTTHリスク分析 — EBIOS RM",
        description: "EBIOS Risk Managerに従ったリスク方法論+制御（アクセス機器のハードニング、ロギング、異常検出）。"
      },
      wifi: {
        title: "WiFiインフラストラクチャ — レユニオン孤立サイト",
        description: "地理的および気候的制約のある農村地域向けの安全なWiFiインフラストラクチャの計画と展開。"
      },
      parking: {
        title: "駐車場プールアプリ — セキュリティと詐欺",
        description: "バックエンド + SQL + QRコード、役割、ロギング、詐欺検出、安全なアーキテクチャによる秘密の暗号化。"
      },
      audit: {
        title: "セキュリティ監査 — CVE-2008-1930",
        description: "脆弱性の悪用、侵入テスト、監査レポート、完全な修復推奨事項。"
      }
    },
    
    // Footer
    footer: {
      copyright: "© 2025 アンジェリーク — サイバーセキュリティポートフォリオ"
    }
  }
};
