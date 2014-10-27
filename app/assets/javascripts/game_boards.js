$(document).ready(function(){

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
      amountOfCheckedCells()
      getCoordinate($(this));
    });

  //check on the board if any 3 or more inline vertical or horizontal (match_3)


  //makes a check on how many cells are clicked. should be not more then 2 clicked cells at a time 
  function amountOfCheckedCells(){

    if ($('.clicked').length > 2){
      $('.board-cell').removeClass('clicked');
    };
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


