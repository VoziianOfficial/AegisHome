

'use strict';

(function () {
    const SELECTORS = {
        legalPage: '.legal-page',
        legalCards: '.legal-card',
        legalSidePanel: '.legal-side-panel',
        legalContactCard: '.legal-contact__card'
    };

    const qsa = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

    function setReadyState() {
        const legalPage = document.querySelector(SELECTORS.legalPage);

        if (!legalPage) return;

        requestAnimationFrame(() => {
            legalPage.classList.add('is-ready');
        });
    }

    function initLegalHoverStates() {
        const interactiveItems = [
            ...qsa(SELECTORS.legalCards),
            ...qsa(SELECTORS.legalSidePanel),
            ...qsa(SELECTORS.legalContactCard)
        ];

        interactiveItems.forEach((item) => {
            item.addEventListener('pointerenter', () => {
                item.classList.add('is-hovered');
            });

            item.addEventListener('pointerleave', () => {
                item.classList.remove('is-hovered');
            });

            item.addEventListener('focusin', () => {
                item.classList.add('is-hovered');
            });

            item.addEventListener('focusout', () => {
                item.classList.remove('is-hovered');
            });
        });
    }

    function initLegalPage() {
        setReadyState();
        initLegalHoverStates();

        if (window.AegisHome && typeof window.AegisHome.safeCreateIcons === 'function') {
            window.AegisHome.safeCreateIcons();
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLegalPage);
    } else {
        initLegalPage();
    }
})();