# BizRez Worklist Assignments

# curl

## CRUD(l)

Cookie based session - unfortunately each time you switch to a directory '/name' you have to pass in a users credentials

- curl -H "Content-Type: application/json" -b cookies.txt -c cookies.txt -X GET -d '{"name":"john","password":"password"}' http://localhost:3000/status
- curl -H "Content-Type: application/json" -b cookies.txt -c cookies.txt -X POST -d '{"name":"john","password":"password"}' http://localhost:3000/assignments/status
- curl -H "Content-Type: application/json" -b cookies.txt -c cookies.txt -X GET -d '{"name":"john","password":"password"}' http://localhost:3000/assignments/status
- curl -H "Content-Type: application/json" -b cookies.txt -c cookies.txt -X POST -d '{"name":"john","password":"password"}' http://localhost:3000/assignments/status
- curl -H "Content-Type: application/json" -b cookies.txt -c cookies.txt -X DELETE -d '{"name":"john","password":"password"}' http://localhost:3000/status
- curl -H "Content-Type: application/json" -b cookies.txt -c cookies.txt -X GET -d '{"name":"john","password":"password"}' http://localhost:3000/assignments/status








