Feature: Smoke test

  Scenario: the server starts successfully
    Given the server is started
    And the webhook is signed
    When a webhook is received
    Then a response is sent

  Scenario: an unsigned webhook is rejected
    Given the server is started
    When a webhook is received
    Then an unauthorized response is sent
