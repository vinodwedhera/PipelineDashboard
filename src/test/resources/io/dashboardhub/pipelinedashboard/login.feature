Feature: Application Security

  Scenario: Guest trying to access secure pages
    Given I am not logged in
    When I try to access a secure page
    Then I get redirected to the login page
