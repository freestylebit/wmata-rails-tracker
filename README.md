# WMATA Rails Tracker
Visualizes coordinates of trains on a rail.

## Getting started

* npm install
* cp .env.sample .env
* 

### WMATA key
Since we rely on WMATA for data, you will need to sign up for an account at https://developer.wmata.com/ and generate an API key before you can begin using the app.  They do provide you with a demo key if you plan on using it for the short term.  You can acquire it here: https://developer.wmata.com/demokey

Once you acquire a working key, copy the key to WMATA_PRIMARY_KEY in your .env file.

### Redis
This project uses redis as a temporary data store. You will need an instance up somewhere in your system.

Once you have an instance you can connect to, fill in the missing parameters in your .env file.

*For mac users, refer to http://jasdeep.ca/2012/05/installing-redis-on-mac-os-x/ and install using brew (easiest method).*
