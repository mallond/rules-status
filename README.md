# BizRez Status Assignments

# curl

## CRUD

Security - Encrypted Token

Reasoning behind Token - The token in the response header works fine for single domain apps,
however, this is problematic, when you do CORS. The below have been tested using CORS.

CORS has been implemented

Consolidated actions to to type of http METHODS [GET, POST]. Works with all modern browsers utilizing jQuery

Step one: Request token
Step two: Use token for all rest service calls

- curl -H "Content-Type: application/json" -X GET -d '{"name":"mary"}' http://localhost:3000/authenticate
- curl -H "Content-Type: application/json" -X POST -d '{add token and data}' http://localhost:3000/status/create
  Token and Data Example: (you have to have valid json and get rid of any spaces between elements
  curl -H "Content-Type: application/json" -X POST -d '{ "name": "mary","pageNumber": 1,"token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJtYXJ5IiwiZXhwIjoxMzk5Nzc3MjcyMjIxfQ.Dkb1hjoWsw6fnkI1c6gnzc_ACpQDTp0M-2gt6VEbmuA","user": "Fred","status": "New","priority": "High","header": "header data ","body": "body data" }' http://localhost:3000/status/create
- curl -H "Content-Type: application/json" -X POST -d '{add token from authenticate}' http://localhost:3000/status/read
- curl -H "Content-Type: application/json" -X POST -d '{add token from authenticate}' http://localhost:3000/status/update
- curl -H "Content-Type: application/json" -X DELETE -d '{add token from authenticate}' http://localhost:3000/status/delete








