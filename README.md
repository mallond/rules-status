# BizRez Worklist Assignments

# curl

## CRUD(l)

Cookie based session - unfortunately each time you switch to a directory '/name' you have to pass in a users credentials

- curl -H "Content-Type: application/json" -X GET -d '{"name":"mary"}' http://localhost:3000/authenticate
- curl -H "Content-Type: application/json" -X PUT -d '{add token from authenticate}' http://localhost:3000/status
- curl -H "Content-Type: application/json" -X GET -d '{add token from authenticate}' http://localhost:3000/status
- curl -H "Content-Type: application/json" -X POST -d '{add token from authenticate}' http://localhost:3000/status
- curl -H "Content-Type: application/json" -X DELETE -d '{add token from authenticate}' http://localhost:3000/status


- curl -H "Content-Type: application/json" -X GET -d '{add token from authenticate}' http://localhost:3000/status
- curl -H "Content-Type: application/json" -X PUT -d '{"name":"john","password":"password"}' http://localhost:3000/assignments/status
- curl -H "Content-Type: application/json" -b cookies.txt -c cookies.txt -X GET -d '{"name":"john","password":"password"}' http://localhost:3000/assignments/status
- curl -H "Content-Type: application/json" -b cookies.txt -c cookies.txt -X POST -d '{"name":"john","password":"password"}' http://localhost:3000/assignments/status
- curl -H "Content-Type: application/json" -b cookies.txt -c cookies.txt -X DELETE -d '{"name":"john","password":"password"}' http://localhost:3000/status
- curl -H "Content-Type: application/json" -b cookies.txt -c cookies.txt -X GET -d '{"name":"john","password":"password"}' http://localhost:3000/assignments/status








