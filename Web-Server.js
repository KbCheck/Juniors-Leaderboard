/**
 * Main Web Server Thread
 * 
 * Provide files to web app through get and post requests.
 * Construction, storage of data structures. 
 * Interface to data structures is also provided through get and pull requests.
 * 
 */

///   FILES   ///

var SCRIPT = '/Browser_Script.js'; 
var homePage = '/Home_Page.html';
var adminPage = "/Admin_Page.html";
var STRUCTS = "/Structs.js";

var resultsCSV = 'results.csv';
var betsCSV = 'bets.csv'; 


///   Variables   ///

var PORT = 8080;
    LEADERBOARD = '/leaderboard',
    ADMIN = '/admin',
    DATA = '/getData';


//Include external libraries
const structs = require('./Structs');
const jQuery = require('jQuery');
const papa = require('papaparse');
const bodyParser = require("body-parser");
const express = require('express');
const fs = require('fs');




const serv = express(); //hand requests using Express serv
//Config express to use body-parser as middle-ware
serv.use(bodyParser.urlencoded({extended: false}));
serv.use(bodyParser.json());



///                      ///
///   DATA CONSTRUCTOR   ///
///                      ///

var dataArray = [];

var file = fs.readFileSync(resultsCSV, 'utf8'), //read from results file
    resultsParse = papa.parse(file)['data'],  //parse csv
    legend = resultsParse[0], // titles of columns
    res = resultsParse[1];    // answers

file = fs.readFileSync(betsCSV, 'utf8'); //read from user bets file
var betsParse = papa.parse(file)['data']; //parse csv

var users = betsParse.slice(1, betsParse.length); //slice users to own array
    
var board = new structs.Leaderboard(users, legend, res), //build leaderboard data structure
    sorted = board.getUsers(); //grab sorted users from data structure
    
for (var i = 0; i < sorted.length; i++) { //Add all users to an array ready to send to browser.
    var u = sorted[i];
    dataArray.push([u.getFirstName(), u.getLastName(), u.getScore(), u.getBets(), u.getEmail(), u.getPhone()]); //format user data
}
//console.log(dataArray);


///                   ///
///   FILE TRANSFER   ///
///                   ///

//Default no url extension
serv.get(LEADERBOARD, (req, res) => {
    res.sendFile(__dirname + homePage);
});

//Admin url extension
serv.get(ADMIN, (req, res) => {
    res.sendFile(__dirname + adminPage);
});

//Main website script
serv.get(SCRIPT, (req, res) => {
    res.sendFile(__dirname + SCRIPT);
});

//Sends structs to web script
serv.get(STRUCTS, (req, res) => {
    res.sendFile(__dirname + STRUCTS);
});

//Sends home page css styles
serv.get('/Home_Page_Styles.css', (req, res) => {
    res.sendFile(__dirname + '/Home_Page_Styles.css');
});


///                   ///
///   STRUCT ACCESS   ///
///                   ///

//Sends all user data to browser
// Format:   [ [FirstName, LastName, Score, Bets, Email, Phone] ... , [FirstName, LastName, Score, Bets, Email, Phone] ]"
serv.get(DATA, (req, res) => {
    res.send(dataArray);
});


///   INIT   ///

serv.listen(PORT, () => console.log('listening on port ' + PORT));