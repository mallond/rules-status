# BizRez.com  JavaScript Dynamic Status Engine

A dynamic Document Object Model B-Tree indexed based Status Engine.
Simplistically designed to accommodate different domain models by extending the base schema.
Scalable vertically in a Big Data fashion, using MongoDB as the main driver for peta byte
organic growth. B-Tree efficient for access, as speed is a requirement. Light dynamic Document
Object model for differing Business Domain Solutions. Pragmatic.

"End in Mind" - Stephen Covey
What needs to be measured,
Who needs to be measured,
Why it needs to be measured,
Who is the audience.

In the old days of Data Processing, the end in mind was always the main onus on design.
You could say the "Report is King." Somewhere, the UI got all the fan fare. And
people just forgot what is important. I belive that Data Processing is back
with a vengence, and this little language called JavaScript, along with a very Data
Processing centric DB, called MongoDB, will take back the effecencies, and the
reason that Buesiness need Pragmatic Soutions.


Types of Status:

- When something starts
- When something ends
- Cost
- Quantity
- Duration
- Urgency
- History of things
- Projection of happenings
- Internet of things

## KPI – Key Point Indicators

## Bottom line: Reporting on your business.

## Now, the BPM pros have construed a science in the monitoring of things with status, predominately in processes.  Managers just need to be in the know!

## Use Case

Provide a simple rest interface to track a process throughout its useful life cycle. This to include time SLAs, and escalation attributes. The process should adopt general BPM status of: New, Pending, Completed. The process status is not to be dependent on any screen, and must behave in a dynamic nature that is wholly driven by the business process. A deep link property shall be provided for linkage to the current status. This use case to be a prototype of the Work Status of a simple process, and will serve as a base design to extend into a more complete Business domain solution


Schema:

- Organization 			Primary Index
- Division			    Primary Index
- Unit			        Primary Index
- Owner Id			    Person or System
- Is a Person			Is this a Person process or a System process
- Is Parent			    Is this a Parent (default true)
- Type				    Type = Work (for this Use Case)
- Status				[New, Pending, Completed, Withdrawn]
- Status Information	[Short description of status]
- Priority			    [Low, Medium, High, Top]
- Child process			Array of dependent statuses
- Create Date			Create Date
- Completion Date		Completion Date
- Goal Date			    Goal Date
- Deadline Date			Deadline Date
- Header			    Header
- Detail				Detail – Document Object Model
- Deep link			    Deep link for HTML display and or process link

## Requirements

- Restful service – input/output JSON
- Big Data – MongoDB for this prototype
- No SQL – Schema based but dynamic in nature
- Document Objet Model
- Cross Domain accessible
- Encrypted Token for authentication

The actual implementation of this status engine is rather simple. Based primarily on simple CRUD type operations.  The power is in the usage of the MongoDB based status schema. This is were imagination is the most important ingredient.  The beauty of a No-SQL design is the ability of this simple design to morph into specific domain controlled status requirements. It can be assumed that this baseline design is generic enough to be extended into domain specific solutions.

## Technology Implementation

Node.js
MongoDB
		Dependencies
     "express": "~4.0.0",
      “morgan": "~1.0.0",
      "static-favicon": "~1.0.0",
      "body-parser": "~1.0.0",
      "debug": "~0.7.4",
      "mongoose": "3.8.8",
       "jwt-simple": "0.2.0",
       "moment": "2.6.0",
       "log": "1.4.0",
       "mongoose-paginate": "2.2.0 ",
       "mocha": "1.18.2"


## CRUD a few CURL Examples

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








