import { Given, When, Then } from '@wdio/cucumber-framework';

import Page from '../pageobjects/launch.Page.js';
import Calculate from  '../pageobjects/retirementCalc.page.js' ;
import DefaultValues from '../pageobjects/adjustDefaultValues.page.js';



Given(/^user navigates to the retirement calculator page$/, async () => {
  await Page.launch();
});

Given(/^user fills the required details for "([^"]*)"$/, async function (testCaseName) {
    
  await Calculate.fillRequiredDetails(testCaseName);
});

Given(/^user modifies the default values "([^"]*)"$/, async function (testCaseName) {
  await DefaultValues.fillAdjustDefaultValues(testCaseName);
});

When(/^user clicks on ([^"]*) button$/, async (button) => {
await Calculate.clickButton(button);
}); 

Then(/^user should see the retirement savings details$/, async () => {
  await Calculate.validateResultSection();
});

Then(/^user should see the error messages for "([^"]*)"$/, async (testCaseName) => {     
  await Calculate.validateErrorMessages(testCaseName);
});

Then(/^user should see the Social Security details for "([^"]*)"$/, async (testCaseName) => {
  await Calculate.validateSocialSecurityDetails(testCaseName);
});


Then(/^user should see all the required fields are blank for "([^"]*)"$/, async (testCaseName) => {
	console.log(testCaseName);
	await Calculate.validateAllFieldsBlank(testCaseName);
});


Then(/^user should see the retirement calculator form$/, async (testCaseName) => {
  await Calculate.editRetirementCalculatorValues(testCaseName);
	});


