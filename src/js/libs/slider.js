// core version + navigation, pagination modules:
import Swiper, { Pagination, Parallax, Autoplay } from 'swiper';

let sliders = document.querySelectorAll('._swiper');
if (sliders) {
    for (let i = 0; i < sliders.length; i++) {
        let slider = sliders[i];
        if (!slider.classList.contains('swiper-build')) {
            let slider_items = slider.firstElementChild.children;
            if (slider_items) {
                for (let i = 0; i < slider_items.length; i++) {
                    let el = slider_items[i];
                    el.classList.add('swiper-slide');
                }
            }
            let slider_content = slider.innerHTML;
            //let slider_wrapper = document.createElement('div');
            let slider_wrapper = slider.firstElementChild;
            slider_wrapper.classList.add('swiper-wrapper');
            // slider_wrapper.innerHTML = slider_content;
            // slider.innerHTML = '';
            // slider.appendChild(slider_wrapper);
            slider.classList.add('swiper-build');

            if (slider.classList.contains('_swiper_scroll')) {
                let sliderScroll = document.createElement('div');
                sliderScroll.classList.add('swiper-scrollbar');
                slider.appendChild(sliderScroll);
            }
        }
        sliders_build_callback();
    }
}

function sliders_build_callback(params) { }

// let sliderScrollItems = document.querySelectorAll('._swiper_scroll');
// if (sliderScrollItems.length > 0) {
//     for (let i = 0; i < sliderScrollItems.length; i++) {
//         const sliderScrollItem = sliderScrollItems[i];
//         const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
//         const sliderScroll = new Swiper(sliderScrollItem, {
//             observer: true,
//             observeParents: true,
//             direction: 'vertical',
//             slidesPerView: 'auto',
//             freeMode: true,
//             scrollbar: {
//                 el: sliderScrollBar,
//                 draggable: true,
//                 snaOnRelease: false
//             },
//             mousewheel: {
//                 releaseOnEdges: true,
//             },
//         });
//         sliderScroll.scrollbar.updateSize();
//     }
// }

//function sliders_build_callback(params) { }

// let slider_about = new Swiper('.about__slider', {

// });

if (document.querySelector('.main-block__slider')) {
    new Swiper('.main-block__slider', {
        modules: [Pagination, Parallax, Autoplay],
        loop: true,
        observer: true,
        observeParents: true,
        slidesPerView: 1,
        spaceBetween: 50,
        parallax: true,
        //autoHeight: true,
        speed: 800,
        watchOverflow: false,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },

        // If we need pagination
        pagination: {
            el: '.controll-main-block__dots',
            clickable: true
        },

        on: {
            init: function (swiper) {
                const allSlides = document.querySelector('.fraction-controll__all');
                const allSlidesItems = document.querySelectorAll('.slide-main-block:not(.swiper-slide-duplicate)');
                allSlides.innerHTML = allSlidesItems.length;
            },
            slideChange: function (swiper) {
                const currentSlide = document.querySelector('.fraction-controll__current');
                currentSlide.innerHTML = swiper.realIndex + 1;
                // `0${swiper.activeIndex + 1}` : swiper.activeIndex + 1;
            },
        },



        // Navigation arrows

    });
}

