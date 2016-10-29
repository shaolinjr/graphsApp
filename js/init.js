(function($){
  $(function(){

    $('.button-collapse').sideNav();
    
  }); // end of document ready
})(jQuery); // end of jQuery name space


jQuery(document).ready(function($) {
	
	/* Act on the event */
		var windowHeight = $(window).height();
	var parallaxHeight = windowHeight - 64;
  	$('.parallax-container').css ({
		"height": parallaxHeight
	})
	$('.parallax').parallax();

	console.log("window height: "+windowHeight);
	console.log("parallax height: "+parallaxHeight);


	$('#eq').keyup(function(event) {
		/* Act on the event */
		event.preventDefault();
		$('.preview').first().fadeIn('1200', function() {
			
		});
	});

	$('#inverse-eq').keyup(function(event) {
		/* Act on the event */
		event.preventDefault();

		$('.preview').eq(1).fadeIn('1200', function() {
			
		});
	});

	$('#limit-value').keyup(function(event) {
		/* Act on the event */
		event.preventDefault();

		$('.preview').eq(2).fadeIn('1200', function() {
			
		});
	});


});


$('.parallax').imagesLoaded( function() {
  // images have loaded

  // tirar preloader, colocar body aparecendo
  
  $(".preloader-overlay").css("display", "none");
  $("#page-wrapper").css("visibility","visible");
});