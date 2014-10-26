$(document).ready(function () {
	console.log('I am here');

	$('.test-popup-link').magnificPopup({ 
		  type: 'image'
			// other options
		});

// on click of the level button the currentLevel variable needs to be set and the launch level lightbox shall appear. How to write this in an efficient way to pass on the right level depending on which button the user clicked?
	$(".level_link #level_link_01").on('click', function(event) {
		event.preventDefault();
		currentLevel = 1;
		launchLevelLightbox();
	});
});

var currentLevel;

var launchLevelLightbox = function () {
		console.log('a level link has been clicked');
		// add modal window
		// add h2 tag "Welcome to level {{currentLevel}}!" to modal window
		// add h3 tag "Instructions:" to modal window
		// add p tag to light box containing instructions for this level
		// add button tag "Start level" to modal window
		// decrease opacity of elements outside the modal window
		// add button tag "X" on top right of modal window which reverts the above

		

		};