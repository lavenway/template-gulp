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
      $navCloseDropdown = $('.navbar-header .dropdown .close'),
      $navtoggleDropdown = $('.navbar-header a.cta'),    
      $navToggleDropdownActive = $('body'),
      $navHiddenDropdown = $('.navbar-header .dropdown'),
      $productGrid = $("#js-product-grid"),
      $productGridProduct = $("#js-product-grid .product"),
      $productGridInfo = $("#js-product-grid .info"),

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
      };


  //remove touch delay on touch devices
  var attachFastClick = Origami.fastclick;
      attachFastClick(document.body);


  // get nav for hide/show
  var getNav = document.querySelector('.js-main-nav');
  // construct an instance of Headroom, passing the element and options
  var headroom  = new Headroom(getNav, {
    "tolerance": 5,
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
          $content.slideUp('medium', function () {
            $parent.removeClass('expanded');
          });
        } else {
          $content.slideDown('medium', function () {
            $parent.addClass('expanded');
          });
        }    
    e.preventDefault();
  });

  enquire.register("screen and (max-width:480px)", {
    // OPTIONAL
    // If supplied, triggered when a media query matches.
    match : function() {
      
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

  //DROPCAP

  // We retrieve our drop cap elements using a class selector...
    var dropcaps = document.querySelectorAll(".dropcap"); 
    // ...then give them a height of three lines. 
    // By default, the drop cap's baseline will also be the third paragraph line.
    window.Dropcap.layout(dropcaps, 2.2, 2);

  // MAIN NAV TOGGLE DROPDOWNS
  $navtoggleDropdown.on('click', handleHeaderDropdown);

  //MAIN NAV CLOSE DROPDOWNS
  $navCloseDropdown.on('click', handleCloseHeaderDropdown);

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

      // YOUR STUFF HERE
    }
  };  
});
