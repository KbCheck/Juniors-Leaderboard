/**
 *  Define the data structures for the project
*/

const Papa = require('papaparse');
const fs = require('fs');

/**
 * Results :: Class
 * define a structure for storing the results of recent hockey games.
 * Results can be incomplete, and updated as time passes.
 *  
 */
class Results {
    
    constructor(key, results) {
        this.key = key;
        this.results = results;
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
    }

    getBets(){
        return this.bets;
    }

    getGame(index){
        return this.bets[index];
    }
}





class Leaderboard {
    constructor(){

    } 

}
 
/** NOT SURE IF NECESSARY
class Bets{

    constructor(){
        this.betRay;
    }

}
*/

if (require.main === module) {
    

    fs.readFile('results.csv', 'utf8', (err, data) => {
        if (err){
            return console.log(err);
        }
        var file = data;
        
        var ray = Papa.parse(file)['data'];


        //TESTING
        //console.log(ray);

        var results = new Results(ray[0], ray[1]);

        console.log(results.getReportedCount()); //get number of game results reported
    });

 
}

