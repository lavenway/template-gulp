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
	// Option animate on load
	// function animateOption() {
	// 	setTimeout(function() {
	//         var secID = $(this).('.option');
	//         secID.addClass('appear');
	//     }, 100);
	// }
	// Toggle between sections - follow the rabit
	$('#tt-section0').click(function() {
		$(this).removeClass('tt-active');
		$('#tt-section1').addClass('tt-active tt-opened');
		showStatusBar();
		setTimeout(function() {
	        var secID = $('#tt-section1 .option');
	        secID.addClass('appear');
	    }, 100);
	});
	$('.option-age').click(function() {
		var mainSection = $('.tt-section');
		mainSection.removeClass('tt-active');
		$('#tt-section2').addClass('tt-active tt-opened');
		showStatusBar();
		setTimeout(function() {
	        var secID = $('#tt-section2 .option');
	        secID.addClass('appear');
	    }, 100);
	});
	$('.option-tone').click(function() {
		var mainSection = $('.tt-section');
		mainSection.removeClass('tt-active');
		$('#tt-section3').addClass('tt-active tt-opened');
		showStatusBar();
		setTimeout(function() {
	        var secID = $('#tt-section3 .option');
	        secID.addClass('appear');
	    }, 100);
	});
	$('.option-eye').click(function() {
		var mainSection = $('.tt-section');
		mainSection.removeClass('tt-active');
		$('#tt-section4').addClass('tt-active tt-opened');
		showStatusBar();
	});

	// Custom Scroll
	function customScroll() {
		var ttoolHeight = $('.ttool').height()-110;
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
	// var resultTabs = $('.result-tabs'); 
	// var tabPane = $('.tabs-below .tab-pane');
	// var tabPaneCount = tabPane.length;
	// resultTabs.children().css('width',100/tabPaneCount+'%');

	var resultFilterNav = $('.result-filter-nav li');
	var resultFilterBody = $('.result-filter-body');
	var resultFilterCopy = $('.result-filter-copy');
	jQuery('body').on('click', '.result-filter-nav li', function(){ 
	// resultFilterNav.click(function() {
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