var gridArray = [];
var intervalID;
var currentTile = [];
var loseTileExists = false;

function addCells(){
  for (var i = 0; i < 200; i++) {
    var newDiv = document.createElement("div");
    newDiv.className += 'cell';
    newDiv.id = i;
    var newContent = document.createTextNode(i);
    newDiv.appendChild(newContent);
    var gameDisplayDiv = document.getElementById("cells-wrapper");
    gameDisplayDiv.appendChild(newDiv);
  }

  initDetails();

  initGridArray();
}

function initDetails(){
  //TODO hide pause button, and when game starts hide start button, show restart button when paused, and continue btn when paused
}

function initGridArray(){
  for (var i = 0; i < 200; i++) {
    gridArray[i] = false;
  }
}

function pushToGrid(tile){
  for (var i = 0; i < tile.length; i++) {
    if(!gridArray[tile[i]]){
      gridArray[tile[i]] = true;
    }
    else{
      //if the cell trying to add to is already true
      return false;
    }
  }
  return true;
}

function canAddNewTile(tile){
  if(gridArray[tile[tile.length-1]]){
    return false;
  }
  return true;
}

function getNewTile(){
  var newTile = [];

  //CUBE
  // newTile[0] = 4;
  // newTile[1] = 5;
  // newTile[2] = 14;
  // newTile[3] = 15;

  //VERTICAL LONG BAR
  // newTile[0] = 4;
  // newTile[1] = 14;
  // newTile[2] = 24;
  // newTile[3] = 34;

  //VERTICAL L
  // newTile[0] = 4;
  // newTile[1] = 5;
  // newTile[2] = 14;
  // newTile[3] = 24;

  //HORIZONTAL L
  newTile[0] = 4;
  newTile[1] = 5;
  newTile[2] = 6;
  newTile[3] = 14;


  return newTile;
}

function addNewTile(){

  var newTile = getNewTile();

  if(canAddNewTile(newTile)){
    currentTile = newTile;
    pushToGrid(currentTile)
    loseTileExists = true;
    return true;
  }
  else{
    loseTileExists = false;
    return false;
  }

  return true;
}

function repaint(){
  for (var i = 0; i < 200; i++) {
    var cell = document.getElementById(i);
    if(gridArray[i]){
      cell.style.backgroundColor = 'grey';
    }
    else{
      cell.style.backgroundColor = 'white';
    }
  }
}

function removeFromGrid(tile){
  for (var i = 0; i < tile.length; i++) {
    gridArray[tile[i]] = false;
  }
}

function canBringDown(tile){
  for (var i = 0; i < tile.length; i++) {
    if(tile[i]+10 >= 200 || gridArray[tile[tile.length-1]+10]){
      return false;
    }
  }

  return true;
}

function bringCurrentTileDown(){
  if(canBringDown(currentTile)){
    removeFromGrid(currentTile);

    for (var i = 0; i < currentTile.length; i++) {
      currentTile[i] += 10;
    }

    if(pushToGrid(currentTile)){
      return true;
    }
    return false;
  }
  else{
    return false;
  }
}

function updateGrid(){
  //already a tile is coming down, hasn't reached the bottom yet
  if(loseTileExists){
    //try to bring down
    if(!bringCurrentTileDown()){
      //when you can't bring down any more, that meanse it has stopped. There is no more lose tile
      loseTileExists = false;
    }
  }
  else{
    //add new random tile
    if(!addNewTile()){
      //game over
      console.log("game over");
      clearInterval(intervalID);
    }
  }

  repaint();
}

function startGame(){





  intervalID = setInterval(updateGrid, 50);

}

function pauseGame(){
  clearInterval(intervalID);
}
