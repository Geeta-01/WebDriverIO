Feature: Retirement Calculator

  Scenario Outline: Positive - Calculate retirement savings with valid inputs
    Given I am on the Retirement Calculator page
    When I fill in the retirement calculator form with valid data from "<row>"
    And I submit the calculator form
    Then I should see the calculated retirement savings message

    Examples:
      | row |
      | 1   |
      | 2   |
      | 3   |
      | 5   |
    

  Scenario Outline: Negative - Handle invalid inputs
    Given I am on the Retirement Calculator page
    When I fill in the retirement calculator form with invalid data from "<row>"
    And I submit the calculator form
    Then I should see an error message as "Please fill out all required fields"

    Examples:
      | row |
      | 4   |
