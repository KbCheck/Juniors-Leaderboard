
// The position of each row in the table
// increments each new row added
var dynamicPositionID = 0;

// When the html page loads, this function will execute
// Send an XMLHTTMP request to retrieve the required data from the server
// and send the data to the appropriate functions
window.onload = function() {

    // This is an asyc method
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET","http://localhost:8080/getData", true);
    xmlhttp.onreadystatechange=function() {

     if (xmlhttp.readyState==4 && xmlhttp.status==200) {
         // When the request is received format it correctly
         // The server will send the data in order
        var dataArr = createArrayFromString(xmlhttp.responseText);

        // Use the formatted data to add each row to the leaderboard dynamically
        dataArr.forEach(function (item) {
            addRowScoreboard(item[0], item[1], item[2]);
        });
        } 
    }
    xmlhttp.send();
};

// Grab the string sent by the server, this will be in an array format
// Return the formatted string as an array
function createArrayFromString(data) {
    var formattedData = JSON.parse("[" + data + "]");
    
    return formattedData[0];
}

// This function increments the position # in each row
// Also adds the dynamic new rows with data sent from the server
function addRowScoreboard(fName, lName, score) {
    dynamicPositionID++;

    // Add new row to the table with the given data from the server
    var newRow = document.getElementById('tableEntries');
    newRow.insertAdjacentHTML('beforeend', '<tr><th scope="row">' + dynamicPositionID + '</th><td>'
     + fName + '</td><td>' + lName + '</td><td>' + score + '</td></tr>');    
}