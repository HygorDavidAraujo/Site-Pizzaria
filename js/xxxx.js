/*
 * Copyright (c) 2014 Themedo
 * Author: Themedo 
 * This file is made for CURRENT TEMPLATES
*/

jQuery(document).ready(function($){
	
	function allFunction(){
		
		"use strict";
	
		var win_height = jQuery( window ).height();
		var win_width = jQuery( window ).width();
		
		
		// -----------------------------------------------------  NAVIGATION
		jQuery('ul.xxxx_menu').superfish({
			delay:       200,                            // one second delay on mouseout
			animation:   {opacity:'show',height:'show'},  // fade-in and slide-down animation
			speed:       'fast',                          // faster animation speed
			autoArrows:  false
		});
		
		
		
		// sticky
		var navSticky = jQuery('nav.navigation').data('sticky');		
		if(navSticky == 'on'){ jQuery("nav.navigation").stick_in_parent(); }
		
		
		
		// -----------------------------------------------------  SVG
		svgeezy.init(false, 'png'); //svgeezy.init('nocheck', 'png');  this will tell the plugin to not check images with a class of 'nocheck'
		
		
		
		
		// -----------------------------------------------------  LOGO AND HEAD-RIGHT VERTICAL ALIGNMENT
		var logo 	= 	jQuery('.logo_wrap'),
			logoH 	= 	logo.height(),
			right 	= 	jQuery('.head_right'),
			rightH 	=	right.outerHeight(); 
		
		if(jQuery(window).width() > 979){
			if(logoH > rightH){
				var offset = (logoH - rightH)/2;  right.css({marginTop:offset});
			}else{
				var offset = (rightH - logoH)/2;  logo.css({marginTop:offset});	
			}		
		}
		
		

		
		// -----------------------------------------------------  SLIDER
		// slider height
		/*var headerH	= jQuery('header.header').outerHeight();
		if(win_width > 979){
			jQuery('.main_slider').css({height:win_height-headerH});
		}else{
			jQuery('.main_slider').css({height:'auto'});
		}*/
		
		
		
		var myClass = (jQuery('.flex-active-slide').attr('data-type'));
		var mainCont = jQuery('.content');
		
		
		// main slider
		jQuery('.flexslider').flexslider({
			controlNav: true,
			animationSpeed: 800,
			animation: 'fade',
			touch: true,
			slideshowSpeed: 4000,
			pauseOnHover: true,
		});
		
		var docWidth = jQuery(document).width();
		var distance = (docWidth - jQuery('.container').width())/2;
		jQuery('.main_slider .infobox').css({left:distance});
		
		function info_me(){
			var sliderHeight = jQuery('.main_slider').height();
		
			jQuery(".infobox").each(function(index, element) {
				var infoboxHeight = jQuery(this).outerHeight();
				var offy = (sliderHeight - infoboxHeight)/2;
				jQuery(this).css({marginTop:offy});
			});		
		}
		
		info_me();
		jQuery(window).load(function(e) {info_me();});
		
		
		
		
		// -----------------------------------------------------  SERVICE TABS
		// Legacy EasyTabs initialization for '.serviceIntro' interferes with the
		// newer tabs implementation in `js/optimized.js` which relies on CSS
		// (.tabcontent>div.active { display: flex }). EasyTabs uses jQuery
		// .show() which sets an inline `display: block` on panels and wins over
		// the desired flex layout. Disable the legacy initializer so the modern
		// JS/CSS approach controls the tabs.
		// jQuery('.serviceIntro').easytabs({
		// 	animate: true,
		// 	animationSpeed: 400,
		// 	updateHash: false,
		// 	//cycle: 6000
		// });
		
		
		// -----------------------------------------------------  XX TABS
		jQuery('.xx_tabs').easytabs({
			animate: true,
			animationSpeed: 400,
			updateHash: false,
			//cycle: 6000
		});
		
		
		// -----------------------------------------------------  TESTIMONIAL
		// -----------------------------------------------------  TESTIMONIAL
		// NOTE: testimonial/carousel initialization is handled by `js/optimized.js`.
		// Removing legacy initialization here prevents double-initialization which
		// can leave controls (prev/next) hidden or prevent responsive nav settings
		// from taking effect.
		// Keep the markup ('.carouselle.owl-carousel') in the HTML and let
		// the modern initializer run in `optimized.js`.
		
		
		
		// -----------------------------------------------------  GALLERY
		jQuery('.xx_carousel').each(function(index, element) {
			jQuery(this).owlCarousel({
				items :3,
				margin:3,
				slideBy:1,
				responsiveClass:true,
				responsive:{
					0:{
						items:1,
					},
					480:{
						items:2,
					},
					768:{
						items:3,
					},
					980:{
						items:2,
					},
					1200:{
						items:3,
					}
				},
						
				autoplay:false,
				smartSpeed:500,
				autoplayTimeout:5000,
				autoplayHoverPause:true,
				loop:false,
				dots:false,
				nav:false,
				
			});
			
			// Custom navigation
			jQuery(this).parent().find('span.ocprev').on('click',function(){
				jQuery(this).closest('.xx_gallery').find('.xx_carousel').trigger('prev.owl');
			});
			jQuery(this).parent().find('span.ocnext').on('click',function(){
				jQuery(this).closest('.xx_gallery').find('.xx_carousel').trigger('next.owl');
			});			
		
		});
		
		
		// -----------------------------------------------------  RANDOM IMG
		jQuery('.random_img').each(function(index, element) {
			jQuery(this).owlCarousel({
				items :1,
				margin:15,
				slideBy:1,
				responsiveClass:true,						
				autoplay:true,
				smartSpeed:500,
				autoplayTimeout:5000,
				autoplayHoverPause:true,
				loop:true,
				dots:false,
				nav:false,
				
			});
			
			// Custom navigation
			jQuery(this).parent().find('span.ocprev').on('click',function(){
				jQuery(this).parent().parent().find('.random_img').trigger('prev.owl');
			});
			jQuery(this).parent().find('span.ocnext').on('click',function(){
				jQuery(this).parent().parent().find('.random_img').trigger('next.owl');
			});		
		
		});
		
		
		
		
		
		// -----------------------------------------------------  TO TOP
		jQuery("a[href='#totop']").click(function() {
			jQuery("html, body").animate({ scrollTop: 0 }, 'slow');
			return false;
		});
		
		
		
		// -----------------------------------------------------  MAGNIFIC POPUP
		// book online
		jQuery('.book_online a.book_button').each(function(index, element) {
            jQuery(this).magnificPopup({
				type: 'ajax',
				fixedContentPos: false,
				overflowY: 'auto',
				closeBtnInside: true,
				closeOnBgClick: false,
				midClick: true,
				removalDelay: 300,
				callbacks: {
					beforeOpen: function() {
					   this.st.mainClass = this.st.el.attr('data-effect');
					},
					ajaxContentAdded: function(){
						jQuery(".book_submit").click(function(){
							var name 		= jQuery(".book_online_form #name").val();
							var email 		= jQuery(".book_online_form #email").val();
							var date 		= jQuery(".book_online_form #reservation-date").val();
							var time 		= jQuery(".book_online_form #reservation-time").val();
							var message 	= jQuery(".book_online_form #message").val();
							var contact 	= jQuery(".book_online_form #contact").val();
							var success     = jQuery(".book_online_form .returnmessage").data('success');
						
							jQuery(".book_online_form .returnmessage").empty(); //To empty previous error/success message.
							//checking for blank fields	
							if(name==''||email==''||contact==''||date==''||message==''){
								//alert("Please Fill Required Fields"); 
								jQuery('div.empty_notice').slideDown(500).delay(2000).slideUp(500);
							}
							else{
								// Returns successful data submission message when the entered information is stored in database.
								jQuery.post("modal/book.php",{ xx_name: name, xx_email: email, xx_date: date, xx_time: time, xx_message:message, xx_contact: contact}, function(data) {
									
									jQuery(".book_online_form .returnmessage").append(data);//Append returned message to message paragraph
									
									
									if(jQuery(".book_online_form .returnmessage span.book_error").length){
										jQuery(".book_online_form .returnmessage").slideDown(500).delay(2000).slideUp(500);		
									}else{
										jQuery(".book_online_form .returnmessage").append("<span class='book_success'>"+ success +"</span>")
										jQuery(".book_online_form .returnmessage").slideDown(500).delay(4000).slideUp(500);
										setTimeout(function(){  $.magnificPopup.close() }, 5500);
									}
									
									if(data==""){
										jQuery(".book_online_form")[0].reset();//To reset form fields on success
									}
									
								});
							}
						 
						});
						
						
						jQuery('.datepicker-input').each(function(index, element) {
							
							var firstDay = jQuery(this).data( 'first-day' ) ? jQuery(this).data( 'first-day' ) : 0,
								dateFormat = jQuery(this).data( 'date-format' ) ? jQuery(this).data( 'date-format' ) : 'mm / dd / yy';
								
							jQuery(this).children('#reservation-date').datepicker({
								dateFormat: dateFormat,
								minDate: -0,
								firstDay: firstDay
							});
							
							
						});	
					}, //ajaxContentAdded ended here
				},	
			});
        });
		
		
		// address
		jQuery('.book_online a.address_button').each(function(index, element) {
            jQuery(this).magnificPopup({
				type: 'ajax',
				fixedContentPos: false,
				overflowY: 'auto',
				closeBtnInside: true,
				closeOnBgClick: false,
				midClick: true,
				removalDelay: 300,
				callbacks: {
					beforeOpen: function() {
					   this.st.mainClass = this.st.el.attr('data-effect');
					}
				},	
			});
        });
		
		
		// working day
		jQuery('.opening_time a.working_day').each(function(index, element) {
            jQuery(this).magnificPopup({
				type: 'ajax',
				fixedContentPos: false,
				overflowY: 'auto',
				closeBtnInside: true,
				closeOnBgClick: false,
				midClick: true,
				removalDelay: 300,
				callbacks: {
					beforeOpen: function() {
					   this.st.mainClass = this.st.el.attr('data-effect');
					}
				},	
			});
        });
		
		
		// gallery
		jQuery('.popup_gallery').each(function(index, element) {
            jQuery(this).magnificPopup({
				delegate: 'a.zoomer',
				type: 'image',
				closeOnContentClick: false,
				closeBtnInside: false,
				mainClass: 'mfp-with-zoom mfp-img-mobile',
				image: {
					verticalFit: true,
					titleSrc: function(item) {
						return item.el.attr('title');
					}
				},
				gallery: {
					enabled: true
				},
				zoom: {
					enabled: true,
					duration: 300, // don't foget to change the duration also in CSS
					opener: function(element) {
						return element.find('img');
					}
				}
			});
        });
		
		
		
		// working day
		jQuery('.modal_box a.modal_button').each(function(index, element) {
            jQuery(this).magnificPopup({
				type: 'inline',
				fixedContentPos: false,
				overflowY: 'auto',
				closeBtnInside: true,
				closeOnBgClick: true,
				midClick: true,
				removalDelay: 300,
				mainClass: 'mfp-with-zoom mfp-img-mobile',
				callbacks: {
					beforeOpen: function() {
					   this.st.mainClass = this.st.el.attr('data-effect');
					}
				},	
			});
        });
		
		
		// -----------------------------------------------------  SERVICE SELECT
		
		jQuery('.selector a.select_link').each(function(index, element) {
            var me = jQuery(this);
			me.click(function(e) {
				e.preventDefault();
				if(!me.hasClass('opened')){
					me.addClass('opened');	
					me.parent().find('ul').fadeIn();
				}else{
					me.removeClass('opened');	
					me.parent().find('ul').fadeOut();
				}
			});
        });
		
		
		jQuery('.selector ul li a').click(function(e){
			e.preventDefault();
			var content = jQuery(this).html();
			jQuery(this).parent().parent().fadeOut();
			jQuery(this).parents('.selector').find('a.select_link').removeClass('opened').text(content);
		});
       
		
		// service filter
		function iso_me(){
			
			"use strict";
			
			if(jQuery().isotope) {
				// Needed variables
				var container = jQuery(".service-list");
				var filter = jQuery(".service-filter");
				
				// Run Isotope  
				container.isotope({
					filter				: '*',
					layoutMode   		: 'masonry',
					animationOptions	: {
					duration			: 750,
					easing				: 'linear'}
				});	
				
				// Isotope Filter 
				filter.find('a').click(function(){
					var selector = jQuery(this).attr('data-filter');
					container.isotope({ 
						filter				: selector,
						animationOptions	: {
						duration			: 750,
						easing				: 'linear',
						queue				: false}
					});
					return false;
				});	
				
				// Copy categories to item classes
				filter.find('a').click(function() {
					filter.find('a').removeClass('current');
					jQuery(this).addClass('current');
				});
			}		
		}
		
		iso_me();
		// fix for first load
		jQuery(window).load(function(e) { iso_me();});
		
		// -----------------------------------------------------  ACCORDION
		
		jQuery(".accordion").smk_Accordion({
			showIcon: false, //boolean	
		});
		
		
		
		
		// -----------------------------------------------------  CONTACT FORM
		jQuery(".message_submit").click(function(){
			var name 		= jQuery(".contact_form #name").val();
			var email 		= jQuery(".contact_form #email").val();
			var message 	= jQuery(".contact_form #message").val();
			var subject 	= jQuery(".contact_form #subject").val();
			var success     = jQuery(".contact_form .returnmessage").data('success');
		
			jQuery(".contact_form .returnmessage").empty(); //To empty previous error/success message.
			//checking for blank fields	
			if(name==''||email==''||message==''){
				//alert("Please Fill Required Fields"); 
				jQuery('div.empty_notice').slideDown(500).delay(2000).slideUp(500);
			}
			else{
				// Returns successful data submission message when the entered information is stored in database.
				jQuery.post("modal/contact.php",{ xx_name: name, xx_email: email, xx_message:message, xx_subject: subject}, function(data) {
					
					jQuery(".contact_form .returnmessage").append(data);//Append returned message to message paragraph
					
					
					if(jQuery(".contact_form .returnmessage span.contact_error").length){
						jQuery(".contact_form .returnmessage").slideDown(500).delay(2000).slideUp(500);		
					}else{
						jQuery(".contact_form .returnmessage").append("<span class='contact_success'>"+ success +"</span>")
						jQuery(".contact_form .returnmessage").slideDown(500).delay(4000).slideUp(500);
					}
					
					if(data==""){
						jQuery("#contact_form")[0].reset();//To reset form fields on success
					}
					
				});
			}
		 
		});
		
		
		
	}
	
	
	// do function
	allFunction();
	jQuery(window).resize(function(e) {allFunction();});
	
	
	
	// -----------------------------------------------------  MOBILE MENU
	var navTrigger = jQuery('.nav_trigger a');
	navTrigger.click(function(e) {
		e.preventDefault();
		if(!jQuery(this).hasClass('opened')){
			jQuery(this).addClass('opened');	
			jQuery('.nav_mobile').slideDown();
		}else{
			jQuery(this).removeClass('opened');	
			jQuery('.nav_mobile').slideUp();
		}
	});
	
	jQuery(window).resize(function(e) {
        if(jQuery(window).width() > 979){
			jQuery('.nav_mobile').slideUp();
			jQuery('.nav_trigger a').removeClass('opened');
		}
    });
	
	jQuery('.nav_mobile ul li').each(function(index, element) {
		var ghgh = jQuery(this).children('ul');
		if(ghgh.length){
			
			var test = jQuery(this).children('i');
			if(!test.length){
				jQuery(this).append('<i class="xcon-angle-right"></i>');	
			}
			
			jQuery(this).children('i').click(function(e) {
			   e.preventDefault();
			   if(!jQuery(this).parent('li').hasClass('opened')){
					jQuery(this).parent('li').addClass('opened');
					jQuery(this).parent('li').children('ul').slideDown();
					jQuery(this).removeClass('xcon-angle-right').addClass('xcon-angle-left')
				}else{
					jQuery(this).parent('li').removeClass('opened');
					jQuery(this).parent('li').children('ul').slideUp();
					jQuery(this).removeClass('xcon-angle-left').addClass('xcon-angle-right')
				}
			});
		} 
	});
	

	
});


