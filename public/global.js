/**
 * THAI PRO LOGISTICS 2018 CO., LTD — Global Site Enhancements
 * #2  Toast Notifications
 * #11 Smooth Page Transitions
 * #12 Dark Mode Toggle
 * #13 Back to Top Button
 */

(function () {
    'use strict';

    /* =============================================
     * #2  TOAST NOTIFICATION SYSTEM
     * ============================================= */
    const toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.style.cssText = `
        position: fixed; bottom: 1.5rem; right: 1.5rem; z-index: 99999;
        display: flex; flex-direction: column; gap: 0.75rem;
        pointer-events: none;
    `;
    document.body.appendChild(toastContainer);

    window.showToast = function (message, type = 'info', duration = 4000) {
        const icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };
        const colors = {
            success: { bg: '#f0fdf4', border: '#22c55e', text: '#15803d' },
            error: { bg: '#fef2f2', border: '#ef4444', text: '#b91c1c' },
            info: { bg: '#eff6ff', border: '#3b82f6', text: '#1d4ed8' },
            warning: { bg: '#fffbeb', border: '#f59e0b', text: '#92400e' },
        };
        const c = colors[type] || colors.info;

        const toast = document.createElement('div');
        toast.style.cssText = `
            display: flex; align-items: center; gap: 0.75rem;
            background: ${c.bg}; border: 1.5px solid ${c.border}; color: ${c.text};
            padding: 0.9rem 1.2rem; border-radius: 10px;
            font-family: 'Inter', sans-serif; font-size: 0.9rem; font-weight: 500;
            box-shadow: 0 8px 24px rgba(0,0,0,0.12);
            animation: toastSlideIn 0.3s ease;
            pointer-events: all; max-width: 340px; min-width: 240px;
            cursor: pointer;
        `;
        toast.innerHTML = `<span style="font-size:1.1rem">${icons[type] || '💬'}</span><span style="flex:1;line-height:1.4">${message}</span><span style="opacity:.5;font-size:1rem;margin-left:4px">×</span>`;
        toast.onclick = () => dismissToast(toast);
        toastContainer.appendChild(toast);

        function dismissToast(el) {
            el.style.animation = 'toastSlideOut 0.3s ease forwards';
            setTimeout(() => el.remove(), 300);
        }

        setTimeout(() => dismissToast(toast), duration);
        return toast;
    };

    // Inject toast keyframe animations
    const toastStyle = document.createElement('style');
    toastStyle.textContent = `
        @keyframes toastSlideIn {
            from { opacity: 0; transform: translateX(60px) scale(0.95); }
            to   { opacity: 1; transform: translateX(0) scale(1); }
        }
        @keyframes toastSlideOut {
            from { opacity: 1; transform: translateX(0) scale(1); }
            to   { opacity: 0; transform: translateX(60px) scale(0.95); }
        }
    `;
    document.head.appendChild(toastStyle);


    /* =============================================
     * #11 SMOOTH PAGE TRANSITIONS
     * ============================================= */
    const fadeOverlay = document.createElement('div');
    fadeOverlay.id = 'page-fade-overlay';
    fadeOverlay.style.cssText = `
        position: fixed; inset: 0; z-index: 99998; pointer-events: none;
        background: #ffffff; opacity: 0; transition: opacity 0.25s ease;
    `;
    document.body.appendChild(fadeOverlay);

    // Fade in on load
    window.addEventListener('load', () => {
        fadeOverlay.style.opacity = '0';
    });
    document.addEventListener('DOMContentLoaded', () => {
        fadeOverlay.style.opacity = '0';
    });

    // Intercept navigation links to fade out before going
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a[href]');
        if (!link) return;
        const href = link.getAttribute('href');
        // Only for same-origin .html links, not anchors or external
        if (!href || href.startsWith('#') || href.startsWith('javascript') ||
            href.startsWith('http') || link.target === '_blank') return;
        if (link.hasAttribute('data-no-transition')) return;

        e.preventDefault();
        fadeOverlay.style.pointerEvents = 'all';
        fadeOverlay.style.opacity = '1';
        setTimeout(() => { window.location.href = href; }, 260);
    });


    /* #12 Dark Mode Toggle - REMOVED */


    /* =============================================
     * #13 BACK TO TOP BUTTON
     * ============================================= */
    const backToTopBtn = document.createElement('button');
    backToTopBtn.id = 'back-to-top';
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.title = 'Back to top';
    backToTopBtn.style.cssText = `
        position: fixed; bottom: 1.5rem; left: 1.5rem; z-index: 9999;
        width: 44px; height: 44px; border-radius: 50%;
        background: var(--clr-secondary); color: white;
        border: none; font-size: 1.2rem; cursor: pointer;
        box-shadow: 0 4px 16px rgba(30,58,138,0.35);
        opacity: 0; transform: translateY(10px);
        transition: opacity 0.3s ease, transform 0.3s ease;
        pointer-events: none; display: flex; align-items: center; justify-content: center;
    `;
    document.body.appendChild(backToTopBtn);

    window.addEventListener('scroll', () => {
        const show = window.scrollY > 400;
        backToTopBtn.style.opacity = show ? '1' : '0';
        backToTopBtn.style.transform = show ? 'translateY(0)' : 'translateY(10px)';
        backToTopBtn.style.pointerEvents = show ? 'all' : 'none';
    }, { passive: true });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

})();
