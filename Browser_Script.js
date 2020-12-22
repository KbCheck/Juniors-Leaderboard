var dynamicScoreID = 0;

window.onload = function() {
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET","http://localhost:8080/getData", true);
    xmlhttp.onreadystatechange=function() {

     if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            var dataArr = createArrayFromString(xmlhttp.responseText);
            console.log(dataArr);
            dataArr.forEach(function (item) {
                addRowScoreboard(item[0], item[1], item[2]);
            });
         } 
    }
    xmlhttp.send();
};

function createArrayFromString(data) {
    var formattedData = JSON.parse("[" + data + "]");
    
    return formattedData[0];
}

function addRowScoreboard(fName, lName, score) {
    dynamicScoreID++;

    var newRow = document.getElementById('tableEntries');
    newRow.insertAdjacentHTML('beforeend', '<tr><th scope="row">' + dynamicScoreID + '</th><td>'
     + fName + '</td><td>' + lName + '</td><td>' + score + '</td></tr>');    
}