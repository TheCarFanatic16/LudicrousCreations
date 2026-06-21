/* ════════════════════════════════════════════════════════════════
   LUDICROUS CREATIONS — Main JavaScript
   ════════════════════════════════════════════════════════════════ */

/* ── Navigation ────────────────────────────────────────────────── */
(function () {
    const navbar    = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const mobileMenu    = document.getElementById('mobileMenu');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const mobileClose   = document.getElementById('mobileClose');
    const mobileLinks   = document.querySelectorAll('.mobile-link');

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });

    function openMenu() {
        mobileMenu.classList.add('open');
        mobileOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    }
    function closeMenu() {
        mobileMenu.classList.remove('open');
        mobileOverlay.classList.remove('open');
        document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', openMenu);
    mobileClose.addEventListener('click', closeMenu);
    mobileOverlay.addEventListener('click', closeMenu);
    mobileLinks.forEach(l => l.addEventListener('click', closeMenu));
}());

/* ── Hero entrance (immediate) ─────────────────────────────────── */
(function () {
    const elements = document.querySelectorAll('.fade-up');
    elements.forEach(el => {
        requestAnimationFrame(() => {
            el.classList.add('visible');
        });
    });
}());

/* ── Scroll reveal (IntersectionObserver) ──────────────────────── */
(function () {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Also observe products-intro-title separately
    const introTitle = document.querySelector('.products-intro-title');
    if (introTitle) observer.observe(introTitle);
}());

/* ── Smooth scroll for nav links ───────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        const offset = parseInt(getComputedStyle(document.documentElement)
            .getPropertyValue('--nav-height') || '48', 10);
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
    });
});

/* ════════════════════════════════════════════════════════════════
   PRODUCT MODAL DATA
   ════════════════════════════════════════════════════════════════ */
const PRODUCTS = {
    arcade: {
        number: '01',
        name:   'Mini Arcade Apple Watch Charge Station',
        desc:   'Your Apple Watch deserves a charging station as iconic as itself. This miniature arcade cabinet keeps your watch powered up while putting its face front and center — complete with a working joystick detail and bold arcade styling. It\'s the charger that starts conversations.',
        features: [
            'Classic full-size arcade cabinet silhouette scaled for your desk',
            'Apple Watch face stays fully visible and interactive while charging',
            'Charging cable threads cleanly through internal grooves — no cord clutter',
            'Functional movable joystick detail adds authentic arcade personality',
            'Fits all Apple Watch sizes and generations',
            'No tools required — setup and removal in seconds',
        ],
        specs: [
            { label: 'Material',  value: '3D-Printed PLA' },
            { label: 'Cable',     value: 'Standard Apple Watch charger (not included)' },
            { label: 'Colors',    value: 'Multiple available' },
            { label: 'Made In',   value: 'Royal Oak, Michigan' },
            { label: 'Use',       value: 'Desk / Nightstand' },
            { label: 'Best For',  value: 'Apple Watch owners' },
        ],
        colors: ['#7b2ff7','#ff3b30','#007aff','#34c759','#ffd60a','#ff9f0a','#1c1c1e','#f5f5f7'],
        etsy:   'https://www.etsy.com/shop/LudicrousCreations',
    },
    webcam: {
        number: '02',
        name:   'Webcam Projector',
        desc:   'Clip this onto your laptop\'s built-in camera and instantly transform it into an overhead document projector. Share notes, show products, display artwork, or teach with physical materials — all through your existing webcam. No drivers, no software, no setup headaches.',
        features: [
            'Compatible with MacBook and Chromebook built-in cameras',
            'Attaches and detaches without tools or adhesive — zero damage',
            'Redirects your camera view straight down onto your desk surface',
            'Perfect for remote work presentations and live product demonstrations',
            'Ideal for teachers, tutors, and remote classrooms',
            'Lightweight — take it anywhere your laptop goes',
        ],
        specs: [
            { label: 'Material',       value: '3D-Printed PLA' },
            { label: 'Compatibility',  value: 'MacBook, Chromebook' },
            { label: 'Attachment',     value: 'Clip-on, no adhesive' },
            { label: 'Colors',         value: 'Multiple available' },
            { label: 'Made In',        value: 'Royal Oak, Michigan' },
            { label: 'Best For',       value: 'Remote workers, educators' },
        ],
        colors: ['#0071e3','#7b2ff7','#34c759','#ff3b30','#1c1c1e','#f5f5f7','#ff9f0a','#5e5ce6'],
        etsy:   'https://www.etsy.com/shop/LudicrousCreations',
    },
    sanitizer: {
        number: '03',
        name:   'Hand Sanitizer Car Vent Holder',
        desc:   'Stop rummaging through your bag for hand sanitizer. This clever clip attaches directly to your car\'s air vent and holds a travel-size bottle exactly where you need it — front and center, every time you sit down. It\'s the small detail that makes a big difference.',
        features: [
            'Clips securely onto standard car vent slats — no modifications needed',
            'Holds travel-size (1–2 oz) sanitizer bottles snugly at all times',
            'Bottle remains accessible with just one hand',
            'Stays put over bumpy roads and sharp turns',
            'Easy to remove and re-attach to different vehicles',
            'Great for parents, rideshare drivers, and daily commuters',
        ],
        specs: [
            { label: 'Material',  value: '3D-Printed PLA' },
            { label: 'Fits',      value: 'Standard travel-size bottles (1–2 oz)' },
            { label: 'Mount',     value: 'Universal car air vent clip' },
            { label: 'Colors',    value: 'Multiple available' },
            { label: 'Made In',   value: 'Royal Oak, Michigan' },
            { label: 'Best For',  value: 'Car owners, families' },
        ],
        colors: ['#34c759','#007aff','#7b2ff7','#ff3b30','#ff9f0a','#1c1c1e','#f5f5f7','#5e5ce6'],
        etsy:   'https://www.etsy.com/shop/LudicrousCreations',
    },
    beer: {
        number: '04',
        name:   'Beer Holster',
        desc:   'The hands-free beverage solution you never knew you needed. Clips onto your waistband to hold your drink securely while you\'re at the grill, watching the game, or just moving around. Tested with sweatpants, leggings, yoga pants, and jeans — zero spillage, zero sagging.',
        features: [
            'Holds standard cans, cups, and bottles securely at your side',
            'Tested and proven on sweatpants, leggings, yoga pants, and jeans',
            'Engineering prevents tipping — no spills even while walking',
            'Won\'t pull down your waistband thanks to balanced weight distribution',
            'Doubles as a water bottle or travel mug holster',
            'Perfect for BBQs, tailgates, concerts, and outdoor events',
        ],
        specs: [
            { label: 'Material',  value: '3D-Printed PLA' },
            { label: 'Fits',      value: 'Standard cans, cups, bottles' },
            { label: 'Mount',     value: 'Waistband clip' },
            { label: 'Colors',    value: 'Multiple available' },
            { label: 'Made In',   value: 'Royal Oak, Michigan' },
            { label: 'Best For',  value: 'Outdoor events, BBQs, tailgates' },
        ],
        colors: ['#ff9f0a','#ffd60a','#ff3b30','#34c759','#007aff','#7b2ff7','#1c1c1e','#f5f5f7'],
        etsy:   'https://www.etsy.com/shop/LudicrousCreations',
    },
};

/* ════════════════════════════════════════════════════════════════
   MODAL OPEN / CLOSE
   ════════════════════════════════════════════════════════════════ */
const modalOverlay = document.getElementById('modalOverlay');
const modalBody    = document.getElementById('modalBody');
const modalClose   = document.getElementById('modalClose');

function openModal(productKey) {
    const p = PRODUCTS[productKey];
    if (!p) return;

    const colorDots = p.colors.map(c =>
        `<div class="modal-color-dot" style="background:${c}" title="${c}"></div>`
    ).join('');

    const featureItems = p.features.map(f =>
        `<li><span class="modal-feat-dot"></span>${f}</li>`
    ).join('');

    const specItems = p.specs.map(s =>
        `<div class="modal-spec-item">
            <div class="modal-spec-label">${s.label}</div>
            <div class="modal-spec-value">${s.value}</div>
        </div>`
    ).join('');

    modalBody.innerHTML = `
        <div class="modal-product-header">
            <div class="modal-product-number">${p.number}</div>
            <h2 class="modal-product-name">${p.name}</h2>
            <p class="modal-product-desc">${p.desc}</p>
        </div>

        <p class="modal-section-title">Key Features</p>
        <ul class="modal-features">${featureItems}</ul>

        <p class="modal-section-title">Colors Available</p>
        <div class="modal-colors">${colorDots}</div>

        <p class="modal-section-title">Details & Specs</p>
        <div class="modal-specs">${specItems}</div>

        <div class="modal-cta">
            <a href="${p.etsy}" target="_blank" class="modal-etsy-link">
                Shop on Etsy ↗
            </a>
            <button class="modal-close-btn" onclick="closeModal()">Close</button>
        </div>
    `;

    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', function (e) {
    if (e.target === modalOverlay) closeModal();
});
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
});

/* ── Expose openModal globally ──────────────────────────────────── */
window.openModal = openModal;
window.closeModal = closeModal;

/* ════════════════════════════════════════════════════════════════
   STAGGERED REVEAL FOR GRIDS
   ════════════════════════════════════════════════════════════════ */
(function () {
    const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const children = entry.target.querySelectorAll(
                '.pillar-card, .product-card, .stat-card, .tl-item'
            );
            children.forEach((child, i) => {
                setTimeout(() => {
                    child.style.opacity    = '1';
                    child.style.transform  = 'translateY(0)';
                }, i * 80);
            });
            staggerObserver.unobserve(entry.target);
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.pillars-grid, .products-grid, .craft-stats, .history-timeline')
        .forEach(container => {
            container.querySelectorAll('.pillar-card, .product-card, .stat-card, .tl-item')
                .forEach(child => {
                    child.style.opacity   = '0';
                    child.style.transform = 'translateY(20px)';
                    child.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                });
            staggerObserver.observe(container);
        });
}());
