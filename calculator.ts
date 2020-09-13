class CalculatorTS {
  numberScreen: string;
  firstRun: boolean;
  currentNumber: number;
  acumulatorNumber: number;

  // flags
  numberIsValid: boolean;
  runOperation: boolean;
  isEmptyScreen: boolean;
  // for control operations
  beforeOperation: number;
  afterOperation: number;
  // regular expressions
  ruleDecimalNumber: RegExp;

  constructor(digit: string) {
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
    document.querySelector<any>("#calc-screen").innerHTML = this.numberScreen;
  }

  restartCalculator() {
    this.numberScreen = "0";
    this.acumulatorNumber = 0;
    this.currentNumber = 0;
    this.firstRun = true;
    this.runOperation = false;
    this.beforeOperation = 0;
    this.afterOperation = 0;
    this.isEmptyScreen = true;
    this.ruleDecimalNumber = /^\d*\.?\d+$/;
    this.numberIsValid = false;
    document.querySelector<any>("#calc-screen").innerHTML = this.numberScreen;
    this.checkExpression();
  }

  makeOperation(caseOperation: string) {
    if (this.runOperation == false) {
      document.querySelector<any>("#calc-screen").innerHTML = caseOperation;
      this.beforeOperation = parseInt(this.numberScreen);
      this.runOperation = true;
      this.numberScreen = "";
      this.isEmptyScreen = true;
      this.checkExpression();
    } else if (this.isEmptyScreen) {
      // @ts-expect-error: Objeto obtenido de materialize css
      M.toast({ html: "Pulsa algun número !!", classes: "red rounded" });
    } else {
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
let myCalculator: CalculatorTS = new CalculatorTS("0");
