import utils from '../../utils/utils.js';
import logger from '../../utils/logger.js';

//Adjust Default values locators
class adjustDefaultValuesPage {
    get adjustDefaultValuesLink() { return $('//a[contains(text(), "Adjust default values")]');}
    get defaultValuesCaculatorModal(){return $("#default-values-modal");}
    get additionalIncomeInput(){ return $('#additional-income');}
    get retirementDurationInput(){ return $('#retirement-duration');}

    get includeInflation(){ return $('//label[@for="include-inflation"]') };
    get expectedInflationRateInput(){ return $('//*[@id="expected-inflation-rate"]');}
    get excludeInflation(){ return $('//label[@for="exclude-inflation"]'); }
  
    get finalAnnualIncomeInput(){ return $('#retirement-annual-income');}
    get preRetiementRetunInput(){ return $('#pre-retirement-roi');}
    get postRetiementRetunInput(){ return $('#post-retirement-roi');}

    get saveChangesButton(){return $('//button[text()="Save changes"]');}


///Method to fill the default values in the modal
async fillAdjustDefaultValues(testCaseName){
  console.log(`Filling default values for test case: ${testCaseName}`);
  try {
      await utils.elementAction(this.adjustDefaultValuesLink, 'click', 'null', 'Adjust Default Values Link');
      await utils.elementAction(this.defaultValuesCaculatorModal, 'waitForDisplayed', {timeout: 1000}, 'Default Values Modal');
      await utils.elementAction(this.defaultValuesCaculatorModal, 'isDisplayed', '', 'Default Values Modal'); 
      const data = await utils.fetchDataFromJson(testCaseName);
      await utils.elementAction(this.additionalIncomeInput, 'setValue', data.additionalIncome, 'Additional Income Input');
      await utils.elementAction(this.retirementDurationInput, 'setValue', data.retirementDuration, 'Retirement Duration Input');  
      if (data.expectedInflationRate ==='No'){
        await utils.elementAction(this.excludeInflation, 'click', '', 'exclude Inflation');
      }
      else{
        await utils.elementAction(this.includeInflation, 'click', null, 'include Inflation');
        await utils.elementAction(this.expectedInflationRateInput, 'waitForDisplayed', {timeout: 1000}, 'Expected Inflation Rate Input');
        await utils.elementAction(this.expectedInflationRateInput, 'setValue', data.expectedInflationRate, 'Expected Inflation Rate Input');
      }
      await utils.elementAction(this.finalAnnualIncomeInput, 'setValue', data.finalAnnualIncome, 'Final Annual Income Input');
      await utils.elementAction(this.preRetiementRetunInput, 'setValue', data.preRetireInvestROI, 'Pre Retirement Return Input');
      await utils.elementAction(this.postRetiementRetunInput, 'setValue', data.postRetireInvestROI, 'Post Retirement Return Input');    
      await utils.elementAction(this.saveChangesButton, 'click', '', 'Save Changes Button');
  } catch (error) {
      logger.error(`Error in adjusting default values: ${error}`);
      throw error; 
    }
  }
}
export default new adjustDefaultValuesPage();