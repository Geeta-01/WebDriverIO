import utils from '../../utils/utils.js';
import logger from '../../utils/logger.js';

class RetirementCalculatorPage {
  //Calculaor page locators
    get currentAgeInput() { return $('#current-age'); }
    get retirementAgeInput() { return $('#retirement-age'); }
    get currentAnnualIncomeInput() { return $('//*[@id="current-income"]'); }
    get currentSpouseIncomeInput() {return $('//*[@id= "spouse-income"]');}
    get currentRetirementSavingsInput() { return $('#current-total-savings'); }
    get currentAnnualSavingsInput() { return $('#current-annual-savings'); }
    get increaseInSavingRateInput() { return $('#savings-increase-rate'); }

  // Social security Incom locators
    get noSSBenifits() {return $('//label[@for= "no-social-benefits"]');}
    get yesSSBenifits() {return $('//label[@for = "yes-social-benefits"]');}
    get maritalStatusFields() { return $('//*[@class="row social-security-field"]') };
    get matrialStatusSingle() { return $('//label[@for="single"]');}
    get matrialStatusMarried() { return $('//label[@for="married"]');}
    get ssOverrideAmtInput() { return $('//*[@id="social-security-override"]');}

  //Buttons in caculotor page
    get calculateButton() { return $('//*[@data-tag-id="submit"]'); }
    get clearFormButton() { return $('//*[@onclick="clearRetirementForm();"]') };

  //Result section locators  
    get resultSection() { return $('//*[@id="calculator-results-section"]') };
    get resultMessage() { return $('//*[@id="result-message"]') };
    get resultChart() { return $('//*[@id="results-chart"]') };
    get resultTable() { return $('//table[@class="dsg-featured-data-stacked-table"]') };
   
  //Result section buttons
    get emailResultBtn() { return $('//*[@data-bs-target="#calc-email-modal"]') };
    get editInfoButton() { return $('//button[@class = "dsg-btn-secondary dsg-btn-block" and text() ="Edit info"]') };
    get fullResultsButton() { return $('//button[@onclick="showFullResults();"]') };

  //Pre-Retirement calculator Form
    get retirementCalculatorForm() { return $('//*[@id="retirement-calculator"]') };
    
  //invalid error messages
    get invalidCurrentAge() { return $('//*[@id="invalid-current-age-error"]') };
    get invalidRetirementAge() { return $('//*[@id="invalid-retirement-age-error"]') };
    get invalidCurrentIncome() { return $('//*[@id="invalid-current-income-error"]') };
    get invalidCurrentTotalSaving() { return $('//*[@id="invalid-current-total-savings-error"]') };
    get invalidCurrentAnnualSaving() { return $('//*[@id="invalid-current-annual-savings-error"]') };
    get invalidSavingIncRate() { return $('//*[@id="invalid-savings-increase-rate-error"]') };
  
  
    /* Filling the details */
    async fillRequiredDetails(testCaseName){
      try {
        console.log("testCaseName", testCaseName);
        await this.fillAgeDetails(testCaseName);
        await this.fillIncomeDetails(testCaseName);
        await this.fillSocialSecurityDetails(testCaseName);
    }
    catch (error) {
        logger.error("Error filling required details:", error);
        throw error;
    }
    }

    /* Filling the age details */
    async fillAgeDetails(testCaseName) {
      const data = await utils.fetchDataFromJson(testCaseName);
      await utils.elementAction(this.currentAgeInput, 'setValue', data.currentAge, 'Current Age');
      await utils.elementAction(this.retirementAgeInput, 'setValue', data.retirementAge, 'Retirement Age');
    }

    async fillIncomeDetails(testCaseName){
      const data = await utils.fetchDataFromJson(testCaseName);
      await utils.elementAction(this.currentAnnualIncomeInput, 'setValue', data.currentIncomeInput, 'currentAnnualIncomeInput');
      await utils.elementAction(this.currentSpouseIncomeInput, 'setValue', data.spouseIncomeInput,'currentSpouseIncomeInput');
      await utils.elementAction(this.currentRetirementSavingsInput, 'setValue', data.retirementSavings,'currentRetirementSavingsInput');
      await utils.elementAction(this.currentAnnualSavingsInput, 'setValue', data.currentSavingsRateInput, 'currentAnnualSavingsInput');
      await utils.elementAction(this.increaseInSavingRateInput, 'setValue', data.increaseSavingsRateInput, 'increaseInSavingRateInput');
      
    }


    async fillSocialSecurityDetails(testCaseName){
      const data = await utils.fetchDataFromJson(testCaseName);
        if (data.includeSocialSecurity ==='No'){
          await utils.elementAction (this.noSSBenifits, 'click', null, 'No Social Security Benefits');
        }else{
          await utils.elementAction (this.yesSSBenifits, 'click', null, 'Yes Social Security Benefits');
          await utils.elementAction (this.maritalStatusFields, 'isDisplayed', null, 'Marital Status Fields');
          if(data.maritalStatus === 'Married'){
              await utils.elementAction (this.matrialStatusMarried, 'click', null, 'Marital Status as ' + data.maritalStatus);
            }else{
            await utils.elementAction (this.matrialStatusSingle, 'click', null, 'Marital Status as ' + data.maritalStatus);
            }
            await utils.elementAction (this.ssOverrideAmtInput, 'setValue', data.socialSecurityOverrideAmt, 'Social Security override amount');
        }
      }

    /* Click on the buttons */
    async clickButton(button) {
      try {
          switch (button) {
              case 'Calculate':
                  await this.calculateButton.click();
                  logger.info('Clicked on Calculate Button');
                  break;
              case 'Clear-Form':
                  await this.clearFormButton.click();
                  logger.info('Clicked on Clear Form Button');
                  break;
              case 'Edit Info':
                  await utils.elementAction(this.editInfoButton, 'waitForDisplayed', { timeout: 5000 }, 'Edit Info Button');
                  await this.editInfoButton.click();
                  logger.info('Clicked on Edit Info Button');
                  break;
              default:
                  throw new Error(`Button "${button}" not recognized`);
          }
      } catch (error) {
          logger.error("Error clicking button:", error);
          throw error;

      }
  }
  
      
    //Validate the result section 
    async validateResultSection() {
        try {
            await this.resultSection.waitForDisplayed({ timeout: 10000 });
            const displayValue = await this.resultSection.getCSSProperty('display');
            if (displayValue.value === 'none') {
                logger.info('Result Section is not displayed');
                throw new Error('Result Section is not displayed');
            } else {
                await utils.elementAction(this.resultSection, 'isDisplayed', null, 'Result Section');
                await utils.elementAction(this.resultMessage, 'isDisplayed', null, 'Result Message');
                await utils.elementAction(this.resultChart, 'isDisplayed', null, 'Result Chart');
                await utils.elementAction(this.resultTable, 'isDisplayed', null, 'Result Table');
                await utils.elementAction(this.emailResultBtn, 'isClickable', null, 'Email Result Button');
                await utils.elementAction(this.editInfoButton, 'isClickable', null, 'Edit Info Button');
                await utils.elementAction(this.fullResultsButton, 'isClickable', null, 'Full Results Button');
            }
        } catch (error) {
            logger.error("Error validating result section:", error);
            throw error;

        }
    }

    //Validate the error messages in negative testing

    async validateErrorMessages(testCaseName) {
      try {
          switch (testCaseName) {
              case 'noCurrentAge':
                  await this.validateInvalidCurrentAge(testCaseName);
                  break;
              case 'noRetirementAge':
                  await this.validateInvalidRetirementAge(testCaseName);
                  break;
              case 'noCurrentIncome':
                  await this.validateInvalidCurrentIncome(testCaseName);
                  break;
              case 'noCurrentTotalSavings':
                  await this.validateInvalidCurrentTotalSavings(testCaseName);
                  break;
              case 'noCurrentAnnualSavings':
                  await this.validateInvalidCurrentAnnualSavings(testCaseName);
                  break;
              case 'noSavingsIncreaseRate':
                  await this.validateInvalidSavingsIncreaseRate(testCaseName);
                  break;
              case 'currAgeGrtThanRetAge':
                  await this.validateInvalidRetirementAge(testCaseName);
                  break;
              case 'currentAgeMaxVal':
                  await this.validateInvalidCurrentAge(testCaseName);
                  break;
              case 'retirementAgeMaxVal':
                  await this.validateInvalidRetirementAge(testCaseName);
                  break;
              default:
                  throw new Error('Invalid Test Case Name: ', testCaseName);
          }
      } catch (error) {
          logger.error("Error validating error messages:", error);
          throw error;

      }
  }

  // Validate the error messages for current age
  async validateInvalidCurrentAge(testCaseName) {
      const data = await utils.fetchDataFromJson(testCaseName);
      await utils.validateErrorMessage(this.invalidCurrentAge, data.errorMessage, 'Current Age');
  }

  // Validate the error messages for retirement age
  async validateInvalidRetirementAge(testCaseName) {
      const data = await utils.fetchDataFromJson(testCaseName);
      await utils.validateErrorMessage(this.invalidRetirementAge, data.errorMessage, 'Retirement Age');
  }

 //Validate the error messages for current income 
  async validateInvalidCurrentIncome(testCaseName) {
      const data = await utils.fetchDataFromJson(testCaseName);
      await utils.validateErrorMessage(this.invalidCurrentIncome, data.errorMessage, 'Current Income');
  }

  //Validate the error messages for current total savings 
  async validateInvalidCurrentTotalSavings(testCaseName) {
      const data = await utils.fetchDataFromJson(testCaseName);
      await utils.validateErrorMessage(this.invalidCurrentTotalSaving, data.errorMessage, 'Current Total Savings');
  }

  //Validate the error messages for current annual savings 
  async validateInvalidCurrentAnnualSavings(testCaseName) {
      const data = await utils.fetchDataFromJson(testCaseName);
      await utils.validateErrorMessage(this.invalidCurrentAnnualSaving, data.errorMessage, 'Current Annual Savings');
  }

 //Validate the error messages for savings increase rate 
  async validateInvalidSavingsIncreaseRate(testCaseName) {
      const data = await utils.fetchDataFromJson(testCaseName);
      await utils.validateErrorMessage(this.invalidSavingIncRate, data.errorMessage, 'Savings Increase Rate');
  }

 //Validate the social security details
  async validateSocialSecurityDetails(testCaseName) {
      try {
          const data = await utils.fetchDataFromJson(testCaseName);
          if (data.includeSocialSecurity === 'No') {
              await utils.assertElementsAreSelected([
                  { element: this.noSSBenifits, shouldBeSelected: true, elementName: 'socialSecurityBenefits' }
              ]);
              logger.info('Social Security Benefits is not included');
          }
          else {
              await utils.assertElementsAreSelected([
                  { element: this.yesSSBenifits, shouldBeSelected: true, elementName: 'socialSecurityBenefits' }
              ]);
              logger.info('Social Security Benefits is included');
              await utils.elementAction(this.maritalStatusFields, 'isDisplayed', null, 'Marital Status Fields');
              if (data.maritalStatus === 'Married') {
                  await utils.assertElementsAreSelected([
                      { element: this.matrialStatusMarried, shouldBeSelected: true, elementName: 'maritalStatus' }
                  ]);
                  logger.info('Marital Status: Married');
              }else {
                  await utils.assertElementsAreSelected([
                      { element: this.matrialStatusSingle, shouldBeSelected: true, elementName: 'maritalStatus' }
                  ]);
                  logger.info('Marital Status: Single');
              }
              await utils.assertElementsHaveValues([
                  { element: this.ssOverrideAmtInput, expectedValue: data.socialSecurityOverrideAmt, elementName: 'socialSecurityOverrideAmt' }
              ]);
              logger.info('Social Security Override Amount:', data.socialSecurityOverrideAmt);
          }
      } catch (error) {
          logger.error("Error validating social security details:", error);
          throw error;
      }
  }

  async validateAllFieldsBlank(testCaseName){
    try {
        const data = await utils.fetchDataFromJson(testCaseName);
        await utils.assertElementsHaveValues([
            { element: this.currentAgeInput, expectedValue: '', elementName: 'currentAge' },
            { element: this.retirementAgeInput, expectedValue: '', elementName: 'retirementAge' },
            { element: this.currentAnnualIncomeInput, expectedValue: '', elementName: 'currentAnnualIncome' },
            { element: this.currentSpouseIncomeInput, expectedValue: '', elementName: 'currentSpouseIncome' },
            { element: this.currentRetirementSavingsInput, expectedValue: '', elementName: 'currentRetirementSavings' },
            { element: this.currentAnnualSavingsInput, expectedValue: '', elementName: 'currentAnnualSavings' },
            { element: this.increaseInSavingRateInput, expectedValue: '', elementName: 'increaseInSavingRate' }
        ]); 
            logger.info('All fields are blank as expected');
        } catch (error) {
            logger.error("Error validating all fields blank:", error);
            throw error;
        }
  } 
  async editRetirementCalculatorValues(testCaseName) {
    try {
        await this.retirementCalculatorForm.waitForDisplayed({ timeout: 10000 });
        await utils.elementAction(this.retirementCalculatorForm, 'isDisplayed', null, 'Retirement Calculator Form');
        const data = await utils.fetchDataFromJson(testCaseName);

        
    } catch (error) {
        logger.error("Error validating retirement calculator form:", error);
        throw error;
    }
    } 

  }
 
export default  new RetirementCalculatorPage();