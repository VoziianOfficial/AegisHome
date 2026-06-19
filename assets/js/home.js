/* assets/js/home.js */

'use strict';

(function () {
    const SELECTORS = {
        serviceCardsRoot: '[data-home-service-cards]',
        serviceCard: '[data-home-service-card]',
        serviceToggle: '[data-home-service-toggle]',
        servicePanel: '[data-home-service-panel]',

        priorityList: '[data-priority-list]',
        priorityCard: '[data-priority-card]',
        priorityPreview: '.home-priorities__preview',
        priorityPreviewImage: '[data-priority-preview-image]',
        priorityPreviewTitle: '[data-priority-preview-title]',
        priorityPreviewCaption: '[data-priority-preview-caption]',

        questionsRoot: '[data-home-questions]',
        questionCard: '[data-home-question-card]',
        questionPanel: '[data-home-question-panel]',
        questionIcon: '[data-home-question-icon]',
        questionKicker: '[data-home-question-kicker]',
        questionTitle: '[data-home-question-title]',
        questionText: '[data-home-question-text]',
        questionPoints: '[data-home-question-points]',
        questionLink: '[data-home-question-link]',
        questionLinkText: '[data-home-question-link-text]'
    };

    const CLASSES = {
        open: 'is-open',
        active: 'is-active',
        changing: 'is-changing'
    };

    const qs = (selector, scope = document) => scope.querySelector(selector);
    const qsa = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

    function setServiceCardState(card, isOpen) {
        const toggle = qs(SELECTORS.serviceToggle, card);
        const panel = qs(SELECTORS.servicePanel, card);

        card.classList.toggle(CLASSES.open, isOpen);

        if (toggle) {
            toggle.setAttribute('aria-expanded', String(isOpen));
        }

        if (panel) {
            panel.setAttribute('aria-hidden', String(!isOpen));
        }
    }

    function initHomeServiceCards() {
        const root = qs(SELECTORS.serviceCardsRoot);
        if (!root) return;

        const cards = qsa(SELECTORS.serviceCard, root);
        if (!cards.length) return;

        cards.forEach((card, index) => {
            const toggle = qs(SELECTORS.serviceToggle, card);
            const panel = qs(SELECTORS.servicePanel, card);

            if (!toggle || !panel) return;

            const panelId = panel.id || `home-service-panel-${index + 1}`;
            const toggleId = toggle.id || `home-service-toggle-${index + 1}`;

            panel.id = panelId;
            toggle.id = toggleId;

            toggle.setAttribute('aria-controls', panelId);
            panel.setAttribute('aria-labelledby', toggleId);

            const shouldOpen = card.classList.contains(CLASSES.open);
            setServiceCardState(card, shouldOpen);

            toggle.addEventListener('click', () => {
                const isCurrentlyOpen = card.classList.contains(CLASSES.open);

                cards.forEach((otherCard) => {
                    setServiceCardState(otherCard, false);
                });

                setServiceCardState(card, !isCurrentlyOpen);
            });
        });
    }

    function preloadImage(src) {
        if (!src) return;

        const image = new Image();
        image.src = src;
    }

    function updatePriorityPreview(card, elements) {
        const imageSrc = card.dataset.priorityImage;
        const title = card.dataset.priorityTitle;
        const caption = card.dataset.priorityCaption;

        if (!imageSrc || !title || !caption) return;

        const {
            cards,
            preview,
            previewImage,
            previewTitle,
            previewCaption
        } = elements;

        cards.forEach((item) => {
            item.classList.remove(CLASSES.active);
            item.setAttribute('aria-pressed', 'false');
        });

        card.classList.add(CLASSES.active);
        card.setAttribute('aria-pressed', 'true');

        if (!preview || !previewImage || !previewTitle || !previewCaption) return;

        preview.classList.add(CLASSES.changing);

        const nextImage = new Image();

        nextImage.onload = () => {
            window.setTimeout(() => {
                previewImage.src = imageSrc;
                previewImage.alt = `${title} home security preview`;
                previewTitle.textContent = title;
                previewCaption.textContent = caption;

                preview.classList.remove(CLASSES.changing);
            }, 130);
        };

        nextImage.onerror = () => {
            previewTitle.textContent = title;
            previewCaption.textContent = caption;
            preview.classList.remove(CLASSES.changing);
        };

        nextImage.src = imageSrc;
    }

    function initHomePriorities() {
        const priorityList = qs(SELECTORS.priorityList);
        if (!priorityList) return;

        const cards = qsa(SELECTORS.priorityCard, priorityList);
        if (!cards.length) return;

        const preview = qs(SELECTORS.priorityPreview);
        const previewImage = qs(SELECTORS.priorityPreviewImage);
        const previewTitle = qs(SELECTORS.priorityPreviewTitle);
        const previewCaption = qs(SELECTORS.priorityPreviewCaption);

        cards.forEach((card) => {
            preloadImage(card.dataset.priorityImage);
        });

        cards.forEach((card) => {
            card.addEventListener('click', () => {
                if (card.classList.contains(CLASSES.active)) return;

                updatePriorityPreview(card, {
                    cards,
                    preview,
                    previewImage,
                    previewTitle,
                    previewCaption
                });
            });

            card.addEventListener('keydown', (event) => {
                const currentIndex = cards.indexOf(card);
                let nextIndex = currentIndex;

                if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
                    nextIndex = currentIndex + 1;
                }

                if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
                    nextIndex = currentIndex - 1;
                }

                if (event.key === 'Home') {
                    nextIndex = 0;
                }

                if (event.key === 'End') {
                    nextIndex = cards.length - 1;
                }

                if (nextIndex === currentIndex) return;

                event.preventDefault();

                if (nextIndex < 0) {
                    nextIndex = cards.length - 1;
                }

                if (nextIndex >= cards.length) {
                    nextIndex = 0;
                }

                const nextCard = cards[nextIndex];
                nextCard.focus();

                updatePriorityPreview(nextCard, {
                    cards,
                    preview,
                    previewImage,
                    previewTitle,
                    previewCaption
                });
            });
        });
    }

    function updateHomeQuestion(card, elements) {
        if (!card || !elements.panel) return;

        const icon = card.dataset.questionIcon || 'shield-question';
        const kicker = card.dataset.questionKicker || '';
        const title = card.dataset.questionTitle || '';
        const text = card.dataset.questionText || '';
        const points = (card.dataset.questionPoints || '')
            .split('|')
            .map((point) => point.trim())
            .filter(Boolean);
        const link = card.dataset.questionLink || 'all-services.html';
        const linkText = card.dataset.questionLinkText || 'Compare Services';

        elements.cards.forEach((item) => {
            item.classList.remove(CLASSES.active);
            item.setAttribute('aria-pressed', 'false');
        });

        card.classList.add(CLASSES.active);
        card.setAttribute('aria-pressed', 'true');

        elements.panel.classList.add(CLASSES.changing);

        window.setTimeout(() => {
            if (elements.icon) {
                elements.icon.setAttribute('data-lucide', icon);
            }

            if (elements.kicker) {
                elements.kicker.textContent = kicker;
            }

            if (elements.title) {
                elements.title.textContent = title;
            }

            if (elements.text) {
                elements.text.textContent = text;
            }

            if (elements.points) {
                elements.points.innerHTML = points
                    .map((point) => `
                    <li>
                        <i data-lucide="check" aria-hidden="true"></i>
                        ${point}
                    </li>
                `)
                    .join('');
            }

            if (elements.link) {
                elements.link.setAttribute('href', link);
            }

            if (elements.linkText) {
                elements.linkText.textContent = linkText;
            }

            elements.panel.classList.remove(CLASSES.changing);

            if (window.AegisHome && typeof window.AegisHome.safeCreateIcons === 'function') {
                window.AegisHome.safeCreateIcons();
            }
        }, 120);
    }

    function initHomeQuestions() {
        const root = qs(SELECTORS.questionsRoot);
        if (!root) return;

        const cards = qsa(SELECTORS.questionCard, root);
        const panel = qs(SELECTORS.questionPanel, root);

        if (!cards.length || !panel) return;

        const elements = {
            cards,
            panel,
            icon: qs(SELECTORS.questionIcon, panel),
            kicker: qs(SELECTORS.questionKicker, panel),
            title: qs(SELECTORS.questionTitle, panel),
            text: qs(SELECTORS.questionText, panel),
            points: qs(SELECTORS.questionPoints, panel),
            link: qs(SELECTORS.questionLink, panel),
            linkText: qs(SELECTORS.questionLinkText, panel)
        };

        cards.forEach((card) => {
            card.addEventListener('click', () => {
                if (card.classList.contains(CLASSES.active)) return;
                updateHomeQuestion(card, elements);
            });

            card.addEventListener('keydown', (event) => {
                const currentIndex = cards.indexOf(card);
                let nextIndex = currentIndex;

                if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
                    nextIndex = currentIndex + 1;
                }

                if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
                    nextIndex = currentIndex - 1;
                }

                if (event.key === 'Home') {
                    nextIndex = 0;
                }

                if (event.key === 'End') {
                    nextIndex = cards.length - 1;
                }

                if (nextIndex === currentIndex) return;

                event.preventDefault();

                if (nextIndex < 0) {
                    nextIndex = cards.length - 1;
                }

                if (nextIndex >= cards.length) {
                    nextIndex = 0;
                }

                const nextCard = cards[nextIndex];
                nextCard.focus();
                updateHomeQuestion(nextCard, elements);
            });
        });
    }

    function initHomePage() {
        initHomeServiceCards();
        initHomePriorities();
        initHomeQuestions();

        if (window.AegisHome && typeof window.AegisHome.safeCreateIcons === 'function') {
            window.AegisHome.safeCreateIcons();
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initHomePage);
    } else {
        initHomePage();
    }
})();
