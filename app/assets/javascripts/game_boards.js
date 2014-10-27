
$(document).ready(function () {
	console.log('I am here');

	$('.level_welcome').magnificPopup({
	  type:'inline',
	  midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
	});

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

  var type = [1, 2, 3, 4, 5];

  //give us 100 values step by step randomisizng our type array values
  var numbers = _.range(0, 100, 1).map(function(){
    return type[Math.floor(Math.random() * 5)];
  });


  //with handlebar append board-cells with value in the game-board
  _(numbers).each(function(i){

    var template = $('#gameTemplate').html();
    var gameHTML = Handlebars.compile(template);

    $('.game-board').append(gameHTML({type: i}))
  });


 //getting x and y coordinates of a clicked board-cell  
  function getCoordinate($element) {    
    var x = $element.prevAll('.board-cell').length % 10;
    var y = Math.floor($element.prevAll('.board-cell').length / 10);
    return [x, y];
  }


  //each cell reacts on click 
  $('.game-board')
  
    .on('click', '.board-cell.clicked',function () {
      $(this).removeClass('clicked');
    })

    .on('click', '.board-cell:not(.clicked)',function () {
      $(this).addClass('clicked');
      getCoordinate($(this));
    });


  //check on the board if any 3 or more inline vertical or horizontal (match_3)


  //should be not more then 2 clicked cells at a time
  function amountOfClickedCells(){
    
  };

  //check if 2nd clicked cell is in a range of 1st clicked cell via coordinates
    //swap clicked board-cell with 2nd clicked cell
      //make check on the board(match_3)
        //if any matches leave the move
        // delete matches
        //calculate sum


        // else return clicked board-cell back on place
  //else unclick both  
});

var currentLevel;

var launchLevelLightbox = function () {
		console.log('a level link has been clicked');

		

};

