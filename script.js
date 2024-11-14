const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

//defining num of columns, width
const numCol = 4;
const colWidth = canvas.width / numCol;

//create an array (list) that stores items that will fall (violin notes)
let items = [];

//function for new item
function createItems() {
   //randomly defining columns where items will fall  
    const column = Math.floor(Math.random() * numCol); 
    //item that falls will be in center of column
    const x = colWidth * column + colWidth / 2;
    //define size of falling item
    const size = 10; //will have to play with size
    //item should fall from top
    const y = -size;
    //control speed of falling item
    const speed = Math.random() * 3; //will have to play with the speed
    //push info into item list (adding location, size, speed of item)
    items.push({x, y, size, speed}); 
}