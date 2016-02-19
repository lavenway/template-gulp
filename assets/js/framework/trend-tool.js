'use strict';
$ = $ || jQuery;

$(function () {
var winWidth = $(window).width();
var winHeight = $(window).height();
var mobLand = 480;
var tabPort = 768;

$('.tabs-below').css('height',winHeight);

// Count Sections
// function statusBar() {
// var sections = $('.tt-sections');
// var sectionCount = sections.children().length-2;
// var sectionTotal = sectionCount;
// // Create the bars for status
// var statusBar = $('.tt-status-bar');
// var statCount;
// for (statCount = 1; statCount <= sectionCount; statCount++) {
// statusBar.append('<div id="tt-status'+statCount+'" class="tt-bar"></div>');
// statusBar.children().css('width',100/sectionCount+'%');
// var section = $('.tt-section').attr('tt-data-status');
// }
// }
// Sections
// function showStatusBar() {
// $('.tt-section').each(function(){
// if ( $(this).hasClass('tt-opened') ) {
// $('#'+ $(this).attr('data-status')).addClass('tt-show');
// };
// });
// }
// Result Product Carousel
// function ttProductCarousel() {
	// jQuery('.tt-products-carousel').slick({
	// 	dots: true,
 //       infinite: true,
 //       speed: 300,
 //       slidesToShow: 3,
 //       slidesToScroll: 3,
 //       arrows: false,
 //       responsive: [{
      
 //           breakpoint: 600,
 //           settings: {
 //               slidesToShow: 1,
 //               slidesToScroll: 1,
 //               infinite: true,
 //               dots: true
 //           }
 //       }]
	// });
// }
// statusBar()

var ttool;
var sectionNext;
var toolCount = jQuery('.ttool').length;
jQuery('.ttool').each(function() {
	var ttool = jQuery(this).attr('id');
	jQuery('#'+ttool+'product-kit-btn').click(function () {
		jQuery('#'+ttool+' .tt-products-carousel').trigger('resize');
	});
	// Initialize Carousel
	jQuery('#'+ttool+'tabs a').click(function (e) {
		e.preventDefault()
		jQuery(this).tab('show')
	});
	// Resize trigger for fixing Carousel layout
	jQuery('#'+ttool+'tabs a.product-kit').click(function (event) {
		event.preventDefault();
		jQuery('#'+ttool+' .tt-products-carousel').slick({
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
	});
	// Hide back button on the first page
	jQuery('#'+ttool+' .tt-left-nav').css('display','none');
	// Hide and Show sections
	jQuery('body').on('click','.sec-trigger', function() {
		var thisParent  = jQuery(this).closest('.tt-section');
		jQuery(thisParent).removeClass('tt-active');
		var sectionNext = jQuery(thisParent).next();
		sectionNext.addClass('tt-active tt-opened');
		var secNextAtt  = sectionNext.attr('data-stat-id');
		jQuery('#'+secNextAtt).addClass('tt-show');
		jQuery('#'+ttool+' .tt-left-nav').css('display','block');
	});
	// Status Bar
	var sectionCount = jQuery(this).find('.tt-section').length-2;
	var statusBar    = jQuery(this).find('.tt-status-bar');
	var statCount;
	for (statCount = 1; statCount <= sectionCount; statCount++) {
		statusBar.append('<div id="'+ttool+'tt-status'+statCount+'" class="tt-bar"></div>');
		statusBar.children().css('width',100/sectionCount+'%');
		var section = jQuery('.tt-section').attr('tt-data-status');
	}
	// Skin tone filter
	jQuery('body').on('click', '.result-filter-nav li', function() { 
		var ttID = jQuery(this).closest('.ttool').attr('id');
		var resultFilterBody = jQuery('#'+ttID+' .result-filter-body');
		var resultFilterCopy = jQuery('#'+ttID+' .result-filter-copy');
		var rfId = jQuery(this).attr('data-rf-id');
		resultFilterBody.removeClass('rf-active');
		resultFilterCopy.removeClass('rf-active');
		jQuery('#'+ttID+rfId).addClass('rf-active');
		jQuery('#'+ttID+'copy-'+rfId).addClass('rf-active');
	});
	// Back button
	jQuery('body').on('click', '#'+ttool+' .tt-left-nav', function(){
		var current_id = jQuery('#'+ttool+' .tt-active').attr('data-id');
		var prev_id = current_id - 1;

		if(current_id != 0) {
			jQuery('#'+ttool+' .tt-section'+current_id).removeClass('tt-active tt-opened');
			jQuery('#'+ttool+' .tt-section'+prev_id).addClass('tt-active tt-opened');
			jQuery('#'+ttool+' #'+ttool+'tt-status'+current_id).removeClass('tt-show');
		} 
	})

});

// $('#tt-section0').click(function() {
// $(this).removeClass('tt-active');
// $('#tt-section1').addClass('tt-active tt-opened');
// showStatusBar();
// setTimeout(function() {
//        var secID = $('#tt-section1 .option');
//        secID.addClass('appear');
//    }, 100);
// });

// $('.option-age').click(function() {
// var mainSection = $('.tt-section');
// mainSection.removeClass('tt-active');
// $('#tt-section2').addClass('tt-active tt-opened');
// showStatusBar();
// setTimeout(function() {
//         var secID = $('#tt-section2 .option');
//         secID.addClass('appear');
//     }, 100);
// });
// $('.option-tone').click(function() {
// var mainSection = $('.tt-section');
// mainSection.removeClass('tt-active');
// $('#tt-section3').addClass('tt-active tt-opened');
// showStatusBar();
// setTimeout(function() {
//         var secID = $('#tt-section3 .option');
//         secID.addClass('appear');
//     }, 100);
// });
// $('.option-eye').click(function() {
// var mainSection = $('.tt-section');
// mainSection.removeClass('tt-active');
// $('#tt-section4').addClass('tt-active tt-opened');
// showStatusBar();
// });

// Custom Scroll
function customScroll() {

var ttoolHeight = jQuery('.ttool').height()-110;
jQuery('.options').mCustomScrollbar({
setHeight: ttoolHeight,
theme:"inset-2-dark",
autoDraggerLength: false
});
var ttoolHeightSC = jQuery('.ttool').height()-150;
jQuery('.scrollable-copy').mCustomScrollbar({
setHeight: ttoolHeightSC,
theme:'inset-2-dark',
autoDraggerLength: false
});
var ttoolHeightRFC = jQuery('.ttool').height()-120;
jQuery('.result-filter-copy').mCustomScrollbar({
setHeight: ttoolHeightRFC,
theme:"inset-2-dark",
autoDraggerLength: false
});
// var ttoolHeightPC = jQuery('.prod-img').height();
// jQuery('.prod-copy').mCustomScrollbar({
// setHeight: ttoolHeightPC,
// theme:"inset-2-dark",
// autoDraggerLength: false
// });
}
customScroll();

// Divide and apply width to the Result tabs navigation
// var resultTabs = $('.result-tabs'); 
// var tabPane = $('.tabs-below .tab-pane');
// var tabPaneCount = tabPane.length;
// resultTabs.children().css('width',100/tabPaneCount+'%');

// var resultFilterNav = $('.result-filter-nav li');
// var resultFilterBody = $('.result-filter-body');
// var resultFilterCopy = $('.result-filter-copy');
// jQuery('body').on('click', '.result-filter-nav li', function(){ 
// // resultFilterNav.click(function() {
// var rfId = $(this).attr('data-rf-id');
// resultFilterBody.removeClass('rf-active');
// resultFilterCopy.removeClass('rf-active');
// $('#'+rfId).addClass('rf-active');
// $('#copy-'+rfId).addClass('rf-active');
// });
// $('.result-tabs a.product-kit').click(function (e) {
// // ttProductCarousel(); 
//  	$('.tt-products-carousel').trigger('resize');
// })

});