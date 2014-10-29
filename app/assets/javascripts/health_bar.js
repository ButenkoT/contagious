var health = 1;
var levelPassed = true;

$(document).ready(function () {
	var myCanvas = document.getElementById('my_canvas');

  var circle = new ProgressCircle({
      canvas: myCanvas,
  });

  circle.addEntry({
      fillColor: 'rgba(65, 199, 36, 1)',
      progressListener: function() {
        if (levelPassed === true){
          return health - 0.1; // between 0 and 1
        } else {
          return health;
        }
      }

  }); 
  circle.start(33);
});

