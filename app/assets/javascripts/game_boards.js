$(document).ready(function () {
	console.log('I am here');

	$('.level_welcome').magnificPopup({
	  type:'inline',
	  midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
	});

// on click of the level button the currentLevel variable needs to be set and the launch level lightbox shall appear. How to write this in an efficient way to pass on the right level depending on which button the user clicked?
	$(".level_welcome").on('click', function(event) {
		event.preventDefault();
		currentLevel = 1;
		launchLevelLightbox();
	});
});

var currentLevel;

var launchLevelLightbox = function () {
		console.log('a level link has been clicked');

		

		};