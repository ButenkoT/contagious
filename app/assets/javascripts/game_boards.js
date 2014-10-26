$(document).ready(function(){

  var type = [1, 2, 3, 4, 5];
  var numbers = _.range(0, 100, 1).map(function(){
    return type[Math.floor(Math.random() * 5)];
  });


  _(numbers).each(function(i){
    var template = $('#gameTemplate').html();
    var gameHTML = Handlebars.compile(template);

    $('.game-board').append(gameHTML({number: i}))
  });


  $('.board-cell').on('click', function () {

    if($(this).hasClass('check'))
      $(this).removeClass('check');
    else
      $(this).addClass('check');

  });
  

});
