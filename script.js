var size = parseInt(
    window.prompt(
        "Welcome, to N-Queen Puzzle Game. Please, Enter size of grid ranging from 4-29"
    )
);
while (size <= 0) {
    alert("Please enter natural numbers");
    var size = parseInt(window.prompt("Enter size of grid ranging from 4-29"));
}

document.write(
    "<h2><i><u>Grid of size: " + size + " x " + size + "</u></i></h2>"
);

var closed = new Array(size * size);
var imgQueen = new Image(30, 30);
var imgEmpty = new Image(30, 30);
var imgDot = new Image(30, 30);
var id = 0;
var count = 0;
imgQueen.src = "Images/queen.gif";
imgEmpty.src = "Images/empty.gif";
imgDot.src = "Images/dot.gif";

// Creating Grid of size N x N

for (var r = 0; r < size; r++) {
    document.write("<tr>");
    for (var c = 0; c < size; c++) {
        id = r * size + c;
        document.write("<td id=" + id + ' onclick="placeq(this);">');
        document.write('<img height="30" width="30" src="Images/empty.gif"></td>');
    }
    document.write("</tr>");
}

// Placing Queen At specified cell

function placeq(cell) {
    var q = eval(cell.id);
    var r = Math.floor(q / size);
    var c = q % size;
    var min = Math.min(r, c);
    var max = Math.max(r, c);
    if (document.images[q].src == imgEmpty.src && safe(q)) {
        count++;
       
        // For checking Horizontally for any Queen

        for (var h = r * size; h < r * size + size; h++) {
            closed[h] = h;
            document.images[h].src = imgDot.src; // Insert Dot
        }

        // For checking Vertically for any Queen

        for (var v = c; v < size * size; v = v + size) {
            closed[v] = v;
            document.images[v].src = imgDot.src; // Insert Dot
        }

        // For checking Diagonally for any Queen on one way
        
        if (c > r) {
            var x1 = c - r;
            var x2 = q + (size + 1) * (size - c);
        } else {
            var x1 = (r - c) * size;
            var x2 = q + (size + 1) * (size - r);
        }
        for (var x = x1; x < x2; x = x + size + 1) {
            closed[x] = x;
            document.images[x].src = imgDot.src; // Insert Dot
        }
        
        // For checking Diagonally for any Queen on second way
        
        if (r + c > size - 1) {
            var y1 = q - (size - 1 - c) * (size - 1);
            var y2 = q + (size - 1) * (size - r);
        } else {
            var y1 = r + c;
            var y2 = q + size * c;
        }
        for (var y = y1; y < y2; y = y + (size - 1)) {
            closed[y] = y;
            document.images[y].src = imgDot.src; // Insert Dot
        }
        document.images[q].src = imgQueen.src; // Insert Queen
    }

    // Counting Number of Queen
    
    if (count == size) {
        alert("Good job, you solved it!");
    }
    if (count > size) {
        alert("Too many queens");
    }
}

// To check if the position is already occupied

function safe(a) {
    if (closed[a] == a) {
        return false;
    } else {
        return true;
    }
}

// Checking safe position so, the queen can be placed [For get help function]

var isSafe = function (prob, row, col) {
    
    // Check this row on left side
    
    for (var i = 0; i < col; i++) if (prob[row][i]) return false;
    
    // Check upper diagonal on left side
    
    for (var i = row, j = col; i >= 0 && j >= 0; i--, j--)
        if (prob[i][j]) return false;
    
     // Check lower diagonal on left side
    
    for (var i = row, j = col; j >= 0 && i < size; i++, j--)
        if (prob[i][j]) return false;
    return true;
};

//  To find wheather queen can ne placed or not [For get help function]

var solver = function (prob, col) {
    if (col >= size) return true;
    for (var i = 0; i < size; i++) {
        if (isSafe(prob, i, col)) {
            prob[i][col] = 1;
            if (solver(prob, col + 1)) return true;
            prob[i][col] = 0;
        }
    }
    return false;
};

// Displaying the queens placed on correct the position

function help() {
    var prob = new Array(size);
    for (var i = 0; i < size; i++) {
        prob[i] = new Array(size).fill(0);
    }
    if (solver(prob, 0) == false) {
        alert("No solution exists for them given grid size");
        return;
    }
    var b = new Array(size);
    for (var i = 0; i < size; i++)
        for (var j = 0; j < size; j++) if (prob[i][j] == 1) b[i] = i * size + j;
    clearBoard(); // Clearing Board
    for (var d = 0; d < size; d++) {
        window.document.images[b[d]].src = imgQueen.src;
    }
    count = size;
    for (var e = 0; e < size * size; e++) {
        closed[e] = e;
    }
}

// For Clearing the Grid

function clearBoard() {
    for (var a = 0; a < size * size; a++) {
        window.document.images[a].src = imgEmpty.src;
    }
    count = 0;
    closed = new Array(size);
}
