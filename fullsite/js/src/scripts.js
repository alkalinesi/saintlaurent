var $w, $d, scrollObj, pages, curPage, nextPage, curPageId, nextPageId, pageOrder = [], scrollables, galleryImg, galleryArt, sliderSettings, prev, next, home,
	video, videoFileBaseName, player, enlarge, lastScroll, nav, navBottom, navTop, bottomSpace, isIE8, scrollin = [];

jQuery(document).ready(function($) {

	if(mobilecheck()){
		window.location.href = "mobile/";
	}

	window.setTimeout(function(){
		window.scrollTo(0,0);
	}, 500);

	// SETTINGS
	$maxHeight 			= 797;
	lastScroll 			= 0;
	videoFileBaseName 	= 'fornogoodreason';

	// OBJS
	$w 			= $(window);
	$d 			= $(document);
	home		= $('.home');
	nav 		= $('#navigation');
	scrollables = $('.scrollable');
	enlarge 	= $('.enlarge');
	prev 		= $('.prev');
	next 		= $('.next');
	video 		= $('.video');
	curPage 	= nav.find('.cur');
	nextPage 	= curPage.next();
	isIE8 		= $('.lt-ie9').length;

	// PAGES
	pages = {
		trailer: 		$('#trailer'),
		synopsis: 		$('#synopsis'),
		cast: 					$('#cast'),
		filmmakers: 			$('#filmmakers'),
		links: 			$('#links'),
		gallery: 		$('#gallery'),
		//filmclips: 		$('#film-clips'),
		links: 			$('#links'),
		reviews: 		$('#reviews')
	};

	pageOrder.push(pages.trailer, pages.synopsis, pages.cast, pages.filmmakers, pages.gallery, pages.links, pages.reviews);


	/* ================================================
	Show and play Trailer
	================================================ */
	
	jwplayer("video-player").setup({
		sources:
		[
			{ file: 'media/saintlaurent.mp4' },
			{ file: 'media/saintlaurent.webm' },
			{ file: 'media/saintlaurent.flv' },
			{ file: 'media/saintlaurent.ogg' }
			
		],
		height: 360,
		width: 640,
		skin: 'glow'
	});

	$(".tumblr").click(function () {
	
	  
		$.colorbox({
			inline: true,
			overlayClose: false,
			href: '#tumblr_warning',
			
			width: 680,
			height: 400,
			opacity: 0.7,
			onOpen: function(){
				$('#cboxOverlay').height($d.height()).width($d.width());

			},
			onComplete: function(){
				TweenMax.to($('#cboxClose'), 1, {autoAlpha: 1, delay: 0.5});
				$('#tumblr_warning').css({'display': 'block'});
			},
			onCleanup: function(){
				TweenMax.to($('#cboxClose'), 0, {autoAlpha: 0 });
				$('#tumblr_warning').css({'display': 'none'});
			}
		});
	
	   
	
	});


	

	$('.button.video').click(function(e){
		
		e.preventDefault();
		$.colorbox({
			inline: true,
			overlayClose: false,
			href: '#video-player',
			width: 680,
			height: 400,
			opacity: 0.7,
			fixed: true,
			onOpen: function(){
				$('#cboxOverlay').height($d.height()).width($d.width());
				
				

			},
			onComplete: function(){
				TweenMax.to($('#cboxClose'), 1, {autoAlpha: 1, delay: 0.5});
				$('#video-player').css({'display': 'block'});
				jwplayer("video-player").play();
			},
			onCleanup: function(){
				TweenMax.to($('#cboxClose'), 0, {autoAlpha: 0 });
				jwplayer("video-player").stop();
				$('.jwplayer').hide();
				$('#video-player').css({'display': 'none'});
				
				//$("#awards").animate({left:"15px"},700);
			}
			
		});
	});

	// Show trailer on page load.
	pages.trailer.find('.video').click();

	/* ================================================
	External Links
	================================================ */
	externalLinks($('.external'));

	/* ================================================
	Navigation click events
	================================================ */
	nav.find('a').click(function(e){
		e.preventDefault();
		var id = $(this).attr('href').replace('#','').replace(/-/g,'');
		TweenLite.to($w, 1, {scrollTo:{y: pages[id].position().top, x:0}, ease:Quint.easeInOut});
	});

	$('#back-to-top').click(function(e){
		e.preventDefault();
		TweenLite.to($w, 1, {scrollTo:{y:0, x:0}, ease:Quint.easeInOut});
	});

	/* ================================================
	Initiate scrollable content.
	================================================ */
	
	if(isIE8===0){
		for (var i = 0; i < scrollables.length; i++) {
			if($(scrollables[i]).children('.scroll-wrapper').height() > $(scrollables[i]).height()){
				
				var tmp = new IScroll(scrollables[i], {
					mouseWheel: true,
					scrollbars: 'custom',
					bounce: true,
					shrinkScrollbars: 'scale',
					fadeScrollbars: false,
					interactiveScrollbars: true,
					resizeScrollbars: true,
					bounceEasing: {
						style: 'cubic-bezier(0,0,1,1)',
						fn: function (k) { return k; }
					}
				});
				
				scrollin.push(tmp);
			}
		};
	}
	
	$('#article-nav').find('a').click(function(e){
		
		e.preventDefault();
		var id = $(this).attr('id');
		var s = $('section[id="'+id+'"]');
		
		scrollin[1].scrollTo(0, 0);		
		scrollin[1].scrollTo(0, -s.position().top);
	});
	
/*
	$('#crew-nav').find('a').click(function(e){
		e.preventDefault();
		var id = $(this).attr('id');
		var s = $('section[id="'+id+'"]');
		
		scrollin[2].scrollTo(0, 0);		
		scrollin[2].scrollTo(0, -s.position().top);
	});
*/

	/* ================================================
	Initiate image gallery
	================================================ */
	gallerySlider();

	/* ================================================
	Update Nav based on content screen display
	================================================ */
	calcNavPos();

	$w.on('scroll', function(){
		var thisScroll = $d.scrollTop();

		if(thisScroll > lastScroll){
			var hitPoint = thisScroll + navTop + nav.height();

			for (var i = 0; i < pageOrder.length; i++) {
				if(i+1 <= pageOrder.length){

					var nxtTop;
					if( pageOrder[i+1] === undefined){
						nxtTop = $d.height();
					}
					else{
						nxtTop = pageOrder[i+1].offset().top;
					}

					if(hitPoint >= pageOrder[i].offset().top &&  hitPoint <= nxtTop){

						var curId = pageOrder[i].attr('id');

						if(curId!=='trailer'){
							nav.addClass('dark-theme');
						}
						
						else{
							nav.removeClass('dark-theme');
						}

						nav.find('.cur').removeClass('cur');
						nav.find('a[href*="'+curId+'"]').parent('li').addClass('cur');
					}
				}
			};
		}
		else{
			var hitPoint = thisScroll + navTop;

			for (var i = 0; i < pageOrder.length; i++) {
				if(i+1 <= pageOrder.length){

					if(hitPoint <= (pageOrder[i].offset().top + pageOrder[i].height()) &&  hitPoint >= pageOrder[i].offset().top){

						var curId = pageOrder[i].attr('id');

						if(curId!=='trailer'){
							nav.addClass('dark-theme');
						}
						else{
							nav.removeClass('dark-theme');
						}

						nav.find('.cur').removeClass('cur');
						nav.find('a[href*="'+curId+'"]').parent('li').addClass('cur');
					}
				}
			};
		}

		lastScroll = thisScroll;
	});

	/* ================================================
	Full screen homepage image at all times.
	================================================ */
/*
	if($w.height() > $maxHeight){
		home.css('height', $w.height());
		
	}
	$w.on('resize', function(){
		calcNavPos();

		if($w.height() > $maxHeight){
			home.css('height', $w.height());
		
		}

		// $('#cboxOverlay').width('100%').height('100%');
	});
*/

});

window.mobilecheck = function() {
	var check = false;
	(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
	return check;
}

function externalLinks(obj){
	obj.click(function(e){
		e.preventDefault();
		window.open($(this).attr('href'), "_blank");
	});
}

function calcNavPos(){
	navTop 		= nav.position().top;
	navBottom 	= nav.position().top + nav.height();
	bottomSpace = $w.height() - navBottom;
}

function gallerySlider(){
	var counterImg = $('#img-gallery').next('.counter');
	var counterFilm = $('#film-gallery').next('.counter');

	var wraps = $('.wrap');

	enlarge.click(function(e){
		e.preventDefault();
		var active = enlarge.nextAll('.swipe').find('.active');
		$(this).attr('href', active.data('lg'));
		$(this).colorbox({maxWidth: '1000px' });
	});

	for (var i = 0; i < wraps.length; i++) {
		var img = $(wraps[i]).children('img');
		var w = img.data('width');
		var h = img.data('height');
		var r = h/w;

		if(w>836){
			img.width('95%');
			h = img.height();
			w = img.width();
			img.css({'left': '50%', 'marginLeft': 0-(w/2) });
		}

		else{
			img.css({'left': '50%', 'marginLeft': 0-(w/2) });
		}

		img.css({ 'marginTop': 0 - (h/2) });

		// console.log(img[0], w, h);
	};

	// $w.resize(function(event) {
	// 	if($w.width()<892){
	// 		console.log('Resize', $w.width());
	// 		for (var i = 0; i < wraps.length; i++) {
	// 			var img = $(wraps[i]).children('img');

	// 			var w = img.data('width');
	// 			var h = img.data('height');
	// 			var r = h/w;

	// 			console.log(w, h, r);

	// 			if(w<h){
	// 				// img.height('96%');
	// 			}
	// 			else{
	// 				// img.width('96%');
	// 			}

	// 			// img.closest('figure').width($w.width()-70);

	// 			// h = img.height();
	// 			// w = img.width();
	// 			// img.css({'left': '50%', 'marginLeft': 0-(w/2) });
	// 			// img.css({ 'marginTop': 0 - (h/2) });
	// 		};
	// 	}
	// 	else{
	// 		for (var i = 0; i < wraps.length; i++) {
	// 			var img = $(wraps[i]).children('img');
	// 			var w = img.data('width');
	// 			var h = img.data('height');
	// 			var r = h/w;

	// 			if(w>836){
	// 				img.width('95%');
	// 				h = img.height();
	// 				w = img.width();
	// 				img.css({'left': '50%', 'marginLeft': 0-(w/2) });
	// 			}

	// 			else{
	// 				img.css({'left': '50%', 'marginLeft': 0-(w/2) });
	// 			}

	// 			img.css({ 'marginTop': 0 - (h/2) });

	// 			// console.log(img[0], w, h);
	// 		};
	// 	}
	// });

	sliderSettings 	= {
		startSlide: 0,
		speed: 400,
		auto: 0,
		continuous: true,
		disableScroll: false,
		stopPropagation: false,
		callback: function(index, ele){

			// console.log(index, $(ele).find('img'));


			$('.active').removeClass('active');
			$(ele).find('img').addClass('active');

			var counter = $(ele).closest('.swipe').next('.counter');

			if($(ele).closest('.swipe').attr('id')==='img-gallery'){
				counter.children('.idx').text(galleryImg.getPos() + 1);
				counter.children('.total').text(galleryImg.getNumSlides());
			}
			else{
				//counter.children('.idx').text(galleryFilm.getPos() + 1);
				//counter.children('.total').text(galleryFilm.getNumSlides());
			}
		}
	};

	// Initiate SwipeJS
	galleryImg = Swipe(document.getElementById('img-gallery'), sliderSettings);
	//galleryFilm = Swipe(document.getElementById('film-gallery'), sliderSettings);

	// Setup counter
	counterImg.children('.idx').text(galleryImg.getPos() + 1);
	counterImg.children('.total').text(galleryImg.getNumSlides());
	
	//counterFilm.children('.idx').text(galleryFilm.getPos() + 1);
	//counterFilm.children('.total').text(galleryFilm.getNumSlides());

	// Add previous and next clicks
	prev.click(function(e){
		e.preventDefault();
		var id = $(this).parent().next().attr('id');

		if (id==='img-gallery') {
			galleryImg.prev();
		}
		else{
			//galleryFilm.prev();
		}
	});

	next.click(function(e){
		e.preventDefault();
		var id = $(this).parent().next().attr('id');

		if (id==='img-gallery') {
			galleryImg.next();
		}
		else{
			//galleryFilm.next();
		}
	});
	
	// Film Clips Section
	var videoClip = ["1_sOPpWMDcY", "qJibqCifiMM", "WUzcOJWzoas"];
	
	$("#video1").append("<iframe width='615' height='345' src='//www.youtube.com/embed/1_sOPpWMDcY' frameborder='0' allowfullscreen></iframe>");
	
	// Film Clips Nav	
	$(".film-clip").click(function(e) {
		e.preventDefault();
		
		var clip = $(".film-clip").index(this);
		var selectedId = "#video" + (clip + 1);
		var youtubeVid = "<iframe width='615' height='345' src='//www.youtube.com/embed/" + videoClip[clip] + "' frameborder='0' allowfullscreen></iframe>"
		
		console.log(youtubeVid);
				
		//galleryFilm.slide(clip, 500);
		
		$(".video-wrapper").html(" ");
		$(selectedId).append(youtubeVid);
	});
	
	

} // test compression