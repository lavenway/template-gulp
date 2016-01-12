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
      $doc = $(document);

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
    singleItem: true,
    pagination: true,
    responsive: true,
    responsiveRefreshRate : 200,
    responsiveBaseWidth: window
  });
  
  //IMAGE SCALE
  $("img.scale").imageScale({
    rescaleOnResize: true
  });

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
