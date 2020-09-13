class CalculatorTS {
  numberScreen: string;
  firstRun: boolean;
  currentNumber: number;
  acumulatorNumber: number;
  runOperation: boolean;
  isEmptyScreen: boolean;
  // for control operations
  beforeOperation: number;
  afterOperation: number;

  constructor(digit: string) {
    this.numberScreen = digit;
    this.acumulatorNumber = 0;
    this.currentNumber = 0;
    this.firstRun = true;
    this.runOperation = false;
    this.beforeOperation = 0;
    this.afterOperation = 0;
    this.isEmptyScreen = true;
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

  refreshCalculatorScreen(digit: string) {
    if (this.firstRun) {
      this.numberScreen = digit;
      this.firstRun = false;
      this.isEmptyScreen = false;
      document.querySelector<any>("#calc-screen").innerHTML = this.numberScreen;
    } else {
      this.isEmptyScreen = false;
      this.numberScreen = this.numberScreen + digit;
      document.querySelector<any>("#calc-screen").innerHTML = this.numberScreen;
    }
  }
}
let myCalculator: CalculatorTS = new CalculatorTS("0");
