# BizRez Worklist Assignments

# curl

## CRUD(l)

Reasoning behind Token - The token in the response header works fine for single domain apps,
however, this is problematic, when you do CORS. The below have been tested using CORS.

Step one: Request token
Step two: Use token for all rest service calls

- curl -H "Content-Type: application/json" -X GET -d '{"name":"mary"}' http://localhost:3000/authenticate
- curl -H "Content-Type: application/json" -X POST -d '{add token from authenticate}' http://localhost:3000/status/create
- curl -H "Content-Type: application/json" -X GET -d '{add token from authenticate}' http://localhost:3000/status/read
- curl -H "Content-Type: application/json" -X POST -d '{add token from authenticate}' http://localhost:3000/status/update
- curl -H "Content-Type: application/json" -X DELETE -d '{add token from authenticate}' http://localhost:3000/status/delete








