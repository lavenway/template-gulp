   // IIFE - Immediately Invoked Function Expression
(function(yourcode) {
  
  // The global jQuery object is passed as a parameter
  'use strict';
  $ = $ || jQuery;

  yourcode(window.jQuery, window, document);

  }(function($, window, document) {
      'use strict';
      $ = $ || jQuery;

      // The $ is now locally scoped 
      $(function() {
          // The DOM is ready!

      });

      // The rest of your code goes here!
      /*var body = $('body'),
          html = $('html'),
          $doc = $(document);*/
  }
));