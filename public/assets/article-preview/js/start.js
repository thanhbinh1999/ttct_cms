(function($) {
    "use strict"; // Start of use strict

    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: (target.offset().top - 54)
                }, 1000, "easeInOutExpo");
                return false;
            }
        }
    });

    // Closes responsive menu when a scroll trigger link is clicked
    $('.js-scroll-trigger').click(function() {
        $('.navbar-collapse').collapse('hide');
    });

    // Activate scrollspy to add active class to navbar items on scroll
    $('body').scrollspy({
        target: '#mainNav',
        offset: 30
    });

    // Collapse Navbar
    var navbarCollapse = function() {
        if ($("#mainNav").offset().top > 100) {
            $("#mainNav").addClass("navbar-shrink");
        } else {
            $("#mainNav").removeClass("navbar-shrink");
        }
    };
    // Collapse now if page is not at top
    navbarCollapse();
    // Collapse the navbar when page is scrolled
    $(window).scroll(navbarCollapse);
    if ($(".btn-top").length > 0) {
        $(window).scroll(function() {
            var e = $(window).scrollTop();
            if (e > 300) {
                $(".btn-top").show();
                $(".topic-bar").addClass("active");

            } else {
                $(".btn-top").hide();
                $(".topic-bar").removeClass("active");

            }
        });
        $(".btn-top").click(function() {
            $('body,html').animate({
                scrollTop: 0
            })
        });
    }

})(jQuery); // End of use strict

$(window).on("load", function() {
    $('.loading-page').fadeOut(200, function() {
        $(this).remove();
    });
});