Feature: Smoke test

  Scenario: make sure the server starts
    Given the server is started
    When a webhook is received
    Then a response is sent
