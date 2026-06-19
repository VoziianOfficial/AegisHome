/* assets/js/pages.js */

'use strict';

(function () {
    const SELECTORS = {
        aboutSwiper: '[data-about-swiper]'
    };

    const qs = (selector, scope = document) => scope.querySelector(selector);

    function initAboutSwiper() {
        const swiperElement = qs(SELECTORS.aboutSwiper);

        if (!swiperElement || !window.Swiper) return;

        const paginationElement = qs('.about-swiper__pagination', swiperElement);
        const nextButton = qs('.about-swiper__button--next', swiperElement);
        const prevButton = qs('.about-swiper__button--prev', swiperElement);

        const swiper = new Swiper(swiperElement, {
            slidesPerView: 1,
            spaceBetween: 22,
            loop: true,
            speed: 720,
            grabCursor: true,

            autoplay: {
                delay: 6200,
                disableOnInteraction: true
            },

            pagination: {
                el: paginationElement,
                clickable: true
            },

            navigation: {
                nextEl: nextButton,
                prevEl: prevButton
            },

            keyboard: {
                enabled: true,
                onlyInViewport: true
            },

            a11y: {
                enabled: true,
                prevSlideMessage: 'Previous homeowner feedback',
                nextSlideMessage: 'Next homeowner feedback',
                paginationBulletMessage: 'Go to feedback {{index}}'
            },

            breakpoints: {
                0: {
                    slidesPerView: 1,
                    spaceBetween: 16
                },
                768: {
                    slidesPerView: 1,
                    spaceBetween: 22
                },
                1180: {
                    slidesPerView: 1,
                    spaceBetween: 24
                }
            }
        });

        swiper.on('slideChangeTransitionEnd', () => {
            if (window.AegisHome && typeof window.AegisHome.safeCreateIcons === 'function') {
                window.AegisHome.safeCreateIcons();
            }
        });
    }

    function initPageInteractions() {
        initAboutSwiper();

        if (window.AegisHome && typeof window.AegisHome.safeCreateIcons === 'function') {
            window.AegisHome.safeCreateIcons();
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPageInteractions);
    } else {
        initPageInteractions();
    }
})();