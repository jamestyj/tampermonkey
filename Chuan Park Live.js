// ==UserScript==
// @name         Chuan Park Live
// @namespace    http://tampermonkey.net/
// @version      2024-11-10
// @description  try to take over the world!
// @author       You
// @match        file:///C:/Users/Admin/Downloads/LIVE%20CHUAN%20PARK%2010%20NOV%202024%20-%20Google%20Drive.html
// @match        https://docs.google.com/spreadsheets/d/e/2PACX-1vRslecCwNKX9fViqIz8Qt1MsWUt_xv6r1oTSeMtOBB54Xrmn6tKIpMaKgwqEWBu7tNw4DU6r6-FMfHX/pubhtml?gid=1333961264&single=true
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function findFloor(row) {
        const rowsPerFloor = 5;
        const offset = 2;
        let i = 0;

        // floor 22: rows 2-6
        for (let floor=22; floor>0; floor--) {
           if (row >= (rowsPerFloor*i)+offset && row < (rowsPerFloor*(i+1))+offset) return floor;
           i++;
        }

        i = 23;
        // floor 19: rows 117-121
        for (let floor=19; floor>0; floor--) {
           if (row >= (rowsPerFloor*i)+offset && row < (rowsPerFloor*(i+1))+offset) return floor;
           i++;
        }

        return null;
    }

    // all other rows:
    // col  2 = stack 01
    // col 10 = stack 09

    // row 1:
    // col  1 = stack 01
    // col  9 = stack 09
    let col2Stack = {};
    function findStack(row, col, colNode) {
        const TOP_TABLE_MAX_ROW = 112;
        const TOP_TABLE_FIRST_FLOOR_ROW = 62;
        const ROWS_PER_FLOOR = 5;

        if (row == 0) {
            if ((col >= 2 && col <= 10) || ( col >= 13 && col <= 21) || ( col >= 24 && col <= 32)) {
                let stack = Number(colNode.textContent);
                col2Stack[col] = stack;
                return stack;
            }
            return null;
        }
        else if (row >= TOP_TABLE_MAX_ROW) {
            return null;
        }
        else if (row >= 102 && col >= 3 && ((row-TOP_TABLE_FIRST_FLOOR_ROW) % ROWS_PER_FLOOR == 0)) {
            // row == 62, 67, ..., 97
            return col2Stack[col+1];
        }
        else if ((row-TOP_TABLE_FIRST_FLOOR_ROW) % ROWS_PER_FLOOR == 0) {
            // row == 62, 67, ..., 97
            return col2Stack[col];
        }
        else if (row >= 98 && col >= 2) {
            return col2Stack[col+2];
        }
        else {
            return col2Stack[col+1];
        }
        return null;
    }

    // Remove floors > 10
    //var curr = document.getElementsByClassName("waffle")[0].getElementsByTagName("tbody")[0].firstChild;
    var curr = document.getElementById("1333961264R1").parentElement;
    var next = curr.nextSibling;
    var row = 0;
    var floor = null;
    var nodesToDelete = [];
    while (curr) {
        floor = findFloor(row);
        // Don't remove floor 1 as it breaks due to rowspan for some stacks (e.g. 2, 17, 20)
        if (floor > 10) {
            curr.remove();
        } else {
            if (curr.hasChildNodes()) {
                let numOfChildren = curr.children.length;
                let colNode = null;
                let stack = null;
                for (let col=0; col<numOfChildren; col++) {
                    colNode = curr.children[col];
                    stack = findStack(row, col, colNode);

                    const DEBUG = true;
                    if (DEBUG) {
                        if (floor != null && stack != null) {
                            let f = String(floor).padStart(2,'0');
                            let s = String(stack).padStart(2,'0');
                            colNode.textContent = `#${f}-${s}; r=${row} c=${col}: ` + colNode.textContent;
                        }
                        else if (stack != null) {
                            let s = String(stack).padStart(2,'0');
                            colNode.textContent = `${s}; r=${row} c=${col}: ` + colNode.textContent;
                        }
                    }

                    if (stack != null && stack != 5 && stack !=8 && stack != 11 && stack != 14) {
                        //console.log("push", floor, stack, row, col, colNode);
                        //nodesToDelete.push(colNode);
                    }
                }
            }
        }

        curr = next;
        if (next != null) next = next.nextSibling;
        row++;
    }

    for (const n of nodesToDelete) {
        console.log("remove", n);
        n.remove();
    }
})();
