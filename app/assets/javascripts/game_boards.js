
var types = [1, 2, 3, 4, 5];


function generate() {
  

  var type = [1, 2, 3, 4, 5];

  //give us 100 values step by step randomisizng our type array values
  return _.range(0, 100, 1).map(function(){
    return types[Math.floor(Math.random() * 5)];
  });

}

//creating a board with handlebar template and filling it with cells with particular value (data-type from 1 to 5)
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


//setting coordinates of cell and its number
function setCoordinates($board) {
  $board.find('.board-cell').each(function(index, cell) {
    var $cell = $(cell),
      number = getNumber($cell)//calls for function gerNumber and passing it cell from the DOM
      coord = getCoordinates(number); //calls for function getCoordinates and passing the number of element

    $cell.find('.cell-x').text(coord[0]);//coordinate x is a 1st el of array
    $cell.find('.cell-y').text(coord[1]);//coordinate y is a 2nd el of array
  })
}


//calculating the number of our cell by counting the previous elements
function getNumber($cell) {
  return $cell.prevAll('.board-cell').length;
} 


//getting x and y coordinates of a clicked board-cell  
function getCoordinates(number) {    
  var x = number % 10;
  var y = Math.floor(number / 10);
  return [x, y]; //returns array of x and y coordinates so we can access the via position [0] and [1]
}


//swapping 2 cells by changing their data-type 
function swap($new, $old) {
  var _type = $new.attr('data-type');
  $new.attr('data-type', $old.attr('data-type'));
  $old.attr('data-type', _type);
}


//finds the position of particular cell
function getCell($board, coordinates) {
  return $board.find('.board-cell').eq(coordinates[0] + coordinates[1] * 10);
}


//check if 2nd clicked cell is in the range of 1 from the 1st clicked cell by vertical(y) and horizontal(x) coordinates
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






function destroyMatches($board, isDestoyed) {


  // do something
/*

$board.find('asdfasdf').eash()

    Xoo
    o
    o

*/
  // 



  if ($board.find('.board-cell[data-type="0"]').length > 0) {
    $board.data('score', $board.data('score') + 12341234);

    fillMissing($board);

    return destroyMatches($board, true);
  }


//check on the board if any 3 or more inline vertical or horizontal (match_3)
  // TODO: fill me
  //


  return isDestoyed;
}

//taking all cells with data-type 0 and replace them with a new random data-type(1..5)
function fillMissing($board) {
  // TODO: fill me
  return false;
}


$(document).ready(function(){

  //reaction on about link
  $('.about_popup_launch').magnificPopup({
    type:'inline',
    midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
  });

  // on click of the level button the currentLevel variable needs to be set and the launch level lightbox shall appear. How to write this in an efficient way to pass on the right level depending on which button the user clicked?
  $(".level_welcome").on('click', function(event) {
    event.preventDefault();
    currentLevel = 1;
    launchLevelLightbox();
  });
 
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
      if (destroyMatches($board, false)) {
        // $board.data('score')

          fillMissing($board);
        } else {
          swap($cell, $prev);
        }

        $board.find('.board-cell.clicked').removeClass('clicked');


    });


    createBoard($('.game-board'));
});


