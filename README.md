# Hi Web version

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
