turn = 0;

var map = [
    /*0*/["1R", "1Kn", "1B", "1Ki", "1Q", "1B", "1Kn", "1R"],
    /*1*/["1P", "1P", "1P", "1P", "1P", "1P", "1P", "1P"],
    /*2*/["  ", "  ", "  ", "  ", "  ", "  ", "  ", "  "],
    /*3*/["  ", "  ", "  ", "  ", "  ", "  ", "  ", "  "],
    /*4*/["  ", "  ", "  ", "  ", "  ", "  ", "  ", "  "],
    /*5*/["  ", "  ", "  ", "  ", "  ", "  ", "  ", "  "],
    /*6*/["0P", "0P", "0P", "0P", "0P", "0P", "0P", "0P"],
    /*7*/["0R", "0Kn", "0B", "0Ki", "0Q", "0B", "0Kn", "0R"]
]






function update() {
    var id = 0;
    for (var row = 0; row < map.length; row++) {
        for (var col = 0; col < map[row].length; col++) {
            var ele = document.getElementById("" + id);
            ele.removeAttribute("value");
            ele.setAttribute("value", map[row][col]);
            id++
        }
    }
}
var startPos = null
handleClick = function (event) {
    update();

    var cell = event.target;


    if (startPos === null) {
        var val = map[Math.floor(cell.id / 8)][cell.id % 8].charAt(0);
        if (val == turn && val != " ") {
            startPos = cell.id;
            console.log("piece selected");
            cell.setAttribute("class", "focus");
            possibleMoves(startPos);
        }
    }
    else if (cell.id == startPos) {

        resetClasses();



        startPos = null;
        console.log("piece unselected");


    }
    //if second tile has a the current player's own piece
    else if (map[Math.floor(cell.id / 8)][cell.id % 8].charAt(0) === turn + "") {
        console.log("invalid move");
    }
    else if (validMove(startPos, cell.id)) {
        sRow = Math.floor(startPos / 8);
        sCol = startPos % 8;
        eRow = Math.floor(cell.id / 8);
        eCol = cell.id % 8;
        map[eRow][eCol] = map[sRow][sCol];
        map[sRow][sCol] = "  ";
        update();

        resetClasses();

        startPos = null;
        turn = (turn + 1) % 2;

    }
    else {
        console.log("can't move there")
    }
}


var id = 0;
for (var row = 0; row < 8; row++) {
    for (var col = 0; col < 8; col++) {
        var currentCell = document.createElement("td");
        currentCell.value
        currentCell.addEventListener('click', handleClick);
        currentCell.setAttribute("id", id);
        currentCell.setAttribute("class", (((id + row) % 2)) == 0 ? "black" : "white")
        id++;
        document.getElementById("row" + row).appendChild(currentCell)
    }
}
update();

function validMove(start, end) {
    var tempMap = map;
    sRow = Math.floor(start / 8);
    sCol = start % 8;
    eRow = Math.floor(end / 8);
    eCol = end % 8;

    

    var endColor = map[Math.floor(eRow)][eCol].charAt(0);
    if (endColor === turn + "") {
        return false;
    }

    var piece = map[Math.floor(sRow)][sCol].substring(1);
    var spaces = [];
    switch (piece) {
        case "P":
            if (turn == 0 ? ((((sRow - eRow == 2 && sRow == 6) || (sRow - eRow == 1)) && sCol == eCol && endColor === " ") || (endColor == "1" && Math.abs(sRow - eRow) == 1 && sRow - eRow == 1 && Math.abs(sCol - eCol) == 1)) :
                ((((sRow - eRow == -2 && sRow == 1) || (sRow - eRow == -1)) && sCol == eCol && endColor === " ") || (endColor == "0" && Math.abs(sRow - eRow) == 1 && sRow - eRow == -1 && Math.abs(sCol - eCol) == 1))) {
                return true;
            }
            break;

        case "Kn":
            var hori = Math.abs(sRow - eRow);
            var vert = Math.abs(sCol - eCol);
            if ((hori == 2 && vert == 1) || (hori == 1 && vert == 2)) {
                return true;
            }
            break;

        case "Ki":
            var hori = Math.abs(sRow - eRow);
            var vert = Math.abs(sCol - eCol);
            if (hori <= 1 && vert <= 1) {
                return true;
            }
            break;

        case "R":
            var vert = Math.abs(sRow - eRow);
            var hori = Math.abs(sCol - eCol);

            if ((vert == 0 && hori != 0) || (vert != 0 && hori == 0)) {
                spaces = [];
                if (hori == 0) {
                    for (row = sRow > eRow ? eRow : sRow; sRow < eRow ? row <= eRow : row <= sRow; row++) {
                        spaces[row] = map[row][sCol];
                    }
                    for (i = sRow > eRow ? eRow + 1 : sRow + 1; sRow < eRow ? i < eRow : i < sRow; i++) {
                        if (spaces[i] != "  ") {
                            return false;
                        }
                    }
                }
                else {
                    for (col = sCol > eCol ? eCol : sCol; sCol < eCol ? col <= eCol : col <= sCol; col++) {
                        spaces[col] = map[sRow][col];
                    }
                    for (i = sCol > eCol ? eCol + 1 : sCol + 1; sCol < eCol ? i < eCol : i < sCol; i++) {
                        if (spaces[i] != "  ") {
                            return false;
                        }
                    }
                }
                return true;

            }
            break;

        case "B":
            var vert = Math.abs(sRow - eRow);
            var hori = Math.abs(sCol - eCol);
            if (hori == vert) {
                spaces = [];
                var row = sRow;
                var col = sCol;
                for (i = 0; i <= vert; i++) {
                    spaces[i] = map[row][col];
                    sRow > eRow ? row-- : row++;
                    sCol > eCol ? col-- : col++;
                }
                for (i = 1; i < vert; i++) {
                    if (spaces[i] != "  ") {
                        return false;
                    }
                }
                return true;
            }
            break;

        case "Q":

            var vert = Math.abs(sRow - eRow);
            var hori = Math.abs(sCol - eCol);
            if (hori == vert || (vert == 0 && hori != 0) || (vert != 0 && hori == 0)) {
                if (hori == vert) {
                    spaces = [];
                    var row = sRow;
                    var col = sCol;
                    for (i = 0; i <= vert; i++) {
                        spaces[i] = map[row][col];
                        sRow > eRow ? row-- : row++;
                        sCol > eCol ? col-- : col++;
                    }
                    for (i = 1; i < vert; i++) {
                        if (spaces[i] != "  ") {
                            return false;
                        }
                    }

                }
                else {
                    spaces = [];
                    if (hori == 0) {
                        for (row = sRow > eRow ? eRow : sRow; sRow < eRow ? row <= eRow : row <= sRow; row++) {
                            spaces[row] = map[row][sCol];
                        }
                        for (i = sRow > eRow ? eRow + 1 : sRow + 1; sRow < eRow ? i < eRow : i < sRow; i++) {
                            if (spaces[i] != "  ") {
                                return false;
                            }
                        }
                    }
                    else {
                        for (col = sCol > eCol ? eCol : sCol; sCol < eCol ? col <= eCol : col <= sCol; col++) {
                            spaces[col] = map[sRow][col];
                        }
                        for (i = sCol > eCol ? eCol + 1 : sCol + 1; sCol < eCol ? i < eCol : i < sCol; i++) {
                            if (spaces[i] != "  ") {
                                return false;
                            }
                        }
                    }
                }
                return true;
            }
            break;
    }
}
function possibleMoves(start) {
    id = 0;
    for (row = 0; row < map.length; row++) {
        for (col = 0; col < map[row].length; col++) {
            if (validMove(start, id)) {
                document.getElementById(id).setAttribute("class", "possibleMove");
            }
            id++;
        }
    }
}
function resetClasses(){
    id = 0;
    for (row = 0; row < map.length; row++) {
        for (col = 0; col < map[row].length; col++) {
                document.getElementById(id).setAttribute("class", (((id + row) % 2)) == 0 ? "black" : "white")
            id++;
        }
    }
}
