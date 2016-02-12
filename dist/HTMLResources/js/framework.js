/*
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
≡≡≡≡≡≡                                                                                                      ≡≡≡≡≡≡≡≡≡≡≡≡
≡≡≡≡≡≡   INITIALISE / BASE 1.0                                                                             ≡≡≡≡≡≡≡≡≡≡≡≡
≡≡≡≡≡≡                                                                                                    ≡≡≡≡≡≡≡≡≡≡≡≡
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
*/

'use strict';
$ = $ || jQuery;

$(function () {

  var body = $('body'),
      html = $('html'),
      $doc = $(document),
      $backToTop = $('.back-to-top'),
      $mainNav = $('.navbar-default'),
      $mobileNav = $('.mobile-nav'),
      $mobileFooterNavtoggleDropdown = $('.mobile-nav a.share'),
      $navCloseDropdown = $('.navbar-header .dropdown .close'),
      $navtoggleDropdown = $('.navbar-header a.cta'),
      $navToggleDropdownActive = $('body'),
      $navHiddenDropdown = $('.navbar-header .dropdown'),
      $productGrid = $("#js-product-grid"),
      $productGridProduct = $("#js-product-grid .product"),
      $productGridInfo = $("#js-product-grid .info"),
      /*$productLinkToggle = $(".list-one a"),*/
      $productLinkPopUp = $(".product-pop-up"),

      handleInfoBox = function (e) {
        var $this = $(this),
            $parent = $this.parent();

        if ($parent.hasClass('active')) {
            $parent.removeClass('active').next('.info').slideUp('medium');
        } else if ($('#js-product-grid .row div').hasClass('active')) {
            $('#js-product-grid .row div').removeClass('active').next('.info').slideUp('medium');
            $parent.addClass('active').next('.info').slideDown('medium');
        } else {
            $parent.addClass('active').next('.info').slideDown('medium');
        }
      },

      handleHeaderDropdown = function (e) {
        var $this = $(this),
            $activeDropdown = $this.hasClass('active-tab'),
            $hasDropdown = $this.next('.dropdown'),
            $toggleTab = $navToggleDropdownActive.hasClass('header-nav-active');

        if ($this.next().is($hasDropdown)) {
          e.preventDefault();
          if ($toggleTab) {
              if ($activeDropdown) {
                  $this.next($navHiddenDropdown).stop().slideUp();
                  $this.toggleClass('active-tab');
                  $navToggleDropdownActive.toggleClass('header-nav-active');
              }
              else {
                  $navtoggleDropdown.removeClass('active-tab');
                  $navHiddenDropdown.slideUp();
                  
                  if ($navHiddenDropdown.is(':animated')) {
                      // activate next nav/content 
                      $this.next($navHiddenDropdown).stop().delay(600).slideToggle(200);
                      $this.toggleClass('active-tab');
                  }
              }
          } else {
              $navToggleDropdownActive.addClass('header-nav-active');
              $this.toggleClass('active-tab');
              $this.next($navHiddenDropdown).stop().slideToggle();
          }
        }
      },

      handleCloseHeaderDropdown = function (e) {
        $navToggleDropdownActive.removeClass('header-nav-active');
        $navtoggleDropdown.removeClass('active-tab');
        $navHiddenDropdown.slideUp();
      },

      handleFooterDropdown = function (e) {
        var $this = $(this),
            $activeDropdown = $this.hasClass('active-tab'),
            $headerShareDropdown = $('.navbar .navbar-header .share-dropdown'),
            $toggleTab = $navToggleDropdownActive.hasClass('header-nav-active');

        e.preventDefault();

        if ($toggleTab) {
          if ($activeDropdown) {
            $navHiddenDropdown.slideUp();
            $this.toggleClass('active-tab');
            $headerShareDropdown.stop().delay(600).slideToggle(200);
          } else {
            $navtoggleDropdown.removeClass('active-tab');
            $navHiddenDropdown.slideUp();
            $headerShareDropdown.stop().delay(600).slideToggle(200);
            $this.toggleClass('active-tab');
          }
        } else {
          $navToggleDropdownActive.addClass('header-nav-active');
          $this.addClass('active-tab');
          $headerShareDropdown.stop().delay(600).slideToggle(200);
        }
          
        $mainNav.addClass('slideInDown').removeClass('slideOutUp');

      },

      /*handleProductPopUp = function (e) {
        var $activeProductPopUp = body.hasClass('product-pop-up-active');
        e.preventDefault();

        if ($activeProductPopUp) {
          $productLinkPopUp.fadeOut(800).removeClass('show');
          $productLinkPopUp.delay(200).addClass('show').toggle();
        } else {
          body.addClass('product-pop-up-active');

          $productLinkPopUp.addClass('show').toggle();
        } 
      },*/

      handleBackToTopScroll = function () {
        body.animate({ scrollTop: 0 }, "slow");
      };
      

  //remove touch delay on touch devices
  var attachFastClick = Origami.fastclick;
      attachFastClick(document.body);


  // get nav for hide/show
  var getNav = document.querySelector('.js-main-nav');
  // construct an instance of Headroom, passing the element and options
  var headroom  = new Headroom(getNav, {
    "tolerance": 5,
    "offset": 58,
    "classes": {
      "initial": "",
      "pinned": "slideInDown",
      "unpinned": "slideOutUp"
    }
  });
  // initialise
  headroom.init();

  //Prevent click on image within single image gallery
  $('.gallery-thumb').on('click', function (e) {
    e.preventDefault();
  });

  //Header image carousel
  $('#js-header-hero-carousel').owlCarousel({
    items: 1,
    loop : true,
    loadedClass: 'owl-loaded owl-theme',
    responsiveRefreshRate : 200,
    responsiveBaseElement: window,
    onResized: function (e) {
      $("img.scale").imageScale();
    }
  });

  //Related articles component carousel
  $('#js-related-articles-carousel').owlCarousel({
    responsive : {
      0 : {
        items : 2
      },
      480 : {
        items : 3
      },
      980 : {
        items : 4
      }
    },
    loadedClass: 'owl-loaded owl-theme',
    responsiveRefreshRate : 200,
    responsiveBaseWidth: window
  });

  //Product component carousel
  $('#js-product-carousel').owlCarousel({
    responsive : {
      0 : {
        items : 1
      },
      480 : {
        items : 2
      },
      980 : {
        items : 4
      }
    },
    loadedClass: 'owl-loaded owl-theme',
    responsiveRefreshRate : 200,
    responsiveBaseWidth: window
  });
  
  //IMAGE SCALE
  $("img.scale").imageScale({
    rescaleOnResize: true
  });

  $doc.on('click', '.js-read-more', function (e) {
    var $parent = $(this).parents('.component'),
        $content = $parent.find('.js-to-show');

        if ($parent.hasClass('expanded')) {
          // jQuery(this).parent().find('.preview-content img').css('visibility','hidden').show().fadeOut().addClass('hidden');
          jQuery(this).parent().find('.preview-content img').removeClass('open');
          $parent.removeClass('hold-expanded');
          $content.slideUp('medium', function () {
            $parent.removeClass('expanded');
          });
        } else {
          $parent.addClass('hold-expanded');
          $content.delay(500).slideDown('medium', function () {
            
          jQuery(this).parent().find('.preview-content img').addClass('open');
            // jQuery(this).parent().find('.preview-content img').css({'visibility':'visible','display':'block'}).hide().fadeIn().removeClass('hidden');
            $parent.addClass('expanded');
          });
        }    
    e.preventDefault();
  });

  $doc.on('click', '.js-close-banner', function (e) {
    $(this).parents('.component').addClass('slideOutUp');
    e.preventDefault();
  });

  $doc.on('click', '.js-close-ratings', function (e) {
    $(this).parents('.component').removeClass('show');
    e.preventDefault();
  });

  $doc.on('click', '.product-pop-up .close', function (e) {
    body.removeClass('product-pop-up-active');

    $(this).parents('.component').toggle().removeClass('show');
  });

  enquire.register("screen and (max-width:480px)", {
    // OPTIONAL
    // If supplied, triggered when a media query matches.
    match : function() {
      
      body.addClass('mobile-viewport');

      $('#js-product-grid .product').on('click', handleInfoBox);

      $productGridInfo.each(function(index) {
        $productGrid.addClass("mobile-layout");
        $(this).parent().after(this);      
      });
    },      
                                
    // OPTIONAL
    // If supplied, triggered when the media query transitions 
    // *from a matched state to an unmatched state*.
    unmatch : function() {
      
      body.removeClass('mobile-viewport');

      $('#js-product-grid .product').unbind( "click" );

      $productGridInfo.each(function(index) {
        $productGrid.removeClass("mobile-layout");
        $(this).removeAttr('style').prev().append(this);
        $(this).parent().removeClass('active');
      });
    },    
    
    // OPTIONAL
    // If supplied, triggered once, when the handler is registered.
    setup : function() {},    
                                
    // OPTIONAL, defaults to false
    // If set to true, defers execution of the setup function 
    // until the first time the media query is matched
    deferSetup : true,
                                
    // OPTIONAL
    // If supplied, triggered when handler is unregistered. 
    // Place cleanup code here
    destroy : function() {}
      
  });

  enquire.register("screen and (min-width:481px) and (max-width:768px)", {
    // OPTIONAL
    // If supplied, triggered when a media query matches.
    match : function() {
      
      body.addClass('tablet-viewport');
    }, 

    // OPTIONAL
    // If supplied, triggered when the media query transitions 
    // *from a matched state to an unmatched state*.
    unmatch : function() {
      
      body.removeClass('tablet-viewport');
    },

    // OPTIONAL
    // If supplied, triggered once, when the handler is registered.
    setup : function() {},    
                                
    // OPTIONAL, defaults to false
    // If set to true, defers execution of the setup function 
    // until the first time the media query is matched
    deferSetup : true,
                                
    // OPTIONAL
    // If supplied, triggered when handler is unregistered. 
    // Place cleanup code here
    destroy : function() {}
  });

  enquire.register("screen and (min-width:769px)", {
    // OPTIONAL
    // If supplied, triggered when a media query matches.
    match : function() {
      
      body.addClass('desktop-viewport');
    }, 

    // OPTIONAL
    // If supplied, triggered when the media query transitions 
    // *from a matched state to an unmatched state*.
    unmatch : function() {
      
      body.removeClass('desktop-viewport');
    },

    // OPTIONAL
    // If supplied, triggered once, when the handler is registered.
    setup : function() {},    
                                
    // OPTIONAL, defaults to false
    // If set to true, defers execution of the setup function 
    // until the first time the media query is matched
    deferSetup : true,
                                
    // OPTIONAL
    // If supplied, triggered when handler is unregistered. 
    // Place cleanup code here
    destroy : function() {}
  });

  //DROPCAP

  // We retrieve our drop cap elements using a class selector...
    var dropcaps = document.querySelectorAll(".dropcap"); 
    // ...then give them a height of three lines. 
    // By default, the drop cap's baseline will also be the third paragraph line.
    window.Dropcap.layout(dropcaps, 2.2, 2);

  // MOBILE FOOTER NAV TOGGLE DROPDOWN
  $mobileFooterNavtoggleDropdown.on('click', handleFooterDropdown);

  // MAIN NAV TOGGLE DROPDOWNS
  $navtoggleDropdown.on('click', handleHeaderDropdown);

  //MAIN NAV CLOSE DROPDOWNS
  $navCloseDropdown.on('click', handleCloseHeaderDropdown);

  //MAIN NAV CLOSE DROPDOWNS
  /*$productLinkToggle.on('click', handleProductPopUp);*/

  //BACK TO TOP
  $backToTop.on('click', handleBackToTopScroll);

  $(window).scroll(function(){    
    hideNavDropdown();
    parallaxHeaderImageIfExists();
    checkScrollPositionForMobileNav();
  }).scroll();

  // CLOSE DROPDOWNS WHEN CLICKING ANYWHERE //
  /*$doc.mouseup(function (e) {
    if (!$navHiddenDropdown.is(e.target)
        && $navHiddenDropdown.has(e.target).length === 0)
    {
        hideNavDropdown();
    }
  });*/

  function checkScrollPositionForMobileNav() {
    if ($mobileNav.is(':visible')) {
      if ($(window).height() + $(window).scrollTop() >= $(document).height()-30) {
        // unbind the scroll event so we don't come here again
        //$(window).unbind('scroll');
        body.addClass('scrolled-bottom');
      }
       else {
        body.removeClass('scrolled-bottom');
      }
    } else {
      body.removeClass('scrolled-bottom');
    }
  };

  function hideNavDropdown() {
    $navHiddenDropdown.slideUp();
    $navtoggleDropdown.removeClass('active-tab');
    $navToggleDropdownActive.removeClass('header-nav-active');
  };

  function parallaxHeaderImageIfExists() {
    var $parallaxHeaderImage = body.hasClass('parallax-header-image'),
        $headerImage = $(".header-image img");

    if ($parallaxHeaderImage) {
      var scrolled = $(window).scrollTop();
      
      if ($(window).scrollTop() < $(window).height()) {
          $headerImage.css('top', (scrolled * 0.2 + 'px'));
      }
      else {
          $headerImage.css('top', '0');
      }
    }
  };

  function cookiesEnabled() {
    var cookieEnabled = (navigator.cookieEnabled) ? true : false;

    if (typeof navigator.cookieEnabled == "undefined" && !cookieEnabled) { 
        document.cookie="testcookie";
        cookieEnabled = (document.cookie.indexOf("testcookie") != -1) ? true : false;
    }
    return (cookieEnabled);
  }

  function showRating() {
    $('.component.ratings-banner').addClass('show');
  }

  function ratingCookie() {
    var dateNow = moment().date();

    if (docCookies.getItem('visited') === null) {
      setTimeout(showRating, 120000);
      docCookies.setItem('visited', dateNow, 31536000);
      docCookies.setItem('shown_rating', true, 31536000); 
      return;
    } else {
      docCookies.setItem('visited', dateNow, 31536000); 
    }

    if (docCookies.getItem('visited') < 15) {
      docCookies.setItem('shown_rating', false, 31536000);
      return
    };

    if (docCookies.getItem('visited') >= 15 && docCookies.getItem('shown_rating') === 'false') {
      setTimeout(showRating, 120000);
      docCookies.setItem('shown_rating', true, 31536000);
    }
  }

  // Only run this stuff if page is fully loaded
  // This is needed to prevent onreadystatechange being run twice
  var ready = false;

  document.onreadystatechange = function() {

    if (ready) {
      return;
    }
    
    // interactive = DOMContentLoaded & complete = window.load
    if (document.readyState == 'interactive' || document.readyState == 'complete') {
      ready = true;

      if (cookiesEnabled() === false) {
        return;
      } else {        
        ratingCookie();
      }
    }
  };  
});

/*---------- START COMPETITION COMPONENT ----------*/
jQuery('body').on('click','button.content-button',function(){
  var modal_parent    = jQuery(this).parents('.component.competition');
  var content_holder  = jQuery(this).parent().parent().find('.content-form');
  if(!content_holder.hasClass('js-open')){
    // jQuery(this).prop('type', 'submit');
    content_holder.addClass('js-open');
  }else{
    modal_parent.find('.success_modal,.competition-modal-wrapper').addClass('open');
    jQuery('body').addClass('wrapper-block');
  }
})

jQuery('body').on('click', '.terms_modal_link', function(event) {
  event.preventDefault();
  var terms_parent          = jQuery(this).parents('.component.competition');
  var terms_modal_wrapper   = terms_parent.children('.competition-modal-wrapper');
  var terms_modal           = terms_modal_wrapper.children('.terms_modal');
  terms_modal_wrapper.toggleClass('open');
  terms_modal.toggleClass('open');
  jQuery('body').addClass('wrapper-block');
});

// jQuery('body').on('click', '.competition-modal-wrapper', function(event) {
//   event.preventDefault();
//   event.stopPropagation();
//   jQuery(this).removeClass('open');
//   jQuery('.competition-modal').removeClass('open');
// });

jQuery('body').on('click', '.terms_modal .close,.success_modal .close', function(event) {
  event.preventDefault();
  jQuery(this).parent().parent().toggleClass('open');
  jQuery(this).parents('.competition-modal-wrapper').removeClass('open');
  jQuery('body').removeClass('wrapper-block');
});

/*---------- END COMPETITION COMPONENT ----------*/


'use strict';
$ = $ || jQuery;

$(function () {
	var winWidth = $(window).width();
	var winHeight = $(window).height();
	var mobLand = 480;
	var tabPort = 768;

	$('.tabs-below').css('height',winHeight);

	// Count Sections
	function statusBar() {
		var sections = $('.tt-sections');
		var sectionCount = sections.children().length-2;
		var sectionTotal = sectionCount;
		// Create the bars for status
		var statusBar = $('.tt-status-bar');
		var statCount;
		for (statCount = 1; statCount <= sectionCount; statCount++) {
			statusBar.append('<div id="tt-status'+statCount+'" class="tt-bar"></div>');
			statusBar.children().css('width',100/sectionCount+'%');
			var section = $('.tt-section').attr('tt-data-status');
		}
	}
	// Sections
	function showStatusBar() {
		$('.tt-section').each(function(){
			if ( $(this).hasClass('tt-opened') ) {
				$('#'+ $(this).attr('data-status')).addClass('tt-show');
			};
		});
	}
	// Result Product Carousel
	function ttProductCarousel() {
		$('.tt-products-carousel').slick({
			dots: true,
	        infinite: true,
	        speed: 300,
	        slidesToShow: 3,
	        slidesToScroll: 3,
	        arrows: false,
	        responsive: [{
	       
	            breakpoint: 600,
	            settings: {
	                slidesToShow: 1,
	                slidesToScroll: 1,
	                infinite: true,
	                dots: true
	            }
	        }]
		});
	}
	
	statusBar()
	
 

	// Toggle between sections - follow the rabit
	$('#tt-section0').click(function() {
		$(this).removeClass('tt-active');
		$('#tt-section1').addClass('tt-active tt-opened');
		showStatusBar()
	});
	$('.option-age').click(function() {
		var mainSection = $('.tt-section');
		mainSection.removeClass('tt-active');
		$('#tt-section2').addClass('tt-active tt-opened');
		showStatusBar()
	});
	$('.option-tone').click(function() {
		var mainSection = $('.tt-section');
		mainSection.removeClass('tt-active');
		$('#tt-section3').addClass('tt-active tt-opened');
		showStatusBar()
	});
	$('.option-eye').click(function() {
		var mainSection = $('.tt-section');
		mainSection.removeClass('tt-active');
		$('#tt-section4').addClass('tt-active tt-opened');
		showStatusBar();
	});

	// Custom Scroll
	function customScroll() {
		var ttoolHeight = $('.ttool').height()-100;
		$(".options").mCustomScrollbar({
			setHeight: ttoolHeight,
			theme:"inset-2-dark",
			autoDraggerLength: false
		});
		var ttoolHeightSC = $('.ttool').height()-150;
		$(".scrollable-copy").mCustomScrollbar({
			setHeight: ttoolHeightSC,
			theme:"inset-2-dark",
			autoDraggerLength: false
		});
	}
	customScroll();

	// Divide and apply width to the Result tabs navigation
	var resultTabs = $('.result-tabs'); 
	var tabPane = $('.tabs-below .tab-pane');
	var tabPaneCount = tabPane.length;
	resultTabs.children().css('width',100/tabPaneCount+'%');

	var resultFilterNav = $('.result-filter-nav li');
	var resultFilterBody = $('.result-filter-body');
	var resultFilterCopy = $('.result-filter-copy');
	resultFilterNav.click(function() {
		var rfId = $(this).attr('data-rf-id');
		resultFilterBody.removeClass('rf-active');
		resultFilterCopy.removeClass('rf-active');
		$('#'+rfId).addClass('rf-active');
		$('#copy-'+rfId).addClass('rf-active');
	});

	$('.result-tabs a').click(function (e) {
	  e.preventDefault()
	  $(this).tab('show')
	})

	$('.result-tabs a.product-kit').click(function (e) {
		ttProductCarousel(); 
	 	$('.tt-products-carousel').trigger('resize');
	})

});