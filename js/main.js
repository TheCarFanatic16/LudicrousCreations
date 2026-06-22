/* ════════════════════════════════════════════════════════════════
   LUDICROUS CREATIONS — Main JavaScript
   ════════════════════════════════════════════════════════════════ */

/* ════════════════════════════════════════════════════════════════
   PRODUCT IMAGE CONFIGURATION
   ─────────────────────────────────────────────────────────────────
   HOW TO ADD YOUR ETSY PHOTOS:
   1. Open https://www.etsy.com/listing/989237928 in your browser
   2. Click each product photo to open it full-size
   3. Right-click the image → "Copy image address"
   4. Paste the URL as a string in the arcade array below
   5. Repeat for all photos (Etsy listings typically have 5–10)
   ════════════════════════════════════════════════════════════════ */
const PRODUCT_IMAGES = {
    arcade: [
        'Photo/AppleWatchStand/AppleTVWatchStand1.JPG',
        'Photo/AppleWatchStand/AppleTVWatchStand2.JPG',
        'Photo/AppleWatchStand/AppleTVWatchStand3.JPG',
        'Photo/AppleWatchStand/AppleTVWatchStand4.JPG',
        'Photo/AppleWatchStand/AppleTVWatchStand5.JPG',
    ],
    webcam: [
        'Photo/DocWebCam/DocWebCam1.JPG',
        'Photo/DocWebCam/DocWebCam2.JPG',
        'Photo/DocWebCam/DocWebCam3.JPG',
        'Photo/DocWebCam/DocWebCam4.JPG',
        'Photo/DocWebCam/DocWebCam5.JPG',
    ],
    sanitizer: [
        'Photo/CarVentHandSanitizerHolder/HandSanitizerHolder.JPG',
        'Photo/CarVentHandSanitizerHolder/HandSanitizerHolder2.JPG',
        'Photo/CarVentHandSanitizerHolder/HandSanitizerHolder3.JPG',
        'Photo/CarVentHandSanitizerHolder/HandSanitizerHolder4.JPG',
        'Photo/CarVentHandSanitizerHolder/HandSanitizerHolder5.JPG',
    ],
    beer: [
        'Photo/BeerHolster/BeerHolster1.JPG',
        'Photo/BeerHolster/BeerHolster2.JPG',
        'Photo/BeerHolster/BeerHolster3.JPG',
        'Photo/BeerHolster/BeerHolster4.JPG',
        'Photo/BeerHolster/BeerHolster5.JPG',
    ],
};

/* ── Gallery initialisation ─────────────────────────────────────── */
(function () {
    const GALLERIES = {
        arcade: {
            wrap:     document.getElementById('arcadeMainWrap'),
            mainImg:  document.getElementById('arcadeMainImg'),
            thumbs:   document.getElementById('arcadeThumbs'),
            counter:  document.getElementById('arcadeCounter'),
            fallback: document.getElementById('arcadeFallback'),
            images:   PRODUCT_IMAGES.arcade,
            current:  0,
        },
    };

    function initGallery(key) {
        const g = GALLERIES[key];
        if (!g || !g.images || g.images.filter(Boolean).length === 0) return;

        const validImgs = g.images.filter(Boolean);
        g.images = validImgs;

        g.wrap.classList.add('has-photos');
        loadSlide(key, 0);

        /* Build thumbnails */
        validImgs.forEach((url, i) => {
            const btn = document.createElement('button');
            btn.className = 'gallery-thumb' + (i === 0 ? ' active' : '');
            btn.setAttribute('aria-label', `Photo ${i + 1}`);
            const img = document.createElement('img');
            img.src = url;
            img.alt = `Product photo ${i + 1}`;
            img.loading = 'lazy';
            btn.appendChild(img);
            btn.addEventListener('click', () => goToSlide(key, i));
            g.thumbs.appendChild(btn);
        });

        updateCounter(key);
    }

    function loadSlide(key, index) {
        const g = GALLERIES[key];
        const url = g.images[index];
        if (!url) return;

        g.mainImg.classList.add('fading');
        setTimeout(() => {
            g.mainImg.src = url;
            g.mainImg.onload = () => {
                g.mainImg.classList.remove('fading');
                g.mainImg.classList.add('loaded');
            };
            g.mainImg.onerror = () => {
                g.mainImg.classList.remove('fading');
            };
        }, 200);
    }

    function goToSlide(key, index) {
        const g = GALLERIES[key];
        if (index < 0) index = g.images.length - 1;
        if (index >= g.images.length) index = 0;
        g.current = index;
        loadSlide(key, index);
        updateThumbs(key);
        updateCounter(key);
    }

    function updateThumbs(key) {
        const g = GALLERIES[key];
        g.thumbs.querySelectorAll('.gallery-thumb').forEach((btn, i) => {
            btn.classList.toggle('active', i === g.current);
        });
    }

    function updateCounter(key) {
        const g = GALLERIES[key];
        if (g.counter) {
            g.counter.textContent = `${g.current + 1} / ${g.images.length}`;
        }
    }

    /* Wire up nav arrows */
    document.querySelectorAll('.gallery-prev').forEach(btn => {
        btn.addEventListener('click', () => {
            const key = btn.dataset.gallery;
            if (GALLERIES[key]) goToSlide(key, GALLERIES[key].current - 1);
        });
    });
    document.querySelectorAll('.gallery-next').forEach(btn => {
        btn.addEventListener('click', () => {
            const key = btn.dataset.gallery;
            if (GALLERIES[key]) goToSlide(key, GALLERIES[key].current + 1);
        });
    });

    /* Keyboard support when gallery is in view */
    document.addEventListener('keydown', e => {
        if (e.key === 'ArrowLeft')  goToSlide('arcade', GALLERIES.arcade.current - 1);
        if (e.key === 'ArrowRight') goToSlide('arcade', GALLERIES.arcade.current + 1);
    });

    /* Touch/swipe support */
    (function () {
        const wrap = document.getElementById('arcadeMainWrap');
        if (!wrap) return;
        let startX = 0;
        wrap.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
        wrap.addEventListener('touchend', e => {
            const dx = e.changedTouches[0].clientX - startX;
            if (Math.abs(dx) > 40) {
                dx < 0 ? goToSlide('arcade', GALLERIES.arcade.current + 1)
                       : goToSlide('arcade', GALLERIES.arcade.current - 1);
            }
        }, { passive: true });
    }());

    /* Init all galleries */
    Object.keys(GALLERIES).forEach(initGallery);
}());

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
        name:   'Mini TV Apple Watch Charge Station',
        desc:   'A fun, retro way to display and charge your Apple Watch. The watch face becomes the television screen, giving your desk a clever vintage-TV look. The spinning control knob doubles as a satisfying fidget toy — and the whole thing is crafted with a 3D printer, so each piece is uniquely yours.',
        features: [
            'Retro mini TV design — Apple Watch face IS the TV screen',
            'Fits Apple Watch Series 1–10, 38–45mm (does not fit Apple Watch Ultra)',
            'Spinning TV control knob doubles as a fidget toy',
            'Circular cutout in the back holds your magnetic charger in place',
            'Built-in wire routing keeps the charging cable hidden',
            'Holds the standard Apple-provided magnetic charger (not included)',
            '3D-printed — each piece is unique; small variations add to the character',
            'Available in many colors — over 8,900 Etsy favorites',
        ],
        specs: [
            { label: 'Material',      value: '3D-Printed PLA' },
            { label: 'Compatibility', value: 'Apple Watch Series 1–10, 38–45mm' },
            { label: 'Not Compatible', value: 'Apple Watch Ultra' },
            { label: 'Charger',       value: 'Standard Apple magnetic charger (not included)' },
            { label: 'Colors',        value: 'Many options available' },
            { label: 'Made In',       value: 'Royal Oak, Michigan' },
            { label: 'Use',           value: 'Desk / Nightstand' },
            { label: 'Etsy Favorites', value: '8,900+' },
        ],
        colors: ['#7b2ff7','#ff3b30','#007aff','#34c759','#ffd60a','#ff9f0a','#1c1c1e','#f5f5f7'],
        etsy:   'https://www.etsy.com/listing/989237928/mini-tv-apple-watch-charging-station',
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

    /* Build inline photo gallery if images are configured */
    const imgs = (PRODUCT_IMAGES[productKey] || []).filter(Boolean);
    let photoSection = '';
    if (imgs.length > 0) {
        const thumbs = imgs.map((url, i) =>
            `<button class="modal-thumb ${i === 0 ? 'active' : ''}"
                     data-idx="${i}" data-product="${productKey}"
                     onclick="modalThumbClick(this)"
                     aria-label="Photo ${i + 1}">
                <img src="${url}" alt="Product photo ${i + 1}" loading="lazy">
             </button>`
        ).join('');
        photoSection = `
            <div class="modal-gallery" id="modalGallery_${productKey}">
                <div class="modal-gallery-main">
                    <img id="modalGalleryMain_${productKey}" src="${imgs[0]}" alt="${p.name}" loading="eager">
                </div>
                ${imgs.length > 1 ? `<div class="modal-gallery-thumbs">${thumbs}</div>` : ''}
            </div>`;
    }

    modalBody.innerHTML = `
        ${photoSection}
        <div class="modal-product-header">
            <div class="modal-product-number">${p.number}</div>
            <h2 class="modal-product-name">${p.name}</h2>
            <p class="modal-product-desc">${p.desc}</p>
        </div>

        <p class="modal-section-title">Key Features</p>
        <ul class="modal-features">${featureItems}</ul>

        <p class="modal-section-title">Colors Available</p>
        <div class="modal-colors">${colorDots}</div>

        <p class="modal-section-title">Details &amp; Specs</p>
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

function modalThumbClick(btn) {
    const productKey = btn.dataset.product;
    const idx = parseInt(btn.dataset.idx, 10);
    const imgs = (PRODUCT_IMAGES[productKey] || []).filter(Boolean);
    const mainImg = document.getElementById(`modalGalleryMain_${productKey}`);
    if (mainImg && imgs[idx]) {
        mainImg.style.opacity = '0';
        setTimeout(() => {
            mainImg.src = imgs[idx];
            mainImg.style.opacity = '1';
        }, 150);
    }
    btn.closest('.modal-gallery-thumbs').querySelectorAll('.modal-thumb')
        .forEach(t => t.classList.toggle('active', t === btn));
}
window.modalThumbClick = modalThumbClick;

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
