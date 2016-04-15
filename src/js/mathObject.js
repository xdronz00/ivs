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
 * @file   MathObject.js
 * @brief  Object wrapper around math library.
 * @author Jakub Fajkus
 * @date   10.4.2015
 */


class MathObject {
    /**
     * @brief Constructor of the MathObject
     * It declared array of the supported math operations in the math priority order(the biggest priority is first).
     */
    constructor(){
        this.operations = [
            //logical representation; human representation; type of operation
            ["factorial", "!", "after"],
            ["minus", "-", "before"],
            ["power", "^", "binary"],
            ["div", "/", "binary"],
            ["mul", "*", "binary"],
            ["modulo", "%", "binary"],
            ["plus", "+", "binary"],
            ["minus", "-", "binary"]
        ];
    }

    /**
     * @brief Check if the given operation is "before". e.g. -, log
     * @param operation {string}
     * @returns {boolean}
     */
    isBefore(operation) {
        var returnValue = false;
        this.operations.forEach(function (value) {
            if (value[0] === operation && value[2] === "before") {
                returnValue = true;
            }
        });

        return returnValue;
    }


    /**
     * @brief Check if the given operation is "after". e.g. !
     * @param operation {string}
     * @returns {boolean}
     */
    isAfter(operation) {
        var returnValue = false;
        this.operations.forEach(function (value) {
            if (value[0] === operation && value[2] === "after") {
                returnValue = true;
            }
        });

        return returnValue;
    }

    /**
     * @brief Check if the given operation is "binary". e.g. +, *, /,...
     * @param operation {string}
     * @returns {boolean}
     */
    isBinary(operation) {
        var returnValue = false;
        this.operations.forEach(function (value) {
            if (value[0] === operation && value[2] === "binary") {
                returnValue = true;
            }
        });

        return returnValue;
    }

    /**
     * @brief Get human representation of the given operation
     * @param operation {string} String logical representation of the operation. e.g. mul, div, factorial
     * @returns {string} Human readable math symbol. e.g. *, /, !
     */
    getHumanRepresentationOfOperation(operation) {
        var returnValue = "";

        this.operations.forEach(function (value) {
            if (value[0] == operation) {
                returnValue = value[1];
            }
        });

        return returnValue;
    }

    /**
     * @brief Wrapper around isNumber function
     * @param a {number}
     * @returns {boolean}
     */
    isNumber(a) {
        return isNumber(a);
    }

    /**
     * @brief Wrapper around mod function
     * @param a {number}
     * @param b {number}
     * @returns {number/NaN}
     */
    modulo(a, b) {
        return mod(a, b);
    }

    /**
     * @brief Wrapper around mod function
     * @param empty {undefined} This operand must be specified but it is not used inside the function.
     * It is there to keep the protocol of the "before" operations.
     * @param a {number}
     * @returns {number/NaN}
     */
    log(empty, a) {
        return log(a);
    }

    /**
     * @brief Wrapper around mul function
     * @param a {number}
     * @param b {number}
     * @returns {number/NaN}
     */
    mul(a, b) {
        return multiply(a, b);
    }

    /**
     * @brief Wrapper around div function
     * @param a {number}
     * @param b {number}
     * @returns {number/NaN}
     */
    div(a, b) {
        return divide(a, b);
    }

    /**
     * @brief Wrapper around plus function
     * @param a {number}
     * @param b {number}
     * @returns {number/NaN}
     */
    plus(a, b) {
        return add(a, b);
    }

    /**
     * @brief Wrapper around minus function
     * Can be used to calculate unary minus
     * @param a {number}
     * @param b {number}
     * @returns {number/NaN}
     */
    minus(a, b) {
        if (!isNumber(a)) {
            a = 0;
        }
        return subtract(a, b);
    }

    /**
     * @brief Wrapper around factorial function
     * @param a {number}
     * @returns {number/NaN}
     */
    factorial(a) {
        return factorial(a);
    }


    /**
     * @brief Wrapper around power function
     * @param a {number}
     * @param b {number}
     * @returns {number/NaN}
     */
    power(a, b) {
        return power(a, b);
    }
}
