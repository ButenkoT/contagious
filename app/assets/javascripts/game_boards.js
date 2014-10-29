
var cellTypes = [1, 2, 3, 4, 5, 6];

function generateItem() {
  return cellTypes[Math.floor(Math.random() * cellTypes.length)];
}

function generate() {

  //give us 100 values step by step randomisizng our type array values
  return _.range(0, 100, 1).map(generateItem);

}


function fillBoard($board) {
  var template = Handlebars.compile($('#gameTemplate').html());
  $board.empty();
  //with handlebar append board-cells with value in the game-board
  _(generate()).each(function(cellType) {
    var $cell = $(template({cellType: cellType}))
      .appendTo($board);
  });
  setCoordinates($board);  


  var currentScore = $board.data('score') || 0;  
  destroyMatches($board);
  $board.data('score', currentScore);
}

//creating a board with handlebar template and filling it with cells with particular value (data-type from 1 to 5)
function createBoard($board) {
  fillBoard($board);
  $board.data('score', 0);
}

function shuffle($board) {
  fillBoard($board);

  var currentScore = $board.data('score') || 0;
  currentScore = currentScore - 100;
  if (currentScore < 0) {
    currentScore = 0;
  }
  $board.data('score', currentScore);
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
  var _type = $new.attr('data-cellType');
  $new.attr('data-cellType', $old.attr('data-cellType'));
  $old.attr('data-cellType', _type);
  $('.board-cell').removeClass('clicked');
}


//finds the cell on particular position
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


function destroyMatchesItem($board, cell, index) {
  var $cell = $(cell),
  coords = getCoordinates(index),
  x = coords[0],
  y = coords[1],
  toDestroyRight = [],
  toDestroyDown = [];


  for( var i = 1; (i <= 4) && (x + i <= 9) &&
    (toDestroyRight.length === i - 1) && $cell.attr('data-cellType') !== 0; i ++) {
    var $cellRight = getCell($board, [x + i, y]);
    if ($cellRight.attr('data-cellType') === $cell.attr('data-cellType')){
      toDestroyRight.push($cellRight[0]);
    }

  }

  for( var i = 1; (i <= 4) && (y + i <= 9) &&
    (toDestroyDown.length === i - 1) && $cell.attr('data-cellType') !== 0; i ++) {
    var $cellDown = getCell($board, [x, y + i]);
    if ($cellDown.attr('data-cellType') === $cell.attr('data-cellType')) {
      toDestroyDown.push($cellDown[0]);
    }

  }

  if ( toDestroyRight.length >= 2) {
    $(toDestroyRight.concat(cell)).attr('data-cellType', 0);
  }

  if ( toDestroyDown.length >= 2) {
    $(toDestroyDown.concat(cell)).attr('data-cellType', 0);
  }

  return $board.find('.board-cell[data-cellType="0"]').length > 0;
}

//check on if any 3 matches present and turns data-cellType matches of 3 and more vertical or horizontal into 0 and calculate the score of destroyed elements
function destroyMatches($board, isDestoyed) {
  var $cells = $board.find('.board-cell'),
  somethingDestroyed = false;

  for(var i = 0; i < $cells.length && !somethingDestroyed; i = i + 1) {
    somethingDestroyed = destroyMatchesItem($board, $cells[i], i);
  }
  

  if (somethingDestroyed) {
    $board.data('score', ($board.data('score') || 0) + 10);

    fillMissing($board);

    console.log('recursive destroy');
    return destroyMatches($board, true);
  }

  return isDestoyed;
}


//taking all cells with data-cellType 0 and replace them with a new random data-cellType(1..5)
function fillMissing($board) {
  $board.find('.board-cell[data-cellType="0"]').each(function(index, item) {
    $(item).attr('data-cellType', generateItem());
  });
  return true;
}


$(document).ready(function(){


  $('.about_popup_launch').magnificPopup({
    type:'inline',
    midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
  });

  $('.level_link').magnificPopup({
  type:'inline',
  midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
  });


var levelsDone = [];


  function levelLaunch() {

    // on click of the level button the currentLevel variable needs to be set and the launch level lightbox shall be populated. 
   
    $(".level_link").on('click', function(event) {
      event.preventDefault();
      var currentLevel = $(this).data('level-number');
    
      // Create html template with Handlebars by refering to the html provided in the index.html in the script tag with the id launchLevelTemplate
      var levelLaunchHTML = Handlebars.compile($('#launchLevelTemplate').html());

      //Create the actual html to be inserted based on the template that refers to the context, in this case taking the context from "level"
      var HTMLContext = levelLaunchHTML({currentLevel: currentLevel});

      //Insert the created html into the div in the index.html file with the id launch_level
      $('#launch_level').prepend( HTMLContext );
      
    });
  };

    levelLaunch();


//each cell reacts on click 
$(document.body)

  .on('click', '.game-board .board-cell.clicked', function () {
    $(this).removeClass('clicked');
  })

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
          console.log('somethingDestroyed!!!!');
          console.log('Current score:', $board.data('score'));
        } else {
          swap($cell, $prev);
        }

        $board.find('.board-cell.clicked').removeClass('clicked');


    });


    createBoard($('.game-board'));
});


