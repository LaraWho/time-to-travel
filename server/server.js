const express = require('express'),
axios = require('axios'),
massive = require('massive'),
session = require('express-session');
var bcrypt = require('bcryptjs');

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

const login_cntrl = require('./login_controller');
// const note_cntrl = require('./note_controller');

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 14
    }
}))

massive(CONNECTION_STRING).then(db => {
    console.log("database connected!");
    app.set('db', db);
}).catch( error => console.error('ERROR!', error))

// authorisation endpoints
// app.get('/api/user', login_cntrl.getUser);
app.post('/auth/login', login_cntrl.login);
app.post('/auth/register', login_cntrl.register);
app.delete('/auth/logout', login_cntrl.logout);

// note endpoints
// app.post('/allnotes/:id', note_cntrl.create);
// app.get('/allnotes', note_cntrl.read);
// app.patch('/allnotes/:id', note_cntrl.update);
// app.delete('/allnotes/:id', note_cntrl.delete);


app.listen(SERVER_PORT, ( ) => {
    console.log(`Listening on port: ${SERVER_PORT}`)
});