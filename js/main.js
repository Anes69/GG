/*
  [JS Index]
*/


/* 
  1. preloader
  2. swiper slider
  3. page scroll
  3. navigation
  4. on scroll animation
  5. owl carousel slider
  6. magnificPopup
  7. to top animation
  8. chart skills
  9. clone function
  10. toggle blog panels
  11. google maps zoom ON/OFF
  12. contact form
*/


$(function () {
    "use strict";


    // 1. preloader
    $(window).on("load", function () {
        // 1. preloader
        $("#preloader").fadeOut(600);
        $(".preloader-bg").delay(400).fadeOut(600);
    });

    // 2. swiper slider
    var swiper1 = new Swiper(".swiper-container-wrapper .swiper-container.swiper1", {
        preloadImages: false,
        autoplay: false,
        init: true,
        loop: false,
        speed: 1200,
        grabCursor: true,
        mousewheel: true,
        keyboard: true,
        simulateTouch: true,
        parallax: true,
        effect: "slide",
        pagination: false,
        navigation: {
            nextEl: ".slide-next",
            prevEl: ".slide-prev"
        },
        scrollbar: false
    });
    swiper1.on("slideChangeTransitionStart", function () {
        $(".hero-bg").find("video").each(function () {
            this.pause();
        });
    });
    swiper1.on("slideChangeTransitionEnd", function () {
        $(".hero-bg").find("video").each(function () {
            this.play();
        });
    });
    //
    var swiper2 = new Swiper(".swiper-container-wrapper .swiper-container.swiper2", {
        preloadImages: false,
        autoplay: false,
        init: true,
        loop: false,
        grabCursor: false,
        mousewheel: false,
        keyboard: false,
        simulateTouch: false,
        parallax: true,
        pagination: false,
        navigation: false
    });

    // 3. navigation
    $(".navbar-collapse ul li a.nav-close").on("click", function () {
        $(".navbar-toggle:visible").click();
    });
    // navigation dropdown
    $(".dropdown-toggle").on("click", function (e) {
        if ($(document).width() > 768) {
            e.preventDefault();
            var url = $(this).attr('href');
            if (url !== '#') {
                window.location.href = url;
            }
        }
    });

    $(window).on("scroll", function () {
        if ($(".navbar").offset().top > 50) {
            $(".navbar-bg-switch").addClass("main-navigation-bg");
            $(".dropdown-menu").addClass("dropdown-menu-switch-color");
        } else {
            $(".navbar-bg-switch").removeClass("main-navigation-bg");
            $(".dropdown-menu").removeClass("dropdown-menu-switch-color");
        }

        // 4. on scroll animation
        if ($(this).scrollTop() > 50) {
            $(".to-top-arrow").addClass("show");
            $(".blog-side-launcher").addClass("blog-side-launcher-color");
        } else {
            $(".to-top-arrow").removeClass("show");
            $(".blog-side-launcher").removeClass("blog-side-launcher-color");
        }
    });

    // 5. owl carousel slider
    $("#owl-carousel-team").owlCarousel({
        loop: false,
        center: false,
        autoplay: false,
        autoplaySpeed: 1000,
        autoplayTimeout: 5000,
        smartSpeed: 450,
        nav: false,
        nav: true,
        navText: ["<i class='ion-chevron-left'></i>", "<i class='ion-chevron-right'></i>"],
        navContainer: '.owl-nav-custom-team',
        responsive: {
            0: {
                items: 1,
                margin: 20
            },
            768: {
                items: 2,
                margin: 25
            },
            980: {
                items: 2,
                margin: 35
            },
            1240: {
                items: 3,
                margin: 50
            }
        }
    });

    // 6. magnificPopup
    $(".popup-photo-gallery").each(function () {
        $(this).magnificPopup({
            delegate: "a",
            type: "image",
            gallery: {
                enabled: true
            },
            removalDelay: 100,
            mainClass: "mfp-fade",
            fixedContentPos: false
        });
    });

    // 7. to top animation
    $(".to-top-arrow").on("click", function () {
        $("body, html").animate({
            scrollTop: 0
        }, 1000);
        return false
    })

    // 8. chart skills
    $(".chart-appear-skills").appear(function () {
        $(".chart-skills").easyPieChart({
            easing: "easeOutBounce",
            onStep: function (from, to, percent) {
                $(this.el).find(".percent-skills").text(Math.round(percent));
            }
        });
    });

    // 9. clone function
    $.fn.duplicate = function (count, cloneEvents, callback) {
        var stack = [],
            el;
        while (count--) {
            el = this.clone(cloneEvents);
            callback && callback.call(el);
            stack.push(el.get()[0]);
        }
        return this.pushStack(stack);
    };
    $("<div class='vertical-lines-wrapper'></div>").appendTo(".vertical-lines");
    $("<div class='vertical-effect'></div>").duplicate(3).appendTo(".vertical-lines-wrapper");

    // 10. toggle blog panels
    $(".blog-side-launcher").on("click", function () {
        var divClass = $(this).attr("data-id");
        if ($(this).hasClass("open")) {
            $(this).removeClass("open");
            $("." + divClass).addClass("open");
        } else {
            $(this).addClass("open");
            $("." + divClass).addClass("open");
        }
    });
    $(".blog-side-launch, .blog-side-text").on("click", function () {
        $(".panel-from-left-blog, .panel-overlay-from-right-blog").removeClass("open");
    });

    // 11. google maps zoom ON/OFF
    $(".google-maps").on("click", function () {
        $('.google-maps iframe').css("pointer-events", "auto");
    });
    $(".google-maps").on("mouseleave", function () {
        $('.google-maps iframe').css("pointer-events", "none");
    });

    // 12. contact form
    $("form#form").on("submit", function () {
        $("form#form .error").remove();
        var s = !1;
        if ($(".requiredField").each(function () {
            if ("" === jQuery.trim($(this).val())) $(this).prev("label").text(), $(this).parent().append('<span class="error">This field is required</span>'), $(this).addClass(
                "inputError"), s = !0;
            else if ($(this).hasClass("email")) {
                var r = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                r.test(jQuery.trim($(this).val())) || ($(this).prev("label").text(), $(this).parent().append('<span class="error">Invalid email address</span>'), $(this).addClass(
                    "inputError"), s = !0);
            }
        }), !s) {
            $("form#form input.submit").fadeOut("normal", function () {
                $(this).parent().append("");
            });
            var r = $(this).serialize();
            $.post($(this).attr("action"), r, function () {
                $("form#form").slideUp("fast", function () {
                    $(this).before('<div class="success">Your email was sent successfully.</div>');
                });
            });
        }
        return !1;
    });


});