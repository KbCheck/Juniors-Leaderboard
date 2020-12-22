var dynamicScoreID = 0;

window.onload = function() {
    var rowData=new Array(); 
    rowData[0]="Yay";
    rowData[1]="test";
    rowData[2]="98";

    rowData.forEach(function (item) {
        addRowScoreboard(item, item, item);
    });
};

function addRowScoreboard(fName, lName, score) {
    dynamicScoreID++;

    var newRow = document.getElementById('tableEntries');
    newRow.insertAdjacentHTML('beforeend', '<tr><th scope="row">' + dynamicScoreID + '</th><td>'
     + fName + '</td><td>' + lName + '</td><td>' + score + '</td></tr>');    
}