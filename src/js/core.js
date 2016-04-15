//Copyright 2016 Jakub Fajkus, Miki Dronzekova, David Czernin, Đỗ Long Thành
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
 * @file   Core.js
 * @brief  Core of the calculator.
 * This class is responsible for holding the operations, numbers and simplifying the input.
 * @author Jakub Fajkus
 * @date   10.4.2015
 */

class Core {
    /**
     * @brief Create a new instance of the Core
     */
    constructor() {
        this.array = [];
        this.resultString = "";
        this.decimalPosition = 0;
        this.mathObject = new MathObject();
    }


    /**
     * Clear the inner state.
     */
    clear() {
        this.array = [];
        this.resultString = "";
        this.decimalPosition = 0;
    }

    /**
     * @brief Add number to the inner array
     *
     * @param number {Number}    Number to be added
     * @throws {String} "Cannot add `number` as number"    When the given value is not a number.
     */
    addNumber(number) {
        if (!this.mathObject.isNumber(number)) {
            throw "Cannot add " + number + " as number";
        }

        if(this.resultString.length > 0 && this.resultString == "NaN") {
            this.clear();
            this.array.push(number);
            return;
        }

        //if the last element is number
        if (this.array.length > 0 && this.mathObject.isNumber(this.array[this.array.length - 1])) {
            //get the last number in the array
            var lastNumber = this.array[this.array.length - 1];

            if (this.decimalPosition > 0) {
                //adding numbers after dot
                var factor = (this.mathObject.power(10, this.decimalPosition));
                this.array[this.array.length - 1] = lastNumber + (parseInt(number) / factor);
                this.decimalPosition++;
            } else {
                //adding numbers before dot
                this.array[this.array.length - 1] = (lastNumber * 10) + parseInt(number);
            }

        } else {
            //push a number to the array
            this.array.push(number);
        }
    }

    /**
     * @brief Add operation to the inner array of operations and operands and results string.
     * @param operation {String}    Operation to add to the inner array.
     * @throws {String} "Can not add two same operations"    When the operation is type of "before"(e.g. log, unary minus) and the last item is the same operation.
     */
    addOperation(operation) {
        this.decimalPosition = 0;

        if(this.resultString.length > 0 && this.resultString == "NaN") {
            this.clear();
            this.array.push(operation);
            return;
        }

        if (this.getLastItem() === operation) {
            throw "Can not add two same operations";
        }

        if (this.mathObject.isBefore(operation)) {
            this.array.push(operation);
            return;
        }

        if (!this.mathObject.isNumber(this.getLastItem()) && !this.mathObject.isAfter(this.getLastItem())) {
            throw "Operation must follow a number.";
        }

        this.array.push(operation);
    }

    /**
     * @brief Register adding a dot after a number.
     *
     * If the last item in the array is number, add a dot.
     *
     * @returns {boolean} True if the dot was added. False otherwise.
     */
    addDot() {
        //if the last item is a number, add the dot
        if(this.mathObject.isNumber(this.getLastItem())) {
            this.decimalPosition = 1;

            return true;
        }

        return false;
    }

    /**
     * @brief Get the last item or undefined.
     * @returns {*}
     */
    getLastItem() {
        if (this.array.length > 0) {
            return this.array[this.array.length - 1]
        } else {
            return undefined;
        }
    }

    /**
     * @brief Get expression string in the human readable format(e.g. 3+4^2)
     * @returns {string} Expression string. e.g. 3+4^2
     */
    getExpressionString() {
        var alteredArray = [];
        var core = this;

        this.array.forEach(function (value, key) {
            if (!core.mathObject.isNumber(value)) {
                alteredArray.push(core.mathObject.getHumanRepresentationOfOperation(value));
            } else {
                alteredArray.push(value);
            }
        });

        return alteredArray.join(" ");
    }

    /**
     * @brief Calculate inner array and set resultString
     */
    calculate() {
        this.simplify();

        this.resultString = this.array[0].toString();
        this.decimalPosition = 0;
    }

    /**
     * @brief Simplify the inner array of operations and operands.
     *
     * Use all supported operations in the math priorities order.
     * Calculate each operation and simplify the inner array.
     * After all operations are used, the array is simplified to one member
     */
    simplify() {
        var core = this;
        //iterate over operations in the priority order
        this.mathObject.operations.forEach(function (operationArray) {
            //if the array is already simplified
            if (core.array.length <= 1) {
                return;
            }

            //initialize variables
            var indexOfTheOperator = -1;
            var operation = undefined;
            var operand1 = undefined;
            var result = undefined;
            //if the operation is unary "before", e.g. unary minus
            if (core.mathObject.isBefore(operationArray[0])) {
                //repeat until there is no current operation (do it for every occurrence of the operation)
                while ((indexOfTheOperator = core.array.indexOf(operationArray[0])) != -1) {
                    //get the operation and operator
                    operation = core.array[indexOfTheOperator];
                    operand1 = core.array[indexOfTheOperator + 1];

                    //because the operation is "before" operand(-3)
                    //there is need to call the function with the first(non existing) operand
                    //this allows usage of classic function for minus
                    result = core.mathObject[operation](undefined, operand1);

                    //store the result at the index of the operator
                    core.array[indexOfTheOperator] = result;
                    //delete operand
                    core.array.splice(indexOfTheOperator + 1, 1)
                }
                //if the operation is unary after, e.g. factorial
            } else if (core.mathObject.isAfter(operationArray[0])) {
                //repeat until there is no current operation (do it for every occurrence of the operation)
                while ((indexOfTheOperator = core.array.indexOf(operationArray[0])) != -1) {
                    //get the operation and operator
                    operation = core.array[indexOfTheOperator];
                    operand1 = core.array[indexOfTheOperator - 1];

                    //because the operation is "after" operand(3!)
                    //there is NO need to call the function with the first non existing operand
                    result = core.mathObject[operation](operand1);

                    //store the result at the index of the first operand
                    core.array[indexOfTheOperator - 1] = result;
                    //delete operator
                    core.array.splice(indexOfTheOperator, 1)
                }
            }
            else if (core.mathObject.isBinary(operationArray[0])) {
                //repeat until there is no current operation (do it for every occurrence of the operation)
                while ((indexOfTheOperator = core.array.indexOf(operationArray[0])) != -1) {
                    //get the operation and operators
                    operand1 = core.array[indexOfTheOperator - 1];
                    operation = core.array[indexOfTheOperator];
                    var operand2 = core.array[indexOfTheOperator + 1];

                    //calculate result with two operands
                    result = core.mathObject[operation](operand1, operand2);

                    //store the result at the index of the first operand
                    core.array[indexOfTheOperator - 1] = result;
                    //delete the operator and the second operand
                    core.array.splice(indexOfTheOperator, 2);
                }
            }
        });

        //if there are more items sum them
        if (this.array.length > 1) {
            var result = 0;
            this.array.forEach(function (arrayItem) {
                result += parseFloat(arrayItem);
            });

            this.array = [result];
        }

    }

    /**
     * @brief Get the result string which was generated by the `calculate` method
     * @returns {string} The result of the calculating. e.g. 42
     */
    getResultString() {
        return this.resultString;
    }
}
