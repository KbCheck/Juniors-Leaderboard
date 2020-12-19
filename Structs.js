/**
 *  Define the data structures for the project
 */





/**
 * Results :: Class
 * define a structure for storing the results of recent hockey games.
 * Results can be incomplete, and updated as time passes.
 *  
 */
class Results {
    
    constructor() {
        this.gameOne;
        this.gameTwo;

        this.Games = [];

    }

    updateResults() {
        

    }

    getResults(){

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
