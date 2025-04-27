const { Given, When, Then } = require('@wdio/cucumber-framework');
const RetirementCalculatorPage = require('../pageobjects/retirementCalc.page');
const ExcelReader = require('../../utils/excelReader');
const expect = require('chai').expect;

Given('I am on the Retirement Calculator page', async () => {
  await RetirementCalculatorPage.open();
  });

When('I fill in the retirement calculator form with valid data from {string}', async (row) => {
  const testData = ExcelReader.getTestData();
  const data = testData[parseInt(row) - 1];
  await RetirementCalculatorPage.fillForm(data);
  });

When('I fill in the retirement calculator form with invalid data from {string}', async (row) => {
  const testData = ExcelReader.getTestData();
  const data = testData[parseInt(row) - 1];
  await RetirementCalculatorPage.fillForm(data);
  });

When('I submit the calculator form', async () => {
  await RetirementCalculatorPage.submit();
  });

Then('I should see the calculated retirement savings message', async () => {
  const calcResult = RetirementCalculatorPage.getCalcResult();
  expect(calcResult).to.not.null;
  });

Then('I should see an error message as {string}', async (expectedMsg) => {
  const errorMessage = await RetirementCalculatorPage.getErrorMessage();
  expect(errorMessage).equal(expectedMsg);
 });