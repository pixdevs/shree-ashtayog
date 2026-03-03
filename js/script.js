/**
 * Shree Ashtayog - Vanilla JS Interactions
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- Current Year in Footer ---
    const yearEl = document.getElementById('current-year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // --- Theme Toggle Logic ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const rootEl = document.documentElement;

    // Check local storage or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        rootEl.setAttribute('data-theme', 'dark');
    } else {
        rootEl.setAttribute('data-theme', 'light');
    }

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = rootEl.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        rootEl.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // --- Navigation Background on Scroll ---
    const nav = document.querySelector('.site-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // --- Intersection Observer for Content Reveal ---
    const revealElements = document.querySelectorAll('.reveal');

    const revealOptions = {
        root: null,
        rootMargin: '0px 0px -15% 0px', // Trigger slightly before the element enters the viewport completely
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Stop observing once revealed
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // Parallax removed in favor of a static, full-height viewport background


    // --- Floating Whatsapp Button Logic ---
    const waWidget = document.getElementById('wa-widget');
    const waToggleBtn = document.getElementById('wa-toggle-btn');
    const waMenu = document.getElementById('wa-menu');
    const waMainIcon = waToggleBtn.querySelector('.wa-main-icon');
    const waCloseIcon = waToggleBtn.querySelector('.wa-close-icon');

    function toggleWaMenu() {
        const isExpanded = waToggleBtn.getAttribute('aria-expanded') === 'true';

        if (isExpanded) {
            // Close menu
            waToggleBtn.setAttribute('aria-expanded', 'false');
            waToggleBtn.classList.remove('active');
            waMenu.classList.remove('expanded');
            waMenu.setAttribute('aria-hidden', 'true');

            // Icon swap animation
            waMainIcon.style.opacity = '1';
            waMainIcon.style.transform = 'scale(1) rotate(0deg)';
            waMainIcon.style.display = 'block';

            waCloseIcon.style.opacity = '0';
            waCloseIcon.style.transform = 'scale(0) rotate(-90deg)';
            setTimeout(() => {
                if (waToggleBtn.getAttribute('aria-expanded') === 'false') {
                    waCloseIcon.style.display = 'none';
                }
            }, 300);

        } else {
            // Open menu
            waToggleBtn.setAttribute('aria-expanded', 'true');
            waToggleBtn.classList.add('active');
            waMenu.classList.add('expanded');
            waMenu.setAttribute('aria-hidden', 'false');

            // Icon swap animation
            waMainIcon.style.opacity = '0';
            waMainIcon.style.transform = 'scale(0) rotate(90deg)';
            setTimeout(() => { waMainIcon.style.display = 'none'; }, 300);

            waCloseIcon.style.display = 'block';
            // Slight delay to allow display block to apply before animating opacity
            requestAnimationFrame(() => {
                waCloseIcon.style.opacity = '1';
                waCloseIcon.style.transform = 'scale(1) rotate(0deg)';
            });
        }
    }

    // Click on toggle button
    waToggleBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // prevent document click listener from firing immediately
        toggleWaMenu();
    });

    // Click outside to close
    document.addEventListener('click', (e) => {
        const isExpanded = waToggleBtn.getAttribute('aria-expanded') === 'true';
        if (isExpanded && !waWidget.contains(e.target)) {
            toggleWaMenu();
        }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        const isExpanded = waToggleBtn.getAttribute('aria-expanded') === 'true';
        if (e.key === 'Escape' && isExpanded) {
            toggleWaMenu();
            waToggleBtn.focus(); // Return focus for accessibility
        }
    });

});
