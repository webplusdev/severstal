//Formated numbers
//import './libs/wNumb.min.js';

//Dynamic adaptivity
//import "./libs/dynamic_adapt.js"
//Pop-up
//import "./libs/popup.js";
//import "./libs/tippy.js";
//import "./libs/slider.js";
import "./libs/animScroll.js";
import "./libs/ibg.js";
//import "./libs/scrollHeader.js";

import * as scriptFunc from "./modules/functions.js";
//Add webp format
scriptFunc.isWebp();
//Spoilers
//scriptFunc.spoilers();
//Add touch class
//scriptFunc.addTouchClass();
//Add loaded for HTML
//scriptFunc.addLoadedClass();
//Tabs
//scriptFunc.tabs();
//Show more
//scriptFunc.showMore();
//Burger
//scriptFunc.menuInit();
//float panel
//scriptFunc.fullVHfix();


function main() {

    document.addEventListener("click", documentActions);

    function documentActions(e) {
        const targetEl = e.target;


    }

}

window.onload = main;