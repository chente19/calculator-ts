"use strict";
var CalculatorTS = /** @class */ (function () {
    function CalculatorTS(digit) {
        this.numberScreen = digit;
        this.acumulatorNumber = 0;
        this.currentNumber = 0;
        this.firstRun = true;
        this.runOperation = false;
        this.beforeOperation = 0;
        this.afterOperation = 0;
        this.isEmptyScreen = true;
        this.ruleDecimalNumber = /^\d*\.?\d+$/;
        this.numberIsValid = false;
        document.querySelector("#calc-screen").innerHTML = this.numberScreen;
    }
    CalculatorTS.prototype.makeOperation = function (caseOperation) {
        if (this.runOperation == false) {
            document.querySelector("#calc-screen").innerHTML = caseOperation;
            this.beforeOperation = parseInt(this.numberScreen);
            this.runOperation = true;
            this.numberScreen = "";
            this.isEmptyScreen = true;
        }
        else if (this.isEmptyScreen) {
            // @ts-expect-error: Objeto obtenido de materialize css
            M.toast({ html: "Pulsa algun número !!", classes: "red rounded" });
        }
        else {
            switch (caseOperation) {
                case "+":
                    this.afterOperation = parseInt(this.numberScreen);
                    this.acumulatorNumber = this.beforeOperation + this.afterOperation;
                    this.runOperation = false;
                    break;
                case "-":
                    this.afterOperation = parseInt(this.numberScreen);
                    this.acumulatorNumber = this.beforeOperation - this.afterOperation;
                    this.runOperation = false;
            }
        }
    };
    CalculatorTS.prototype.checkExpression = function () {
        this.numberIsValid = this.ruleDecimalNumber.test(this.numberScreen);
        var aClass = null;
        var index = 0;
        if (this.numberIsValid) {
            aClass = document.querySelector("#op-add");
            aClass.classList.remove("disabled");
            aClass = document.querySelector("#op-remove");
            aClass.classList.remove("disabled");
            aClass = document.querySelector("#op-product");
            aClass.classList.remove("disabled");
            aClass = document.querySelector("#op-division");
            aClass.classList.remove("disabled");
        }
    };
    CalculatorTS.prototype.refreshCalculatorScreen = function (digit) {
        if (this.firstRun) {
            this.numberScreen = digit;
            this.firstRun = false;
            this.isEmptyScreen = false;
            document.querySelector("#calc-screen").innerHTML = this.numberScreen;
            this.checkExpression();
        }
        else {
            this.isEmptyScreen = false;
            this.numberScreen = this.numberScreen + digit;
            document.querySelector("#calc-screen").innerHTML = this.numberScreen;
            this.checkExpression();
        }
    };
    return CalculatorTS;
}());
var myCalculator = new CalculatorTS("0");
