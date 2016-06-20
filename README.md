# WMATA Rails Tracker
Visualize coordinates of trains on a rail in one console.

## Getting started

*Instructions assumes you're using unix/linux or a Mac.*
* npm install
* cp .env.sample .env
* *Fill in missing values (refer to next two sections)*
* webpack; node server.js
* *Access the site via http://localhost:3000*

### WMATA key
Since we rely on WMATA for data, you will need to sign up for an account at https://developer.wmata.com/ and generate an API key before you can begin using the app.  They do provide you with a demo key if you plan on using it for the short term.  You can acquire it here: https://developer.wmata.com/demokey

Once you acquire a working key, copy the key to WMATA_PRIMARY_KEY in your .env file.

### Redis
This project uses redis as a temporary data store. You will need an instance up somewhere in your system.

Once you have an instance you can connect to, fill in the missing parameters in your .env file.

*For Mac users, refer to http://jasdeep.ca/2012/05/installing-redis-on-mac-os-x/ and install using brew (easiest method).*

## Testing, linting, code coverage
Most of the commands are set up using npm.  The following are available to you to test project health.

### Linting
```
npm run lint
```
### Code coverage report and testing
```
npm test
```


