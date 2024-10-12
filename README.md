The data is in the `backend/data/planes.sqlite` file.

## Prerequisites

- Node >= v18
- NPM >= 9

## Setup for Development

Install dependencies with ```npm install```.

Run the frontend:
```bash
cd frontend
npm run dev
```

Run the backend:
```bash
cd backend
npm run dev
```

# Name: James Howell

# Contact details:
    - jphowell@live.com
    - https://uk.linkedin.com/in/jamesphowell

# Differences between what I coded in this project and what I would do in a real production system (What I'd do in a real-world scenario):

BACKEND:
- Split the database setup in to a different directory, as the initialisation doesn't need to take place in the server file
- Split the routes in to a separate directory, e.g. src/routes/get, src/routes/post etc.
- Create a dynamic query generator function that can be shared between all (incl. future) endpoints rather than hard coding / hacking sql statements in the /planes endpoint.
- Create a generic error handler helper that I can call in the catch block of each route's try/catch.
- Create interfaces / types for the above.

FRONTEND:
- Create a generic http request helper, perhaps using axios, to make calls to the API. Break this helper out in to an 'api' directory (src/api/request perhaps). Make the helper take following params (roughly):
    - url
    - route
    - method
    - headers (optional)
    - body (optional)
- create constants.ts file in src directory that contains things like displayColumns, databaseColumns etc. (Hardcoded because the requirements state to only display a subset of the total columns from table)
- Look in to a cleaner way of calculating total / current page variables. I am not too familiar with sqlite, so i don't know if this is already supported.
- There's a console error being logged due to having a tr element inside of a div. given more time, I'd tidy that up

# What other tests I'd expect to be written for a real system
BACKEND (test cases i'd write given more time):
- db created with correct path
- error thrown if path does not exist
- console.log logs a query executed
- bad query throws error
- error thrown if /planes endpoint called without request body
- return rows 0-30 if request.body.endRow is 0, else return expected offset rows
- return expected columns from req.body
- return total row count
- return 500 error if error thrown
- return error message if error thrown
- console error logged if error thrown
- app.listen called with args (3000, anonFn)
- console.log called with Sever listening on port ...

FRONTEND (test cases i'd write given more time):
- component renders as expected
- each row / cell has unique key
- component renders total row count returned from service
- component renders correct current page
- next / back buttons disabled when at first/last page
- correct column headers rendered
- rows returned from service are rendered
- clicking next / back fires single request with correct endRow
- if last page does not contain 30 results, confirm that correct number of results are rendered
- api call fired once on render
