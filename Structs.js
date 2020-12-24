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

    constructor(fname, lname, email, pNumber, bets, donation) {
        this.fname = fname; //String first name of user
        this.lname = lname; //String last name of user
        this.email = email; //String email address of user
        this.pNumber = pNumber; //String phone number
        this.bets = bets; //String[] 
        this.donation = donation; //String donation amount
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
        this.users = this.#constructUsers(users);
        
    }

    updateResults(results) {
        this.results = results;
    }

    getUsers(){
        return this.users;
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

        var result = [],
            userLen = users[0].length;
        
        //Index of parsed information
        var fnameIndex = 1,
            lnameIndex = 2,
            emailIndex = 3,
            pnumberIndex = 4,
            betsIndexStart = 5,
            betsIndexEnd = userLen-2,
            donationIndex = userLen-2,
            teamIndex = userLen-1;

    
        for (var i = 0; i < users.length; i++) {
           
            var fname = users[i][fnameIndex],
                lname = users[i][lnameIndex],
                email = users[i][emailIndex],
                pnumber = users[i][pnumberIndex],
                bets = users[i].slice(betsIndexStart, betsIndexEnd),
                donation = users[i][donationIndex];

            if (user[i][teamIndex] != ""){
                fname = user[i][teamIndex];
                lname = "";
            }
            var user = new User(fname, lname, email, pnumber, bets, donation);
            user.setScore(this.#scoreUser(user));
            result.push(user);
        }
        return this.#mergeSort(result);
    }

    //scores a user, returns an int
    #scoreUser(user){
        var bets = user.getBets(),
            tally = 0;
            
        for (var i = 0; i < this.results.length; i++) {
            if (this.results[i] == bets[i]){
                switch(i){
                    case 20:
                        tally += 2;
                        break;
                    case 21:
                        tally += 3;
                        break;
                    case 22:
                        tally += 4;
                        break;
                    default:
                        tally += 1;
                        break;
                }
            }
        }
        return tally;
    }
    //merge sort for the leaderboard
    // users : takes array of class User
    #mergeSort(users) {

        var len = users.length; //array length

        if (len <= 1){ //if divided then return array
            return users; 
        }

        var mid = Math.floor(len/2); //middle index of array
        var left = users.slice(0, mid); //first half of array 
        var right = users.slice(mid, len); //last half of array

        return this.#merge(this.#mergeSort(left), this.#mergeSort(right)); //recursively sort pieces in helper function
    }
    //helper method, merges divided array
    #merge(left, right) {

        var result = []; //array to return
        var lIndex = 0; //left current dex
        var rIndex = 0; //right current dex
        var lScore; //holds current score of left indexed user
        var rScore; // score of right indexed user

        while (lIndex < left.length && rIndex < right.length) { //until one array is used up
            
            lScore = left[lIndex].getScore(); //get scores
            rScore = right[rIndex].getScore();

            if (lScore > rScore) {
                result.push(left[lIndex]); //left is smaller
                lIndex++;
            }
            else {
                result.push(right[rIndex]); //right is smaller
                rIndex++;
            }
        }
        //push remaining and return
        return result.concat(left.slice(lIndex)).concat(right.slice(rIndex));
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
    var betsCSV = 'users.csv';
    
    var file = fs.readFileSync(resultsCSV, 'utf8');
    var resultsParse = Papa.parse(file)['data'];
    var legend = resultsParse[0];
    var res = resultsParse[1];

    file = fs.readFileSync(betsCSV, 'utf8');
    var betsParse = Papa.parse(file)['data'];


    var users = betsParse.slice(1, betsParse.length);
    //console.log(users[0]);
    
    var board = new Leaderboard(users, legend, res);
    console.log(board.getUsers());
    //console.log(legend);
    //console.log(res);
    //console.log(board.getUsers()[0].getBets());
 
}

