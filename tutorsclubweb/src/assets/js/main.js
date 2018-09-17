$(document).ready(function () {

    "use strict";
 
    //BOOTSTRAP TOOLTIP
    
    $(document).ready(function(){
        $('[data-toggle="tooltip"]').tooltip(); 
    }); 

    // ACCORDION

    $('#accordion').find('.accordion-toggle').on("click", function () {

        //Expand or collapse this panel

        $(this).next().slideToggle('fast');



        //Hide the other panels

        $(".accordion-content").not($(this).next()).slideUp('fast');



    });



    // CHECKOUT MASSAGE

    $('#create-act').on("click", function () {

        $('.create-account').toggle("slow");

    });

    $('#diff-address').on("click", function () {

        $('.shipping-address').toggle("slow");

    });



    $('#direct-transfer').on("click", function () {

        $('#direct-transfer-msg').show("slow");

        $('#cheque-transfer-msg').hide();

        $('#paypal-transfer-msg').hide();

    });



    $('#cheque-transfer').on("click", function () {

        $('#cheque-transfer-msg').show("slow");

        $('#direct-transfer-msg').hide();

        $('#paypal-transfer-msg').hide();

    });



    $('#paypal-transfer').on("click", function () {

        $('#paypal-transfer-msg').show("slow");

        $('#cheque-transfer-msg').hide();

        $('#direct-transfer-msg').hide();

    });



    // CUSTOMS SELECT

    // $("select").selectBoxIt();



    // STICKY HEADER

    $("header").sticky({ topSpacing: 0 });



    // BACKTOTOP

    $(window).scroll(function () {

        if ($(this).scrollTop() > 200) {

            $("#backtotop").addClass("active");

        } else {

            $("#backtotop").removeClass("active");

        }

    });



    $('#backtotop').on("click", function () {

        $('body,html').animate({

            scrollTop: 0

        }, 2000);

        return false;

    });



    // SETTINGS PANEL

    $('.btn-settings').on('click', function () {

        $(this).parent().toggleClass('active');

    });



    $('.switch-handle').on('click', function () {

        $(this).toggleClass('active');

        $('.body').toggleClass('boxed');

    });



    $('.color-list div').on('click', function () {

        if ($(this).hasClass('active'))

            return false;

        $('link.color-scheme-link').remove();

        $(this).addClass('active').siblings().removeClass('active');

        var src = $(this).attr('data-src'),

            colorScheme = $('<link class="color-scheme-link" rel="stylesheet" />');

        colorScheme

            .attr('href', src)

            .appendTo('head');

    });



    $('.reset').on('click', function () {

        $(".bg-list div").removeClass('active');

        $(".switch-handle").removeClass('active');

        $(".color-list div").removeClass('active');

        $(".body").removeClass('boxed');

        if ($(this).hasClass('active'))

            return false;

        $('link.color-scheme-link').remove();

        var src = $(this).attr('data-src'),

            colorScheme = $('<link class="color-scheme-link" rel="stylesheet" />');

        colorScheme

            .attr('href', src)

            .appendTo('head');

    });



    $('.reset span').on('click', function () {

        $("body").removeClass("bg-shattered bg-vichy bg-random-grey-variations bg-irongrip bg-gplaypattern bg-diamond_upholstery bg-denim bg-crissXcross bg-climpek");

        $("body").addClass("bg-wood_pattern");

    });



    $('.bg-wood_pattern').on('click', function () {

        $("body").removeClass("bg-shattered bg-vichy bg-random-grey-variations bg-irongrip bg-gplaypattern bg-diamond_upholstery bg-denim bg-crissXcross bg-climpek");

        $("body").addClass("bg-wood_pattern");

    });



    $('.bg-shattered').on('click', function () {

        $("body").removeClass("bg-wood_pattern bg-vichy bg-random-grey-variations bg-irongrip bg-gplaypattern bg-diamond_upholstery bg-denim bg-crissXcross bg-climpek");

        $("body").addClass("bg-shattered");

    });



    $('.bg-vichy').on('click', function () {

        $("body").removeClass("bg-wood_pattern bg-shattered bg-random-grey-variations bg-irongrip bg-gplaypattern bg-diamond_upholstery bg-denim bg-crissXcross bg-climpek");

        $("body").addClass("bg-vichy");

    });



    $('.bg-random-grey-variations').on('click', function () {

        $("body").removeClass("bg-wood_pattern bg-shattered bg-vichy bg-irongrip bg-gplaypattern bg-diamond_upholstery bg-denim bg-crissXcross bg-climpek");

        $("body").addClass("bg-random-grey-variations");

    });



    $('.bg-irongrip').on('click', function () {

        $("body").removeClass("bg-wood_pattern bg-shattered bg-vichy bg-random-grey-variations bg-gplaypattern bg-diamond_upholstery bg-denim bg-crissXcross bg-climpek");

        $("body").addClass("bg-irongrip");

    });



    $('.bg-gplaypattern').on('click', function () {

        $("body").removeClass("bg-wood_pattern bg-shattered bg-random-grey-variations bg-irongrip bg-vichy bg-diamond_upholstery bg-denim bg-crissXcross bg-climpek");

        $("body").addClass("bg-gplaypattern");

    });



    $('.bg-diamond_upholstery').on('click', function () {

        $("body").removeClass("bg-wood_pattern bg-shattered bg-random-grey-variations bg-irongrip bg-gplaypattern bg-vichy bg-denim bg-crissXcross bg-climpek");

        $("body").addClass("bg-diamond_upholstery");

    });



    $('.bg-denim').on('click', function () {

        $("body").removeClass("bg-wood_pattern bg-shattered bg-random-grey-variations bg-irongrip bg-gplaypattern bg-diamond_upholstery bg-vichy bg-crissXcross bg-climpek");

        $("body").addClass("bg-denim");

    });



    $('.bg-crissXcross').on('click', function () {

        $("body").removeClass("bg-wood_pattern bg-shattered bg-random-grey-variations bg-irongrip bg-gplaypattern bg-diamond_upholstery bg-denim bg-vichy bg-climpek");

        $("body").addClass("bg-crissXcross");

    });



    $('.bg-climpek').on('click', function () {

        $("body").removeClass("bg-wood_pattern bg-shattered bg-vichy bg-random-grey-variations bg-irongrip bg-gplaypattern bg-diamond_upholstery bg-denim bg-crissXcross ");

        $("body").addClass("bg-climpek");

    });



    //PRICE RANGE



    // $('#slider-container').slider({

    //     range: true,

    //     min: 69,

    //     max: 199,

    //     values: [69, 199],

    //     create: function () {

    //         $("#amount").val("$69 - $199");

    //     },

    //     slide: function (event, ui) {

    //         $("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);

    //         var mi = ui.values[0];

    //         var mx = ui.values[1];

    //     }

    // })

});



//Slider Product

$(document).ready(function () {

    var sync1 = $(".sync1");

    var sync2 = $(".sync2");


    if ($(".sync1").length > 0) {
        sync1.owlCarousel({

            singleItem: true,

            slideSpeed: 1000,

            navigation: true,

            pagination: false,

            afterAction: syncPosition,

            responsiveRefreshRate: 200,

            navigationText: [

                "<i class='fa fa-chevron-left'></i>",

                "<i class='fa fa-chevron-right'></i>"

            ]

        });

    }
    if ($(".sync2").length > 0) {

        sync2.owlCarousel({

            items: 4,

            itemsDesktop: [1199, 4],

            itemsDesktopSmall: [979, 3],

            itemsTablet: [768, 3],

            itemsMobile: [479, 2],

            pagination: false,

            responsiveRefreshRate: 100,

            afterInit: function (el) {

                el.find(".owl-item").eq(0).addClass("synced");

            }

        });

    }

    function syncPosition(el) {

        var current = this.currentItem;

        $(".sync2")

            .find(".owl-item")

            .removeClass("synced")

            .eq(current)

            .addClass("synced")

        if ($(".sync2").data("owlCarousel") !== undefined) {

            center(current)

        }

    }



    $(".sync2").on("click", ".owl-item", function (e) {

        e.preventDefault();

        var number = $(this).data("owlItem");

        sync1.trigger("owl.goTo", number);

    });



    function center(number) {

        var sync2visible = sync2.data("owlCarousel").owl.visibleItems;

        var num = number;

        var found = false;

        for (var i in sync2visible) {

            if (num === sync2visible[i]) {

                var found = true;

            }

        }



        if (found === false) {

            if (num > sync2visible[sync2visible.length - 1]) {

                sync2.trigger("owl.goTo", num - sync2visible.length + 2)

            } else {

                if (num - 1 === -1) {

                    num = 0;

                }

                sync2.trigger("owl.goTo", num);

            }

        } else if (num === sync2visible[sync2visible.length - 1]) {

            sync2.trigger("owl.goTo", sync2visible[1])

        } else if (num === sync2visible[0]) {

            sync2.trigger("owl.goTo", num - 1)

        }



    }



    // prettyPhoto

    // ---------------------------------------------------------------------------------------
    if ($("a[rel^='prettyPhoto']").length > 0) {
        $("a[rel^='prettyPhoto']").prettyPhoto({

            theme: 'facebook',

            slideshow: 5000,

            autoplay_slideshow: true

        });
    }


});







// SIDEMENU

$(".nav-trigger").on("click", function () {

    $(".side-menu").toggleClass("sm-show");

    $("body").toggleClass("sm-hide-body");

});



// FEATURED PRODUCTS

$(window).on("load", function () {

    "use strict";

    //    $('.modal.fade.in #popup-product').royalSlider("updateSliderSize", true);

    /* Loading Script */

    $('#loader').fadeOut("slow");



    // Isotope

    var $container = $('#isotope');

    // $container.isotope({

    //     itemSelector: '.isotope-item'

    // });

    var $optionSets = $('.filter'),

        $optionLinks = $optionSets.find('a');

    $optionLinks.click(function () {

        var $this = $(this);

        if ($this.hasClass('selected')) {

            return false;

        }

        var $optionSet = $this.parents('.filter');

        $optionSet.find('.selected').removeClass('selected');

        $this.addClass('selected');

        var options = {},

            key = $optionSet.attr('data-option-key'),

            value = $this.attr('data-option-value');

        value = value === 'false' ? false : value;

        options[key] = value;

        if (key === 'layoutMode' && typeof changeLayoutMode === 'function') {

            changeLayoutMode($this, options);

        } else {

            $container.isotope(options);

        }

        return false;

    });

});