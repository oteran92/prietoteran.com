// Source-of-truth content for the approval workflow blog post.
export default {
  id: 'approval-workflows-stuck-in-inbox',
  datePublished: '2026-10-12',
  dateModified: '2026-10-12',
  linkedinDraftsLinkCanonical: true,
  funnel: {
    stage: 'diagnosis',
    pillar: 'processAutomation',
    businessObjective: 'Help B2B leaders diagnose why approval workflows still depend on inboxes before they automate the wrong step.',
    serviceFit: 'Workflow automation',
    nextStep: 'Contact form conversation about the approval or handoff that still slows operations.',
    timeHorizon: 'mediumTerm',
    buyerRoles: ['CEO', 'COO', 'CTO', 'Head of Operations', 'Head of IT'],
  },
  image: {
    path: 'blog/images/approval-workflows-stuck-in-inbox.jpg',
    pending: true,
    alt: {
      en: 'Editorial diagram showing an approval path leaving a business system and getting stuck in an inbox before returning to the workflow',
      de: 'Editoriales Diagramm eines Freigabewegs, der ein Geschäftssystem verlässt, im Postfach stecken bleibt und in den Workflow zurückkehrt',
      es: 'Diagrama editorial de una ruta de aprobación que sale de un sistema, se atasca en el correo y vuelve al flujo de trabajo',
    },
    brief: [
      'Create a 1200x630 editorial Open Graph image for a B2B technology article about approval workflows that still depend on inboxes.',
      'Visual concept: a precise workflow line leaves a clean ERP or CRM system, bends into a dark inbox tray, then returns to the process with a visible delay marker.',
      'Style: Swiss editorial layout, black and warm white foundation, restrained gold accent #B8860B, sharp geometric forms, generous negative space.',
      'Mood: calm, operational, diagnostic, not dramatic.',
      'Avoid stock-photo people, vendor logos, readable interface text, random gradients, and generic AI visuals.',
      'Save as blog/images/approval-workflows-stuck-in-inbox.jpg, 1200x630, under 200KB.',
    ],
  },
  slugs: {
    en: 'blog/approval-workflows-stuck-in-inbox.html',
    de: 'de/blog/freigabe-workflows-im-postfach.html',
    es: 'es/blog/flujos-aprobacion-atascados-correo.html',
  },
  related: {
    en: [
      { href: 'the-real-cost-of-manual-data-entry.html', titleKey: 'blog.post2.title', fallbackTitle: 'The Real Cost of Manual Data Entry' },
      { href: 'quote-to-order-in-4-hours.html', titleKey: 'blog.post3.title', fallbackTitle: 'From Quote to Order in 4 Hours' },
    ],
    de: [
      { href: 'die-wahren-kosten-manueller-dateneingabe.html', titleKey: 'blog.post2.title', fallbackTitle: 'Die wahren Kosten manueller Dateneingabe' },
      { href: 'von-angebot-zu-auftrag-in-4-stunden.html', titleKey: 'blog.post3.title', fallbackTitle: 'Von Angebot zu Auftrag in 4 Stunden' },
    ],
    es: [
      { href: 'el-costo-real-de-la-entrada-manual-de-datos.html', titleKey: 'blog.post2.title', fallbackTitle: 'El costo real de la entrada manual de datos' },
      { href: 'de-cotizacion-a-pedido-en-4-horas.html', titleKey: 'blog.post3.title', fallbackTitle: 'De cotización a pedido en 4 horas' },
    ],
  },
  linkedinDrafts: [
    {
      day: 'Monday',
      status: 'Draft',
      type: 'blogShare',
      funnel: {
        stage: 'diagnosis',
        pillar: 'processAutomation',
        objective: 'Invite leaders to inspect whether their approval workflow is still controlled by email.',
      },
      image: {
        path: 'blog/images/linkedin-approval-inbox-trap.jpg',
        pending: true,
        alt: 'Approval workflow line disappearing into an inbox tray before returning to the process',
        brief: ['1200x630 editorial image with a workflow path caught in an inbox.', 'Use restrained dark, white, and gold accents with no readable text.'],
      },
      text: `An approval workflow that ends in email is not a workflow.
It is a queue with a nicer name.
The system may record the decision, but the inbox still controls the pace.
https://www.prietoteran.com/blog/approval-workflows-stuck-in-inbox.html #B2BOperations #WorkflowAutomation #ERP #Salesforce`,
    },
    {
      day: 'Tuesday',
      status: 'Draft',
      type: 'standalone',
      funnel: {
        stage: 'awareness',
        pillar: 'processAutomation',
        objective: 'Help operations leaders recognize email approvals as an operating design issue.',
      },
      image: {
        path: 'blog/images/linkedin-hidden-approval-queue.jpg',
        pending: true,
        alt: 'Hidden approval queue between two clean business systems',
        brief: ['1200x630 image showing a hidden queue between CRM and ERP blocks.', 'No logos, no people, precise editorial composition.'],
      },
      text: `The most expensive approval delay is often invisible.
The report shows the order as waiting.
The real decision is sitting in one person's inbox.
https://www.prietoteran.com/blog/approval-workflows-stuck-in-inbox.html #Operations #Approvals #B2B #ProcessAutomation`,
    },
    {
      day: 'Wednesday',
      status: 'Draft',
      type: 'standalone',
      funnel: {
        stage: 'diagnosis',
        pillar: 'processAutomation',
        objective: 'Give leaders a simple diagnostic for finding where approval ownership is unclear.',
      },
      image: {
        path: 'blog/images/linkedin-approval-owner-map.jpg',
        pending: true,
        alt: 'Map of approval ownership across sales, finance, and operations',
        brief: ['1200x630 editorial diagram with three ownership nodes and one missing handoff.', 'Keep typography abstract and unreadable.'],
      },
      text: `A slow approval is rarely just a slow person.
It is usually an unclear owner, an unclear threshold, or an unclear next step.
Fix the rule before you chase the reminder.
https://www.prietoteran.com/blog/approval-workflows-stuck-in-inbox.html #Workflow #Leadership #B2BOperations #ERP`,
    },
    {
      day: 'Thursday',
      status: 'Draft',
      type: 'standalone',
      funnel: {
        stage: 'consideration',
        pillar: 'processAutomation',
        objective: 'Position visible state and exception handling as practical requirements for automation.',
      },
      image: {
        path: 'blog/images/linkedin-visible-approval-state.jpg',
        pending: true,
        alt: 'Clean approval state model with visible pending, approved, rejected, and exception paths',
        brief: ['1200x630 image of a clean approval state model with a gold exception path.', 'Use geometric forms and a calm technical mood.'],
      },
      text: `A reminder email is not control.
Control means everyone can see who owns the decision, what blocks it, and what happens next.
That is the part to design before automation.
https://www.prietoteran.com/blog/approval-workflows-stuck-in-inbox.html #WorkflowAutomation #Operations #Salesforce #ProcessDesign`,
    },
    {
      day: 'Friday',
      status: 'Draft',
      type: 'standalone',
      funnel: {
        stage: 'awareness',
        pillar: 'processAutomation',
        objective: 'Prompt leaders to start with one recurring approval bottleneck instead of a broad workflow program.',
      },
      image: {
        path: 'blog/images/linkedin-one-approval-bottleneck.jpg',
        pending: true,
        alt: 'One approval bottleneck highlighted inside a larger order process',
        brief: ['1200x630 editorial image highlighting one bottleneck in a larger process.', 'Minimal Swiss design with one gold focus point.'],
      },
      text: `The best approval project starts with one stuck handoff.
Not the whole company.
One decision that delays orders often enough that everyone works around it.
https://www.prietoteran.com/blog/approval-workflows-stuck-in-inbox.html #B2B #Operations #ApprovalWorkflow #Automation`,
    },
  ],
  locales: {
    en: {
      langName: 'English',
      title: 'Why Approval Workflows Still Get Stuck',
      pageTitle: 'Why Approval Workflows Still Get Stuck | Osmel Prieto Teran',
      description: 'Approval workflows often fail when the real decision still happens in email. Learn how Swiss B2B leaders can make approvals visible and controlled.',
      keywords: 'approval workflows B2B, workflow automation Switzerland, ERP approvals, Salesforce approvals, process automation B2B',
      ogDescription: 'Approval workflows often look automated while the real decision still sits in an inbox. Here is how to make the process visible.',
      twitterDescription: 'Approval workflows often look automated while the real decision still sits in an inbox.',
      category: 'Automation',
      displayDate: 'October 12, 2026',
      readingTime: '6 min read',
      ctaHref: '../#contact',
      ctaText: 'Get in touch',
      continueReading: 'Continue Reading',
      articleLabel: 'Article',
      intro: 'An approval workflow can look finished in the system and still depend on one person noticing an email. That is where the real bottleneck hides.',
      body: `
                <p class="article-lead">A quote is ready. Sales has entered the details in Salesforce. The ERP has enough information to reserve stock. Finance only needs to approve a margin exception before the order can move.</p>

                <p>The workflow says pending approval. The real process says something else: an email is waiting in an inbox, mixed with customer replies, internal questions, and meeting notes.</p>

                <p>When leaders see this delay, the apparent answer is simple. Send more reminders. Add another notification. Ask managers to respond faster. But the uncomfortable detail is this: if the decision still lives in email, the workflow has not been designed. It has only been named.</p>

                <h2>The system records the state. The inbox controls the pace.</h2>

                <p>Many approval processes are half digital. The request starts in a CRM, ERP, or ticketing system. The decision then leaves the system as an email. Someone replies, forwards, asks for context, or waits until the end of the day. Later, someone updates the original record.</p>

                <p>On paper, the process has an approval step. In practice, the company has a hidden queue. Nobody can reliably see who has the decision, why it is waiting, what information is missing, or what happens if the approver is away.</p>

                <p>This matters because approvals usually sit at points where the business wants control. Price exceptions. Credit checks. Delivery commitments. Purchase requests. Customer onboarding. These are not administrative details. They decide whether work moves or stops.</p>

                <h2>Why reminders do not fix the workflow</h2>

                <p>A reminder can help when the process is clear and someone forgot. It does not help when the process itself is unclear.</p>

                <p>Before adding more alerts, look for three common gaps.</p>

                <h3>1. The owner is unclear</h3>

                <p>Some approvals depend on a role, but the system sends the request to a person. When that person is travelling, unavailable, or no longer responsible for that customer, the work waits. The system needs an ownership rule, not only an email address.</p>

                <h3>2. The threshold is unclear</h3>

                <p>Teams often ask for approval because they are unsure whether approval is needed. A margin exception, discount level, delivery promise, or credit condition should have a visible rule. If the rule is hidden in habit, every exception becomes a discussion.</p>

                <h3>3. The next step is unclear</h3>

                <p>Approved is not enough. The workflow should know what changes after approval: which field updates, which team is notified, which document is released, which order status changes, and which exception remains open.</p>

                <div class="article-highlight">
                    <p><strong>The practical test:</strong> Choose one approval that delayed work last week. Can you see who owned it, why it waited, what data was missing, and what changed after approval? If not, the inbox is still part of your system architecture.</p>
                </div>

                <h2>What a controlled approval workflow needs</h2>

                <p>A good approval workflow does not have to be complex. It has to keep the decision inside a visible operating model.</p>

                <p>For Swiss and DACH B2B companies, that usually means five simple design choices.</p>

                <h3>1. A named business object</h3>

                <p>The approval should belong to something concrete: a quote, order, customer, invoice, purchase request, or delivery promise. If the approval only exists as an email thread, it will be hard to audit and hard to improve.</p>

                <h3>2. A visible status model</h3>

                <p>Pending, approved, rejected, returned for clarification, and expired should not be vague labels. Each status should tell the next person what can happen now and what cannot happen yet.</p>

                <h3>3. Ownership by role and rule</h3>

                <p>The system should route the decision based on the account, amount, margin, risk, location, product line, or customer type. A person can still make the decision, but the assignment should not depend on somebody remembering who usually handles it.</p>

                <h3>4. Exception handling</h3>

                <p>Every approval flow needs a path for missing information, no response, substitute approvers, and rejected requests. Without exception handling, the company recreates the inbox as soon as something unusual happens.</p>

                <h3>5. A record of the decision</h3>

                <p>The business should be able to see who approved what, when, based on which data, and what changed afterward. This is not only about compliance. It is about learning which approvals are necessary and which ones have become habit.</p>

                <h2>How to start without overbuilding</h2>

                <p>Do not start with every approval in the company. Start with one handoff that delays revenue, delivery, or month-end work often enough that people have built workarounds around it.</p>

                <p>Map the current path in plain language. What starts the request? Which system holds the data? Who decides? What information do they need? What happens if they approve, reject, or do nothing? Where does someone open Excel or send an email because the system cannot answer?</p>

                <p>Then decide what should stay human and what should become system logic. The goal is not to remove judgment. The goal is to stop hiding judgment inside inboxes.</p>

                <p>The useful question is not whether your company has an approval workflow. The useful question is whether the workflow still works when the inbox is removed. If it does not, that is the first place to fix.</p>`,
    },
    de: {
      langName: 'Deutsch',
      title: 'Warum Freigaben im Postfach stecken bleiben',
      pageTitle: 'Warum Freigaben im Postfach stecken bleiben | Osmel Prieto Teran',
      description: 'Freigabe-Workflows scheitern oft, wenn die eigentliche Entscheidung im E-Mail liegt. So machen B2B-Führungskräfte Freigaben sichtbar.',
      keywords: 'Freigabe Workflow B2B, Workflow Automatisierung Schweiz, ERP Freigaben, Salesforce Freigaben, Prozessautomatisierung B2B',
      ogDescription: 'Freigabe-Workflows wirken oft automatisiert, während die eigentliche Entscheidung im Postfach wartet. So wird der Prozess sichtbar.',
      twitterDescription: 'Freigabe-Workflows wirken oft automatisiert, während die eigentliche Entscheidung im Postfach wartet.',
      category: 'Automatisierung',
      displayDate: '12. Oktober 2026',
      readingTime: '6 Min. Lesezeit',
      ctaHref: '../../#contact',
      ctaText: 'Kontakt aufnehmen',
      continueReading: 'Weiterlesen',
      articleLabel: 'Artikel',
      intro: 'Ein Freigabe-Workflow kann im System vollständig aussehen und trotzdem davon abhängen, dass jemand eine E-Mail bemerkt. Dort versteckt sich der eigentliche Engpass.',
      body: `
                <p class="article-lead">Ein Angebot ist bereit. Sales hat die Details in Salesforce erfasst. Das ERP hat genug Informationen, um Bestand zu reservieren. Finance muss nur noch eine Margenausnahme freigeben, bevor der Auftrag weiterlaufen kann.</p>

                <p>Der Workflow sagt: wartet auf Freigabe. Der reale Prozess sagt etwas anderes: Eine E-Mail liegt in einem Postfach, zwischen Kundenantworten, internen Fragen und Terminhinweisen.</p>

                <p>Wenn Führungskräfte diese Verzögerung sehen, scheint die Antwort einfach. Mehr Erinnerungen senden. Noch eine Benachrichtigung einrichten. Führungspersonen bitten, schneller zu reagieren. Der unbequeme Punkt ist aber dieser: Wenn die Entscheidung noch im E-Mail lebt, wurde der Workflow nicht gestaltet. Er wurde nur benannt.</p>

                <h2>Das System zeigt den Status. Das Postfach bestimmt das Tempo.</h2>

                <p>Viele Freigabeprozesse sind nur halb digital. Die Anfrage startet in CRM, ERP oder einem Ticketsystem. Danach verlässt die Entscheidung das System als E-Mail. Jemand antwortet, leitet weiter, fragt nach Kontext oder wartet bis zum Ende des Tages. Später aktualisiert jemand den ursprünglichen Datensatz.</p>

                <p>Auf dem Papier gibt es einen Freigabeschritt. In der Praxis hat das Unternehmen eine versteckte Warteschlange. Niemand sieht zuverlässig, wer die Entscheidung hat, warum sie wartet, welche Information fehlt oder was passiert, wenn die freigebende Person abwesend ist.</p>

                <p>Das ist relevant, weil Freigaben meist dort sitzen, wo das Geschäft Kontrolle braucht. Preisausnahmen. Kreditprüfungen. Lieferzusagen. Einkaufsanfragen. Kunden-Onboarding. Das sind keine administrativen Details. Sie entscheiden, ob Arbeit weiterläuft oder stehen bleibt.</p>

                <h2>Warum Erinnerungen den Workflow nicht reparieren</h2>

                <p>Eine Erinnerung hilft, wenn der Prozess klar ist und jemand etwas vergessen hat. Sie hilft nicht, wenn der Prozess selbst unklar ist.</p>

                <p>Bevor Sie weitere Alerts hinzufügen, prüfen Sie drei häufige Lücken.</p>

                <h3>1. Die Zuständigkeit ist unklar</h3>

                <p>Manche Freigaben hängen an einer Rolle, aber das System sendet die Anfrage an eine Person. Wenn diese Person unterwegs, nicht verfügbar oder nicht mehr für den Kunden zuständig ist, wartet die Arbeit. Das System braucht eine Zuständigkeitsregel, nicht nur eine E-Mail-Adresse.</p>

                <h3>2. Die Schwelle ist unklar</h3>

                <p>Teams fragen oft nach Freigabe, weil sie nicht sicher sind, ob eine Freigabe nötig ist. Eine Margenausnahme, Rabattstufe, Lieferzusage oder Kreditbedingung braucht eine sichtbare Regel. Wenn die Regel nur aus Gewohnheit besteht, wird jede Ausnahme zur Diskussion.</p>

                <h3>3. Der nächste Schritt ist unklar</h3>

                <p>Freigegeben reicht nicht. Der Workflow sollte wissen, was sich nach der Freigabe ändert: welches Feld aktualisiert wird, welches Team informiert wird, welches Dokument freigegeben wird, welcher Auftragsstatus wechselt und welche Ausnahme offen bleibt.</p>

                <div class="article-highlight">
                    <p><strong>Der praktische Test:</strong> Wählen Sie eine Freigabe, die letzte Woche Arbeit verzögert hat. Können Sie sehen, wer sie besass, warum sie wartete, welche Daten fehlten und was sich nach der Freigabe änderte? Wenn nicht, ist das Postfach noch Teil Ihrer Systemarchitektur.</p>
                </div>

                <h2>Was ein kontrollierter Freigabe-Workflow braucht</h2>

                <p>Ein guter Freigabe-Workflow muss nicht komplex sein. Er muss die Entscheidung in einem sichtbaren Betriebsmodell halten.</p>

                <p>Für Schweizer und DACH-B2B-Unternehmen bedeutet das meistens fünf einfache Designentscheidungen.</p>

                <h3>1. Ein benanntes Geschäftsobjekt</h3>

                <p>Die Freigabe sollte zu etwas Konkretem gehören: Angebot, Auftrag, Kunde, Rechnung, Einkaufsanfrage oder Lieferzusage. Wenn die Freigabe nur als E-Mail-Verlauf existiert, ist sie schwer zu prüfen und schwer zu verbessern.</p>

                <h3>2. Ein sichtbares Statusmodell</h3>

                <p>Wartet, freigegeben, abgelehnt, zur Klärung zurückgegeben und abgelaufen dürfen keine vagen Labels sein. Jeder Status sollte der nächsten Person sagen, was jetzt möglich ist und was noch nicht möglich ist.</p>

                <h3>3. Zuständigkeit nach Rolle und Regel</h3>

                <p>Das System sollte die Entscheidung anhand von Account, Betrag, Marge, Risiko, Standort, Produktlinie oder Kundentyp routen. Eine Person trifft weiterhin die Entscheidung, aber die Zuweisung sollte nicht davon abhängen, dass jemand weiss, wer es normalerweise macht.</p>

                <h3>4. Behandlung von Ausnahmen</h3>

                <p>Jeder Freigabeprozess braucht einen Weg für fehlende Informationen, keine Antwort, Stellvertretungen und abgelehnte Anfragen. Ohne Ausnahmebehandlung baut das Unternehmen das Postfach neu, sobald etwas Ungewöhnliches passiert.</p>

                <h3>5. Eine Entscheidungshistorie</h3>

                <p>Das Geschäft sollte sehen können, wer was wann freigegeben hat, auf Basis welcher Daten und was danach geändert wurde. Das ist nicht nur Compliance. Es zeigt auch, welche Freigaben nötig sind und welche nur noch Gewohnheit sind.</p>

                <h2>Wie Sie anfangen, ohne zu viel zu bauen</h2>

                <p>Starten Sie nicht mit allen Freigaben im Unternehmen. Starten Sie mit einer Übergabe, die Umsatz, Lieferung oder Monatsabschluss oft genug verzögert, dass Menschen Workarounds gebaut haben.</p>

                <p>Skizzieren Sie den heutigen Weg in einfacher Sprache. Was startet die Anfrage? Welches System hält die Daten? Wer entscheidet? Welche Information braucht diese Person? Was passiert bei Freigabe, Ablehnung oder keiner Antwort? Wo öffnet jemand Excel oder sendet eine E-Mail, weil das System keine Antwort gibt?</p>

                <p>Dann entscheiden Sie, was menschlich bleiben soll und was Systemlogik werden sollte. Das Ziel ist nicht, Urteil zu entfernen. Das Ziel ist, Urteil nicht mehr im Postfach zu verstecken.</p>

                <p>Die nützliche Frage lautet nicht, ob Ihr Unternehmen einen Freigabe-Workflow hat. Die nützliche Frage lautet, ob der Workflow noch funktioniert, wenn das Postfach entfernt wird. Wenn nicht, liegt dort der erste Fix.</p>`,
    },
    es: {
      langName: 'Español',
      title: 'Por qué las aprobaciones siguen atascadas',
      pageTitle: 'Por qué las aprobaciones siguen atascadas | Osmel Prieto Teran',
      description: 'Los flujos de aprobación fallan cuando la decisión real sigue en el correo. Aprende a hacer las aprobaciones visibles y controladas.',
      keywords: 'flujos de aprobación B2B, automatización de workflows Suiza, aprobaciones ERP, aprobaciones Salesforce, automatización procesos B2B',
      ogDescription: 'Los flujos de aprobación parecen automatizados mientras la decisión real espera en el correo. Así se hace visible el proceso.',
      twitterDescription: 'Los flujos de aprobación parecen automatizados mientras la decisión real espera en el correo.',
      category: 'Automatización',
      displayDate: '12 de octubre de 2026',
      readingTime: '6 min de lectura',
      ctaHref: '../../?lang=es#contact',
      ctaText: 'Contactar',
      continueReading: 'Seguir leyendo',
      articleLabel: 'Artículo',
      intro: 'Un flujo de aprobación puede parecer terminado en el sistema y seguir dependiendo de que alguien vea un correo. Ahí se esconde el cuello de botella real.',
      body: `
                <p class="article-lead">Una cotización está lista. Ventas ha introducido los detalles en Salesforce. El ERP tiene información suficiente para reservar stock. Finanzas solo tiene que aprobar una excepción de margen antes de que el pedido avance.</p>

                <p>El workflow dice pendiente de aprobación. El proceso real dice otra cosa: un correo espera en una bandeja de entrada, mezclado con respuestas de clientes, preguntas internas y notas de reuniones.</p>

                <p>Cuando los líderes ven esta demora, la respuesta parece simple. Enviar más recordatorios. Añadir otra notificación. Pedir a los managers que respondan más rápido. Pero el detalle incómodo es este: si la decisión todavía vive en el correo, el flujo no ha sido diseñado. Solo ha recibido un nombre.</p>

                <h2>El sistema registra el estado. El correo controla el ritmo.</h2>

                <p>Muchos procesos de aprobación son digitales solo a medias. La solicitud empieza en un CRM, ERP o sistema de tickets. Después, la decisión sale del sistema como correo. Alguien responde, reenvía, pide contexto o espera hasta el final del día. Más tarde, alguien actualiza el registro original.</p>

                <p>Sobre el papel, el proceso tiene un paso de aprobación. En la práctica, la empresa tiene una cola oculta. Nadie puede ver con fiabilidad quién tiene la decisión, por qué espera, qué información falta o qué ocurre si la persona aprobadora está ausente.</p>

                <p>Esto importa porque las aprobaciones suelen estar donde el negocio necesita control. Excepciones de precio. Revisiones de crédito. Compromisos de entrega. Solicitudes de compra. Alta de clientes. No son detalles administrativos. Deciden si el trabajo avanza o se detiene.</p>

                <h2>Por qué los recordatorios no arreglan el flujo</h2>

                <p>Un recordatorio ayuda cuando el proceso es claro y alguien olvidó responder. No ayuda cuando el proceso en sí es poco claro.</p>

                <p>Antes de añadir más alertas, busca tres brechas habituales.</p>

                <h3>1. El responsable no está claro</h3>

                <p>Algunas aprobaciones dependen de un rol, pero el sistema envía la solicitud a una persona. Cuando esa persona viaja, no está disponible o ya no es responsable de ese cliente, el trabajo espera. El sistema necesita una regla de propiedad, no solo una dirección de correo.</p>

                <h3>2. El umbral no está claro</h3>

                <p>Los equipos suelen pedir aprobación porque no están seguros de si hace falta. Una excepción de margen, nivel de descuento, promesa de entrega o condición de crédito debería tener una regla visible. Si la regla vive en la costumbre, cada excepción se convierte en una discusión.</p>

                <h3>3. El siguiente paso no está claro</h3>

                <p>Aprobado no basta. El flujo debería saber qué cambia después de la aprobación: qué campo se actualiza, qué equipo recibe aviso, qué documento se libera, qué estado de pedido cambia y qué excepción sigue abierta.</p>

                <div class="article-highlight">
                    <p><strong>La prueba práctica:</strong> Elige una aprobación que retrasó trabajo la semana pasada. ¿Puedes ver quién la tenía, por qué esperaba, qué datos faltaban y qué cambió después de aprobar? Si no, el correo sigue formando parte de tu arquitectura de sistemas.</p>
                </div>

                <h2>Qué necesita un flujo de aprobación controlado</h2>

                <p>Un buen flujo de aprobación no tiene que ser complejo. Tiene que mantener la decisión dentro de un modelo operativo visible.</p>

                <p>Para empresas B2B suizas y DACH, eso suele significar cinco decisiones simples de diseño.</p>

                <h3>1. Un objeto de negocio concreto</h3>

                <p>La aprobación debería pertenecer a algo concreto: una cotización, pedido, cliente, factura, solicitud de compra o promesa de entrega. Si la aprobación existe solo como hilo de correo, será difícil auditarla y mejorarla.</p>

                <h3>2. Un modelo de estado visible</h3>

                <p>Pendiente, aprobado, rechazado, devuelto para aclaración y vencido no deberían ser etiquetas vagas. Cada estado debería decirle a la siguiente persona qué puede pasar ahora y qué todavía no puede pasar.</p>

                <h3>3. Propiedad por rol y regla</h3>

                <p>El sistema debería dirigir la decisión según la cuenta, importe, margen, riesgo, ubicación, línea de producto o tipo de cliente. Una persona puede seguir tomando la decisión, pero la asignación no debería depender de que alguien recuerde quién suele hacerlo.</p>

                <h3>4. Manejo de excepciones</h3>

                <p>Cada flujo de aprobación necesita un camino para información faltante, ausencia de respuesta, aprobadores sustitutos y solicitudes rechazadas. Sin manejo de excepciones, la empresa reconstruye el correo en cuanto ocurre algo fuera de lo normal.</p>

                <h3>5. Un registro de la decisión</h3>

                <p>El negocio debería poder ver quién aprobó qué, cuándo, con base en qué datos y qué cambió después. Esto no es solo cumplimiento. Sirve para aprender qué aprobaciones son necesarias y cuáles se han convertido en costumbre.</p>

                <h2>Cómo empezar sin construir de más</h2>

                <p>No empieces con todas las aprobaciones de la empresa. Empieza con una transferencia que retrase ingresos, entregas o cierre de mes con suficiente frecuencia como para que la gente haya creado atajos alrededor.</p>

                <p>Mapea el camino actual en lenguaje simple. ¿Qué inicia la solicitud? ¿Qué sistema tiene los datos? ¿Quién decide? ¿Qué información necesita? ¿Qué pasa si aprueba, rechaza o no responde? ¿Dónde abre alguien Excel o envía un correo porque el sistema no puede responder?</p>

                <p>Después decide qué debe seguir siendo humano y qué debe convertirse en lógica del sistema. El objetivo no es quitar criterio. El objetivo es dejar de esconder el criterio dentro del correo.</p>

                <p>La pregunta útil no es si tu empresa tiene un flujo de aprobación. La pregunta útil es si el flujo sigue funcionando cuando se quita el correo. Si no funciona, ese es el primer lugar que conviene arreglar.</p>`,
    },
  },
};
