/* Shared JS for all sub-pages (products.html, product-*.html) */
(function () {
    const navbar      = document.getElementById('navbar');
    const hamburger   = document.getElementById('hamburger');
    const mobileMenu  = document.getElementById('mobileMenu');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const mobileClose = document.getElementById('mobileClose');

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

    if (hamburger)   hamburger.addEventListener('click', openMenu);
    if (mobileClose) mobileClose.addEventListener('click', closeMenu);
    if (mobileOverlay) mobileOverlay.addEventListener('click', closeMenu);
    document.querySelectorAll('.mobile-link').forEach(l => l.addEventListener('click', closeMenu));

    /* Scroll-reveal */
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    /* Staggered child reveal */
    const stagger = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.querySelectorAll('.pg-card, .pp-feat-item, .pp-spec-row, .pp-related-card')
                .forEach((child, i) => setTimeout(() => {
                    child.style.opacity = '1';
                    child.style.transform = 'translateY(0)';
                }, i * 90));
            stagger.unobserve(entry.target);
        });
    }, { threshold: 0.08 });

    document.querySelectorAll('.pg-grid, .pp-features-grid, .pp-specs-table, .pp-related-grid')
        .forEach(container => {
            container.querySelectorAll('.pg-card, .pp-feat-item, .pp-spec-row, .pp-related-card')
                .forEach(child => {
                    child.style.opacity = '0';
                    child.style.transform = 'translateY(16px)';
                    child.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
                });
            stagger.observe(container);
        });
}());

/* Simple photo gallery for product detail pages */
(function () {
    const wrap    = document.getElementById('ppGalleryWrap');
    const mainImg = document.getElementById('ppMainImg');
    const thumbs  = document.getElementById('ppThumbs');
    const counter = document.getElementById('ppCounter');
    if (!wrap || !mainImg) return;

    const urls = JSON.parse(wrap.dataset.images || '[]').filter(Boolean);
    if (urls.length === 0) return;

    let current = 0;

    wrap.classList.add('has-photos');
    mainImg.src = urls[0];
    mainImg.classList.add('loaded');
    if (counter) counter.textContent = `1 / ${urls.length}`;

    urls.forEach((url, i) => {
        const btn = document.createElement('button');
        btn.className = 'gallery-thumb' + (i === 0 ? ' active' : '');
        btn.setAttribute('aria-label', `Photo ${i + 1}`);
        const img = document.createElement('img');
        img.src = url; img.alt = `Photo ${i + 1}`; img.loading = 'lazy';
        btn.appendChild(img);
        btn.addEventListener('click', () => goTo(i));
        if (thumbs) thumbs.appendChild(btn);
    });

    function goTo(idx) {
        if (idx < 0) idx = urls.length - 1;
        if (idx >= urls.length) idx = 0;
        current = idx;
        mainImg.style.opacity = '0';
        setTimeout(() => { mainImg.src = urls[idx]; mainImg.style.opacity = '1'; }, 180);
        if (counter) counter.textContent = `${idx + 1} / ${urls.length}`;
        if (thumbs) thumbs.querySelectorAll('.gallery-thumb')
            .forEach((b, i) => b.classList.toggle('active', i === idx));
    }

    document.getElementById('ppPrev')?.addEventListener('click', () => goTo(current - 1));
    document.getElementById('ppNext')?.addEventListener('click', () => goTo(current + 1));

    /* Touch swipe */
    let sx = 0;
    wrap.addEventListener('touchstart', e => { sx = e.touches[0].clientX; }, { passive: true });
    wrap.addEventListener('touchend',   e => {
        const dx = e.changedTouches[0].clientX - sx;
        if (Math.abs(dx) > 40) dx < 0 ? goTo(current + 1) : goTo(current - 1);
    }, { passive: true });
}());
