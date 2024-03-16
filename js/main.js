;(function () {
	
	'use strict';



	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
			BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
			iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
			Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
			Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
			any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};


	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated-fast') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn animated-fast');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated-fast');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight animated-fast');
							} else {
								el.addClass('fadeInUp animated-fast');
							}

							el.removeClass('item-animate');
						},  k * 50, 'easeInOutExpo' );
					});
					
				}, 50);
				
			}

		} , { offset: '90%' } );
	};


	var isotopeImageLoaded = function() {
		
		var $grid = $('.grid').isotope({
		  itemSelector: '.grid-item',
		  percentPosition: true,
		  resizable: false,
		  masonry: {
		    columnWidth: '.grid-sizer',
		  }
		});

		$grid.imagesLoaded().progress( function() {
		  $grid.isotope('layout');
		});

	}

	var toggleAside = function() {

		$('.aside-toggle').click(function(event){
			
			event.preventDefault();
			var aside = $('#fh5co-aside'),
				 grid = $('#fh5co-image-grid, .aside-toggle'),
				 bio = $('#fh5co-bio'),
				 imgBg = $('.image-bg');


			if (aside.hasClass('show')) {
				
				
				if ($(window).width() <= 480 ) {
					TweenLite.to(aside, -1, { 
						left: '-85%',
						ease: Power1.easeNone 
					});
				} else {
					TweenLite.to(aside, -1, { 
						left: '-50%',
						ease: Power1.easeNone 
					});
				}
				
				TweenLite.to(grid, -1, { css: { 
						"-webkit-transform" : "translate3d(0%, 0px, 0px)", 
						"-moz-transform" : "translate3d(0%, 0px, 0px)", 
						"-ms-transform" : "translate3d(0%, 0px, 0px)", 
						"-o-transform" : "translate3d(0%, 0px, 0px)", 
						"transform" : "translate3d(0%, 0px, 0px)"
					}, 
					ease: Power1.easeNone
				});

				TweenLite.to(bio, 1, { opacity: 0, delay: 0.2, ease: Power1.easeNone});
				TweenLite.to(imgBg, 1, { opacity: 0, delay: 0.2, ease: Power1.easeNone});
				

				aside.removeClass('show');	
			} else {

				TweenLite.to(aside, -1, { 
					left: '0%',
					ease: Power1.easeNone 
				});

				if ($(window).width() <= 480 ) {
					TweenLite.to(grid, -1, { css: { 
							"-webkit-transform" : "translate3d(85%, 0px, 0px)", 
							"-moz-transform" : "translate3d(85%, 0px, 0px)", 
							"-ms-transform" : "translate3d(85%, 0px, 0px)", 
							"-o-transform" : "translate3d(85%, 0px, 0px)", 
							"transform" : "translate3d(85%, 0px, 0px)" 
						}, 
						ease: Power1.easeNone
					})
				} else {
					TweenLite.to(grid, -1, { css: { 
							"-webkit-transform" : "translate3d(50%, 0px, 0px)", 
							"-moz-transform" : "translate3d(50%, 0px, 0px)", 
							"-ms-transform" : "translate3d(50%, 0px, 0px)", 
							"-o-transform" : "translate3d(50%, 0px, 0px)", 
							"transform" : "translate3d(50%, 0px, 0px)" 
						}, 
						ease: Power1.easeNone
					});
				}

				TweenLite.to(bio, 1, { opacity: 1, delay: 0.3, ease: Power1.easeNone});
				TweenLite.to(imgBg, 1, { opacity: 1, delay: 0.6, ease: Power1.easeNone});
				aside.addClass('show');	
			}
		});

		$(document).click(function (e) {
	    var container = $(".aside-toggle, #fh5co-aside");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {
	      if ( $('#fh5co-aside').hasClass('show') ) {
	      	container.trigger('click');
	      }
	    }
		});

	}

	var buttonsCustom = function() {
		$('.btn-circle a').each(function(){
			var $this = $(this),
				span = $this.find('> span'),
				em = $this.find('> em');

			span.text(em.text());

		})
	}



	
	$(function(){
		contentWayPoint();
		isotopeImageLoaded();
		toggleAside();
		buttonsCustom();
	});


}());




(() =>{
 
	const openNavMenu = document.querySelector(".open-nav-menu"),
	closeNavMenu = document.querySelector(".close-nav-menu"),
	navMenu = document.querySelector(".nav-menu"),
	menuOverlay = document.querySelector(".menu-overlay"),
	mediaSize = 991;
  
	openNavMenu.addEventListener("click", toggleNav);
	closeNavMenu.addEventListener("click", toggleNav);
	// close the navMenu by clicking outside
	menuOverlay.addEventListener("click", toggleNav);
  
	function toggleNav() {
		navMenu.classList.toggle("open");
		menuOverlay.classList.toggle("active");
		document.body.classList.toggle("hidden-scrolling");
	}
  
	navMenu.addEventListener("click", (event) =>{
		if(event.target.hasAttribute("data-toggle") && 
			window.innerWidth <= mediaSize){
			// prevent default anchor click behavior
			event.preventDefault();
			const menuItemHasChildren = event.target.parentElement;
		  // if menuItemHasChildren is already expanded, collapse it
		  if(menuItemHasChildren.classList.contains("active")){
			  collapseSubMenu();
		  }
		  else{
			// collapse existing expanded menuItemHasChildren
			if(navMenu.querySelector(".menu-item-has-children.active")){
			  collapseSubMenu();
			}
			// expand new menuItemHasChildren
			menuItemHasChildren.classList.add("active");
			const subMenu = menuItemHasChildren.querySelector(".sub-menu");
			subMenu.style.maxHeight = subMenu.scrollHeight + "px";
		  }
		}
	});
	function collapseSubMenu(){
		navMenu.querySelector(".menu-item-has-children.active .sub-menu")
		.removeAttribute("style");
		navMenu.querySelector(".menu-item-has-children.active")
		.classList.remove("active");
	}
	function resizeFix(){
		 // if navMenu is open ,close it
		 if(navMenu.classList.contains("open")){
			 toggleNav();
		 }
		 // if menuItemHasChildren is expanded , collapse it
		 if(navMenu.querySelector(".menu-item-has-children.active")){
			  collapseSubMenu();
	   }
	}
  
	window.addEventListener("resize", function(){
	   if(this.innerWidth > mediaSize){
		   resizeFix();
	   }
	});
  
  })();
  