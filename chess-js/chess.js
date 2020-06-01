var content = document.getElementById('content');

for (var i = 1; i <= 8; i++) {
var newRow = document.createElement("div");
newRow.setAttribute("class", "row");
    for(var j = 1; j <= 8; j++) {
var newCell = document.createElement("div");
newCell.setAttribute("class", "cell");
    newRow.appendChild(newCell);
}
    content.appendChild(newRow);
}