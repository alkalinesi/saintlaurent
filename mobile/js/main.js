// Resize trailer for horizontal/vertical tablets and mobile phones
	 function resizer(e)
	{
/*
		if( $(window).width()<769 ) {
			$('.trailer-video').html('<iframe src="http://www.youtube.com/embed/4bcnBGCWIMY" width="500" height="300" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen=""></iframe>');
		
			if( $(window).width()<421 ) {
			$('.trailer-video').html('<iframe src="http://www.youtube.com/embed/4bcnBGCWIMY" width="300" height="200" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen=""></iframe>');
			}
		
		}
		else
		{
			$('.trailer-video').html('<iframe src="http://www.youtube.com/embed/4bcnBGCWIMY" width="722" height="386" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen=""></iframe>');
		};
*/
		
		
	}


$(function() {

	$('#header').delay(300).css( {"display": "block"} );
	
	 // Header Animations
	 $('#header').css( {"opacity": "0"} ).delay(200).animate({"opacity": "1"},7000, 'easeOutExpo'  );
	 
	 $('#art-layer-1').css( {"margin-top": "-400px"} ).delay(500).animate({"margin-top": "-446px"},3000, 'easeOutExpo'  );
	 
	 $('h1.title').css( {"opacity": "0"} ).delay(1800).animate({"opacity": "1"},3000, 'easeOutExpo'  );

		resizer()
	$(window).resize(resizer)

});
