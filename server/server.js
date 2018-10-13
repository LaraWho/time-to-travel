const express = require('express'),
axios = require('axios'),
massive = require('massive'),
session = require('express-session');

require('dotenv').config();
const app = express();

let {
    SERVER_PORT,
    REACT_APP_CLIENT_ID,
    CLIENT_SECRET,
    REACT_APP_DOMAIN,
    SESSION_SECRET,
    CONNECTION_STRING
} = process.env

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
})

app.listen(SERVER_PORT, ( ) => {
    console.log(`Listening on port: ${SERVER_PORT}`)
});