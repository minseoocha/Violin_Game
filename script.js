const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

//defining num of columns, width
const numCol = 4;
const colWidth = canvas.width / numCol;

//create an array (list) that stores items that will fall (violin notes)
let items = [];

//speed of moving object constant 
let dropSpeed = 0.5;

//interval between falling items
let itemInterval = 3000;

//pregenerating 20 items with randomized appearance intervals
let preGeneratedItems = [];

//options of music notes that can be played
//used for intermediate and challenging randomized levels
const musicNotes = ['A', 'B', 'C', 'D', 'E', 'F', 'G']; 
//used for easy randomized levvel 
const easyNotes = [['G', 'A', 'B', 'C', 'D'], // Column 1 
['D', 'E', 'F', 'G', 'A'], // Column 2
['A', 'B', 'C', 'D', 'E'], // Column 3
['E', 'F', 'G', 'A', 'B']];  // Column 4]

//used for specific song
const twinkleNotes = ['C', 'C', 'G', 'G', 'A', 'A', 'G', 'F', 'F', 'E', 'E', 'D', 'D', 'C', 'G', 'G', 'F', 'F', 'E', 'E', 'D', 'G', 'G', 'F', 'F', 'E', 'E', 'D', 'C', 'C', 'G', 'G', 'A', 'A', 'G', 'F', 'F', 'E', 'E', 'D', 'D', 'C'];
const twinkleColumns = [0, 0, 2, 2, 3, 3, 2, 1, 1, 0, 0, 1, 1, 0]; // Map notes to columns

//give them option of playing random sequence or pre-made sequence: letting computer know if randomMode is true, not if it is false
let randomMode = true;

//create function to create these 20 items
function initializeRandomItems() {
    for(let i = 0; i < 20; i++) {
        //randomly defining columns where items will fall  
        const column = Math.floor(Math.random() * numCol); 
        //item that falls will be in center of column
        const x = colWidth * column + colWidth / 2;
        //define size of falling item
        const size = 20; //will have to play with size
        //item should fall from top
        const y = -size;
        //interval from easy to hard random level (3 items we are changing)
        if(mode === 'easy'){//=== used when the way it looks has to be exactly the same
            //determine which notes can be played in each column 
            const note = easyNotes[column][Math.floor(Math.random() * easyNotes[column].length)];
            dropSpeed = 0.5; 
            itemInterval = Math.random() * 5000 + 1500;
        } else if(mode === 'intermediate'){
            //instead of limiting specific notes on each column
            const note = musicNotes[Math.floor(Math.random() * musicNotes.length)]; 
            dropSpeed = 0.6; 
            itemInterval = Math.random() * 3000 + 1000;
        } else if(mode === 'hard'){
            const note = musicNotes[Math.floor(Math.random() * musicNotes.length)]; 
            dropSpeed = 0.7; 
            itemInterval = Math.random() * 1000 + 1000;
        }
        //push info into item list (adding location, size, intervals of item)
        preGeneratedItems.push({x, y, size, note, column, interval}); 
    }
}

//funciton that makes specific song
function initializeTwinkleItems () {
    
    for(let i = 0; i < twinkleNotes.length; i++) {
        const column = twinkleColumns[i]; 
        const x = column * colWidth + colWidth / 2; // Corrected variable name (columnWidth to colWidth)
        const size = 20;
        const y = -size; 
        const interval = 1500; 
        const note = twinkleNotes[i]; 
        preGeneratedItems.push({ x, y, size, note, column, interval});
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
        setTimeout(releaseItems, itemInterval);
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

//function to draw items (items -> circles on item.x, item.y -> text on item.x, item.y)
function drawItems() {
    items.forEach(item => {
        //drawing item as a circle  
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

        //drawing notes inside item 
        //color of font
        ctx.fillStyle = 'white';
        //size of font
        ctx.font = '11px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        //item.note indicates that chosen note of item is displayed
        ctx.fillText(item.note, item.x, item.y);  
    });
}

//function with for loop
function gameLoop () {
    //deleting everything on canvas just in case
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

document.getElementById('easyRandomButton').addEventListener('click', function(){ //every time button is clicked...
    randomMode = true;

    items = []; //reset list 
    preGeneratedItems = []; 
    initializeRandomItems('easy'); //condition for this function is mode === 'easy'

    //start next time interval: grab randomly generated time interval and use for function 
    releaseItems();
});

document.getElementById('intermediateRandomButton').addEventListener('click', function(){ //every time button is clicked...
    randomMode = true;

    items = []; //reset list 
    preGeneratedItems = []; 
    initializeRandomItems('intermediate');

    //start next time interval: grab randomly generated time interval and use for function 
    releaseItems();
});

document.getElementById('hardRandomButton').addEventListener('click', function(){ //every time button is clicked...
    randomMode = true;

    items = []; //reset list 
    preGeneratedItems = []; 
    initializeRandomItems('hard');

    //start next time interval: grab randomly generated time interval and use for function 
    releaseItems();
});

document.getElementById('twinkleButton').addEventListener('click', function(){ //fixed typo here, changed twinkleButtom to twinkleButton
    randomMode = false;

    items = []; //reset list 
    preGeneratedItems = []; 
    initializeTwinkleItems();

    //start next time interval: grab randomly generated time interval and use for function 
    releaseItems();
});

gameLoop();

