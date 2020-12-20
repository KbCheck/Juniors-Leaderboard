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
        this.fname = fname; //String first name of user
        this.lname = lname; //String last name of user
        this.email = email; //String email address of user
        this.pNumber = pNumber; //String phone number
        this.donation = donation; //String donation amount
        this.bets = bets; //String[] 
        this.score = 0;
    }

    getFirstName(){
        return this.fname;
    }

    getLastName(){
        return this.lname;
    }

    getEmail(){
        return this.email;
    }

    getPhone(){
        return this.pNumber;
    }

    getDonation(){
        return this.donation;
    }

    getBets(){
        return this.bets;
    }

    getGame(index){
        return this.bets[index];
    }

    setScore(amount){
        this.score = amount;
    }

    getScore(){
        return this.score;
    }
}





/**
 * The top dog data structure.
 * This houses all the information needed for the leaderboard.
 * Users are scored on leaderboard construction
 */
class Leaderboard {

    /**
     * users - an array of users exported from user csv
     * legend - an array of the titles of the matches
     * results - the answers/results to the games in the corresponding legend
     */
    constructor(users, legend, results){

        this.legend = legend;
        this.results = results;
        //this.users = this.#constructUsers(users, results);
        
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

    getLegend(){
        return this.legend;
    }

    //constructs the users of the leaderboard and sorts them
    #constructUsers(users){

        var result = []
            len = users.length;
            userLen = users[0].length;
    
        for (var i = 0; i < length; i++) {
           
            var fname = users[i][1];
                lname = users[i][2];
                email = users[i][3];
                pnumber = users[i][4];
                bets = users[i].slice(5,userLen-1);
                donation = users[i][userLen-1];
                user = new User(fname,lname,email,pnumber,bets,donation);
            user.setScore(this.#scoreUser(user));
            results.push(user);
        }
    
    }

    //scores a user, returns an int
    #scoreUser(user){
        var bets = user.getBets();
            tally = 0;
            
        for (var i = 0; i<= this.results.length; i++) {
            if (this.results[i] == bets[i]){
                switch(i){
                    case 20:
                        tally += 2;
                    case 21:
                        tally += 3;
                    case 22:
                        tally += 4;
                    default:
                        tally += 1;
                }
            }
        }
        return tally;
    }


    //merge sort for the leaderboard
    // users : takes array of class User
    #mergeSort(users){

        var len = users.length; //array length

        if (len <= 1){ //if divided then return array
            return users; 
        }

        var mid = Math.floor(len/2); //middle index of array
        var left = users.slice(0, mid); //first half of array 
        var right = users.slice(mid, len); //last half of array

        return merge(mergeSort(left), mergeSort(right)); //recursively sort pieces in helper function

    }
    //helper method, merges divided array
    #merge(left, right){

        var result = [];

        //TODO
        
        
    }

}



//exports of classes
module.exports = {
    Leaderboard: Leaderboard,
    User: User
}





//MAIN TESTING
if (require.main === module) {

    var resultsCSV = 'results.csv';
    var betsCSV = 'bets.csv';
    
    var file = fs.readFileSync(resultsCSV, 'utf8');
    var resultsParse = Papa.parse(file)['data'];
    var legend = resultsParse[0];
    var results = resultsParse[1];

    file = fs.readFileSync(betsCSV, 'utf8');
    var betsParse = Papa.parse(file)['data'];


    var users = betsParse.slice(1, betsParse.length);
    
    var board = new Leaderboard(users, legend, results);
    console.log(users);
    console.log(legend);
    console.log(results);

 
}

