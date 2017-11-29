(function( global, $ ) {

    "use strict";

    /*************************************************
    * PRIVATE
    *************************************************/

    // ----- VARS ----- //
    var isReady;
    var exampleModules;


    // ----- CONSTANTS ----- //
    var STYLE_HIDDEN = "hidden";


    // ----- GET/SET FUNCTIONS ----- //


    // ----- FUNCTIONS ----- //
    function init() {
        console.log( "init" );

        initExampleModule();
        //initScrollTo();
        //initCarouselModules();
    }

    function initExampleModule() {
        console.log( "initExampleModule" );

        exampleModules = {};

        if ( $( ".example-module" ).length > 0 ) {

            $( ".example-module" ).each( function( index, el ) {

                exampleModules[ index ] = 'example';

            } );

        }

    }

    /*function initScrollTo() {
        console.log( "initScrollTo" );

        $( "#global" ).scroll( function ( ) {
            if ( $( "#global" ).scrollTop() >= 1) {
                $( "body" ).addClass( "scrolled" );
            } else {
                $( "body" ).removeClass( "scrolled" );
            }
        });

    }*/


    /*function initCarouselModules() {
        console.log( "initCarouselModules" );

        carouselModules = {};

        if ( $( ".carousel-module" ).length > 0 ) {

            $( ".carousel-module" ).each( function( index, el ) {

                carouselModules[ index ] = {};

                carouselModules[ index ][ 'defaultSwiper' ] = $( ".default-swiper", el ).swiper( {
                    centeredSlides: true,
                    nextButton: $( ".swiper-button-next", el ),
                    prevButton: $( ".swiper-button-prev", el ),
                    spaceBetween: $( ".default-swiper", el ).data( "space-between" ),
                    slidesPerView: $( ".default-swiper", el ).data( "slides-per-view-default" ),
                    breakpoints: {
                        768: {
                          slidesPerView: $( ".default-swiper", el ).data( "slides-per-view-xs" )
                        },
                        992: {
                          slidesPerView: $( ".default-swiper", el ).data( "slides-per-view-sm" )
                        },
                        1200: {
                          slidesPerView: $( ".default-swiper", el ).data( "slides-per-view-md" )
                        }
                    },
                    loop: ( ( $( ".swiper-slide", el ).length > 1 ) ? true : false ),
                    autoplay: ( ( $( ".swiper-slide", el ).length > 1 ) ? 9000 : 0 ),
                    autoplayDisableOnInteraction: false
                } );

            } );

        }

    }*/

    // ----- EVENT LISTENERS ----- //

    function onReady( e ) {
        console.log( "onReady" );

        isReady = true;

        init();
    }

    /*************************************************
    * PUBLIC
    *************************************************/

    // ----- OBJECT ----- //
    var main = {

        // ----- VARS ----- //

        // ----- CONSTANTS ----- //

        // ----- GET/SET FUNCTIONS ----- //

        // ----- FUNCTIONS ----- //

        // ----- EVENT LISTENERS ----- //


    };

    // ----- GLOBAL ----- //
    //global.main = main;


    /*************************************************
    * CALL
    *************************************************/

    $( document ).ready( onReady );


})( this, jQuery );
