const { $, browser } = require('@wdio/globals')
class RetirementCalculatorPage {
    get currentAgeInput() { return $('#current-age'); }
    get retirementAgeInput() { return $('#retirement-age'); }
    get currentAnnualIncomeInput() { return $('//input[@id="current-income"]'); }
    get currentSpouseIncomeInput() {return $('#spouse-income');}
    get currentRetirementSavingsInput() { return $('#current-total-savings'); }
    get currentAnnualSavingsInput() { return $('#current-annual-savings'); }
    get increaseInSavingRateInput() { return $('#savings-increase-rate'); }
// Social security Incom locators
    get noSSBenifits() {return $('#no-social-benefits');}
    get yesSSBenifits() {return $('label[for = "yes-social-benefits"]');}

    get matrialStatusSingle() { return $('label[for = "single"]');}
    get matrialStatusMarried() { return $('label[for = "married"]');}

    get ssOverrideAmtInput() { return $('#social-security-override');}

//Adjust Default values locators
    get adjustDefaultValuesLink() { return $('//a[contains(text(), "Adjust default values")]');}
    get defaultValuesCaculatorModal(){return $("#default-values-modal");}
    get additionalIncomeInput(){ return $('#additional-income');}
    get retirementDurationInput(){ return $('#retirement-duration');}

    get inflationYesRadio(){ return $('//label[@for= "include-inflation"and text() = "Yes"]');}
    get expectedInflationRateInput(){ return $('#expected-inflation-rate');}
    get inflationNoRadio(){ return $('//label[@for= "exclude-inflation"and text() = "No"]');}
    
    get finalAnnualIncomeInput(){ return $('#retirement-annual-income');}
    get preRetiementRetunInput(){ return $('#pre-retirement-roi');}
    get postRetiementRetunInput(){ return $('#post-retirement-roi');}

    get saveChangesButton(){return $('//button[text()="Save changes"]');}


    get calculateButton() { return $('//button[ text()= "Calculate"]'); }
    get resultsSection() { return $('//p[@id="result-message"]'); }
    get errorMessageSection() { return $('#calculator-input-alert-desc'); }
  
    async open() {
      await browser.maximizeWindow();
      await browser.url('https://www.securian.com/insights-tools/retirement-calculator.html');
    }
  
    async fillForm(data) {
      await this.currentAgeInput.setValue(data.currentAge);
      await this.retirementAgeInput.setValue(data.retirementAge);
      await this.currentAnnualIncomeInput.click();
      await this.currentAnnualIncomeInput.setValue(data.currentIncomeInput);
      await this.currentSpouseIncomeInput.click();
      await this.currentSpouseIncomeInput.setValue(data.spouseIncomeInput);
      await this.currentRetirementSavingsInput.click();
      await this.currentRetirementSavingsInput.setValue(data.retirementSavings);
      await this.currentAnnualSavingsInput.setValue(data.currentSavingsRateInput);
      await this.increaseInSavingRateInput.setValue(data.increaseSavingsRateInput);
        if (data.includeSS.toLowerCase() ==='yes'){
        await this.yesSSBenifits.click();
        if(data.matrialStaus.toLowerCase() === 'single'){
          await this.matrialStatusSingle.click();}
          else{await this.matrialStatusMarried.click();}
          await this.ssOverrideAmtInput.click();
          await this.ssOverrideAmtInput.setValue(data.overrideAmtSS);

        // Adjust Default Values 
        await this.adjustDefaultValuesLink.isClickable({timeout : 1000});
        await this.adjustDefaultValuesLink.click(); 
        await this.defaultValuesCaculatorModal.waitForDisplayed({timeout: 1000});
        await this.defaultValuesCaculatorModal.isDisplayed();
        await this.additionalIncomeInput.click();
        await this.additionalIncomeInput.setValue(data.additionalIncome);
        await this.retirementDurationInput.setValue(data.retirementDuration);
        if (data.isInflation.toLowerCase() === 'yes'){ 
          await this.inflationYesRadio.click();
          await this.expectedInflationRateInput.setValue(data.expectedInflationRate);}
        else{ await this.inflationNoRadio.click();}
        await this.finalAnnualIncomeInput.setValue(data.finalAnnualIncome);
        await this.preRetiementRetunInput.setValue(data.preRetireInvestROI);
        await this.postRetiementRetunInput.setValue(data.postRetireInvestROI);
        await this.saveChangesButton.isClickable({timeout: 1000});
        await this.saveChangesButton.click();
      }
    }
  
    async submit() {
      await this.calculateButton.click();
      await browser.pause(3000);
      }
  
    async getCalcResult() {
      this.resultsSection.isDisplayed({timeout: 1000});
      let calcResult = await this.resultsSection.getText();
      return calcResult;   
    }
  
    async getErrorMessage() {
      let errorMsg = await this.errorMessageSection.getText();
      return errorMsg;
    }
  }
  
  module.exports = new RetirementCalculatorPage();