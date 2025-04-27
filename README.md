**Assignment for the Interview**
Description- A Pre-Retirement calculaor web page URL is provide for the automation using BDD cucumber/Jasmine framework using WebdriverIO, JavaScript.
Some default values were provided as test data. For the provided data the calculator has to provide the results.
As a tester need to validate both positive and negative scenario.

**Folder Structure:**
WedriverIOProject4 ---> |--feature
                                |-- stepdefinition
                                |-- pageobject
                        |--utils 
                              excelReader.js
                        testData.xlx
                        package.json
                        wdio.conf.js
                        .gitignore
                                

**Softwares Used and Its Installation info**

IDE - VS Code
Install node => npm init -y
Install wdio => npm init wdio
        Choose Project location- Local
        Framework - Cucumber
        Driver - Chrome/MicrosoftEdge
        Report - Specs/Allure(Used Specs in the code)
Command to Run the code => npx wdio run .\wdio.conf.js

For Allure report --> npm install -g allure-commandline --save-dev
                      npm i allure commandline
To generate report--> allure generate .\allure-results
                      allure open



        
        

