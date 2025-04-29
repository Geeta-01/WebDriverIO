Feature: Retirement savings calculation using securian pre-retirement calculator

  Background: Launch page
    Given user navigates to the retirement calculator page

    # Scenario Outline: Fill details and calculate retirement savings - of - <testCaseName>
    #   Given user fills the required details for "<testCaseName>"
    #   When user clicks on Calculate button
    #   Then user should see the retirement savings details

    #   Examples:
    #     | testCaseName                   |
    #     | verifywithSocialSecurityNo     |
    #     | verifyWithSocialSecurityYes    |
    #     | verifyWtihMaritalStatusMarried |

      # Scenario Outline: Fill details and calculate retirement savings - of - <testCaseName>
      # Given user fills the required details for "<testCaseName>"
      # When user clicks on Clear-Form button
      # Then user should see all the required fields are blank for "<testCaseName>"

      # Examples:
      #   | testCaseName                   |
      #   | verifywithSocialSecurityNo     |

    # Scenario Outline: Fill details and calculate retirement savings - of - <testCaseName>
    #     Given user fills the required details for "<testCaseName>"
    #     When user clicks on Calculate button
    #     Then user should see the error messages for "<testCaseName>"
    #     Examples:
    #         | testCaseName           |
    #         | noCurrentAge           |
    #         | noRetirementAge        |
    #         | noCurrentIncome        |
    #         | noCurrentTotalSavings  |
    #         | noCurrentAnnualSavings |
    #         | noSavingsIncreaseRate  |
    #         | currAgeGrtThanRetAge   |
    #         | currentAgeMaxVal       |
    #         | retirementAgeMaxVal    |
   
    # Scenario Outline: Validting Social Security Details - <testCaseName>
    #     Given user fills the required details for "<testCaseName>"
    #     Then user should see the Social Security details for "<testCaseName>"
    #     Examples:
    #         | testCaseName                   |
    #         | verifywithSocialSecurityNo     |
    #         | verifyWithSocialSecurityYes    |
    #         | verifyWtihMaritalStatusMarried |

    # Scenario Outline: Fill details and calculate retirement savings - of - <testCaseName>
    #   Given user fills the required details for "<testCaseName>"
    #   When user clicks on Calculate button
    #   Then user should see the retirement savings details
    #   And user clicks on Edit Info button
    #   Then user should able to edit the values for "<editValuesTC>" 

    #   Examples:
    #     | testCaseName                   | editValuesTC |
    #     | verifywithSocialSecurityNo     | verifyWithSocialSecurityYes|

            
  