/*Build a pyramid-shaped tower, as an array/list of strings, given a positive integer number of floors. A tower block is represented with "*" character.*/
function towerBuilder(nFloors) {    
  for(let i=1;i<=nFloors;i++){
    let stars = "*".repeat(2*i-1);
    let spaces = " ".repeat(nFloors-i);
    let row = spaces + stars + spaces;
    console.log(row);
  }
  }

  towerBuilder(6);