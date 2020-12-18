/**
 * Main Web Server
 * 
 * Provide access of webscripts through get and post requests.
 * Interface to data structures is also provided through get and pull requests.
 */

const bodyParser = require("body-parser");
const express = require('express');
const app = express();

//Config express to use body-parser as middle-ware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Default no url extension
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/Home_Page.html');
});

//Admin url extension
app.get('/admin', (req, res) => {
    res.sendFile(__dirname + '/Admin_Page.html');
});

app.get('/Browser_Script.js', (res, req) => {
    res.sendFile(__dirname + '/Browser_Script.js');
});

app.listen(8000, () => console.log('listening on port 8000'));