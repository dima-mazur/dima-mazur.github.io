var content = document.getElementById('content');

for (i = 1; i <= 1; i++) {
    var newRowNumb = document.createElement("div");
    newRowNumb.setAttribute("class", "row numbers");
    for (var j = 1; j <= 8; j++) {
        var newCell = document.createElement("div");
        newCell.setAttribute("class", "cell numbers");
        newRowNumb.appendChild(newCell);
        newCell.innerText = j;
    }
    content.appendChild(newRowNumb);
}

// for (var i = 1; i <= 10; i++) {
//     var newRowSymb = document.createElement("div");
//     newRowSymb.setAttribute("class", "row");
//     for (var j = 1; j <= 1; j++) {
//         var newCell = document.createElement("div");
//         newCell.setAttribute("class", "cell symbol");
//         newRowSymb.appendChild(newCell);
//     }
//     content.appendChild(newRowSymb);
// }

for (var i = 1; i <= 8; i++) {
    var newRow = document.createElement("div");
    newRow.setAttribute("class", "row");
    for (var j = 1; j <= 8; j++) {
        var newCell = document.createElement("div");
        if (j % 2 == 0 & i % 2 !== 0) {
             newCell.setAttribute("class", "cell black");
         }
        if (j % 2 !== 0 & i % 2 !== 0) {
            newCell.setAttribute("class", "cell white");
        }
        if (j % 2 !== 0 & i % 2 == 0) {
            newCell.setAttribute("class", "cell black");
        }
        if (j % 2 == 0 & i % 2 == 0) {
            newCell.setAttribute("class", "cell white");
        }
        newRow.appendChild(newCell);
    }
    content.appendChild(newRow);
}

for (i = 1; i <= 1; i++) {
    var newRowNumb = document.createElement("div");
newRowNumb.setAttribute("class", "row numbers");
for (var j = 1; j <= 8; j++) {
    var newCell = document.createElement("div");
    newCell.setAttribute("class", "cell numbers");
    newRowNumb.appendChild(newCell);
    newCell.innerText = j;
} 
content.appendChild(newRowNumb);
}