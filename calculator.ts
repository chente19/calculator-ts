class CalculatorTS {
  numberScreen: string;
  firstRun: boolean;
  acumulatorNumber: number;

  // flags
  numberIsValid: boolean;
  runOperation: boolean;
  isEmptyScreen: boolean;
  // for control operations
  beforeOperation: number;
  afterOperation: number;
  symbolOperation: string;
  // regular expressions
  ruleDecimalNumber: RegExp;

  constructor(digit: string) {
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
    document.querySelector<any>("#calc-screen").innerHTML = this.numberScreen;
  }

  restartCalculator() {
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
    document.querySelector<any>("#calc-screen").innerHTML = this.numberScreen;
    this.checkExpression();
  }

  makeOperation(caseOperation: string) {
    this.symbolOperation = caseOperation;
    if (this.runOperation == false) {
      document.querySelector<any>("#calc-screen").innerHTML = caseOperation;
      this.beforeOperation = parseFloat(this.numberScreen);
      this.runOperation = true;
      this.numberScreen = "";
      this.isEmptyScreen = true;
      this.checkExpression();
    } else {
      // @ts-expect-error: Objeto obtenido de materialize css
      M.toast({ html: "Pulsa algun número, error !!", classes: "red rounded" });
    }
  }

  resultCalculator() {
    let theResult: string = "";
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
    document.querySelector<any>("#calc-screen").innerHTML = theResult;
  }

  enableOperations() {
    let aClass: any = null;
    aClass = document.querySelector<any>("#op-add");
    aClass.classList.remove("disabled");
    aClass = document.querySelector<any>("#op-remove");
    aClass.classList.remove("disabled");
    aClass = document.querySelector<any>("#op-product");
    aClass.classList.remove("disabled");
    aClass = document.querySelector<any>("#op-division");
    aClass.classList.remove("disabled");
  }

  disabledOperations() {
    let aClass: any = null;
    aClass = document.querySelector<any>("#op-add");
    aClass.classList.add("disabled");
    aClass = document.querySelector<any>("#op-remove");
    aClass.classList.add("disabled");
    aClass = document.querySelector<any>("#op-product");
    aClass.classList.add("disabled");
    aClass = document.querySelector<any>("#op-division");
    aClass.classList.add("disabled");
  }

  enableResultBotton() {
    let aClass: any = null;
    aClass = document.querySelector<any>("#op-result");
    aClass.classList.remove("disabled");
  }

  disabledResultButton() {
    let aClass: any = null;
    aClass = document.querySelector<any>("#op-result");
    aClass.classList.add("disabled");
  }

  checkExpression() {
    this.numberIsValid = this.ruleDecimalNumber.test(this.numberScreen);
    if (this.numberIsValid && this.runOperation == false) {
      this.enableOperations();
    } else if (this.numberIsValid && this.runOperation == true) {
      this.disabledOperations();
      this.enableResultBotton();
    } else {
      this.disabledOperations();
      this.disabledResultButton();
    }
  }

  refreshCalculatorScreen(digit: string) {
    if (this.firstRun) {
      this.numberScreen = digit;
      this.firstRun = false;
      this.isEmptyScreen = false;
      document.querySelector<any>("#calc-screen").innerHTML = this.numberScreen;
      this.checkExpression();
    } else {
      this.isEmptyScreen = false;
      this.numberScreen = this.numberScreen + digit;
      document.querySelector<any>("#calc-screen").innerHTML = this.numberScreen;
      this.checkExpression();
    }
  }
}
let myCalculator: CalculatorTS = new CalculatorTS("Welcome");
