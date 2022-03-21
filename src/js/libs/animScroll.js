
const animatedItems = document.querySelectorAll('._anim-item');

let count1 = 0.1;
let count2 = 1;
let counterStopped = false;

if (animatedItems.length > 0) {
    animOnScroll();
    window.addEventListener("scroll", animOnScroll);
    function animOnScroll(params) {
        for (let index = 0; index < animatedItems.length; index++) {
            const animatedItem = animatedItems[index];
            const animatedItemHeight = animatedItem.offsetHeight;
            const animatedItemOffset = offset(animatedItem).top;
            const animationStart = 4;

            let animatedItemPoint = window.innerHeight - animatedItemHeight / animationStart;

            if (animatedItemHeight > window.innerHeight) {
                animatedItemPoint = window.innerHeight - animatedItemHeight / animationStart;
            }

            if ((pageYOffset > animatedItemOffset - animatedItemPoint) && pageYOffset < (animatedItemOffset + animatedItemHeight)) {
                animatedItem.classList.add('_active');
                if (animatedItem.classList.contains('results-block__values')) {

                    LaunchCounter();
                    counterStopped = true;

                }

            } else {
                if (!animatedItem.classList.contains('_stop-anim')) {
                    animatedItem.classList.remove('_active');
                }

            }
        }
    }

    function offset(el) {
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return {
            top: rect.top + scrollTop,
            left: rect.left + scrollLeft
        }
    }
    setTimeout(() => {
        animOnScroll();
    }, 7000);

    function LaunchCounter() {
        if (!counterStopped) {
            let counter1 = setInterval(counting1, 100);
            let counter2 = setInterval(counting2, 50);

            function counting1() {

                count1 = count1 + 0.1;
                document.querySelector('.values__number_dec span').innerHTML = count1.toFixed(1);


                if (count1.toFixed(1) === 3.5.toFixed(1)) {
                    clearInterval(counter1);
                }
            }

            function counting2() {
                count2 += 1;

                document.querySelector('.values__number_prc span').innerHTML = count2 + '%';

                if (count2 === 90) {
                    clearInterval(counter2);
                }
            }
        }

    }





    window.onload = animOnScroll;

}




