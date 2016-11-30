$(document).ready(function() {

    $(".slider_top .slider__item, .slider_top .slider__img").css('height', document.documentElement.clientHeight);

    if (document.body.clientWidth < 768) {
        $(".banner, .banner__img").css('height', document.documentElement.clientHeight);
    }

    // main page



    if ($('.fancybox').length) {
        $('.fancybox').fancybox();
    }



    // isMobile

    var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };

    // main slider

    $('.slider__wrap').slick({
        // autoplay: true,
        // dots: true,
        arrows: true,
        slidesToShow: 1,
        // autoplaySpeed: 3000,
        nextArrow: '<div class="slider__btn _prev"></div>',
        prevArrow: '<div class="slider__btn _next"></div>'
    });


    // menu



    if (!isMobile.any()) {


    } else {



    }





    if (document.body.clientWidth > 767) {

        $('.menu__main > li').hover(function() {
            $(this).addClass('opened');
        }, function() {
            $(this).removeClass('opened');
        });

        $('.menu__sub > li').hover(function() {
            $(this).addClass('active');
        }, function() {
            $(this).removeClass('active');
        });

        if (isMobile.any()) {

            $('a.drop,a.nested').on('click', function(e) {
                e.preventDefault();
                var that = $(this);
                $('a.drop,a.nested').not(that).removeClass('onHover');
                var linkHref = that.attr('href');
                if (linkHref && that.hasClass('onHover')) {
                    location.href = linkHref;
                    return false;
                }
                that.toggleClass('onHover');
            });

        }

        // advice btn 

        $('.h-advice,.map__callback').fancybox();

    } else {

        $('.h-advice__icon').on('click', function() {
            $('#advice').slideToggle();
            $('.overlay_advice').toggle();
        });

        $(document).click(function(e) {
            if (!$(e.target).is(".h-advice__icon") && !$(e.target).is("#advice *")) {
                $('#advice').slideUp();
                $('.overlay_advice').hide();
            };
        });

        // phone btn

        $('.h-phone__icon').on('click', function() {
            $('.h-phone__list').slideToggle();
            $('.overlay_phone').toggle();
        });

        $(document).click(function(e) {
            if (!$(e.target).is(".h-phone__icon") && !$(e.target).is(".h-phone__list *")) {
                $('.h-phone__list').slideUp();
                $('.overlay_phone').hide();
            };
        });

        if (isMobile.any()) {

            $('.menu__arrow').on('click', function(e) {
                $('.menu__main li').not($(this).parent()).removeClass('opened');
                $(this).parent().toggleClass('opened');
                if ($(this).parent().find('ul').length > 0) {
                    return false;
                }
            });

            $('.submenu__arrow').on('click', function(e) {
                $('.menu__sub li').not($(this).parent()).removeClass('active');
                $(this).parent().toggleClass('active');
                if ($(this).parent().find('ul').length > 0) {
                    return false;
                }
            });
        }

    }


    // toggle btn


    $('.toggle').on('click', function(e) {
        $('.sidebar,.toggle').toggleClass('active');
        $('.overlay_menu').toggle();
    });

    $(document).click(function(e) {
        if (!$(e.target).is(".toggle *") && !$(e.target).is(".sidebar *")) {
            $('.sidebar,.toggle').removeClass('active');
            $('.overlay_menu').hide();
        };
    });








    // back-top


    $('#back-top').click(function() {
        $('body,html').animate({
            scrollTop: 0
        }, 500);
        return false;
    });

    // tabs

    $(".about .tabs__item").hide().eq(0).show();
    $(".about .tabs__btn").click(function() {
        if (!$(this).hasClass("active")) {
            $(".about .tabs__btn").removeClass("active").eq($(this).index()).addClass("active");
            $(".about .tabs__item").hide().eq($(this).index()).fadeIn();
        }
    }).eq(0).addClass("active");

    // persona slider

    $('.persona__wrap').slick({
        // autoplay: true,
        // dots: true,
        arrows: true,
        slidesToShow: 3,
        // autoplaySpeed: 3000,
        nextArrow: '<div class="slider__btn _prev"></div>',
        prevArrow: '<div class="slider__btn _next"></div>',
        responsive: [{
            breakpoint: 768,
            settings: {
                slidesToShow: 2
            }
        }, {
            breakpoint: 480,
            settings: {
                slidesToShow: 1
            }
        }]



    });

    // back-top scroll

    function choiseVisibility($scrollToTop) {
        $(document).scrollTop() > 600 ? $scrollToTop.show(100) : $scrollToTop.hide(100);
    }

    function scroll_position() {
        var $scrollToTop = $('#back-top');
        if ($scrollToTop.length) {
            choiseVisibility($scrollToTop);
            $(window).on('scroll', function() {
                choiseVisibility($scrollToTop);
            });
            $scrollToTop.on('click', function() {
                $('html, body').animate({ scrollTop: 0 }, 500);
            });
        }
    }
    scroll_position();

    // header scroll

    $(window).scroll(function() {
        if ($(window).scrollTop() > 0) {
            $('.header').addClass('fix');
        } else {
            $('.header').removeClass('fix');
        }
    });

    // form validate

    $('form button[type=submit]').click(function() {
        var er = 0;
        var form = $(this).parents('form');
        $(".err-text").remove();
        $.each(form.find('.req'), function(index, val) {
            if ($(this).attr('name') == 'email' || $(this).hasClass('email')) {
                if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test($(this).val()))) {
                    er++;
                    $(this).addClass('err');
                    $(this).parent().append('<span class="err-text">введите правильно e-mail!</span>');
                } else {
                    $(this).removeClass('err');
                    $(this).parent().children(".err-text").remove();
                }
            } else {
                if ($(this).val() == '' || $(this).val() == $(this).attr('data-value')) {
                    er++;
                    if ($(this).parents('.select').length > 0) {
                        $(this).parents('.select').addClass('err');
                        $(this).parent().append('<span class="err-text">заполните поле!</span>');
                    } else {
                        $(this).addClass('err');
                        $(this).parent().append('<span class="err-text">заполните поле!</span>');
                    }
                } else {
                    if ($(this).parents('.select').length > 0) {
                        $(this).parents('.select').removeClass('err');
                        $(this).parent().children(".err-text").remove();
                    } else {
                        $(this).removeClass('err');
                        $(this).parent().children(".err-text").remove();
                    }

                }
            }
        });
        if (er == 0) {

        } else {
            return false;
        }
    });

    $('form input, form textarea').focus(function() {
        $(this).removeClass('err');
        $(this).parent().children(".err-text").remove();
        $(this).addClass('active');
    });

    $('form input, form textarea').blur(function() {
        if ($(this).val() === '') {
            $(this).removeClass('active');
        }
    });


    // Maps------------------------------------------------------------------------------

    function map() {
        var myLatlng = new google.maps.LatLng(56.800878, 30.1293792);
        // if ($(window).width() <= '767') {
        //   myLatlng = new google.maps.LatLng(52.066000, 31.008594);
        // } else if ($(window).width() <= '1100' && $(window).width() >= '768') {
        //   myLatlng = new google.maps.LatLng(54.4788532, 40.9589848);
        // } else if ($(window).width() <= '1600' && $(window).width() >= '1101') {
        //   myLatlng = new google.maps.LatLng(55.7271098, 40.9589848);
        // }
        var zoom = 5;
        if (document.body.clientWidth < 768) {
            zoom = 4;
        }

        var posBLR = new google.maps.LatLng(53.926826, 27.589426);
        var posLV = new google.maps.LatLng(56.955705, 24.122132);
        var posRUS = new google.maps.LatLng(55.72711, 37.59833);

        var mapOptions = {
            zoom: zoom,
            center: myLatlng,
            scrollwheel: false
        }

        var map = new google.maps.Map(document.getElementById('map'), mapOptions);

        var imageMarker = 'images/marker.png';

        var contentStringBLR = '<figure class="map__item"><div class="map__img"><img src="images/marker-img.png"alt=""></div><figcaption class="map__info"><div class="map__title">Адрес:</div><div class="map__text">г. Минск,ул. Сурганова 43,офис 804</div><div class="map__metro"><i></i>Академия наук</div><div class="map__title">Контакты:</div><div class="map__number">+375 (17) 292-14-94</div><a href="#advice"class="map__callback">Заказать обратный звонок</a></figcaption></figure>';
        var infowindowBLR = new google.maps.InfoWindow({
            content: contentStringBLR
        });


        var markerBLR = new google.maps.Marker({
            position: posBLR,
            map: map,
            title: 'Беларусь, г.Минск, ул.Сурганова 43-804',
            icon: imageMarker
        });

        markerBLR.addListener('click', function() {
            map.setZoom(12);
            map.setCenter(markerBLR.position);
            infowindowBLR.open(map, markerBLR);
        });

        var markerLV = new google.maps.Marker({
            position: posLV,
            map: map,
            title: 'Латвия, г.Рига, ул.Лачплеша 14-305',
            icon: imageMarker
        });

        markerLV.addListener('click', function() {
            map.setZoom(12);
            map.setCenter(markerLV.position);
        });

        var markerRU = new google.maps.Marker({
            position: posRUS,
            map: map,
            title: 'Россия, г.Москва',
            icon: imageMarker
        });

        markerRU.addListener('click', function() {
            map.setZoom(12);
            map.setCenter(markerRU.position);
        });

        var styles = [{ "featureType": "administrative.locality", "elementType": "all", "stylers": [{ "hue": "#2c2e33" }, { "saturation": 7 }, { "lightness": 19 }, { "visibility": "on" }] }, { "featureType": "landscape", "elementType": "all", "stylers": [{ "hue": "#ffffff" }, { "saturation": -100 }, { "lightness": 100 }, { "visibility": "simplified" }] }, { "featureType": "poi", "elementType": "all", "stylers": [{ "hue": "#ffffff" }, { "saturation": -100 }, { "lightness": 100 }, { "visibility": "off" }] }, { "featureType": "road", "elementType": "geometry", "stylers": [{ "hue": "#bbc0c4" }, { "saturation": -93 }, { "lightness": 31 }, { "visibility": "simplified" }] }, { "featureType": "road", "elementType": "labels", "stylers": [{ "hue": "#bbc0c4" }, { "saturation": -93 }, { "lightness": 31 }, { "visibility": "on" }] }, { "featureType": "road.arterial", "elementType": "labels", "stylers": [{ "hue": "#bbc0c4" }, { "saturation": -93 }, { "lightness": -2 }, { "visibility": "simplified" }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "hue": "#e9ebed" }, { "saturation": -90 }, { "lightness": -8 }, { "visibility": "simplified" }] }, { "featureType": "transit", "elementType": "all", "stylers": [{ "hue": "#e9ebed" }, { "saturation": 10 }, { "lightness": 69 }, { "visibility": "on" }] }, { "featureType": "water", "elementType": "all", "stylers": [{ "hue": "#e9ebed" }, { "saturation": -78 }, { "lightness": 67 }, { "visibility": "simplified" }] }];

        map.setOptions({ styles: styles });

    };

    if ($('#map').length) {
        // map();
    }




    function mapGeo() {

        function initMap() {

            var styles = [{ "featureType": "administrative.locality", "elementType": "all", "stylers": [{ "hue": "#2c2e33" }, { "saturation": 7 }, { "lightness": 19 }, { "visibility": "on" }] }, { "featureType": "landscape", "elementType": "all", "stylers": [{ "hue": "#ffffff" }, { "saturation": -100 }, { "lightness": 100 }, { "visibility": "simplified" }] }, { "featureType": "poi", "elementType": "all", "stylers": [{ "hue": "#ffffff" }, { "saturation": -100 }, { "lightness": 100 }, { "visibility": "off" }] }, { "featureType": "road", "elementType": "geometry", "stylers": [{ "hue": "#bbc0c4" }, { "saturation": -93 }, { "lightness": 31 }, { "visibility": "simplified" }] }, { "featureType": "road", "elementType": "labels", "stylers": [{ "hue": "#bbc0c4" }, { "saturation": -93 }, { "lightness": 31 }, { "visibility": "on" }] }, { "featureType": "road.arterial", "elementType": "labels", "stylers": [{ "hue": "#bbc0c4" }, { "saturation": -93 }, { "lightness": -2 }, { "visibility": "simplified" }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "hue": "#e9ebed" }, { "saturation": -90 }, { "lightness": -8 }, { "visibility": "simplified" }] }, { "featureType": "transit", "elementType": "all", "stylers": [{ "hue": "#e9ebed" }, { "saturation": 10 }, { "lightness": 69 }, { "visibility": "on" }] }, { "featureType": "water", "elementType": "all", "stylers": [{ "hue": "#e9ebed" }, { "saturation": -78 }, { "lightness": 67 }, { "visibility": "simplified" }] }];

            var myLatlng = new google.maps.LatLng(56.800878, 30.1293792);
            var zoom = 5;
            if (document.body.clientWidth < 768) {
                zoom = 4;
            }

            var mapOptions = {
                zoom: zoom,
                center: myLatlng,
                scrollwheel: false,
                styles: styles
            }
            if ($('#mapGeo').length) {

              var map = new google.maps.Map(document.getElementById('mapGeo'), mapOptions);

              setMarkers(map);

            }

            var mapFooter = new google.maps.Map(document.getElementById('map'), mapOptions);

            setMarkers(mapFooter);
        }

        var offices = [
            ['Беларусь, г.Минск, ул.Сурганова 43-804', 53.926826, 27.589426, 3, '<figure class="map__item"><div class="map__img"><img src="images/marker-img.png"alt=""></div><figcaption class="map__info"><div class="map__title">Адрес:</div><div class="map__text">г. Минск,ул. Сурганова 43,офис 804</div><div class="map__metro"><i></i>Академия наук</div><div class="map__title">Контакты:</div><div class="map__number">+375 (17) 292-14-94</div><a href="#advice"class="map__callback">Заказать обратный звонок</a></figcaption></figure>'],
            ['Латвия, г.Рига, ул.Лачплеша 14-305', 56.955705, 24.122132, 2, 'Латвия, г.Рига, ул.Лачплеша 14-305'],
            ['Россия, г.Москва', 55.72711, 37.59833, 1, 'Россия, г.Москва']
        ];

        function setMarkers(map) {

            var image = {
                url: 'images/marker.png',
            };

            for (var i = 0; i < offices.length; i++) {
                let office = offices[i];
                let marker = new google.maps.Marker({
                    position: { lat: office[1], lng: office[2] },
                    map: map,
                    icon: image,
                    title: office[0],
                    zIndex: office[3]
                });


                let infowindow = new google.maps.InfoWindow({
                    content: office[4]
                });

                marker.addListener('click', function() {
                    map.setZoom(12);
                    map.setCenter(marker.position);
                    infowindow.open(map, marker);
                });

            }
        }
        initMap();
    };

    // if ($('#mapGeo').length) {
        mapGeo();
    // }

    // other page    

    // .projects sort

    if ($('.projects__wrap').length) {

        var $projects = $(".projects__wrap");
        $projects.imagesLoaded(function() {
            $projects.masonry({
                itemSelector: ".projects__item",
                columnWidth: ".projects__sizer",
                percentPosition: true
            });
        });

        $('.sort__btn').on('click', function() {

            if (!$(this).hasClass('active')) {
                $('.sort__btn').removeClass('active');
                $(this).toggleClass('active');
                $('.projects__item').show();
                var filter = $(this).data('filter')
                $('.projects__item').not(filter).hide();
                $projects.masonry('layout');
            }

        })

        $('.projects__btn .btn').on('click', function() {
            $('.projects__item').show();
            $projects.masonry('layout');
        })


    }

    //news page

    if ($('.news__content').length) {

        $('.news__btn .btn').on('click', function() {
            $('.three.columns').slideDown();
        });
    }

    //shop page

    if ($('.item__btn .btn').length) {
        $('.item__btn .btn').on("click", function() {
            $(this).parents('.item__wrap').find('.item__answer').slideToggle();
        });
    }

    //seo page

    if ($('.seo-result').length) {
        $('.tabs__more').on("click", function() {
            $(this).prev().slideToggle();
            $(this).prev().toggleClass('opened');
            if ($(this).prev().hasClass('opened')) {
                $(this).children().text('Скрыть дополнительную статистику')
            } else {
                $(this).children().text('Показать еще статистику')
            }

        });

        $(".seo-result .tabs__item").hide().eq(0).show();
        $(".seo-result .tabs__btn").click(function() {
            if (!$(this).hasClass("active")) {
                $(".seo-result .tabs__btn").removeClass("active").eq($(this).index()).addClass("active");
                $(".seo-result .tabs__item").hide().eq($(this).index()).fadeIn();
            }
        }).eq(0).addClass("active");

        function tabsNav(dir) {
            var tab = $('.tabs__btn');
            var tabContent = $('.tabs__item');
            var tabsPos = $('.tabs__btn.active').index();
            tabsPos += dir;

            if (tabsPos < 0) {
                tabsPos = $('.tabs__btn').length - 1;
            } else if (tabsPos > $('.tabs__btn').length - 1) {
                tabsPos = 0;
            }

            $('.tabs__btn.active').removeClass('active');
            $('.tabs__btn').eq(tabsPos).addClass('active');
            $('.tabs__item').fadeOut('');
            $('.tabs__item').eq(tabsPos).fadeIn('');

        }

        $('.tabs__arrow.next').on('click', function() {
            tabsNav(1);
        });

        $('.tabs__arrow.prev').on('click', function() {
            tabsNav(-1);
        });

    }

});

$(window).load(function() {

    function sameHeight(elem) {
        var heightBlock = 0;
        var that = elem;
        if (that.length) {

            that.each(function() {
                if ($(this).height() > heightBlock) {
                    heightBlock = $(this).height();
                }
            });
            that.each(function() {
                $(this).height(heightBlock);
            });
        }

    }




    if (document.body.clientWidth > 767) {

        // sameHeight($('.working__info'));
    }




});
