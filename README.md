
[![Build Status](https://travis-ci.org/kayroy247/Politico.svg?branch=develop)](https://travis-ci.org/kayroy247/Politico)  [![Coverage Status](https://coveralls.io/repos/github/kayroy247/Politico/badge.svg?branch=develop)](https://coveralls.io/github/kayroy247/Politico?branch=develop) [![Test Coverage](https://api.codeclimate.com/v1/badges/99836b8819a0e24dccfe/test_coverage)](https://codeclimate.com/github/kayroy247/Politico/test_coverage) [![Maintainability](https://api.codeclimate.com/v1/badges/99836b8819a0e24dccfe/maintainability)](https://codeclimate.com/github/kayroy247/Politico/maintainability) [![codecov](https://codecov.io/gh/kayroy247/Politico/branch/develop/graph/badge.svg)](https://codecov.io/gh/kayroy247/Politico) [![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

# Politico
Politico is an online voting system that enables citizens give their mandate to politicians running for different government offices while building trust in the process through transparency.

### UI Templates on Github pages
This is the link to the [UI Templates](https://kayroy247.github.io/Politico/UI/index.html) on Github Pages.

### Politico Restful API on heroku
[SendIT API](https://politico.herokuapp.com/)

### Project Management
[Pivotal Tracker](https://www.pivotaltracker.com/n/projects/2239248)

### User Features
- Users can signup
- Users can Login
- Users can view all politicians contesting for a political office
- Users can vote for only one politician per political office
- View election results

### Admin Features
- Admin can register a political party
- Admin can delete a political party
- Admin can create different political offices

### Optional Features 
- A user can reset password
- A politician can create a petition against a concluded election for political office

### How To Install and Run This Application on your Computer
1. Download and install [GIT](https://git-scm.com/downloads), [NodeJs](https://nodejs.org/en/) and [Postgresql](https://www.postgresql.org/download/) on your computer
2. Create a database with the name Politico (This name will be included in the connectionString). 
3. Clone this repository by running the following on your command line interface
`
git clone https://github.com/kayroy247/Politico.git
`
4. Navigate to the root of the cloned or downloaded project directory on your computer
5. Run `npm install` to install all dependencies
6. Rename the `.env-example` file to `.env` and set the variable values by following the instruction in the file
7. Finally Run `npm start` to start the server. You now have a running copy of Politico application :sparkles:

### Access Endpoints 
- Access the homepage on a browser through localhost:3000/api/v1
- All other endpoints and request methods below can be accessed with [Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=en)

### Available endpoints
HTTP METHOD | ENDPOINTS | FUNCTIONALITY
--- | --- | ---
GET | /api/v1| *Sends the Welcome message*
GET | /api/v1/parties   | *Fetch all the political parties*
GET | /api/v1/offices   | *Fetch all the political office's records*
GET | /api/v1/parties/:partyId   | *Fetch a specific political party by id*
GET | /api/v1/offices/:officeId  | *Fetch a specific political office by id*
PATCH | /api/v1/parties/:partyId/name  | *Edit the name of a specific political party by id*
POST | /api/v1/parties   | *Create a new political party*
POST | /api/v1/offices   | *Create a new political office*
POST | /api/v1/auth/signup   | *Create a new user account*
POST | /api/v1/auth/login   | *Login a user account*
POST | /api/v1/:userId/register  | *Register a user for a political office*
POST | /api/v1/votes   | *Vote a candidate*
POST | /api/v1/office/officeId/result   | *collate and fetch the result of specific office following a concluded election*
DELETE | /api/v1/parties/:id  | *Delete a specific political party by id*
DELETE | /api/v1/parcels/:id  | *Delete a user by id*

### Optional Endpoints
HTTP METHOD | ENDPOINTS | FUNCTIONALITY
--- | --- | ---
POST | /api/v1/auth/reset   | *Reset a user account password*
POST | /api/v1/petitions   | *Create a petition challenging the result of a concluded election*
### How to run unit tests
To run tests on the app run:
`
npm test
`
### Built With
#### Front End 
- HTML, CSS, JAVASCRIPT(ES6)
#### Backend 
- Nodejs/Expressjs
#### Test Modules
- [Mocha](https://mochajs.org/) - A Javascript test framework
- [Chai](https://www.npmjs.com/package/chai)- A Javascript assertion library
- [Chaihttp](https://www.npmjs.com/package/chai-http)- An addon plugin for Chai assertion library
### Test Coverage Instrumentation and Report
- [nyc](https://www.npmjs.com/package/nyc) 
### Linting And Style Guide
- Eslint(Airbnb style guide)
### Continous Integration
Travis-ci.org
### Code Coverage and Maintenability
- coveralls.io
- codeclimate.com
- codecov.io
 
### Author
Okunlade Kayode. :smiley: :thumbsup: :sparkles:

### Credits
- [Learn Node in 1 Hour](https://www.youtube.com/watch?v=TlB_eWDSMt4)
- [javascript.info](javascript.info)
- [Beginners Guide To Writting Readme](https://medium.com/@meakaakka/a-beginners-guide-to-writing-a-kickass-readme-7ac01da88ab3)
### Acknowledgement
My appreciation to the Learning Faciitator Assistants for their motivation and feedback.

### License
This application is written under the MIT license. Please check the LICENSE.md file for details.
