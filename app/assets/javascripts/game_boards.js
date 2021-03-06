var cellTypes = [1, 2, 3, 4, 5, 6];


function generateItem() {
  return cellTypes[Math.floor(Math.random() * cellTypes.length)];
}


function generate() {
  //give us 100 values step by step randomisizng our type array values
  return _.range(0, 100, 1).map(generateItem);
}


function setScore($board, score) {
  $board.data('score', score);
  $('.player-score').text('Score: ' + score);
}


function saveScoreOnServer(boardId, score, callback) {
  $.get('/game_boards/save_score', {
    score: score,
    board_id: boardId
  }).done(function (savedScore) {
    callback(savedScore);
  });
}


function fillBoard($board) {
  var template = Handlebars.compile($('#cellTemplate').html());
  $board.empty();

  //with handlebar append board-cells with value in the game-board
  _(generate()).each(function (cellType) {
    var $cell = $(template({cellType: cellType}))
      .appendTo($board);
  });
  setCoordinates($board);


  var currentScore = parseInt($board.data('score'), 10) || 0;
  destroyMatches($board);
  setScore($board, currentScore);
}


//creating a board with handlebar template and filling it with cells with particular value (data-type from 1 to 6)
function createBoard($board) {
  fillBoard($board);
  setScore($board, 0);
}

function shuffle($board) {
  fillBoard($board);

  var currentScore = parseInt($board.data('score'), 10) || 0;
  currentScore = currentScore - 100;
  if (currentScore < 0) {
    currentScore = 0;
  }
  setScore($board, currentScore);
}


//setting coordinates of cell and its number
function setCoordinates($board) {
  $board.find('.board-cell').each(function (index, cell) {
    var $cell = $(cell),
      number = getNumber($cell)//calls for function getNumber and passing it cell from the DOM
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
    && (newcoord[0] === oldcoord[0]))) {
    return true;
  } else {
    return false;
  }
}


//destroying matches by making checks on right and bottom for every cell 
function destroyMatchesItem($board, cell, index) {
  var $cell = $(cell),
    coords = getCoordinates(index),
    x = coords[0],
    y = coords[1],
    toDestroyRight = [],
    toDestroyDown = [];

  //checking horizontal matches (to right)
  for (var i = 1; (i <= 4) && (x + i <= 9) &&
  (toDestroyRight.length === i - 1) && $cell.attr('data-type') !== 0; i++) {
    var $cellRight = getCell($board, [x + i, y]);
    if ($cellRight.attr('data-type') === $cell.attr('data-type')) {
      toDestroyRight.push($cellRight[0]);
    }
  }

  //checking vertical matches (to bottom)
  for (var i = 1; (i <= 4) && (y + i <= 9) &&
  (toDestroyDown.length === i - 1) && $cell.attr('data-type') !== 0; i++) {
    var $cellDown = getCell($board, [x, y + i]);
    if ($cellDown.attr('data-type') === $cell.attr('data-type')) {
      toDestroyDown.push($cellDown[0]);
    }
  }

  if (toDestroyRight.length >= 2) {
    $(toDestroyRight.concat(cell)).attr('data-type', 0);
  }

  if (toDestroyDown.length >= 2) {
    $(toDestroyDown.concat(cell)).attr('data-type', 0);
  }

  return $board.find('.board-cell[data-type="0"]').length > 0;
}


//check on if any 3 matches present and turns data-type matches of 3 and more vertical or horizontal into 0 and calculate the score of destroyed elements
function destroyMatches($board, isDestoyed) {
  var $cells = $board.find('.board-cell'),
    somethingDestroyed = false;

  for (var i = 0; i < $cells.length && !somethingDestroyed; i = i + 1) {
    somethingDestroyed = destroyMatchesItem($board, $cells[i], i);
  }


  if (somethingDestroyed) {
    setScore($board, (parseInt($board.data('score'), 10) || 0) + $('.board-cell[data-type="0"]').length * 2);

    //display players current level score
    fillMissing($board);

    console.log('recursive destroy');
    return destroyMatches($board, true);
  }

  return isDestoyed;
}


//taking all cells with data-type 0 and replace them with a new random data-type(1..5)
function fillMissing($board) {
  $board.find('.board-cell[data-type="0"]').each(function (index, item) {
    $(item).attr('data-type', generateItem());
  });
  return true;
}


function createBoardOnServer(callback) {
  $.get('/game_boards/create_board').done(function (boardId) {
    callback(boardId);
  });
}


$(document).ready(function () {


  var levelsDone = [];


  //each cell reacts on click
  $(document.body)

    .on('click', '.game-board .board-cell.clicked', function () {
      $(this).removeClass('clicked');
    })

    // .on('click', '.game-board .board-cell.clicked', function () {
    //   $(this).removeClass('clicked');
    // })

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
        console.log('Current score:', $board.data('score'));
      } else {
        swap($cell, $prev);
      }

      function callback(savedScore) {
        
      }

      var boardId = $board.data('id');
      var score = $board.data('score');
      saveScoreOnServer(boardId, score, callback);


      $board.find('.board-cell.clicked').removeClass('clicked');
    })


    .on('click', '.level_link', function (event) {
      event.preventDefault();
      var currentLevel = $(this).data('level-number');

      // Create html template with Handlebars by refering to the html provided in the index.html in the script tag with the id launchLevelTemplate
      var levelLaunchHTML = Handlebars.compile($('#launchLevelTemplate').html());

      //Create the actual html to be inserted based on the template that refers to the context, in this case taking the context from "level"
      var HTMLContext = levelLaunchHTML({currentLevel: currentLevel});


      $.magnificPopup.open({
        items: {
          src: HTMLContext, // can be a HTML string, jQuery object, or CSS selector
          type: 'inline',
          midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
        }
      });

    })

    //shuffle button
    .on('click', '.shuffle-board', function (event) {
      event.preventDefault();
      shuffle($('.game-board'));
    })

    //exit game button
    .on('click', '.exit-game', function (event) {
      event.preventDefault();
      setScore($('.game-board'), 0);
      $.magnificPopup.close();
    })

    .on('click', '.about_popup_launch', function (event) {
      event.preventDefault();

      $.magnificPopup.open({
        items: {
          src: $('#aboutPopupTemplate').html(),
          type: 'inline',
          midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
        }
      });
    })

    .on('click', '.launch_level_popup', function (event) {
      event.preventDefault();

      createBoardOnServer(function (boardId) {
        $.magnificPopup.open({
          items: {
            src: $('#gameTemplate').html(),
            type: 'inline',
            midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
          }
        });


        var $board = $('.game-board');
        $board.data('id', boardId);
        createBoard($board);
      });


    })
  ;


});


