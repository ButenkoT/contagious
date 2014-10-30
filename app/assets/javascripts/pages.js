// Create the document ready function.
jQuery(document).ready(function() {
	$('#email_check').on('submit', function (e) {
		e.preventDefault();

		var address = $('#email').val();

		$.get('/players/check', {
			email: address
		}).done(function (result) {
			$('.container').html(result);
			$("#player_email, #email").val(address)	
		});
		return false
	});
});

