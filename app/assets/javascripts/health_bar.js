var health = 0.8;

$(document).ready(function () {
	var myCanvas = document.getElementById('my_canvas');

  var circle = new ProgressCircle({
      canvas: myCanvas,
  });

  circle.addEntry({
      fillColor: 'rgba(65, 199, 36, 1)',
      progressListener: function() {
          return health; // between 0 and 1
      },
  }); 
  circle.start(33);
});

