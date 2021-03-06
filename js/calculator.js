"use strict";
var CalculatorTS = /** @class */ (function () {
    function CalculatorTS(digit) {
        this.numberScreen = digit;
        this.acumulatorNumber = 0.0;
        this.firstRun = true;
        this.runOperation = false;
        this.beforeOperation = 0;
        this.afterOperation = 0;
        this.isEmptyScreen = true;
        this.ruleDecimalNumber = /^\d*\.?\d+$/;
        this.numberIsValid = false;
        this.symbolOperation = "";
        document.querySelector("#calc-screen").innerHTML = this.numberScreen;
    }
    CalculatorTS.prototype.restartCalculator = function () {
        this.numberScreen = "Welcome";
        this.acumulatorNumber = 0.0;
        this.firstRun = true;
        this.runOperation = false;
        this.beforeOperation = 0;
        this.afterOperation = 0;
        this.isEmptyScreen = true;
        this.ruleDecimalNumber = /^\d*\.?\d+$/;
        this.numberIsValid = false;
        this.symbolOperation = "";
        document.querySelector("#calc-screen").innerHTML = this.numberScreen;
        this.checkExpression();
    };
    CalculatorTS.prototype.makeOperation = function (caseOperation) {
        this.symbolOperation = caseOperation;
        if (this.runOperation == false) {
            document.querySelector("#calc-screen").innerHTML = caseOperation;
            this.beforeOperation = parseFloat(this.numberScreen);
            this.runOperation = true;
            this.numberScreen = "";
            this.isEmptyScreen = true;
            this.checkExpression();
        }
        else {
            // @ts-expect-error: Objeto obtenido de materialize css
            M.toast({ html: "Pulsa algun número, error !!", classes: "red rounded" });
        }
    };
    CalculatorTS.prototype.resultCalculator = function () {
        var theResult = "";
        this.afterOperation = parseFloat(this.numberScreen);
        switch (this.symbolOperation) {
            case "+":
                this.acumulatorNumber = this.beforeOperation + this.afterOperation;
                theResult = "= " + this.acumulatorNumber.toString();
                break;
            case "-":
                this.acumulatorNumber = this.beforeOperation - this.afterOperation;
                theResult = "= " + this.acumulatorNumber.toString();
                break;
            case "x":
                this.acumulatorNumber = this.beforeOperation * this.afterOperation;
                theResult = "= " + this.acumulatorNumber.toString();
                break;
            case "/":
                this.acumulatorNumber = this.beforeOperation / this.afterOperation;
                theResult = "= " + this.acumulatorNumber.toString();
                break;
        }
        this.restartCalculator();
        document.querySelector("#calc-screen").innerHTML = theResult;
    };
    CalculatorTS.prototype.enableOperations = function () {
        var aClass = null;
        aClass = document.querySelector("#op-add");
        aClass.classList.remove("disabled");
        aClass = document.querySelector("#op-remove");
        aClass.classList.remove("disabled");
        aClass = document.querySelector("#op-product");
        aClass.classList.remove("disabled");
        aClass = document.querySelector("#op-division");
        aClass.classList.remove("disabled");
    };
    CalculatorTS.prototype.disabledOperations = function () {
        var aClass = null;
        aClass = document.querySelector("#op-add");
        aClass.classList.add("disabled");
        aClass = document.querySelector("#op-remove");
        aClass.classList.add("disabled");
        aClass = document.querySelector("#op-product");
        aClass.classList.add("disabled");
        aClass = document.querySelector("#op-division");
        aClass.classList.add("disabled");
    };
    CalculatorTS.prototype.enableResultBotton = function () {
        var aClass = null;
        aClass = document.querySelector("#op-result");
        aClass.classList.remove("disabled");
    };
    CalculatorTS.prototype.disabledResultButton = function () {
        var aClass = null;
        aClass = document.querySelector("#op-result");
        aClass.classList.add("disabled");
    };
    CalculatorTS.prototype.checkExpression = function () {
        this.numberIsValid = this.ruleDecimalNumber.test(this.numberScreen);
        if (this.numberIsValid && this.runOperation == false) {
            this.enableOperations();
        }
        else if (this.numberIsValid && this.runOperation == true) {
            this.disabledOperations();
            this.enableResultBotton();
        }
        else {
            this.disabledOperations();
            this.disabledResultButton();
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
var myCalculator = new CalculatorTS("Welcome");
