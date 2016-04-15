"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

var MathObject = function () {
    /**
     * @brief Constructor of the MathObject
     * It declared array of the supported math operations in the math priority order(the biggest priority is first).
     */

    function MathObject() {
        _classCallCheck(this, MathObject);

        this.operations = [
        //logical representation; human representation; type of operation
        ["factorial", "!", "after"], ["minus", "-", "before"], ["power", "^", "binary"], ["div", "/", "binary"], ["mul", "*", "binary"], ["modulo", "%", "binary"], ["plus", "+", "binary"], ["minus", "-", "binary"]];
    }

    /**
     * @brief Check if the given operation is "before". e.g. -, log
     * @param operation {string}
     * @returns {boolean}
     */


    _createClass(MathObject, [{
        key: "isBefore",
        value: function isBefore(operation) {
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

    }, {
        key: "isAfter",
        value: function isAfter(operation) {
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

    }, {
        key: "isBinary",
        value: function isBinary(operation) {
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

    }, {
        key: "getHumanRepresentationOfOperation",
        value: function getHumanRepresentationOfOperation(operation) {
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

    }, {
        key: "isNumber",
        value: function (_isNumber) {
            function isNumber(_x) {
                return _isNumber.apply(this, arguments);
            }

            isNumber.toString = function () {
                return _isNumber.toString();
            };

            return isNumber;
        }(function (a) {
            return isNumber(a);
        })

        /**
         * @brief Wrapper around mod function
         * @param a {number}
         * @param b {number}
         * @returns {number/NaN}
         */

    }, {
        key: "modulo",
        value: function modulo(a, b) {
            return mod(a, b);
        }

        /**
         * @brief Wrapper around mod function
         * @param empty {undefined} This operand must be specified but it is not used inside the function.
         * It is there to keep the protocol of the "before" operations.
         * @param a {number}
         * @returns {number/NaN}
         */

    }, {
        key: "log",
        value: function (_log) {
            function log(_x2, _x3) {
                return _log.apply(this, arguments);
            }

            log.toString = function () {
                return _log.toString();
            };

            return log;
        }(function (empty, a) {
            return log(a);
        })

        /**
         * @brief Wrapper around mul function
         * @param a {number}
         * @param b {number}
         * @returns {number/NaN}
         */

    }, {
        key: "mul",
        value: function mul(a, b) {
            return multiply(a, b);
        }

        /**
         * @brief Wrapper around div function
         * @param a {number}
         * @param b {number}
         * @returns {number/NaN}
         */

    }, {
        key: "div",
        value: function div(a, b) {
            return divide(a, b);
        }

        /**
         * @brief Wrapper around plus function
         * @param a {number}
         * @param b {number}
         * @returns {number/NaN}
         */

    }, {
        key: "plus",
        value: function plus(a, b) {
            return add(a, b);
        }

        /**
         * @brief Wrapper around minus function
         * Can be used to calculate unary minus
         * @param a {number}
         * @param b {number}
         * @returns {number/NaN}
         */

    }, {
        key: "minus",
        value: function minus(a, b) {
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

    }, {
        key: "factorial",
        value: function (_factorial) {
            function factorial(_x4) {
                return _factorial.apply(this, arguments);
            }

            factorial.toString = function () {
                return _factorial.toString();
            };

            return factorial;
        }(function (a) {
            return factorial(a);
        })

        /**
         * @brief Wrapper around power function
         * @param a {number}
         * @param b {number}
         * @returns {number/NaN}
         */

    }, {
        key: "power",
        value: function (_power) {
            function power(_x5, _x6) {
                return _power.apply(this, arguments);
            }

            power.toString = function () {
                return _power.toString();
            };

            return power;
        }(function (a, b) {
            return power(a, b);
        })
    }]);

    return MathObject;
}();
