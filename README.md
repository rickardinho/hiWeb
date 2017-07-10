# Spark
![](https://circleci.com/gh/DRDD2016/app.svg?style=shield&circle-token=:circle-token)

#### This project needs Node 5.6 or greater to run.

## How to run


1. Clone this repository

2. `npm install` it

3. [**Set the environment variables**](#env) (see below)

4. Run the server with nodemon in a terminal window with:
```bash
npm run start:dev
```
*Be sure you to have nodemon installed globally.*
5. Run the webpack dev server in a separate terminal window with:
```bash
npm run dev
```

The app will be accessible from `localhost:8080`.  The main app server runs on `localhost:9000`.  The webpack dev server is set up to reroute requests to the main app server via proxy.

## Testing
* Tests use tape and are transpiled from ES6 using babel-register.
* Run the tests using:
```bash
npm test
```

Tests require a separate Redis database to run, referenced by a `DEVELOPMENT` environment variable.

A pre-test script runs `test/utils/initDB.js` to pre-populate the testing database with dummy values.  Dummy values are removed by the tests themselves.

* Istanbul is used for test coverage.  Run istanbul with:
```bash
npm run coverage
```

## <a name='#env'></a>Environment variables
### For the main app
```bash
REDISCLOUD_ONYX_URL=*url for your main redis database*
CLIENT_ID=*your facebook developer client id*
CLIENT_SECRET=*your facebook developer client secret*
```


### For testing
```bash
DEVELOPMENT=*url for your testing redis database*
CLIENT_ID=*your facebook developer client id*
CLIENT_SECRET=*your facebook developer client secret*
```

### Database structure

#### Events
**event:[_num_]**
* set of stringified objects
* *num* increments automatically from 1

#### RSVPs
**RSVP:event:[_num_]|[_attendance status_]**
* set of userIDs
* Three possible attendance statuses: *going*, *notGoing*, *maybe*

#### Photos
**photos:event:[num]**
Stringified object with:
* photoURL {string}
* userID {string}
* timestamp {number}

#### User's deleted photos
**photos:event:16|[_userID_]**
