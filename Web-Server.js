/**
 * Main Web Server
 * 
 * Provide files to web app through get and post requests.
 * Construction, storage of data structures. 
 * Interface to data structures is also provided through get and pull requests.
 * 
 */

///   Variables   ///

var resultsCSV = 'results.csv';
var betsCSV = 'bets.csv'; 


 //Include external libraries
const structs = require('Structs');
const jQuery = require('jQuery');
const papa = require('papaparse');
const bodyParser = require("body-parser");
const express = require('express');




const serv = express(); //hand requests using Express serv
//Config express to use body-parser as middle-ware
serv.use(bodyParser.urlencoded({extended: false}));
serv.use(bodyParser.json());



///                      ///
///   DATA CONSTRUCTOR   ///
///                      ///

//TODO


///                   ///
///   FILE TRANSFER   ///
///                   ///

//Default no url extension
serv.get('/', (req, res) => {
    res.sendFile(__dirname + '/Home_Page.html');
});

//Admin url extension
serv.get('/admin', (req, res) => {
    res.sendFile(__dirname + '/Admin_Page.html');
});

//Main website script
serv.get('/Browser_Script.js', (req, res) => {
    res.sendFile(__dirname + '/Browser_Script.js');
});


///                   ///
///   STRUCT ACCESS   ///
///                   ///

//TODO


///   INIT   ///

serv.listen(8080, () => console.log('listening on port 8080'));