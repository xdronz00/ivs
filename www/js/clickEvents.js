"use strict";

//Copyright 2016 Jakub Fajkus, Miki Dronzeková, David Czernin, Đỗ Long Thành
/*
 This file is part of Kalkulacka.

 Kalkulacka is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 Kalkulacka is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with Kalkulacka.  If not, see <http://www.gnu.org/licenses/>.
*/

/**
 * @file   clickEvents.js
 * @brief  Events which control UI.
 * @author Jakub Fajkus
 * @date   10.4.2015
 */

/**
 * @brief Instance of the Core.
 */
var core = new Core();

/**
 * @brief Handle clicking on the number.
 *
 * @param element {Element} Element which was clicked on.
 */
function numberClicked(element) {
    var number = element.value;
    core.addNumber(parseInt(number));

    document.getElementById("exp").value = core.getExpressionString();
}

/**
 * @brief Handle clicking on the operation.
 *
 * @param element {Element} Element which was clicked on.
 */
function operationClicked(element) {
    var operation = element.value;

    if (operation == "equal") {
        core.calculate();
        setResult();

        return;
    }

    if (operation === "clear") {
        core.clear();
        document.getElementById("exp").value = core.getExpressionString();
        setResult();
        return;
    }

    if (operation === "dot") {
        if (core.addDot()) {
            document.getElementById("exp").value += ".";
        }

        return;
    }

    core.addOperation(operation);

    document.getElementById("exp").value = core.getExpressionString();
}

/**
 * Set result from the core result string
 */
function setResult() {
    document.getElementById("result").value = core.getResultString();
}
