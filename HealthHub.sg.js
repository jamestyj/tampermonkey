// ==UserScript==
// @name         HealthHub
// @namespace    http://tampermonkey.net/
// @version      2024-09-27
// @description  Make Appointments page print friendly
// @author       James Tan
// @match        https://eservices.healthhub.sg/Appointments/Dashboard/Index/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=healthhub.sg
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    document.getElementById("sidebar").remove();
    document.getElementById("main").style.padding = 0;

    setInterval(function() {
        for (const className of [
            "dashboard__nav__bottom__button",
            "global-footer page-holder",
            "breadcrumbs-area",
            "global-logo-bar",
            "top-holder",
            "add-tab-nav",
            "dashboard__nav__action col",
            "card__buttons",
            "card__button",
            "card__bottom",
            "card__top__cal-add",
            "btn-back-to-top"
        ]) {
            for (const e of document.getElementsByClassName(className)) {
                if (e) e.remove();
            }
        }
    }, 1000);

})();
