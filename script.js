const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

//defining num of columns, width
const numCol = 4;
const colWidth = canvas.width / numCol;

//create an array (list) that stores items that will fall (violin notes)
let items = [];

//speed of moving object constant 
const dropSpeed = 0.5;

//pregenerating 20 items with randomized appearance intervals
let preGeneratedItems = [];

//options of music notes that can be played
const musicNotes = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

//create function to create these 20 items
function initializeItems() {
    for(let i = 0; i < 20; i++) {
        //randomly defining columns where items will fall  
        const column = Math.floor(Math.random() * numCol); 
        //item that falls will be in center of column
        const x = colWidth * column + colWidth / 2;
        //define size of falling item
        const size = 20; //will have to play with size
        //item should fall from top
        const y = -size;
        //randomize intervals of falling item
        const interval = Math.random() * 2000 + 500; //interval within 0.5-2.5 seconds
        //choose which note that is put on the object
        const note = musicNotes[Math.floor(Math.random() * musicNotes.length)];
        //push info into item list (adding location, size, intervals of item)
        preGeneratedItems.push({x, y, size, interval, note, column}); 
    }
}

//function to release items based on time intervals 
function releaseItems() {
    //if there is something in pregernerated items, push it out
    if (preGeneratedItems.length > 0) {
        //moves onto next item
        const item = preGeneratedItems.shift();
        items.push(item);
        //start next time interval: grab randomly generated time interval and use for function 
        setTimeout(releaseItems, item.interval);
    }
}

//function for changing location
function updateItems() {
    items.forEach(item => {
        item.y += dropSpeed;
    });

    //removing items that have already fallen down 
    //create a new array called items with vertical position of each item (y) that are lower than the max height of canvas
    items = items.filter(item => item.y < canvas.height + item.size); 
}

//function to draw items 
function drawItems() {
    items.forEach(item => {
        //fill the shape of the item in the color 'blue'
        ctx.fillStyle = 'blue';
        //starts drawing: resets its paths for "new section" of drawing
        ctx.beginPath();
        //coding a circle: arc(x, y, radius, startAngle, endAngle)
        ctx.arc(item.x, item.y, item.size/2, 0, Math.PI*2);
        //repeats ctx.fillStyle
        ctx.fill();
        //finishes drawing
        ctx.closePath();
        var paragraph = document.getElementById("p");
        var text = document.createTextNode("This just got added");

        paragraph.appendChild(text);

    });
}

//function with for loop
function gameLoop () {
    //deleting everything on canvas just incase
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //draw columns as vertical lines (only defined mathematically)
    ctx.strokeStyle = 'black';
   //for loop repeats under a condition
   //i starts at 1, increases by 1, as long as < numCol 
    for(let i = 1; i < numCol; i++) {
       //defining columns
       const x = i*colWidth;
       ctx.beginPath();
       ctx.moveTo (x, 0);
       ctx.lineTo (x, canvas.height);
       ctx.stroke ();
    }

    updateItems();
    drawItems();

    requestAnimationFrame(gameLoop);
}

initializeItems(); //create 20 items
setTimeout(releaseItems, 0); //time interval is 0 so it can start immediately
gameLoop();