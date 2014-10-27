
var types = [1, 2, 3, 4, 5];


function generate() {

  //give us 100 values step by step randomisizng our type array values
  return _.range(0, 100, 1).map(function(){
    return types[Math.floor(Math.random() * 5)];
  });

}


function createBoard($board) {

  var template = Handlebars.compile($('#gameTemplate').html());
  $board.empty();

  //with handlebar append board-cells with value in the game-board
  _(generate()).each(function(type) {
    var $cell = $(template({type: type}))
      .appendTo($board);
  });

  setCoordinates($board);
}

function setCoordinates($board) {
  $board.find('.board-cell').each(function(index, cell) {
    var $cell = $(cell),
      number = getNumber($cell)
      coord = getCoordinates(number);

    $cell.find('.cell-x').text(coord[0]);
    $cell.find('.cell-y').text(coord[1]);
  })
}


function getNumber($cell) {
  return $cell.prevAll('.board-cell').length;
} 

//getting x and y coordinates of a clicked board-cell  
function getCoordinates(number) {    
  var x = number % 10;
  var y = Math.floor(number / 10);
  return [x, y];
}



function swap($new, $old) {
  var _type = $new.attr('data-type');
  $new.attr('data-type', $old.attr('data-type'));
  $old.attr('data-type', _type);
}



// $someCell = getCell($board, [1,1]);
function getCell($board, coordinates) {
  return $board.find('.board-cell').eq(coordinates[0] + coordinates[1] * 10);
}

/**

0 -- $new
x -- possible $old

   .x.
   x0x...Y
   .x.

*/
function isNear($new, $old) {
  var newcoord = getCoordinates(getNumber($new));
  var oldcoord = getCoordinates(getNumber($old));
  if ((Math.abs(newcoord[0] - oldcoord[0]) === 1 
      && (newcoord[1] === oldcoord[1])) 
    || (Math.abs(newcoord[1] - oldcoord[1]) === 1 
      && (newcoord[0] === oldcoord[0]))){
    return true;
  } else {
    return false;
  };
};

function destroyMatches($board) {
//check on the board if any 3 or more inline vertical or horizontal (match_3)
  // TODO: fill me
  return true;
}

function fillMissing($board) {
  // TODO: fill me
  return false;
}


//check if 2nd clicked cell is in a range of 1st clicked cell via coordinates


var directions = {
  up: {
    x: 0,
    y: -1
  },
  down: {
    x: 0,
    y: 1
  },
  right: {
    x: 1,
    y: 0
  },
  left: {
    x: -1,
    y: 0
  }
};
  //swap clicked board-cell with 2nd clicked cell
    //make check on the board(match_3)
      //if any matches leave the move
      // delete matches
      //calculate sum


      // else return clicked board-cell back on place
//else unclick both  





$(document).ready(function(){

//each cell reacts on click 
$(document.body)

  .on('click', '.game-board .board-cell.clicked', function () {
    $(this).removeClass('clicked');
  })

  .on('click', '.game-board .board-cell:not(.clicked)', function () {
    var $cell = $(this),
      $board = $cell.closest('.game-board'),
      $prev;

    // 1. If nothing clicked before
    if (!$board.find('.board-cell.clicked').length) {
      $cell.addClass('clicked');
      return;
    }

    $prev = $board.find('.board-cell.clicked');

    // 2. something illegal was clicked
    if (!isNear($cell, $prev)) {
      $prev.removeClass('clicked');
      $cell.addClass('clicked');
      return;
    }
      
    // 3. something was clicked and it is legal
    swap($cell, $prev);
    if (destroyMatches($board)) {
      fillMissing($board);
    } else {
      swap($cell, $prev);
    }

    $board.find('.board-cell.clicked').removeClass('clicked');

  });


  createBoard($('.game-board'));
});


