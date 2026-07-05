/* =========================================================
   SMART DT GUIDE v2 — INTERACTION ENGINE
   CAMP21: Synergising Literacies 2026
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

    /* ---------------------------------------------------------
       1. PROGRESS BAR ANIMATION
       Smooth fill on page load for any .bar-fill element.
       --------------------------------------------------------- */
    document.querySelectorAll('.bar-fill').forEach(fill => {
        const target = fill.style.width || '0%';
        fill.style.width = '0%';
        fill.style.transition = 'width 1s cubic-bezier(0.25, 0.8, 0.25, 1)';
        setTimeout(() => { fill.style.width = target; }, 250);
    });

    /* ---------------------------------------------------------
       2. ONBOARDING STATE (Intro → Dashboard)
       Tracks whether intro-dt.html has been completed.
       --------------------------------------------------------- */

    // A) On intro-dt.html: mark completion when unlock button is clicked
    const unlockBtn = document.querySelector('.btn-start-journey');
    if (unlockBtn) {
        unlockBtn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.setItem('intro_dt_completed', 'true');
            window.location.href = 'dashboard.html';
        });
    }

    // B) On dashboard.html: morph the Start Here card if intro is done
    const introCard = document.querySelector('.card-intro');
    if (introCard && localStorage.getItem('intro_dt_completed') === 'true') {
        const tag = introCard.querySelector('.tag');
        const btn = introCard.querySelector('.btn-go');
        if (tag) { tag.textContent = 'Completed'; tag.style.color = 'var(--empathise)'; }
        if (btn) {
            btn.textContent = 'Review';
            btn.style.background = 'var(--bg-surface)';
            btn.style.color = 'var(--text-secondary)';
        }
    }

    /* ---------------------------------------------------------
       3. NAVIGATION HIGHLIGHTING
       Auto-highlights sidebar + mobile nav based on current URL.
       --------------------------------------------------------- */
    const page = window.location.pathname.split('/').pop() || 'index.html';

    // Sidebar
    document.querySelectorAll('.sidebar-nav li').forEach(li => {
        li.classList.remove('active');
        const a = li.querySelector('a');
        if (a && a.getAttribute('href') === page) li.classList.add('active');
    });

    // Mobile bottom nav
    document.querySelectorAll('.mobile-nav a').forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href') === page) a.classList.add('active');
    });

    /* ---------------------------------------------------------
       4. INSIGHT CARD EXPAND / COLLAPSE (AI Buddy page)
       Click-to-expand coloured insight cards.
       --------------------------------------------------------- */
    document.querySelectorAll('.insight-card').forEach(card => {
        const expanded = card.querySelector('.insight-expanded');
        const arrow = card.querySelector('.insight-arrow');
        if (!expanded) return;

        // Start collapsed unless it has no .hidden class already
        if (!expanded.classList.contains('hidden') && !card.id) {
            expanded.classList.add('hidden');
        }

        card.addEventListener('click', () => {
            const isOpen = !expanded.classList.contains('hidden');
            // Close all others first
            document.querySelectorAll('.insight-expanded').forEach(el => el.classList.add('hidden'));
            document.querySelectorAll('.insight-arrow').forEach(a => { a.textContent = '⌄'; });

            if (!isOpen) {
                expanded.classList.remove('hidden');
                if (arrow) arrow.textContent = '⌃';
            }
        });
    });

    /* ---------------------------------------------------------
       5. TEMPLATE ITEM HOVER (Icon scale)
       Subtle scale on quick action and template icons.
       --------------------------------------------------------- */
    document.querySelectorAll('.qa-btn, .tpl-item:not(.locked)').forEach(el => {
        el.addEventListener('mouseenter', () => {
            const img = el.querySelector('img');
            if (img) { img.style.transform = 'scale(1.1)'; img.style.transition = 'transform .2s ease'; }
        });
        el.addEventListener('mouseleave', () => {
            const img = el.querySelector('img');
            if (img) { img.style.transform = 'scale(1)'; }
        });
    });

    /* ---------------------------------------------------------
       6. BADGE PULSE ON SCROLL (Phase Completion page)
       Adds a one-time glow pulse when badge section scrolls
       into view.
       --------------------------------------------------------- */
    const badgeImg = document.querySelector('.trail-hex.current');
    if (badgeImg && 'IntersectionObserver' in window) {
        const obs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    badgeImg.style.animation = 'badgePop .5s ease';
                    obs.unobserve(badgeImg);
                }
            });
        }, { threshold: 0.5 });
        obs.observe(badgeImg);
    }

    /* ---------------------------------------------------------
       7. PHASE HERO CARD ENTRANCE (Dashboard)
       Fade-slide the hero card in on load.
       --------------------------------------------------------- */
    const hero = document.querySelector('.phase-hero');
    if (hero) {
        hero.style.opacity = '0';
        hero.style.transform = 'translateY(16px)';
        hero.style.transition = 'opacity .5s ease, transform .5s ease';
        setTimeout(() => {
            hero.style.opacity = '1';
            hero.style.transform = 'translateY(0)';
        }, 100);
    }

    /* ---------------------------------------------------------
       8. CHECK-RING ENTRANCE (Phase Completion)
       Scale-bounce the checkmark on load.
       --------------------------------------------------------- */
    const checkRing = document.querySelector('.check-ring');
    if (checkRing) {
        checkRing.style.opacity = '0';
        checkRing.style.transform = 'scale(0.5)';
        checkRing.style.transition = 'opacity .4s ease, transform .5s cubic-bezier(0.34, 1.56, 0.64, 1)';
        setTimeout(() => {
            checkRing.style.opacity = '1';
            checkRing.style.transform = 'scale(1)';
        }, 200);
    }

});

/* Keyframes injected via JS (avoids needing them in every page's CSS) */
const style = document.createElement('style');
style.textContent = `
    @keyframes badgePop {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); box-shadow: 0 0 20px var(--empathise-glow); }
        100% { transform: scale(1); }
    }
    .hidden { display: none !important; }
`;
document.head.appendChild(style);
