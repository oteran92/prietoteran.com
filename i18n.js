/**
 * Internationalization (i18n) module
 * Supports: English (en), German (de), Spanish (es)
 */

const translations = {
    en: {
        // Navigation
        "nav.services": "Services",
        "nav.about": "About",
        "nav.contact": "Contact",
        "nav.home": "← Home",
        
        // Hero Section
        "hero.label": "Salesforce & ERP Integration",
        "hero.title.line1": "Senior",
        "hero.title.line2": "Integration Engineer for",
        "hero.title.line3": "B2B",
        "hero.title.companies": "Teams",
        "hero.subtitle": "I help Swiss B2B companies connect Salesforce, ERP and operations — so quotes move faster, data stays clean, and workflows run without manual work.",
        "hero.cta.explore": "See the 2 core services",
        "hero.cta.work": "Book a 20-min call",
        "hero.scroll": "Scroll",
        "hero.marker.portrait": "Portrait",
        "hero.marker.location": "Bern, CH",
        "hero.availability": "Available for new projects",
        
        // Intro Section
        "intro.title": "Companies usually come to me when growth hits the limits of their systems.",
        "intro.pain1": "Data mismatch",
        "intro.pain2": "Slow processes",
        "intro.pain3": "Fragile integrations",
        "intro.pain4": "Manual workarounds",
        "intro.quote.line1": "No quick patches.",
        "intro.quote.line2": "Just systems you can trust.",
        
        // Services Section
        "services.number": "001 — SERVICES",
        "services.title": "Core Services",
        
        "service1.title": "Salesforce ↔ ERP Integration & Data Reliability",
        "service1.description": "I connect Salesforce with ERP and surrounding systems (ecommerce, PIM, middleware, custom APIs). The goal is simple: a single source of truth, stable flows, and a clear architecture your team can maintain.",
        "service1.outcome": "Trusted data. Faster quoting. Fewer incidents.",
        "service1.link": "View integration service",
        
        "service2.title": "Process Automation for B2B Operations",
        "service2.description": "I automate workflows that should never be manual: approvals, quoting steps, order handoffs, notifications, data validation, and cross-system updates. Less copy-paste. More control and traceability.",
        "service2.outcome": "Less manual work. Clear accountability.",
        "service2.link": "View automation service",
        
        "service3.title": "AI for Operational Workflows (No Hype)",
        "service3.description": "I apply AI where it reduces cost and friction — e.g., data classification, email/request triage, content enrichment, and automation copilots integrated into real workflows.",
        "service3.outcome": "Measurable impact in weeks.",
        "service3.link": "View AI service",
        
        "service4.title": "Fractional Technical Leadership (Interim / Advisory)",
        "service4.description": "I act as a senior counterpart for IT and business stakeholders: architecture decisions, roadmap clarity, vendor alignment, and delivery leadership — without adding management overhead.",
        "service4.outcome": "Clear decisions. Less risk.",
        "service4.link": "View advisory service",
        
        // About Section
        "about.number": "002 — ABOUT",
        "about.title": "Why Work With Me",
        "about.marker": "At Work",
        "about.lead": "I'm a senior engineer who builds <strong>reliable systems under real-world constraints</strong>.",
        "about.text": "I've worked in B2B environments where reliability, security, and long-term maintainability matter more than \"quick wins\". I keep things calm, documented, and production-ready.",
        "about.approach": "Structured. Transparent. Built so your team can own it — and scale it.",
        
        // Trust Signals
        "trust.item1": "Salesforce, ERP, APIs, middleware — built for reliability",
        "trust.item2": "You own the code, documentation and architecture decisions",
        "trust.item3": "Access control, auditability, and safe data flows",
        "trust.title1": "Integration Experience",
        "trust.desc1": "Salesforce, ERP, APIs, middleware — built for reliability",
        "trust.title2": "Code Ownership",
        "trust.desc2": "You own the code, documentation and architecture decisions",
        "trust.title3": "Secure by Design",
        "trust.desc3": "Access control, auditability, and safe data flows",
        
        // CTA Section
        "cta.text": "If your Salesforce + ERP setup feels fragile, slow, or overly manual — send me a short note. I'll reply with 2–3 concrete next steps.",
        "cta.link": "Start a conversation",
        
        // Footer
        "footer.copyright": "© 2026 Osmel Prieto Teran",
        
        // Common
        "common.outcome": "Outcome:",
        
        // Service Pages - Architecture
        "arch.label": "Service",
        "arch.title": "System Architecture<br>& Integration",
        "arch.subtitle": "I fix fragmented systems and build architectures that scale.",
        "arch.cta": "→ Discuss your system",
        
        "arch.problem.label": "The Problem",
        "arch.problem.title": "Sound familiar?",
        "arch.problem1": "Systems don't talk to each other",
        "arch.problem2": "Data is duplicated or inconsistent",
        "arch.problem3": "Too many manual workarounds",
        "arch.problem4": "Changes feel risky",
        "arch.problem5": "Technical debt keeps growing",
        
        "arch.issue.label": "The Real Issue",
        "arch.issue.title": "It's not the tools. It's the architecture.",
        "arch.issue.text": "Without a clear foundation, integrations break, scaling gets expensive, and security suffers.",
        
        "arch.solution.label": "What I Do",
        "arch.solution.title": "Systems that work as one",
        "arch.solution1": "ERP ↔ CRM integrations",
        "arch.solution2": "API & middleware architecture",
        "arch.solution3": "Ecommerce integrations",
        "arch.solution4": "Data flows & sync",
        "arch.solution5": "Security & access control",
        
        "arch.process.label": "Process",
        "arch.process.title": "How we work",
        "arch.process1": "Analyze",
        "arch.process2": "Design",
        "arch.process3": "Build",
        "arch.process4": "Handover",
        
        "arch.ownership.label": "Ownership",
        "arch.ownership.title": "You own everything",
        "arch.ownership1": "The code is yours",
        "arch.ownership2": "No vendor lock-in",
        "arch.ownership3": "Clean documentation",
        "arch.ownership4": "Security-first",
        "arch.ownership.highlight": "You're not buying a dependency. You're building an asset.",
        
        "arch.fit.label": "Good Fit",
        "arch.fit.title": "This is for you if:",
        "arch.fit1": "You run a B2B company with multiple systems",
        "arch.fit2": "You need stability, not experiments",
        "arch.fit3": "You want ownership and transparency",
        
        "arch.cta2.text": "Systems feeling fragile? Let's fix that.",
        "arch.cta2.button": "→ Start a conversation",
        
        // Service Pages - Automation
        "auto.label": "Service",
        "auto.title": "Process Automation<br>& Operational Efficiency",
        "auto.subtitle": "I automate what shouldn't be manual anymore. Less error, more control.",
        "auto.cta": "→ Discuss your processes",
        
        "auto.problem.label": "The Problem",
        "auto.problem.title": "Manual work is eating your time",
        "auto.problem1": "Repetitive tasks done by hand",
        "auto.problem2": "Copy-paste between systems",
        "auto.problem3": "Spreadsheets as \"databases\"",
        "auto.problem4": "Human errors in critical processes",
        "auto.problem5": "No visibility into operations",
        
        "auto.cost.label": "The Cost",
        "auto.cost.title": "What manual work really costs",
        "auto.cost.stat1.value": "Hours",
        "auto.cost.stat1.label": "Lost weekly",
        "auto.cost.stat2.value": "Errors",
        "auto.cost.stat2.label": "In every cycle",
        "auto.cost.stat3.value": "Stress",
        "auto.cost.stat3.label": "On your team",
        "auto.cost.text": "Every manual process is a liability waiting to break.",
        
        "auto.solution.label": "What I Do",
        "auto.solution.title": "Automate. Simplify. Control.",
        "auto.solution1": "Workflow automation",
        "auto.solution2": "Data entry & processing",
        "auto.solution3": "Report generation",
        "auto.solution4": "System notifications & alerts",
        "auto.solution5": "Approval flows",
        "auto.solution6": "Scheduled tasks & batch jobs",
        
        "auto.process.label": "Process",
        "auto.process.title": "How we work",
        "auto.process1": "Map",
        "auto.process2": "Prioritize",
        "auto.process3": "Automate",
        "auto.process4": "Monitor",
        
        "auto.result.label": "Result",
        "auto.result.title": "What you get",
        "auto.result1": "Hours back every week",
        "auto.result2": "Zero human error in automated tasks",
        "auto.result3": "Real-time visibility",
        "auto.result4": "Scalable operations",
        "auto.result.highlight": "Your team focuses on decisions, not data entry.",
        
        "auto.fit.label": "Good Fit",
        "auto.fit.title": "This is for you if:",
        "auto.fit1": "Your team spends hours on repetitive tasks",
        "auto.fit2": "Errors are becoming a pattern",
        "auto.fit3": "You need to scale without hiring",
        
        "auto.cta2.text": "Ready to stop doing things the hard way?",
        "auto.cta2.button": "→ Start a conversation",
        
        // Service Pages - AI
        "ai.label": "Service",
        "ai.title": "Practical AI<br>for Business",
        "ai.subtitle": "AI where it makes sense. No hype. No experiments without purpose.",
        "ai.cta": "→ Discuss your use case",
        
        "ai.problem.label": "The Problem",
        "ai.problem.title": "AI hype is everywhere. Results are not.",
        "ai.problem1": "Vendors selling solutions looking for problems",
        "ai.problem2": "Pilots that never reach production",
        "ai.problem3": "Tools that don't fit your workflow",
        "ai.problem4": "No clear ROI, just buzzwords",
        
        "ai.approach.label": "My Approach",
        "ai.approach.title": "Practical, not theoretical",
        "ai.approach.not": "Not this",
        "ai.approach.not1": "AI for AI's sake",
        "ai.approach.not2": "Experiments without goals",
        "ai.approach.not3": "Black-box solutions",
        "ai.approach.not4": "Hype-driven decisions",
        "ai.approach.yes": "This",
        "ai.approach.yes1": "AI for specific problems",
        "ai.approach.yes2": "Clear, measurable outcomes",
        "ai.approach.yes3": "Transparent implementation",
        "ai.approach.yes4": "Business-driven decisions",
        
        "ai.usecases.label": "Use Cases",
        "ai.usecases.title": "Where AI actually helps",
        "ai.usecase1": "Document processing",
        "ai.usecase2": "Data extraction",
        "ai.usecase3": "Email classification",
        "ai.usecase4": "Content generation",
        "ai.usecase5": "Search & retrieval",
        "ai.usecase6": "Decision support",
        "ai.usecases.text": "If your use case isn't here, we'll evaluate it honestly.",
        
        "ai.process.label": "Process",
        "ai.process.title": "How we work",
        "ai.process1": "Evaluate",
        "ai.process2": "Prototype",
        "ai.process3": "Integrate",
        "ai.process.highlight": "If AI isn't the right solution, I'll tell you.",
        
        "ai.result.label": "Result",
        "ai.result.title": "What you get",
        "ai.result1": "Working solution, not a demo",
        "ai.result2": "Integrated into your systems",
        "ai.result3": "Measurable business impact",
        "ai.result4": "Clear documentation",
        
        "ai.fit.label": "Good Fit",
        "ai.fit.title": "This is for you if:",
        "ai.fit1": "You have a specific problem to solve",
        "ai.fit2": "You want results, not experiments",
        "ai.fit3": "You're skeptical of AI hype (good)",
        
        "ai.cta2.text": "Have a use case in mind? Let's see if AI makes sense.",
        "ai.cta2.button": "→ Start a conversation",
        
        // Service Pages - Consulting
        "consult.label": "Service",
        "consult.title": "Technical Leadership<br>& Consulting",
        "consult.subtitle": "I act as a technical partner, not just a developer. Clear decisions. Solid foundations.",
        "consult.cta": "→ Let's talk",
        
        "consult.problem.label": "The Problem",
        "consult.problem.title": "Technical decisions are hard",
        "consult.problem1": "No internal CTO or senior engineer",
        "consult.problem2": "Conflicting advice from vendors",
        "consult.problem3": "Unclear roadmap",
        "consult.problem4": "Projects stuck or going in circles",
        "consult.problem5": "Need a second opinion you can trust",
        
        "consult.solution.label": "What I Do",
        "consult.solution.title": "Technical partner on demand",
        "consult.service1": "Architecture review",
        "consult.service2": "Technology selection",
        "consult.service3": "Roadmap planning",
        "consult.service4": "Vendor evaluation",
        "consult.service5": "Team mentoring",
        "consult.service6": "Project rescue",
        
        "consult.roles.label": "Roles I Play",
        "consult.roles.title": "Flexible engagement",
        "consult.role1.title": "Fractional CTO",
        "consult.role1.desc": "Strategic technical leadership, part-time",
        "consult.role2.title": "Technical Advisor",
        "consult.role2.desc": "Second opinion on critical decisions",
        "consult.role3.title": "Project Lead",
        "consult.role3.desc": "Drive a specific initiative forward",
        "consult.role4.title": "Team Coach",
        "consult.role4.desc": "Level up your development team",
        
        "consult.engagement.label": "How We Work",
        "consult.engagement.title": "Engagement models",
        "consult.engagement1.title": "One-time",
        "consult.engagement1.desc": "Single review or assessment",
        "consult.engagement2.title": "Monthly",
        "consult.engagement2.desc": "Ongoing advisory hours",
        "consult.engagement3.title": "Project",
        "consult.engagement3.desc": "Defined scope and timeline",
        
        "consult.result.label": "Result",
        "consult.result.title": "What you get",
        "consult.result1": "Clear technical direction",
        "consult.result2": "Confident decisions",
        "consult.result3": "Unblocked projects",
        "consult.result4": "Reduced risk",
        "consult.result.highlight": "You get experience without the full-time commitment.",
        
        "consult.fit.label": "Good Fit",
        "consult.fit.title": "This is for you if:",
        "consult.fit1": "You need senior technical guidance",
        "consult.fit2": "You want honest, vendor-neutral advice",
        "consult.fit3": "You value long-term thinking over quick fixes",
        
        "consult.cta2.text": "Need a technical partner? Let's talk.",
        "consult.cta2.button": "→ Start a conversation",
        
        // Process steps
        "process.step1": "20-min call",
        "process.step2": "Confirm fit",
        "process.step3": "Proposal",
        
        // Form
        "form.title": "Let's talk",
        "form.name": "Name",
        "form.company": "Company",
        "form.role": "Role",
        "form.email": "Email",
        "form.problem": "What's the current pain? (2–3 sentences)",
        "form.problem.placeholder": "Example: \"Salesforce quotes don't match ERP prices and approvals are manual. We need a reliable integration + workflow.\"",
        "form.process": "What process is causing the most pain?",
        "form.usecase": "What problem are you trying to solve with AI?",
        "form.situation": "What's your current situation?",
        "form.submit": "→ Start the conversation",
        "form.trust": "Your information stays private. No spam."
    },
    
    de: {
        // Navigation
        "nav.services": "Leistungen",
        "nav.about": "Über mich",
        "nav.contact": "Kontakt",
        "nav.home": "← Startseite",
        
        // Hero Section
        "hero.label": "Salesforce & ERP Integration",
        "hero.title.line1": "Senior",
        "hero.title.line2": "Integration Engineer für",
        "hero.title.line3": "B2B",
        "hero.title.companies": "Teams",
        "hero.subtitle": "Ich helfe Schweizer B2B-Unternehmen, Salesforce, ERP und Betrieb zu verbinden — damit Angebote schneller laufen, Daten sauber bleiben und Workflows ohne manuelle Arbeit funktionieren.",
        "hero.cta.explore": "Die 2 Kernservices ansehen",
        "hero.cta.work": "20-Min Gespräch buchen",
        "hero.scroll": "Scrollen",
        "hero.marker.portrait": "Portrait",
        "hero.marker.location": "Bern, CH",
        "hero.availability": "Verfügbar für neue Projekte",
        
        // Intro Section
        "intro.title": "Unternehmen kommen zu mir, wenn das Wachstum an die Grenzen ihrer Systeme stösst.",
        "intro.pain1": "Datenabweichung",
        "intro.pain2": "Langsame Prozesse",
        "intro.pain3": "Fragile Integrationen",
        "intro.pain4": "Manuelle Umgehungen",
        "intro.quote.line1": "Keine Schnellschüsse.",
        "intro.quote.line2": "Nur Systeme, denen Sie vertrauen können.",
        
        // Services Section
        "services.number": "001 — LEISTUNGEN",
        "services.title": "Kernservices",
        
        "service1.title": "Salesforce ↔ ERP Integration & Datenzuverlässigkeit",
        "service1.description": "Ich verbinde Salesforce mit ERP und umliegenden Systemen (E-Commerce, PIM, Middleware, Custom APIs). Das Ziel ist einfach: eine einzige Wahrheitsquelle, stabile Flüsse und eine klare Architektur, die Ihr Team pflegen kann.",
        "service1.outcome": "Vertrauenswürdige Daten. Schnellere Angebote. Weniger Vorfälle.",
        "service1.link": "Integrationsservice ansehen",
        
        "service2.title": "Prozessautomatisierung für B2B-Betrieb",
        "service2.description": "Ich automatisiere Workflows, die niemals manuell sein sollten: Genehmigungen, Angebotsschritte, Auftragsübergaben, Benachrichtigungen, Datenvalidierung und systemübergreifende Updates. Weniger Copy-Paste. Mehr Kontrolle und Nachvollziehbarkeit.",
        "service2.outcome": "Weniger manuelle Arbeit. Klare Verantwortlichkeit.",
        "service2.link": "Automatisierungsservice ansehen",
        
        "service3.title": "KI für operative Workflows (Kein Hype)",
        "service3.description": "Ich setze KI dort ein, wo sie Kosten und Reibung reduziert — z.B. Datenklassifizierung, E-Mail-/Anfragen-Triage, Content-Anreicherung und Automatisierungs-Copiloten, integriert in echte Workflows.",
        "service3.outcome": "Messbarer Impact in Wochen.",
        "service3.link": "KI-Service ansehen",
        
        "service4.title": "Fraktionale technische Führung (Interim / Beratung)",
        "service4.description": "Ich agiere als Senior-Gegenüber für IT- und Business-Stakeholder: Architekturentscheidungen, Roadmap-Klarheit, Vendor-Abstimmung und Delivery-Leadership — ohne Management-Overhead.",
        "service4.outcome": "Klare Entscheidungen. Weniger Risiko.",
        "service4.link": "Beratungsservice ansehen",
        
        // About Section
        "about.number": "002 — ÜBER MICH",
        "about.title": "Warum mit mir arbeiten",
        "about.marker": "Bei der Arbeit",
        "about.lead": "Ich bin ein Senior-Ingenieur, der <strong>zuverlässige Systeme unter realen Einschränkungen</strong> baut.",
        "about.text": "Ich habe in B2B-Umgebungen gearbeitet, wo Zuverlässigkeit, Sicherheit und langfristige Wartbarkeit wichtiger sind als \"schnelle Erfolge\". Ich halte die Dinge ruhig, dokumentiert und produktionsbereit.",
        "about.approach": "Strukturiert. Transparent. Gebaut, damit Ihr Team es besitzen und skalieren kann.",
        
        // Trust Signals
        "trust.item1": "Salesforce, ERP, APIs, Middleware — gebaut für Zuverlässigkeit",
        "trust.item2": "Sie besitzen den Code, die Dokumentation und die Architekturentscheidungen",
        "trust.item3": "Zugriffskontrolle, Auditierbarkeit und sichere Datenflüsse",
        "trust.title1": "Integrationserfahrung",
        "trust.desc1": "Salesforce, ERP, APIs, Middleware — gebaut für Zuverlässigkeit",
        "trust.title2": "Code-Eigentum",
        "trust.desc2": "Sie besitzen den Code, Dokumentation und Architekturentscheidungen",
        "trust.title3": "Sicherheit by Design",
        "trust.desc3": "Zugriffskontrolle, Auditierbarkeit und sichere Datenflüsse",
        
        // CTA Section
        "cta.text": "Wenn Ihr Salesforce + ERP-Setup fragil, langsam oder übermässig manuell erscheint — schicken Sie mir eine kurze Nachricht. Ich antworte mit 2–3 konkreten nächsten Schritten.",
        "cta.link": "Gespräch starten",
        
        // Footer
        "footer.copyright": "© 2026 Osmel Prieto Teran",
        
        // Common
        "common.outcome": "Ergebnis:",
        
        // Service Pages - Architecture
        "arch.label": "Leistung",
        "arch.title": "Systemarchitektur<br>& Integration",
        "arch.subtitle": "Ich repariere fragmentierte Systeme und baue Architekturen, die skalieren.",
        "arch.cta": "→ Ihr System besprechen",
        
        "arch.problem.label": "Das Problem",
        "arch.problem.title": "Kommt Ihnen das bekannt vor?",
        "arch.problem1": "Systeme kommunizieren nicht miteinander",
        "arch.problem2": "Daten sind dupliziert oder inkonsistent",
        "arch.problem3": "Zu viele manuelle Workarounds",
        "arch.problem4": "Änderungen fühlen sich riskant an",
        "arch.problem5": "Technische Schulden wachsen weiter",
        
        "arch.issue.label": "Das eigentliche Problem",
        "arch.issue.title": "Es liegt nicht an den Tools. Es liegt an der Architektur.",
        "arch.issue.text": "Ohne klare Grundlage brechen Integrationen zusammen, Skalierung wird teuer und Sicherheit leidet.",
        
        "arch.solution.label": "Was ich mache",
        "arch.solution.title": "Systeme, die als Einheit funktionieren",
        "arch.solution1": "ERP ↔ CRM Integrationen",
        "arch.solution2": "API & Middleware-Architektur",
        "arch.solution3": "E-Commerce-Integrationen",
        "arch.solution4": "Datenflüsse & Synchronisation",
        "arch.solution5": "Sicherheit & Zugriffskontrolle",
        
        "arch.process.label": "Prozess",
        "arch.process.title": "Wie wir arbeiten",
        "arch.process1": "Analysieren",
        "arch.process2": "Entwerfen",
        "arch.process3": "Bauen",
        "arch.process4": "Übergeben",
        
        "arch.ownership.label": "Eigentum",
        "arch.ownership.title": "Alles gehört Ihnen",
        "arch.ownership1": "Der Code gehört Ihnen",
        "arch.ownership2": "Kein Vendor Lock-in",
        "arch.ownership3": "Saubere Dokumentation",
        "arch.ownership4": "Security-First",
        "arch.ownership.highlight": "Sie kaufen keine Abhängigkeit. Sie bauen einen Vermögenswert.",
        
        "arch.fit.label": "Passend für Sie",
        "arch.fit.title": "Das ist für Sie, wenn:",
        "arch.fit1": "Sie ein B2B-Unternehmen mit mehreren Systemen führen",
        "arch.fit2": "Sie Stabilität brauchen, keine Experimente",
        "arch.fit3": "Sie Eigentum und Transparenz wollen",
        
        "arch.cta2.text": "Systeme fühlen sich fragil an? Lassen Sie uns das beheben.",
        "arch.cta2.button": "→ Gespräch starten",
        
        // Service Pages - Automation
        "auto.label": "Leistung",
        "auto.title": "Prozessautomatisierung<br>& Operative Effizienz",
        "auto.subtitle": "Ich automatisiere, was nicht mehr manuell sein sollte. Weniger Fehler, mehr Kontrolle.",
        "auto.cta": "→ Ihre Prozesse besprechen",
        
        "auto.problem.label": "Das Problem",
        "auto.problem.title": "Manuelle Arbeit frisst Ihre Zeit",
        "auto.problem1": "Repetitive Aufgaben von Hand erledigt",
        "auto.problem2": "Copy-Paste zwischen Systemen",
        "auto.problem3": "Tabellenkalkulationen als \"Datenbanken\"",
        "auto.problem4": "Menschliche Fehler in kritischen Prozessen",
        "auto.problem5": "Keine Sichtbarkeit in den Betrieb",
        
        "auto.cost.label": "Die Kosten",
        "auto.cost.title": "Was manuelle Arbeit wirklich kostet",
        "auto.cost.stat1.value": "Stunden",
        "auto.cost.stat1.label": "Wöchentlich verloren",
        "auto.cost.stat2.value": "Fehler",
        "auto.cost.stat2.label": "In jedem Zyklus",
        "auto.cost.stat3.value": "Stress",
        "auto.cost.stat3.label": "Für Ihr Team",
        "auto.cost.text": "Jeder manuelle Prozess ist eine Haftung, die nur darauf wartet, zu brechen.",
        
        "auto.solution.label": "Was ich mache",
        "auto.solution.title": "Automatisieren. Vereinfachen. Kontrollieren.",
        "auto.solution1": "Workflow-Automatisierung",
        "auto.solution2": "Dateneingabe & -verarbeitung",
        "auto.solution3": "Berichtserstellung",
        "auto.solution4": "Systembenachrichtigungen & Alerts",
        "auto.solution5": "Genehmigungsabläufe",
        "auto.solution6": "Geplante Aufgaben & Batch-Jobs",
        
        "auto.process.label": "Prozess",
        "auto.process.title": "Wie wir arbeiten",
        "auto.process1": "Erfassen",
        "auto.process2": "Priorisieren",
        "auto.process3": "Automatisieren",
        "auto.process4": "Überwachen",
        
        "auto.result.label": "Ergebnis",
        "auto.result.title": "Was Sie bekommen",
        "auto.result1": "Stunden zurück jede Woche",
        "auto.result2": "Null menschliche Fehler bei automatisierten Aufgaben",
        "auto.result3": "Echtzeit-Sichtbarkeit",
        "auto.result4": "Skalierbare Abläufe",
        "auto.result.highlight": "Ihr Team konzentriert sich auf Entscheidungen, nicht auf Dateneingabe.",
        
        "auto.fit.label": "Passend für Sie",
        "auto.fit.title": "Das ist für Sie, wenn:",
        "auto.fit1": "Ihr Team Stunden mit repetitiven Aufgaben verbringt",
        "auto.fit2": "Fehler zu einem Muster werden",
        "auto.fit3": "Sie skalieren müssen, ohne einzustellen",
        
        "auto.cta2.text": "Bereit, aufzuhören, Dinge auf die schwere Art zu tun?",
        "auto.cta2.button": "→ Gespräch starten",
        
        // Service Pages - AI
        "ai.label": "Leistung",
        "ai.title": "Praktische KI<br>für Unternehmen",
        "ai.subtitle": "KI, wo es Sinn macht. Kein Hype. Keine Experimente ohne Zweck.",
        "ai.cta": "→ Ihren Anwendungsfall besprechen",
        
        "ai.problem.label": "Das Problem",
        "ai.problem.title": "KI-Hype ist überall. Ergebnisse nicht.",
        "ai.problem1": "Anbieter verkaufen Lösungen, die Probleme suchen",
        "ai.problem2": "Piloten, die nie die Produktion erreichen",
        "ai.problem3": "Tools, die nicht zu Ihrem Workflow passen",
        "ai.problem4": "Kein klarer ROI, nur Schlagworte",
        
        "ai.approach.label": "Mein Ansatz",
        "ai.approach.title": "Praktisch, nicht theoretisch",
        "ai.approach.not": "Nicht das",
        "ai.approach.not1": "KI um der KI willen",
        "ai.approach.not2": "Experimente ohne Ziele",
        "ai.approach.not3": "Black-Box-Lösungen",
        "ai.approach.not4": "Hype-getriebene Entscheidungen",
        "ai.approach.yes": "Das hier",
        "ai.approach.yes1": "KI für spezifische Probleme",
        "ai.approach.yes2": "Klare, messbare Ergebnisse",
        "ai.approach.yes3": "Transparente Implementierung",
        "ai.approach.yes4": "Business-getriebene Entscheidungen",
        
        "ai.usecases.label": "Anwendungsfälle",
        "ai.usecases.title": "Wo KI wirklich hilft",
        "ai.usecase1": "Dokumentenverarbeitung",
        "ai.usecase2": "Datenextraktion",
        "ai.usecase3": "E-Mail-Klassifizierung",
        "ai.usecase4": "Content-Generierung",
        "ai.usecase5": "Suche & Abruf",
        "ai.usecase6": "Entscheidungsunterstützung",
        "ai.usecases.text": "Wenn Ihr Anwendungsfall hier nicht steht, bewerten wir ihn ehrlich.",
        
        "ai.process.label": "Prozess",
        "ai.process.title": "Wie wir arbeiten",
        "ai.process1": "Bewerten",
        "ai.process2": "Prototyp",
        "ai.process3": "Integrieren",
        "ai.process.highlight": "Wenn KI nicht die richtige Lösung ist, sage ich es Ihnen.",
        
        "ai.result.label": "Ergebnis",
        "ai.result.title": "Was Sie bekommen",
        "ai.result1": "Funktionierende Lösung, keine Demo",
        "ai.result2": "In Ihre Systeme integriert",
        "ai.result3": "Messbarer Business Impact",
        "ai.result4": "Klare Dokumentation",
        
        "ai.fit.label": "Passend für Sie",
        "ai.fit.title": "Das ist für Sie, wenn:",
        "ai.fit1": "Sie ein spezifisches Problem zu lösen haben",
        "ai.fit2": "Sie Ergebnisse wollen, keine Experimente",
        "ai.fit3": "Sie skeptisch gegenüber KI-Hype sind (gut)",
        
        "ai.cta2.text": "Haben Sie einen Anwendungsfall im Sinn? Lassen Sie uns sehen, ob KI Sinn macht.",
        "ai.cta2.button": "→ Gespräch starten",
        
        // Service Pages - Consulting
        "consult.label": "Leistung",
        "consult.title": "Technische Führung<br>& Beratung",
        "consult.subtitle": "Ich agiere als technischer Partner, nicht nur als Entwickler. Klare Entscheidungen. Solide Grundlagen.",
        "consult.cta": "→ Lassen Sie uns sprechen",
        
        "consult.problem.label": "Das Problem",
        "consult.problem.title": "Technische Entscheidungen sind schwer",
        "consult.problem1": "Kein interner CTO oder Senior Engineer",
        "consult.problem2": "Widersprüchliche Ratschläge von Anbietern",
        "consult.problem3": "Unklare Roadmap",
        "consult.problem4": "Projekte stecken fest oder drehen sich im Kreis",
        "consult.problem5": "Brauchen eine Zweitmeinung, der Sie vertrauen können",
        
        "consult.solution.label": "Was ich mache",
        "consult.solution.title": "Technischer Partner auf Abruf",
        "consult.service1": "Architektur-Review",
        "consult.service2": "Technologieauswahl",
        "consult.service3": "Roadmap-Planung",
        "consult.service4": "Anbieterbewertung",
        "consult.service5": "Team-Mentoring",
        "consult.service6": "Projektrettung",
        
        "consult.roles.label": "Rollen, die ich einnehme",
        "consult.roles.title": "Flexible Zusammenarbeit",
        "consult.role1.title": "Fraktionaler CTO",
        "consult.role1.desc": "Strategische technische Führung, Teilzeit",
        "consult.role2.title": "Technischer Berater",
        "consult.role2.desc": "Zweitmeinung bei kritischen Entscheidungen",
        "consult.role3.title": "Projektleiter",
        "consult.role3.desc": "Eine spezifische Initiative vorantreiben",
        "consult.role4.title": "Team-Coach",
        "consult.role4.desc": "Ihr Entwicklungsteam aufleveln",
        
        "consult.engagement.label": "Wie wir arbeiten",
        "consult.engagement.title": "Engagement-Modelle",
        "consult.engagement1.title": "Einmalig",
        "consult.engagement1.desc": "Einzelne Überprüfung oder Bewertung",
        "consult.engagement2.title": "Monatlich",
        "consult.engagement2.desc": "Laufende Beratungsstunden",
        "consult.engagement3.title": "Projekt",
        "consult.engagement3.desc": "Definierter Umfang und Zeitrahmen",
        
        "consult.result.label": "Ergebnis",
        "consult.result.title": "Was Sie bekommen",
        "consult.result1": "Klare technische Richtung",
        "consult.result2": "Selbstbewusste Entscheidungen",
        "consult.result3": "Entsperrte Projekte",
        "consult.result4": "Reduziertes Risiko",
        "consult.result.highlight": "Sie bekommen Erfahrung ohne die Vollzeit-Verpflichtung.",
        
        "consult.fit.label": "Passend für Sie",
        "consult.fit.title": "Das ist für Sie, wenn:",
        "consult.fit1": "Sie Senior-technische Führung brauchen",
        "consult.fit2": "Sie ehrliche, anbieterneutrale Beratung wollen",
        "consult.fit3": "Sie langfristiges Denken über schnelle Fixes stellen",
        
        "consult.cta2.text": "Brauchen Sie einen technischen Partner? Lassen Sie uns sprechen.",
        "consult.cta2.button": "→ Gespräch starten",
        
        // Process steps
        "process.step1": "20-Min Anruf",
        "process.step2": "Fit prüfen",
        "process.step3": "Vorschlag",
        
        // Form
        "form.title": "Lassen Sie uns sprechen",
        "form.name": "Name",
        "form.company": "Unternehmen",
        "form.role": "Position",
        "form.email": "E-Mail",
        "form.problem": "Was ist das Hauptproblem?",
        "form.process": "Welcher Prozess verursacht die meisten Schmerzen?",
        "form.usecase": "Welches Problem versuchen Sie mit KI zu lösen?",
        "form.situation": "Wie ist Ihre aktuelle Situation?",
        "form.submit": "→ Gespräch starten",
        "form.trust": "Ihre Daten bleiben privat. Kein Spam."
    },
    
    es: {
        // Navigation
        "nav.services": "Servicios",
        "nav.about": "Sobre mí",
        "nav.contact": "Contacto",
        "nav.home": "← Inicio",
        
        // Hero Section
        "hero.label": "Salesforce & ERP Integration",
        "hero.title.line1": "Senior",
        "hero.title.line2": "Integration Engineer para",
        "hero.title.line3": "B2B",
        "hero.title.companies": "Teams",
        "hero.subtitle": "Ayudo a empresas B2B suizas a conectar Salesforce, ERP y operaciones — para que los presupuestos fluyan más rápido, los datos se mantengan limpios y los workflows funcionen sin trabajo manual.",
        "hero.cta.explore": "Ver los 2 servicios principales",
        "hero.cta.work": "Reservar llamada de 20-min",
        "hero.scroll": "Desplazar",
        "hero.marker.portrait": "Retrato",
        "hero.marker.location": "Berna, CH",
        "hero.availability": "Disponible para nuevos proyectos",
        
        // Intro Section
        "intro.title": "Las empresas vienen a mí cuando el crecimiento alcanza los límites de sus sistemas.",
        "intro.pain1": "Datos inconsistentes",
        "intro.pain2": "Procesos lentos",
        "intro.pain3": "Integraciones frágiles",
        "intro.pain4": "Soluciones manuales",
        "intro.quote.line1": "Sin parches rápidos.",
        "intro.quote.line2": "Solo sistemas en los que puedes confiar.",
        
        // Services Section
        "services.number": "001 — SERVICIOS",
        "services.title": "Servicios Principales",
        
        "service1.title": "Salesforce ↔ ERP Integration & Confiabilidad de Datos",
        "service1.description": "Conecto Salesforce con ERP y sistemas circundantes (ecommerce, PIM, middleware, APIs personalizadas). El objetivo es simple: una única fuente de verdad, flujos estables y una arquitectura clara que tu equipo pueda mantener.",
        "service1.outcome": "Datos confiables. Cotizaciones más rápidas. Menos incidentes.",
        "service1.link": "Ver servicio de integración",
        
        "service2.title": "Automatización de Procesos para Operaciones B2B",
        "service2.description": "Automatizo workflows que nunca deberían ser manuales: aprobaciones, pasos de cotización, traspasos de pedidos, notificaciones, validación de datos y actualizaciones entre sistemas. Menos copy-paste. Más control y trazabilidad.",
        "service2.outcome": "Menos trabajo manual. Responsabilidad clara.",
        "service2.link": "Ver servicio de automatización",
        
        "service3.title": "IA para Workflows Operativos (Sin Hype)",
        "service3.description": "Aplico IA donde reduce costos y fricción — ej. clasificación de datos, triaje de emails/solicitudes, enriquecimiento de contenido y copilotos de automatización integrados en workflows reales.",
        "service3.outcome": "Impacto medible en semanas.",
        "service3.link": "Ver servicio de IA",
        
        "service4.title": "Liderazgo Técnico Fraccional (Interim / Asesoría)",
        "service4.description": "Actúo como contraparte senior para stakeholders de IT y negocio: decisiones de arquitectura, claridad de roadmap, alineación con proveedores y liderazgo de delivery — sin overhead de gestión.",
        "service4.outcome": "Decisiones claras. Menos riesgo.",
        "service4.link": "Ver servicio de asesoría",
        
        // About Section
        "about.number": "002 — SOBRE MÍ",
        "about.title": "Por qué trabajar conmigo",
        "about.marker": "Trabajando",
        "about.lead": "Soy un ingeniero senior que construye <strong>sistemas confiables bajo restricciones del mundo real</strong>.",
        "about.text": "He trabajado en entornos B2B donde la confiabilidad, seguridad y mantenibilidad a largo plazo importan más que \"victorias rápidas\". Mantengo las cosas calmadas, documentadas y listas para producción.",
        "about.approach": "Estructurado. Transparente. Construido para que tu equipo pueda apropiárselo y escalarlo.",
        
        // Trust Signals
        "trust.item1": "Salesforce, ERP, APIs, middleware — construido para confiabilidad",
        "trust.item2": "Tú eres dueño del código, documentación y decisiones de arquitectura",
        "trust.item3": "Control de acceso, auditabilidad y flujos de datos seguros",
        "trust.title1": "Experiencia en Integración",
        "trust.desc1": "Salesforce, ERP, APIs, middleware — construido para confiabilidad",
        "trust.title2": "Propiedad del Código",
        "trust.desc2": "Tú eres dueño del código, documentación y decisiones de arquitectura",
        "trust.title3": "Seguridad por Diseño",
        "trust.desc3": "Control de acceso, auditabilidad y flujos de datos seguros",
        
        // CTA Section
        "cta.text": "Si tu configuración de Salesforce + ERP se siente frágil, lenta o demasiado manual — envíame una nota corta. Responderé con 2–3 próximos pasos concretos.",
        "cta.link": "Iniciar una conversación",
        
        // Footer
        "footer.copyright": "© 2026 Osmel Prieto Teran",
        
        // Common
        "common.outcome": "Resultado:",
        
        // Service Pages - Architecture
        "arch.label": "Servicio",
        "arch.title": "Arquitectura de Sistemas<br>e Integración",
        "arch.subtitle": "Reparo sistemas fragmentados y construyo arquitecturas que escalan.",
        "arch.cta": "→ Discutir tu sistema",
        
        "arch.problem.label": "El Problema",
        "arch.problem.title": "¿Te suena familiar?",
        "arch.problem1": "Los sistemas no se comunican entre sí",
        "arch.problem2": "Los datos están duplicados o son inconsistentes",
        "arch.problem3": "Demasiados workarounds manuales",
        "arch.problem4": "Los cambios se sienten arriesgados",
        "arch.problem5": "La deuda técnica sigue creciendo",
        
        "arch.issue.label": "El Problema Real",
        "arch.issue.title": "No son las herramientas. Es la arquitectura.",
        "arch.issue.text": "Sin una base clara, las integraciones fallan, escalar se vuelve caro y la seguridad sufre.",
        
        "arch.solution.label": "Lo que hago",
        "arch.solution.title": "Sistemas que funcionan como uno",
        "arch.solution1": "Integraciones ERP ↔ CRM",
        "arch.solution2": "Arquitectura de API y middleware",
        "arch.solution3": "Integraciones de ecommerce",
        "arch.solution4": "Flujos de datos y sincronización",
        "arch.solution5": "Seguridad y control de acceso",
        
        "arch.process.label": "Proceso",
        "arch.process.title": "Cómo trabajamos",
        "arch.process1": "Analizar",
        "arch.process2": "Diseñar",
        "arch.process3": "Construir",
        "arch.process4": "Entregar",
        
        "arch.ownership.label": "Propiedad",
        "arch.ownership.title": "Todo es tuyo",
        "arch.ownership1": "El código es tuyo",
        "arch.ownership2": "Sin vendor lock-in",
        "arch.ownership3": "Documentación limpia",
        "arch.ownership4": "Seguridad primero",
        "arch.ownership.highlight": "No estás comprando una dependencia. Estás construyendo un activo.",
        
        "arch.fit.label": "Buen Ajuste",
        "arch.fit.title": "Esto es para ti si:",
        "arch.fit1": "Diriges una empresa B2B con múltiples sistemas",
        "arch.fit2": "Necesitas estabilidad, no experimentos",
        "arch.fit3": "Quieres propiedad y transparencia",
        
        "arch.cta2.text": "¿Los sistemas se sienten frágiles? Arreglemos eso.",
        "arch.cta2.button": "→ Iniciar una conversación",
        
        // Service Pages - Automation
        "auto.label": "Servicio",
        "auto.title": "Automatización de Procesos<br>y Eficiencia Operativa",
        "auto.subtitle": "Automatizo lo que ya no debería ser manual. Menos errores, más control.",
        "auto.cta": "→ Discutir tus procesos",
        
        "auto.problem.label": "El Problema",
        "auto.problem.title": "El trabajo manual está consumiendo tu tiempo",
        "auto.problem1": "Tareas repetitivas hechas a mano",
        "auto.problem2": "Copy-paste entre sistemas",
        "auto.problem3": "Hojas de cálculo como \"bases de datos\"",
        "auto.problem4": "Errores humanos en procesos críticos",
        "auto.problem5": "Sin visibilidad de las operaciones",
        
        "auto.cost.label": "El Costo",
        "auto.cost.title": "Lo que realmente cuesta el trabajo manual",
        "auto.cost.stat1.value": "Horas",
        "auto.cost.stat1.label": "Perdidas semanalmente",
        "auto.cost.stat2.value": "Errores",
        "auto.cost.stat2.label": "En cada ciclo",
        "auto.cost.stat3.value": "Estrés",
        "auto.cost.stat3.label": "Para tu equipo",
        "auto.cost.text": "Cada proceso manual es un pasivo esperando a romperse.",
        
        "auto.solution.label": "Lo que hago",
        "auto.solution.title": "Automatizar. Simplificar. Controlar.",
        "auto.solution1": "Automatización de flujos de trabajo",
        "auto.solution2": "Entrada y procesamiento de datos",
        "auto.solution3": "Generación de reportes",
        "auto.solution4": "Notificaciones y alertas del sistema",
        "auto.solution5": "Flujos de aprobación",
        "auto.solution6": "Tareas programadas y batch jobs",
        
        "auto.process.label": "Proceso",
        "auto.process.title": "Cómo trabajamos",
        "auto.process1": "Mapear",
        "auto.process2": "Priorizar",
        "auto.process3": "Automatizar",
        "auto.process4": "Monitorear",
        
        "auto.result.label": "Resultado",
        "auto.result.title": "Lo que obtienes",
        "auto.result1": "Horas de vuelta cada semana",
        "auto.result2": "Cero errores humanos en tareas automatizadas",
        "auto.result3": "Visibilidad en tiempo real",
        "auto.result4": "Operaciones escalables",
        "auto.result.highlight": "Tu equipo se enfoca en decisiones, no en entrada de datos.",
        
        "auto.fit.label": "Buen Ajuste",
        "auto.fit.title": "Esto es para ti si:",
        "auto.fit1": "Tu equipo pasa horas en tareas repetitivas",
        "auto.fit2": "Los errores se están convirtiendo en un patrón",
        "auto.fit3": "Necesitas escalar sin contratar",
        
        "auto.cta2.text": "¿Listo para dejar de hacer las cosas de la manera difícil?",
        "auto.cta2.button": "→ Iniciar una conversación",
        
        // Service Pages - AI
        "ai.label": "Servicio",
        "ai.title": "IA Práctica<br>para Negocios",
        "ai.subtitle": "IA donde tiene sentido. Sin hype. Sin experimentos sin propósito.",
        "ai.cta": "→ Discutir tu caso de uso",
        
        "ai.problem.label": "El Problema",
        "ai.problem.title": "El hype de IA está en todas partes. Los resultados no.",
        "ai.problem1": "Proveedores vendiendo soluciones buscando problemas",
        "ai.problem2": "Pilotos que nunca llegan a producción",
        "ai.problem3": "Herramientas que no encajan en tu flujo de trabajo",
        "ai.problem4": "Sin ROI claro, solo palabras de moda",
        
        "ai.approach.label": "Mi Enfoque",
        "ai.approach.title": "Práctico, no teórico",
        "ai.approach.not": "Esto no",
        "ai.approach.not1": "IA por la IA misma",
        "ai.approach.not2": "Experimentos sin objetivos",
        "ai.approach.not3": "Soluciones de caja negra",
        "ai.approach.not4": "Decisiones guiadas por el hype",
        "ai.approach.yes": "Esto sí",
        "ai.approach.yes1": "IA para problemas específicos",
        "ai.approach.yes2": "Resultados claros y medibles",
        "ai.approach.yes3": "Implementación transparente",
        "ai.approach.yes4": "Decisiones guiadas por el negocio",
        
        "ai.usecases.label": "Casos de Uso",
        "ai.usecases.title": "Donde la IA realmente ayuda",
        "ai.usecase1": "Procesamiento de documentos",
        "ai.usecase2": "Extracción de datos",
        "ai.usecase3": "Clasificación de emails",
        "ai.usecase4": "Generación de contenido",
        "ai.usecase5": "Búsqueda y recuperación",
        "ai.usecase6": "Soporte a decisiones",
        "ai.usecases.text": "Si tu caso de uso no está aquí, lo evaluaremos honestamente.",
        
        "ai.process.label": "Proceso",
        "ai.process.title": "Cómo trabajamos",
        "ai.process1": "Evaluar",
        "ai.process2": "Prototipar",
        "ai.process3": "Integrar",
        "ai.process.highlight": "Si la IA no es la solución correcta, te lo diré.",
        
        "ai.result.label": "Resultado",
        "ai.result.title": "Lo que obtienes",
        "ai.result1": "Solución funcionando, no una demo",
        "ai.result2": "Integrada en tus sistemas",
        "ai.result3": "Impacto de negocio medible",
        "ai.result4": "Documentación clara",
        
        "ai.fit.label": "Buen Ajuste",
        "ai.fit.title": "Esto es para ti si:",
        "ai.fit1": "Tienes un problema específico que resolver",
        "ai.fit2": "Quieres resultados, no experimentos",
        "ai.fit3": "Eres escéptico del hype de IA (bien)",
        
        "ai.cta2.text": "¿Tienes un caso de uso en mente? Veamos si la IA tiene sentido.",
        "ai.cta2.button": "→ Iniciar una conversación",
        
        // Service Pages - Consulting
        "consult.label": "Servicio",
        "consult.title": "Liderazgo Técnico<br>y Consultoría",
        "consult.subtitle": "Actúo como socio técnico, no solo como desarrollador. Decisiones claras. Bases sólidas.",
        "consult.cta": "→ Hablemos",
        
        "consult.problem.label": "El Problema",
        "consult.problem.title": "Las decisiones técnicas son difíciles",
        "consult.problem1": "Sin CTO interno o ingeniero senior",
        "consult.problem2": "Consejos contradictorios de proveedores",
        "consult.problem3": "Hoja de ruta poco clara",
        "consult.problem4": "Proyectos atascados o dando vueltas en círculos",
        "consult.problem5": "Necesitas una segunda opinión en la que puedas confiar",
        
        "consult.solution.label": "Lo que hago",
        "consult.solution.title": "Socio técnico bajo demanda",
        "consult.service1": "Revisión de arquitectura",
        "consult.service2": "Selección de tecnología",
        "consult.service3": "Planificación de roadmap",
        "consult.service4": "Evaluación de proveedores",
        "consult.service5": "Mentoría de equipos",
        "consult.service6": "Rescate de proyectos",
        
        "consult.roles.label": "Roles que asumo",
        "consult.roles.title": "Compromiso flexible",
        "consult.role1.title": "CTO Fraccional",
        "consult.role1.desc": "Liderazgo técnico estratégico, tiempo parcial",
        "consult.role2.title": "Asesor Técnico",
        "consult.role2.desc": "Segunda opinión en decisiones críticas",
        "consult.role3.title": "Líder de Proyecto",
        "consult.role3.desc": "Impulsar una iniciativa específica",
        "consult.role4.title": "Coach de Equipos",
        "consult.role4.desc": "Elevar el nivel de tu equipo de desarrollo",
        
        "consult.engagement.label": "Cómo trabajamos",
        "consult.engagement.title": "Modelos de compromiso",
        "consult.engagement1.title": "Único",
        "consult.engagement1.desc": "Revisión o evaluación única",
        "consult.engagement2.title": "Mensual",
        "consult.engagement2.desc": "Horas de asesoría continuas",
        "consult.engagement3.title": "Proyecto",
        "consult.engagement3.desc": "Alcance y cronograma definidos",
        
        "consult.result.label": "Resultado",
        "consult.result.title": "Lo que obtienes",
        "consult.result1": "Dirección técnica clara",
        "consult.result2": "Decisiones con confianza",
        "consult.result3": "Proyectos desbloqueados",
        "consult.result4": "Riesgo reducido",
        "consult.result.highlight": "Obtienes experiencia sin el compromiso de tiempo completo.",
        
        "consult.fit.label": "Buen Ajuste",
        "consult.fit.title": "Esto es para ti si:",
        "consult.fit1": "Necesitas guía técnica senior",
        "consult.fit2": "Quieres consejos honestos y neutrales",
        "consult.fit3": "Valoras el pensamiento a largo plazo sobre arreglos rápidos",
        
        "consult.cta2.text": "¿Necesitas un socio técnico? Hablemos.",
        "consult.cta2.button": "→ Iniciar una conversación",
        
        // Process steps
        "process.step1": "Llamada 20-min",
        "process.step2": "Confirmar fit",
        "process.step3": "Propuesta",
        
        // Form
        "form.title": "Hablemos",
        "form.name": "Nombre",
        "form.company": "Empresa",
        "form.role": "Cargo",
        "form.email": "Correo electrónico",
        "form.problem": "¿Cuál es el problema principal?",
        "form.process": "¿Qué proceso está causando más dolor?",
        "form.usecase": "¿Qué problema estás tratando de resolver con IA?",
        "form.situation": "¿Cuál es tu situación actual?",
        "form.submit": "→ Iniciar la conversación",
        "form.trust": "Tu información se mantiene privada. Sin spam."
    }
};

/**
 * i18n Manager Class
 * Handles language switching and translation application
 */
class I18nManager {
    constructor() {
        // Get saved language or detect from browser
        this.currentLanguage = this.getSavedLanguage() || this.detectLanguage();
        this.init();
    }
    
    /**
     * Get saved language from localStorage
     */
    getSavedLanguage() {
        return localStorage.getItem('language');
    }
    
    /**
     * Detect user's preferred language from browser
     */
    detectLanguage() {
        const browserLang = navigator.language || navigator.userLanguage;
        const lang = browserLang.split('-')[0];
        
        // Check if detected language is supported
        if (translations[lang]) {
            return lang;
        }
        return 'en'; // Default to English
    }
    
    /**
     * Initialize the i18n system
     */
    init() {
        // Apply translations on page load
        this.applyTranslations();
        // Update HTML lang attribute
        document.documentElement.lang = this.currentLanguage;
    }
    
    /**
     * Change the current language
     */
    setLanguage(lang) {
        if (!translations[lang]) {
            console.error(`Language "${lang}" is not supported`);
            return;
        }
        
        this.currentLanguage = lang;
        localStorage.setItem('language', lang);
        document.documentElement.lang = lang;
        this.applyTranslations();
        
        // Update language selector UI if exists
        this.updateLanguageSelector();
    }
    
    /**
     * Get translation for a key
     */
    t(key) {
        const translation = translations[this.currentLanguage]?.[key];
        if (!translation) {
            console.warn(`Translation missing for key: "${key}" in language: "${this.currentLanguage}"`);
            return translations['en']?.[key] || key;
        }
        return translation;
    }
    
    /**
     * Apply translations to all elements with data-i18n attribute
     */
    applyTranslations() {
        // Translate text content
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.t(key);
            
            // Check if translation contains HTML
            if (translation.includes('<')) {
                element.innerHTML = translation;
            } else {
                element.textContent = translation;
            }
        });
        
        // Translate placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            element.placeholder = this.t(key);
        });
        
        // Translate aria-labels
        document.querySelectorAll('[data-i18n-aria]').forEach(element => {
            const key = element.getAttribute('data-i18n-aria');
            element.setAttribute('aria-label', this.t(key));
        });
        
        // Translate title attributes
        document.querySelectorAll('[data-i18n-title]').forEach(element => {
            const key = element.getAttribute('data-i18n-title');
            element.title = this.t(key);
        });
    }
    
    /**
     * Update language selector UI
     */
    updateLanguageSelector() {
        const selector = document.getElementById('languageSelector');
        if (selector) {
            selector.value = this.currentLanguage;
        }
        
        // Update button states if using buttons
        document.querySelectorAll('[data-lang]').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === this.currentLanguage);
        });
    }
    
    /**
     * Get current language
     */
    getLanguage() {
        return this.currentLanguage;
    }
    
    /**
     * Get all available languages
     */
    getAvailableLanguages() {
        return Object.keys(translations);
    }
}

// Create global i18n instance
const i18n = new I18nManager();

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { i18n, translations };
}
