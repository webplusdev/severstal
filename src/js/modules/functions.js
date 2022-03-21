//Проверка поддержки webp, добавление класса webp или no-webp для HTML
export function isWebp() {
    //Проверка поддержки webp
    function testWebP(callback) {

        let webP = new Image();
        webP.onload = webP.onerror = function () {
            callback(webP.height == 2);
        };
        webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    }
    //Добавление класса _webp или _no-webp для HTML
    testWebP(function (support) {
        let className = support === true ? 'webp' : 'no-webp';
        document.documentElement.classList.add(className);
    });
}

export function spoilers() {
    "use strict"

    const spollersArray = document.querySelectorAll('[data-spollers]');

    if (spollersArray.length > 0) {
        const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
            return !item.dataset.spollers.split(",")[0];
        });

        if (spollersRegular.length > 0) {
            initSpollers(spollersRegular);
        }

        const spollersMedia = Array.from(spollersArray).filter(function (item, index, self) {
            return item.dataset.spollers.split(",")[0];
        });

        if (spollersMedia.length > 0) {
            const breakpointsArray = [];
            spollersMedia.forEach(item => {
                const params = item.dataset.spollers;
                const breakpoint = {};
                const paramsArray = params.split(",");
                breakpoint.value = paramsArray[0];
                breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
                breakpoint.item = item;
                breakpointsArray.push(breakpoint);
            });

            let mediaQueries = breakpointsArray.map(function (item) {
                return '(' + item.type + "-width: " + item.value + "px)," + item.value + "," + item.type;
            });
            mediaQueries = mediaQueries.filter(function (item, index, self) {
                return self.indexOf(item) === index;
            });

            mediaQueries.forEach(breakpoint => {
                const paramsArray = breakpoint.split(",");
                const mediaBreakpoint = paramsArray[1];
                const mediaType = paramsArray[2];
                const matchMedia = window.matchMedia(paramsArray[0]);

                const spollersArray = breakpointsArray.filter(function (item) {
                    if (item.value === mediaBreakpoint && item.type === mediaType) {
                        return true;
                    }
                });

                matchMedia.addListener(function () {
                    initSpollers(spollersArray, matchMedia);
                });
                initSpollers(spollersArray, matchMedia);
            });
        }

        function initSpollers(spollersArray, matchMedia = false) {
            spollersArray.forEach(spollersBlock => {
                spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
                if (matchMedia.matches || !matchMedia) {
                    spollersBlock.classList.add("_init");
                    initSpollerBody(spollersBlock);
                    spollersBlock.addEventListener("click", setSpollerAction);
                } else {
                    spollersBlock.classList.remove('_init');
                    initSpollerBody(spollersBlock, false);
                    spollersBlock.removeEventListener("click", setSpollerAction);
                }
            });
        }
        function initSpollerBody(spollersBlock, hideSpollerBody = true) {
            const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
            if (spollerTitles.length > 0) {
                spollerTitles.forEach(spollerTitle => {
                    if (hideSpollerBody) {
                        spollerTitle.removeAttribute('tabindex');
                        if (!spollerTitle.classList.contains('_active')) {
                            spollerTitle.nextElementSibling.hidden = true;
                        }
                    } else {
                        spollerTitle.setAttribute('tabindex', '-1');
                        spollerTitle.nextElementSibling.hidden = false;
                    }
                });
            }
        }

        function setSpollerAction(e) {
            const el = e.target;
            if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) {
                const spollerTitle = el.hasAttribute('data-spoller') ? el : el.closest('[data-spoller]');
                const spollersBlock = spollerTitle.closest('[data-spollers]');
                const oneSpoller = spollersBlock.hasAttribute('data-one-spoller') ? true : false;
                if (!spollersBlock.querySelectorAll('._slide').length) {
                    if (oneSpoller && !spollerTitle.classList.contains('_active')) {
                        hideSpollersBody(spollersBlock);
                    }
                    spollerTitle.classList.toggle('_active');
                    slideToggle(spollerTitle.nextElementSibling, 500);
                }
                e.preventDefault();
            }
        }
        function hideSpollersBody(spollersBlock) {
            const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._active');
            if (spollerActiveTitle) {
                spollerActiveTitle.classList.remove('_active');
                slideUp(spollerActiveTitle.nextElementSibling, 500);
            }
        }
    }


    let slideUp = (target, duration = 500) => {
        if (!target.classList.contains('_slide')) {
            target.classList.add('_slide');
            target.style.transitionProperty = 'height, margin, padding';
            target.style.transitionDuration = duration + 'ms';
            target.style.boxSizing = 'border-box';
            target.style.height = target.offsetHeight + 'px';
            target.offsetHeight;
            target.style.overflow = 'hidden';
            target.style.height = 0;
            target.style.paddingTop = 0;
            target.style.paddingBottom = 0;
            target.style.marginTop = 0;
            target.style.marginBottom = 0;
            window.setTimeout(() => {
                target.hidden = true;
                target.style.removeProperty('height');
                target.style.removeProperty('padding-top');
                target.style.removeProperty('padding-bottom');
                target.style.removeProperty('margin-top');
                target.style.removeProperty('margin-bottom');
                target.style.removeProperty('overflow');
                target.style.removeProperty('transition-duration');
                target.style.removeProperty('transition-property');
                target.classList.remove('_slide');
                //alert("!");
            }, duration);
        }

    }

    let slideDown = (target, duration = 500) => {
        if (!target.classList.contains('_slide')) {
            target.classList.add('_slide');
            if (target.hidden) {
                target.hidden = false;
            }
            let height = target.offsetHeight;
            target.style.overflow = 'hidden';
            target.style.height = 0;
            target.style.paddingTop = 0;
            target.style.paddingBottom = 0;
            target.style.marginTop = 0;
            target.style.marginBottom = 0;
            target.offsetHeight;
            target.style.boxSizing = 'border-box';
            target.style.transitionProperty = "height, margin, padding";
            target.style.transitionDuration = duration + 'ms';
            target.style.height = height + 'px';
            target.style.removeProperty('padding-top');
            target.style.removeProperty('padding-bottom');
            target.style.removeProperty('margin-top');
            target.style.removeProperty('margin-bottom');
            window.setTimeout(() => {
                target.style.removeProperty('height');
                target.style.removeProperty('overflow');
                target.style.removeProperty('transition-duration');
                target.style.removeProperty('transition-property');
                target.classList.remove('_slide');
            }, duration);
        }

    }
    let slideToggle = (target, duration = 500) => {
        if (target.hidden) {
            return slideDown(target, duration);
        } else {
            return slideUp(target, duration);
        }
    }
}
//Добавление loaded для HTML после полной загрузки страницы
export function addLoadedClass() {
    window.addEventListener("load", function () {
        this.setTimeout(function () {
            document.documentElement.classList.add('loaded');
        }, 0);
    });
}
//Получение хеша в адресе сайта
export function getHash() {
    if (location.hash) { return location.hash.replace('#', ''); }
}
//Указание хеша в адресе сайта
export function setHash(hash) {
    history.pushState('', '', hash);
}
//учёт плавающей панели на мобильных устройствах при 100vh
export function fullVHfix() {
    const fullScreens = document.querySelectorAll('[data-fullscreen]');
    if (fullScreens.length && isMobile.any()) {
        window.addEventListener('resize', fixHeight);
        function fixHeight() {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }
        fixHeight();
    }
}
//Добавление класса touch, если браузер мобильный
export function addTouchClass() {
    let isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
            return (
                isMobile.Android()
                || isMobile.BlackBerry()
                || isMobile.iOS()
                || isMobile.Opera()
                || isMobile.Windows()
            );
        }
    };

    if (isMobile.any()) {
        document.querySelector('html').classList.add('touch');
    }

    function removeClasses(elem, removedClass) {
        for (index = 0; index < elem.length; index++) {
            elem[index].classList.remove(removedClass);
        }
    }

}
//Вспомогательные модули блокировки прокрутки и скочка
export let bodyLockStatus = true;
export let bodyLockToggle = (delay = 500) => {
    if (document.documentElement.classList.contains('lock')) {
        bodyUnlock(delay);
    } else {
        bodyLock(delay);
    }
}
export let bodyUnlock = (delay = 500) => {
    let body = document.querySelector("body");
    if (bodyLockStatus) {
        let lock_padding = document.querySelectorAll("[data-lp]");
        setTimeout(() => {
            for (let index = 0; index < lock_padding.length; index++) {
                const el = lock_padding[index];
                el.style.paddingRight = '0px';
            }
            body.style.paddingRight = '0px';
            document.documentElement.classList.remove("lock");
        }, delay);
        bodyLockStatus = false;
        setTimeout(function () {
            bodyLockStatus = true;
        }, delay);
    }
}

export let bodyLock = (delay = 500) => {
    let body = document.querySelector("body");
    if (bodyLockStatus) {
        let lock_padding = document.querySelectorAll("[data-lp]");
        for (let index = 0; index < lock_padding.length; index++) {
            const el = lock_padding[index];
            el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetHeight;
        }
        body.style.paddingRight = window.innerWidth = document.querySelector('.wrapper').offsetHeight;
        document.documentElement.classList.add("lock");

        bodyLockStatus = false;

        setTimeout(function () {
            bodyLockStatus = true;
        }, delay);
    }
}

export function tabs() {
    const tabs = document.querySelector('.tabs-plans');
    const tabsBtn = document.querySelectorAll('.tabs-plans__btn ');
    const tabsContent = document.querySelectorAll('.content-plans__block');

    if (tabs) {
        tabs.addEventListener('click', (e) => {
            if (e.target.classList.contains('tabs-plans__btn')) {
                const tabsPath = e.target.dataset.tabsPath;
                tabsHandler(tabsPath);

                tabsBtn.forEach(el => {
                    el.classList.remove('tabs-plans__btn_active');
                });
                document.querySelector(`[data-tabs-path="${tabsPath}"]`).classList.add('tabs-plans__btn_active');
            }

            // if (e.target.classList.contains('tabs__arrow--prev')) {
            //     let activeBtn = document.querySelector('.tabs__btn_active');
            //     let activeParent = activeBtn.closest('.tabs__item');
            //     let previousParent = activeParent.previousElementSibling;

            //     if (previousParent) {
            //         let prevActive = previousParent.querySelector('.tabs__btn');
            //         tabsBtn.forEach(el => { el.classList.remove('tabs__btn_active') });
            //         prevActive.classList.add('tabs__btn_active');

            //         let path = prevActive.dataset.tabsPath;
            //         tabsHandler(path);
            //     }
            // }
            // if (e.target.classList.contains('tabs__arrow--next')) {
            //     let activeBtn = document.querySelector('.tabs__btn--active');
            //     let activeParent = activeBtn.closest('.tabs__item');
            //     let nextParent = activeParent.nextElementSibling;

            //     if (nextParent) {
            //         let nextActive = nextParent.querySelector('.tabs__btn');
            //         tabsBtn.forEach(el => { el.classList.remove('tabs__btn_active') });
            //         nextActive.classList.add('tabs__btn--active');

            //         let path = nextActive.dataset.tabsPath;
            //         tabsHandler(path);
            //     }
            // }
        });
    }

    const tabsHandler = (path) => {


        tabsContent.forEach(el => {
            el.classList.remove('content-plans__block_active');
        });
        document.querySelector(`[data-tabs-target="${path}"]`).classList.add('content-plans__block_active');
    }

}


export function menuInit() {

    const icon_menu = document.querySelector('.icon-menu');
    const menu_body = document.querySelector('.menu');

    if (icon_menu) {
        icon_menu.addEventListener("click", function (e) {
            if (bodyLockStatus) {
                bodyLockToggle();
                //document.documentElement.classList.toggle("menu-open");
                icon_menu.classList.toggle('_active');
                if (icon_menu.classList.contains('_active')) {
                    menu_body.classList.add('_active');
                } else {
                    menu_body.classList.remove('_active');
                }
            }
        })
    }



}
