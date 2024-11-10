// ==UserScript==
// @name         Chuan Park Live
// @namespace    http://tampermonkey.net/
// @version      2024-11-10
// @description  try to take over the world!
// @author       You
// @match        https://docs.google.com/spreadsheets/d/e/2PACX-1vRslecCwNKX9fViqIz8Qt1MsWUt_xv6r1oTSeMtOBB54Xrmn6tKIpMaKgwqEWBu7tNw4DU6r6-FMfHX/pubhtml?gid=1333961264&single=true
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Remove row/floors 22 to 11
    var curr = document.getElementById("1333961264R1").parentElement;
    var next = curr.nextSibling;
    var row = 0;
    while (curr) {
        if (row>=2 && row<62) curr.remove();
        curr = next;
        if (next != null) next = next.nextSibling;
        row++;
    }

    // Remove columns/units 01 to 04
    curr = document.getElementById("1333961264R1").parentElement;
    row = 0;
    while (curr) {
        if (curr.hasChildNodes()) {
            let numOfChildren = curr.children.length;
            if (row == 0) {
                curr.children[2].remove();
                curr.children[2].remove();
                curr.children[2].remove();
                curr.children[2].remove();
                curr.children[3].remove();
                curr.children[3].remove();
                curr.children[4].remove();
            }
            if (row == 1) {
                curr.children[1].remove();
                curr.children[1].remove();
                curr.children[1].remove();
                curr.children[1].remove();
                curr.children[2].remove();
                curr.children[2].remove();
                curr.children[3].remove();
            }
        }
        curr = curr.nextSibling;
        row++;
        if (row == 3) break;
    }

})();
