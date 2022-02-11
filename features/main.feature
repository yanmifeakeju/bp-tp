Feature: General
  Scenario Outline: POST and PUT requests should have non-empty payloads
    All POST and PUT request must have non-zero values for its "Content-Length" header
    When the client creates a '<method>' request to users
    And attaches a 'empty' payload
    And sends the request
    Then the API should respond with a 400 HTTP status code
    And the payload of the response should be a JSON object
    And contains a message property which says "Payload should not be empty"

    Examples:
      | method |
      | POST   |
      | PUT    |

  Scenario: Content-Type Header should be set for requests with non-empty payloads
    All requests  which has non-zero values for its "Content-Length" header must have its "Content-Type" header set

    When the client creates a 'POST' request to users
    And attaches a 'generic' payload
    But without a 'Content-Type' header set
    And sends the request
    Then the API should respond with a 400 HTTP status code
    And the payload of the response should be a JSON object
    And contains a message property which says 'The "Content-Type" header is not set'

  Scenario: Content-Type header should be set to application/json
    All request which has "Content-Type" header must set its value to contain "application/json"

    When the client creates a 'POST' request to users
    And attaches a 'non-JSON' payload
    And sends the request
    Then the API should respond with a 415 HTTP status code
    And the payload of the response should be a JSON object
    And contains a message property which says '"Content-Type" header is not "application/json"'