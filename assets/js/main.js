/* assets/js/main.js */

'use strict';

window.AegisHome = window.AegisHome || {};

(function () {
    const SELECTORS = {
        body: 'body',
        header: '[data-site-header]',
        mobileMenu: '[data-mobile-menu]',
        mobileMenuToggle: '[data-mobile-menu-toggle]',
        mobileMenuClose: '[data-mobile-menu-close]',
        mobileMenuLink: '[data-mobile-menu-link]',
        dropdown: '[data-nav-dropdown]',
        dropdownTrigger: '[data-nav-dropdown-trigger]',
        sectionRail: '[data-section-rail]',
        sectionRailLink: '[data-section-rail-link]',
        cookieBanner: '[data-cookie-banner]',
        cookieAccept: '[data-cookie-accept]',
        cookieCancel: '[data-cookie-cancel]',
        accordion: '[data-accordion]',
        accordionItem: '[data-accordion-item]',
        accordionButton: '[data-accordion-button]',
        accordionPanel: '[data-accordion-panel]',
        currentYear: '[data-current-year]'
    };

    const CLASSES = {
        menuOpen: 'menu-open',
        menuIsOpen: 'is-open',
        toggleActive: 'is-active',
        headerScrolled: 'is-scrolled',
        active: 'is-active',
        open: 'is-open',
        visible: 'is-visible'
    };

    const STORAGE_KEYS = {
        cookieConsent: 'aegisHomeCookieConsent'
    };

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const qs = (selector, scope = document) => scope.querySelector(selector);
    const qsa = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

    function safeCreateIcons() {
        if (window.lucide && typeof window.lucide.createIcons === 'function') {
            window.lucide.createIcons();
        }
    }

    function getAOSNumber(element, attributeName) {
        if (!element || !element.hasAttribute(attributeName)) return null;

        const value = Number(element.getAttribute(attributeName));
        return Number.isFinite(value) ? value : null;
    }

    function setAOS(element, animation = 'fade-up', delay = null, duration = null) {
        if (!element) return;

        element.setAttribute('data-aos', animation);

        const resolvedDelay = delay ?? getAOSNumber(element, 'data-aos-delay');
        const resolvedDuration = duration ?? getAOSNumber(element, 'data-aos-duration');

        if (Number.isFinite(resolvedDelay) && resolvedDelay > 0) {
            element.setAttribute('data-aos-delay', String(resolvedDelay));
        } else {
            element.removeAttribute('data-aos-delay');
        }

        if (Number.isFinite(resolvedDuration) && resolvedDuration > 0) {
            element.setAttribute('data-aos-duration', String(resolvedDuration));
        } else {
            element.removeAttribute('data-aos-duration');
        }
    }

    function initAOSMarkup() {
        const cardSelectors = [
            '.home-counter',
            '.contact-counter',
            '.home-service-card',
            '.home-priority-card',
            '.service-feature-card',
            '.service-related-card',
            '.legal-card',
            '.feature-card',
            '.info-card',
            '.contact-card',
            '.home-contact__card',
            '.legal-contact__card',
            '.services-cta__card',
            '.service-photo-note',
            '.about-check-card',
            '.floating-card',
            '.services-intro__float',
            '.services-icon-strip__item'
        ].join(',');

        const photoSelectors = [
            '.image-panel',
            '.service-photo'
        ].join(',');

        const frameSelectors = [
            '.hero-frame'
        ].join(',');

        const softSelectors = [
            '.marquee',
            '.service-marquee',
            '.service-overview__media',
            '.about-overview__media',
            '.about-protection__media',
            '.services-intro__media',
            '.home-split__media',
            '.home-priorities__preview',
            '.about-reviews__slider',
            '.section-heading',
            '.service-features__top',
            '.service-related__heading',
            '.legal-content__head',
            '.service-overview__content',
            '.legal-overview__content',
            '.service-faq__content',
            '.contact-main__content',
            '.contact-faq__content',
            '.services-intro__content',
            '.home-split__content',
            '.about-overview__content',
            '.about-protection__content',
            '.about-reviews__content',
            '.home-priorities__content'
        ].join(',');

        const applyTextSequence = (container, options = {}) => {
            if (!container) return;

            const {
                kickerDelay = 0,
                titleDelay = 80,
                textDelay = 140,
                textStep = 55,
                listDelay = 250,
                buttonsDelay = 320,
                noteDelay = 260
            } = options;

            const kicker = container.querySelector('.section-kicker');
            const title = container.querySelector('h1, h2');
            const paragraphs = Array.from(container.querySelectorAll('p:not(.section-kicker)'));
            const list = container.querySelector('ul, ol');
            const buttons = container.querySelector('.btn-row');
            const note = container.querySelector('.about-reviews__note, .contact-platform-note');

            setAOS(kicker, 'fade-up', kickerDelay, 600);
            setAOS(title, 'fade-up', titleDelay, 660);

            paragraphs.forEach((paragraph, index) => {
                setAOS(paragraph, 'fade-up', textDelay + index * textStep, 660);
            });

            setAOS(list, 'fade-up', listDelay, 660);
            setAOS(buttons, 'fade-up', buttonsDelay, 660);
            setAOS(note, 'fade-up', noteDelay, 620);
        };

        document.querySelectorAll(cardSelectors).forEach((card) => {
            setAOS(card, 'aegis-card-reveal', null, 620);
        });

        document.querySelectorAll('.services-gallery__card').forEach((card) => {
            setAOS(card, 'aegis-soft-reveal', null, 620);
        });

        document.querySelectorAll(photoSelectors).forEach((photo) => {
            setAOS(photo, 'aegis-photo-reveal', null, 700);
        });

        document.querySelectorAll(frameSelectors).forEach((frame) => {
            setAOS(frame, 'aegis-frame-reveal', null, 720);
            applyTextSequence(frame, {
                kickerDelay: 90,
                titleDelay: 160,
                textDelay: 230,
                listDelay: 300,
                buttonsDelay: 300
            });
        });

        document.querySelectorAll(softSelectors).forEach((element) => {
            setAOS(element, 'aegis-soft-reveal', null, 620);
        });

        document.querySelectorAll('.section-heading, .service-features__top, .service-related__heading, .legal-content__head').forEach((group) => {
            applyTextSequence(group, {
                textDelay: 150,
                listDelay: 210,
                buttonsDelay: 240
            });
        });

        document.querySelectorAll('.service-overview__content, .legal-overview__content, .service-faq__content, .contact-main__content, .contact-faq__content, .services-intro__content, .home-split__content, .about-overview__content, .about-protection__content, .about-reviews__content, .home-priorities__content').forEach((content) => {
            applyTextSequence(content);
        });

        document.querySelectorAll('.accordion').forEach((accordion) => {
            accordion.querySelectorAll('.accordion-item').forEach((item, index) => {
                setAOS(item, 'aegis-card-reveal', Math.min(index * 55, 260), 600);
            });
        });

        document.querySelectorAll('.form-panel, .contact-main__form, form').forEach((form) => {
            const formDelay = getAOSNumber(form, 'data-aos-delay');
            setAOS(form, 'aegis-card-reveal', formDelay ?? 120, 680);
        });
    }

    function initAOS() {
        if (!window.AOS || prefersReducedMotion) return;

        initAOSMarkup();

        window.AOS.init({
            duration: 660,
            easing: 'ease-out-cubic',
            once: true,
            offset: 65,
            delay: 0,
            mirror: false,
            anchorPlacement: 'top-bottom'
        });

        const refreshAOS = () => {
            window.setTimeout(() => {
                window.AOS.refreshHard();
            }, 180);
        };

        if (document.readyState === 'complete') {
            refreshAOS();
            return;
        }

        window.addEventListener('load', refreshAOS, { once: true });
    }

    function initHeaderState() {
        const header = qs(SELECTORS.header);
        if (!header) return;

        const setState = () => {
            header.classList.toggle(CLASSES.headerScrolled, window.scrollY > 14);
        };

        setState();
        window.addEventListener('scroll', setState, { passive: true });
    }

    function initMobileMenu() {
        const body = qs(SELECTORS.body);
        const menu = qs(SELECTORS.mobileMenu);
        const toggle = qs(SELECTORS.mobileMenuToggle);
        const closeButtons = qsa(SELECTORS.mobileMenuClose);
        const menuLinks = qsa(SELECTORS.mobileMenuLink, menu || document);

        if (!body || !menu || !toggle) return;

        const focusableSelector = [
            'a[href]',
            'button:not([disabled])',
            'textarea:not([disabled])',
            'input:not([disabled])',
            'select:not([disabled])',
            '[tabindex]:not([tabindex="-1"])'
        ].join(',');

        let lastFocusedElement = null;

        const openMenu = () => {
            lastFocusedElement = document.activeElement;

            body.classList.add(CLASSES.menuOpen);
            menu.classList.add(CLASSES.menuIsOpen);
            toggle.classList.add(CLASSES.toggleActive);

            toggle.setAttribute('aria-expanded', 'true');
            menu.setAttribute('aria-hidden', 'false');

            const firstFocusable = qs(focusableSelector, menu);
            if (firstFocusable) {
                setTimeout(() => firstFocusable.focus(), 80);
            }
        };

        const closeMenu = () => {
            body.classList.remove(CLASSES.menuOpen);
            menu.classList.remove(CLASSES.menuIsOpen);
            toggle.classList.remove(CLASSES.toggleActive);

            toggle.setAttribute('aria-expanded', 'false');
            menu.setAttribute('aria-hidden', 'true');

            if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
                lastFocusedElement.focus();
            }
        };

        const toggleMenu = () => {
            const isOpen = menu.classList.contains(CLASSES.menuIsOpen);
            isOpen ? closeMenu() : openMenu();
        };

        toggle.addEventListener('click', toggleMenu);

        closeButtons.forEach((button) => {
            button.addEventListener('click', closeMenu);
        });

        menuLinks.forEach((link) => {
            link.addEventListener('click', closeMenu);
        });

        menu.addEventListener('click', (event) => {
            if (event.target === menu) {
                closeMenu();
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && menu.classList.contains(CLASSES.menuIsOpen)) {
                closeMenu();
            }

            if (event.key !== 'Tab' || !menu.classList.contains(CLASSES.menuIsOpen)) return;

            const focusableItems = qsa(focusableSelector, menu);
            if (!focusableItems.length) return;

            const firstItem = focusableItems[0];
            const lastItem = focusableItems[focusableItems.length - 1];

            if (event.shiftKey && document.activeElement === firstItem) {
                event.preventDefault();
                lastItem.focus();
            } else if (!event.shiftKey && document.activeElement === lastItem) {
                event.preventDefault();
                firstItem.focus();
            }
        });
    }

    function initDropdownAccessibility() {
        const dropdowns = qsa(SELECTORS.dropdown);

        dropdowns.forEach((dropdown) => {
            const trigger = qs(SELECTORS.dropdownTrigger, dropdown);

            if (!trigger) return;

            const openDropdown = () => {
                trigger.setAttribute('aria-expanded', 'true');
            };

            const closeDropdown = () => {
                trigger.setAttribute('aria-expanded', 'false');
            };

            dropdown.addEventListener('mouseenter', openDropdown);
            dropdown.addEventListener('mouseleave', closeDropdown);
            dropdown.addEventListener('focusin', openDropdown);
            dropdown.addEventListener('focusout', (event) => {
                if (!dropdown.contains(event.relatedTarget)) {
                    closeDropdown();
                }
            });

            trigger.addEventListener('keydown', (event) => {
                if (event.key === 'Escape') {
                    closeDropdown();
                    trigger.blur();
                }
            });
        });
    }

    function getHeaderOffset() {
        const header = qs(SELECTORS.header);
        return header ? header.offsetHeight + 8 : 0;
    }

    function initSmoothAnchors() {
        const anchorLinks = qsa('a[href^="#"]:not([href="#"])');

        anchorLinks.forEach((link) => {
            link.addEventListener('click', (event) => {
                const href = link.getAttribute('href');
                if (!href || href.length < 2) return;

                const target = qs(href);
                if (!target) return;

                event.preventDefault();

                const offset = getHeaderOffset();
                const targetTop = target.getBoundingClientRect().top + window.scrollY - offset;

                window.scrollTo({
                    top: targetTop,
                    behavior: prefersReducedMotion ? 'auto' : 'smooth'
                });

                history.pushState(null, '', href);
            });
        });
    }

    function initSectionRail() {
        const rail = qs(SELECTORS.sectionRail);
        if (!rail) return;

        const links = qsa(SELECTORS.sectionRailLink, rail);
        if (!links.length) return;

        const sectionMap = new Map();

        links.forEach((link) => {
            const href = link.getAttribute('href');
            if (!href || !href.startsWith('#')) return;

            const section = qs(href);
            if (!section) return;

            sectionMap.set(section, link);
        });

        if (!sectionMap.size) return;

        const setActive = (activeSection) => {
            links.forEach((link) => link.classList.remove(CLASSES.active));

            const activeLink = sectionMap.get(activeSection);
            if (activeLink) {
                activeLink.classList.add(CLASSES.active);
            }
        };

        const observer = new IntersectionObserver(
            (entries) => {
                const visibleEntries = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

                if (visibleEntries[0]) {
                    setActive(visibleEntries[0].target);
                }
            },
            {
                root: null,
                threshold: [0.22, 0.36, 0.5],
                rootMargin: '-18% 0px -55% 0px'
            }
        );

        sectionMap.forEach((_, section) => observer.observe(section));
    }

    function initCookieBanner() {
        const banner = qs(SELECTORS.cookieBanner);
        if (!banner) return;

        const acceptButton = qs(SELECTORS.cookieAccept, banner);
        const cancelButton = qs(SELECTORS.cookieCancel, banner);

        const storedConsent = localStorage.getItem(STORAGE_KEYS.cookieConsent);

        if (!storedConsent) {
            requestAnimationFrame(() => {
                banner.classList.add(CLASSES.visible);
                banner.setAttribute('aria-hidden', 'false');
            });
        }

        const saveChoice = (value) => {
            localStorage.setItem(STORAGE_KEYS.cookieConsent, value);
            banner.classList.remove(CLASSES.visible);
            banner.setAttribute('aria-hidden', 'true');
        };

        if (acceptButton) {
            acceptButton.addEventListener('click', () => saveChoice('accepted'));
        }

        if (cancelButton) {
            cancelButton.addEventListener('click', () => saveChoice('cancelled'));
        }
    }

    function setAccordionState(item, isOpen) {
        const button = qs(SELECTORS.accordionButton, item);
        const panel = qs(SELECTORS.accordionPanel, item);

        item.classList.toggle(CLASSES.open, isOpen);

        if (button) {
            button.setAttribute('aria-expanded', String(isOpen));
        }

        if (panel) {
            panel.hidden = false;
        }
    }

    function initAccordions(root = document) {
        const accordions = qsa(SELECTORS.accordion, root);

        accordions.forEach((accordion) => {
            const items = qsa(SELECTORS.accordionItem, accordion);
            if (!items.length) return;

            const closeOthers = accordion.dataset.accordion === 'single' || accordion.hasAttribute('data-accordion-single');

            items.forEach((item, index) => {
                const button = qs(SELECTORS.accordionButton, item);
                const panel = qs(SELECTORS.accordionPanel, item);

                if (!button || !panel) return;

                const panelId = panel.id || `aegis-accordion-panel-${Math.random().toString(36).slice(2)}`;
                const buttonId = button.id || `aegis-accordion-button-${Math.random().toString(36).slice(2)}`;

                panel.id = panelId;
                button.id = buttonId;

                button.setAttribute('aria-controls', panelId);
                panel.setAttribute('aria-labelledby', buttonId);

                const shouldOpen =
                    item.classList.contains(CLASSES.open) ||
                    item.hasAttribute('data-open') ||
                    index === 0 && accordion.hasAttribute('data-accordion-open-first');

                setAccordionState(item, shouldOpen);

                button.addEventListener('click', () => {
                    const isCurrentlyOpen = item.classList.contains(CLASSES.open);

                    if (closeOthers) {
                        items.forEach((otherItem) => {
                            if (otherItem !== item) {
                                setAccordionState(otherItem, false);
                            }
                        });
                    }

                    setAccordionState(item, !isCurrentlyOpen);
                });
            });
        });
    }

    function initCurrentYear() {
        const yearNodes = qsa(SELECTORS.currentYear);
        if (!yearNodes.length) return;

        const year = new Date().getFullYear();

        yearNodes.forEach((node) => {
            node.textContent = String(year);
        });
    }

    function animateCounter(counter) {
        if (!counter) return;

        const target = Number(counter.dataset.counterTarget || counter.textContent || 0);
        const duration = Number(counter.dataset.counterDuration || 1200);
        const suffix = counter.dataset.counterSuffix || '';
        const prefix = counter.dataset.counterPrefix || '';

        if (Number.isNaN(target)) return;

        const startTime = performance.now();

        const update = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.round(target * easedProgress);

            counter.textContent = `${prefix}${currentValue}${suffix}`;

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        };

        requestAnimationFrame(update);
    }

    function initCounters(root = document) {
        const counters = qsa('[data-counter-target]', root);
        if (!counters.length) return;

        if (prefersReducedMotion) {
            counters.forEach((counter) => {
                const target = counter.dataset.counterTarget;
                const suffix = counter.dataset.counterSuffix || '';
                const prefix = counter.dataset.counterPrefix || '';
                counter.textContent = `${prefix}${target}${suffix}`;
            });
            return;
        }

        const observer = new IntersectionObserver(
            (entries, counterObserver) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                });
            },
            {
                threshold: 0.45
            }
        );

        counters.forEach((counter) => observer.observe(counter));
    }

    function initImageReveal(root = document) {
        const revealItems = qsa('[data-image-reveal]', root);
        if (!revealItems.length || prefersReducedMotion) return;

        const observer = new IntersectionObserver(
            (entries, imageObserver) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    entry.target.classList.add('is-revealed');
                    imageObserver.unobserve(entry.target);
                });
            },
            {
                threshold: 0.2
            }
        );

        revealItems.forEach((item) => observer.observe(item));
    }

    function initExternalLinks() {
        const links = qsa('a[target="_blank"]');

        links.forEach((link) => {
            const rel = link.getAttribute('rel') || '';
            const relValues = new Set(rel.split(' ').filter(Boolean));

            relValues.add('noopener');
            relValues.add('noreferrer');

            link.setAttribute('rel', Array.from(relValues).join(' '));
        });
    }

    function initGlobal() {
        safeCreateIcons();
        initAOS();
        initHeaderState();
        initMobileMenu();
        initDropdownAccessibility();
        initSmoothAnchors();
        initSectionRail();
        initCookieBanner();
        initAccordions();
        initCounters();
        initImageReveal();
        initCurrentYear();
        initExternalLinks();
    }

    window.AegisHome.safeCreateIcons = safeCreateIcons;
    window.AegisHome.initAccordions = initAccordions;
    window.AegisHome.initCounters = initCounters;
    window.AegisHome.animateCounter = animateCounter;
    window.AegisHome.initImageReveal = initImageReveal;

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initGlobal);
    } else {
        initGlobal();
    }
})();
