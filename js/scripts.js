$(document).ready(function () {
	function body() {
		var open = $('.menu').hasClass('open');
		$("body").toggleClass("hideoverflow", !!open);
	}

	$(".menu_trigger").click(function () {
		$(".menu_trigger").toggleClass("open");
		$(".menu").toggleClass("open");
		$(".menu .hasSub").removeClass('open');
		$(".hotel_menu").toggleClass("hide");
		body();
	});

	$('.menu .hasSub a').click(function () {
		var el = $(this).parent('li.hasSub'),
			active = el.hasClass('open');
		$('.menu .hasSub').removeClass('open');
		active || el.addClass('open');
		body();
	});

	$("#menu_close").click(function () {
		$(".menu").toggleClass("open");
		$(".hotel_menu").toggleClass("hide");
		body();
	});

	$("#hotel_trigger").click(function () {
		$(".hotel_menu").toggleClass("open");
	});
	
	$(".expand").click(function () {
		$(this).parent().toggleClass("open");
	});
	
	$(".close_covid").click(function(e){
		var popup = $(this).parents(".covid");
		var path = popup.data('cookiePath') || '/';		
		var days = popup.data('expiry') || 0;
		var popupId = popup.data('id');
		popup.remove();
		var expires;
	    if (days) {
	        var date = new Date();
	        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
	        expires = "; expires=" + date.toGMTString();
	    } else {
	        expires = "";
	    }
	    document.cookie = encodeURIComponent('noticeShown') + "=" + encodeURIComponent(popupId) + expires + "; path=" + path;
	});

});

$(document).ready(function () {
	const body = document.body;
	const nav = document.querySelector(".page-header nav");
	const menu = document.querySelector(".page-header .menu");
	const scrollUp = "scroll-up";
	const scrollDown = "scroll-down";
	let lastScroll = null;

	$(window).on("scroll", () => {
		const currentScroll = window.pageYOffset;
		if (currentScroll <= 0) {
			body.classList.remove(scrollUp);
			return;
		}
		if(lastScroll === null) {
			// initial
			body.classList.remove(scrollDown);
			body.classList.add(scrollUp);
		}
		else if (currentScroll > lastScroll && !body.classList.contains(scrollDown)) {
			// down
			body.classList.remove(scrollUp);
			body.classList.add(scrollDown);
		} else if (currentScroll < lastScroll && !body.classList.contains(scrollUp)) {
			// up
			body.classList.remove(scrollDown);
			body.classList.add(scrollUp);
		}
		lastScroll = currentScroll;
	}).scroll();
});

$(document).ready(function(){
	$('.hero_owl').owlCarousel({
		loop:true,
		margin:0,
		responsiveClass:true,
		dots:false,
		nav:true,
		animateOut: 'fadeOut',
		items:1
	});

	function injectCountOwl(event) {
		if(event.page.count == 0) {
			return;
		}
		var element = event.target;
		var dots = $(element).find('.owl-dots');
		var page = event.page.index;
		var zero = "";
		page++;
		if (page < 10) {
			zero = 0;
		}
		dots.find('.img_counter').remove();
		dots.append('<div class="img_counter"><span>' + zero + page + '</span></div>');
	}

	$('.imgslider').owlCarousel({
		margin: 0,
		rewind: true,
		responsiveClass: true,
		items: 1,
		nav: true,
		onRefreshed: function (event) {
			if(event.page.count == 0) {
				var target = $(event.target);
				window.setTimeout(function() { target.trigger('refresh.owl.carousel'); }, 50);
				return;
			}
			injectCountOwl(event);
		},
		onResized: injectCountOwl,
		onChanged: injectCountOwl
	});
	
	function injectCountOwl2(event) {
		if(event.page.count == 0) {
			return;
		}
		var element2 = event.target;
		var dots2 = $(element2).find('.owl-dots');
		var page2 = event.page.index;
		var pagesTotal = event.page.count;
		page2++;
		dots2.find('.img_counter').remove();
		dots2.append('<div class="img_counter"><span>' + page2 + ' / ' + pagesTotal + '</span></div>');
	}

	$('.imgslider3items').owlCarousel({
		loop: true,
		nav: true,
		margin: 20,
		responsiveClass: true,
		slideBy: 'page',
		responsive: {
			0: {
				items: 1,
				stagePadding: 15
			},
			450: {
				items: 1,
				stagePadding: 40
			},
			768: {
				items: 2
			},
			1000: {
				items: 3
			}
		},
		onRefreshed: function (event) {
			if(event.page.count == 0) {
				var target = $(event.target);
				window.setTimeout(function() { target.trigger('refresh.owl.carousel'); }, 50);
				return;
			}
			injectCountOwl2(event);
		},
		onResized: injectCountOwl2,
		onChanged: injectCountOwl2
	});

	$('.testimonialslider').owlCarousel({
		loop: true,
		margin: 50,
		items: 1,
		nav: false,
		responsiveClass: true
	});

	$('.imgslider').each(function() {
		var $gallery = $(this);
		
		var $mfp = $gallery.magnificPopup({
		  delegate: '.owl-item a',
		  type: 'image',
		  tLoading: 'Loading image #%curr%...',
		  mainClass: 'mfp-img-mobile',
		  gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0,1] // Will preload 0 - before current, and 1 after the current image
		  },
		  image: {
			tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
			titleSrc: function(item) {
			  return item.el.attr('title');
			}
		  }
		});
	});


	$('.room_img, .ig').each(function() { // the containers for all your galleries
	    $(this).magnificPopup({
	        delegate: 'a', // the selector for gallery item
	        type: 'image',
	        gallery: {
	          enabled:true
	        }
	    });
	});
});


$(document).ready(function () {
	(new WOW()).init();
});


$(document).ready(function () {
	var targetScroll = 0;
	var scrollTick = 50;
	var $triggerEl = $(".menu_holder + div");

	var checkPosition = function () {
		if (window.scrollY > targetScroll) {
			$("body").addClass("m2fixed");
		} else {
			$("body").removeClass("m2fixed");
		}
		if (Math.abs(window.scrollY - targetScroll) < 150) {
			scrollTick = 16;
		} else {
			scrollTick = 50;
		}
	};

	var calcTargetScroll = function () {
		var old = targetScroll;
		targetScroll = $triggerEl.position().top + $triggerEl.outerHeight();
		if (old != targetScroll) {
			checkPosition();
		}
	};

	$(window).resize((function () {
		var tick = false;
		return function () {
			if (!tick) {
				calcTargetScroll();
				tick = true;
				setTimeout(function () {
					tick = false;
				}, 16);
			}
		}
	})());

	$(window).scroll((function () {
		var tick = false;
		return function () {
			if (!tick) {
				checkPosition();
				tick = true;
				setTimeout(function () {
					tick = false;
				}, scrollTick);
			}
		}
	})());
	
	$triggerEl.on('transitioncancel, transitionend', calcTargetScroll);
});

$(window).on('load', function(){
	$("body").removeClass('deffer-bg');
});