/* assets/js/services.js */

'use strict';

(function () {
    const SELECTORS = {
        servicePage: '.service-page',
        featureCards: '.service-feature-card',
        relatedCards: '.service-related-card',
        servicePhotos: '.service-photo',
        marquee: '.service-marquee'
    };

    const qsa = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

    function setReadyState() {
        const servicePage = document.querySelector(SELECTORS.servicePage);

        if (!servicePage) return;

        requestAnimationFrame(() => {
            servicePage.classList.add('is-ready');
        });
    }

    function initCardFocusStates() {
        const interactiveCards = [
            ...qsa(SELECTORS.featureCards),
            ...qsa(SELECTORS.relatedCards),
            ...qsa(SELECTORS.servicePhotos)
        ];

        interactiveCards.forEach((card) => {
            card.addEventListener('pointerenter', () => {
                card.classList.add('is-hovered');
            });

            card.addEventListener('pointerleave', () => {
                card.classList.remove('is-hovered');
            });

            card.addEventListener('focusin', () => {
                card.classList.add('is-hovered');
            });

            card.addEventListener('focusout', () => {
                card.classList.remove('is-hovered');
            });
        });
    }

    function pauseMarqueeOnFocus() {
        const marquee = document.querySelector(SELECTORS.marquee);

        if (!marquee) return;

        marquee.addEventListener('pointerenter', () => {
            marquee.classList.add('is-paused');
        });

        marquee.addEventListener('pointerleave', () => {
            marquee.classList.remove('is-paused');
        });

        marquee.addEventListener('focusin', () => {
            marquee.classList.add('is-paused');
        });

        marquee.addEventListener('focusout', () => {
            marquee.classList.remove('is-paused');
        });
    }

    function initServicePage() {
        setReadyState();
        initCardFocusStates();
        pauseMarqueeOnFocus();

        if (window.AegisHome && typeof window.AegisHome.safeCreateIcons === 'function') {
            window.AegisHome.safeCreateIcons();
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initServicePage);
    } else {
        initServicePage();
    }
})();