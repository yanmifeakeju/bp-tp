Feature: Create User
  Clients should be able to send a request to the API in order to create a user. Our API should also validate the structure of the payload and respond with an error if it is invalid

  Scenario Outline: Bad client Requests
    If the clients send a bad request in the form of an empty payload, unsupported media types, or improperly formed Payload

    When the client creates a 'POST' request to users
    And attaches a '<payloadType>' payload
    And sends the request
    Then the API should respond with a <statusCode> HTTP status code
    And the payload of the response should be a JSON object
    And contains a message property which says <message>

    Examples:
      | payloadType | statusCode | message                               |
      | empty       | 400        | "Payload should not be empty"         |
      | malformed   | 400        | "Payload is not in valid JSON format" |


