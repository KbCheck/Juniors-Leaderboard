/**
 *  Define the data structures for the project
*/

const Papa = require('papaparse');
const fs = require('fs');



/**
 * User :: Class
 * Define a user who has placed bets on hockey games. 
 * Store all bets for each game and some personal information on the user.
 */
class User {

    constructor(name, email, pNumber, donation, bets) {
        this.name = name; //String name of user
        this.email = email; //String email address of user
        this.pNumber = pNumber; //String phone number
        this.donation = donation; //String donation amount
        this.bets = bets; //String[] 
        this.score = 0;
    }

    getName(){
        return this.name;
    }

    getBets(){
        return this.bets;
    }

    getGame(index){
        return this.bets[index];
    }

    addScore(amount){
        this.score += amount;
    }

    getScore(){
        return amount;
    }
}





/**
 * The top dog data structure.
 * This houses all the information needed for the leaderboard.
 * Users are scored on leaderboard construction
 */
class Leaderboard {

    constructor(users, key, results){

        this.key = key;
        this.results = results;
        this.users = scoreUsers(constructUsers(users));
    }

    updateResults(results) {
        this.results = results;
    }

    getResults(){
        return this.results;
    }

    getReportedCount(){
        return this.results.length;
    }

    getKey(){
        return this.key;
    }

}


function scoreUsers(){
    //TODO
}


function constructUsers(){
    //TODO
}



//merge sort for the leaderboard
// users : takes array of class User
function mergeSort(users){

    var len = users.length; //array length

    if (len <= 1){ //if divided then return array
        return users; 
    }

    var mid = Math.floor(len/2); //middle index of array
    var left = users.slice(0, mid); //first half of array 
    var right = users.slice(mid, len); //last half of array

    return merge(mergeSort(left), mergeSort(right)); //recursively sort pieces in helper function

}
//helper function, merges divided array
function merge(left, right){

    var result = []; //hold results of merge
    
}




if (require.main === module) {

    var resultsCSV = 'results.csv';
    var betsCSV = 'bets.csv';
    
    var file = fs.readFileSync(resultsCSV, 'utf8');
    var resultsParse = Papa.parse(file)['data'];
    var key = resultsParse[0];
    var results = resultsParse[1];

    file = fs.readFileSync(betsCSV, 'utf8');
    var betsParse = Papa.parse(file)['data'];


    var users = betsParse.slice(1, betsParse.length);
    
    var board = new Leaderboard(users, key, results);

    console.log(users);
    console.log(key);
    console.log(results);

 
}

