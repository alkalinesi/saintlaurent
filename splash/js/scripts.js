function fpOverlayOn() {
	$(".page").css({
	   'overflow' : 'hidden',

	});


	$(".trailer-overlay").css('margin-left', '-320px');

}

function fpOverlayOff() {
	$(".page").css({
	   'overflow' : 'auto',
	   'margin-left' : '0px'
	});


	//$(".trailer-overlay").css('margin-left', '-423px');

}


$(document).ready(function() {

	var state;

	$(".trailer-overlay").fadeIn();
	$(".lights-down").fadeIn();
	//Keep this visible over the nav in this case
	$(".lights-down").css('z-index', '1000');




	jwplayer("trailer").setup({
	    sources:
	    	[
	    		{ file: 'media/saint_laurent.webm' },
	    		{ file: 'media/saint_laurent.mp4' },
	    		{ file: 'media/saint_laurent.flv' },
	        	{ file: 'media/saint_laurent.ogg' }
	    		

	        ],
	    //image: "/uploads/myPoster.jpg",
	    height: 360,
	    width: 640,
	    skin: 'glow'
	}).play();


	$(".view_trailer").click(function () {

	   $(".trailer-overlay").fadeIn();
	   $(".lights-down").fadeIn();
	   //Keep this visible over the nav in this case
	   $(".lights-down").css('z-index', '1000');

	   fpOverlayOn();

	   jwplayer("trailer").play();

	});


$(".tumblr").click(function () {

	   $(".tumblr_warning").fadeIn();
	   $(".lights-down").fadeIn();
	   //Keep this visible over the nav in this case
	   $(".lights-down").css('z-index', '1000');

	   fpOverlayOn();

	});


	$(".close").on('click', function() {

	$(".overlay").fadeOut();
	$(".cast-member-details").fadeOut();
	//$(".trailer-overlay").fadeOut();
	//$(".tumblr_warning").fadeOut();
	$(".lights-down").fadeOut();
	$(".lights-down").css('z-index', '10');

	fpOverlayOff();

	jwplayer("trailer").stop(true);


	});

});
