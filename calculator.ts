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
  makeOperation(caseOperation: string) {
    if (this.runOperation == false) {
      document.querySelector<any>("#calc-screen").innerHTML = caseOperation;
      this.beforeOperation = parseInt(this.numberScreen);
      this.runOperation = true;
      this.numberScreen = "";
      this.isEmptyScreen = true;
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

  checkExpression() {
    this.numberIsValid = this.ruleDecimalNumber.test(this.numberScreen);
    let aClass: any = null;
    let index: number = 0;
    if (this.numberIsValid) {
      aClass = document.querySelector<any>("#op-add");
      aClass.classList.remove("disabled");
      aClass = document.querySelector<any>("#op-remove");
      aClass.classList.remove("disabled");
      aClass = document.querySelector<any>("#op-product");
      aClass.classList.remove("disabled");
      aClass = document.querySelector<any>("#op-division");
      aClass.classList.remove("disabled");
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
