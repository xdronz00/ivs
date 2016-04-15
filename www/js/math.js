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
 * @file   math.js
 * @brief  Math library.
 * @author Miki Dronzeková, Jakub Fajkus
 * @date   10.4.2015
 */

/**
 * @brief Check if argument is number
 * @param s {*} Argument checked if it is a number
 * @return {boolean} True if argument is number. False otherwise
 */
function isNumber(s) {
    return !isNaN(s - 0) && s != null;
}

/**
 * @brief Add two numbers
 * @param a {Number} addend
 * @param b {Number} addend
 * @return {number, NaN} sum of a and b. If one of them (or both) is not a number, return NaN
 */
function add(a, b) {
    if (isNumber(a) && isNumber(b)) {
        return a + b;
    }
    return NaN;
}

/**
 * @brief Subtract two numbers
 * @param a {Number} minuend
 * @param b {Number} subtrahend
 * @return {number, NaN} difference of a and b. If one of them (or both) is not a number return NaN
 */
function subtract(a, b) {
    if (isNumber(a) && isNumber(b)) {
        return a - b;
    }
    return NaN;
}

/**
 * @brief Multiply two numbers
 * @param a {Number} factor
 * @param b {Number} factor
 * @return {number, NaN} product of a and b. If one of them (or both) is not a number return NaN
 */
function multiply(a, b) {
    if (isNumber(a) && isNumber(b)) {
        return a * b;
    }
    return NaN;
}

/**
 * @brief Divide two numbers
 * @param a {Number} dividend
 * @param b {Number} divisor
 * @return {number, NaN} quotient of a and b. If one of them (or both) is not a number return NaN
 */
function divide(a, b) {
    if (b != 0 && isNumber(a) && isNumber(b)) {
        return a / b;
    }
    return NaN;
}

/**
 * @brief Counts factorial of a number
 * @param n {Number} integer
 * @return {number, NaN} factorial of n. If n is not an integer or number, return NaN
 */
function factorial(n) {
    if (n === parseInt(n, 10) && n >= 0) {
        var res = 1;
        var i;
        for (i = 1; i <= n; i++) {
            res = res * i;
        }
        if (n == 0) {
            return 1;
        }
        return res;
    }
    return NaN;
}

/**
 * @brief Raises to a power
 * @param a {Number} base
 * @param n {Number} exponent, an integer
 * @return {number, NaN} a to power of n. If one of them (or both) is not a number return NaN. If n is not an integer also return NaN
 */
function power(a, n) {
    if (a == 0 && n == 0) {
        return NaN;
    }
    if (isNumber(a) && isNumber(n) && n >= 0 && n === parseInt(n, 10)) {
        var result = 1;
        for (var i = 1; i <= n; i++) {
            result *= a;
        }

        return result;
    }
    return NaN;
}

/**
 * @brief Counts reminder of division
 * @param a {Number} dividend
 * @param b {Number} divisor
 * @return {number, NaN} reminder of a and b. If one of them (or both) is not a number return NaN
 */
function mod(a, b) {
    if (isNumber(a) && isNumber(b)) {
        return a % b;
    }
    return NaN;
}
