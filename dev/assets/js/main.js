$(document).ready(function() {

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


    // main

    $('.main-banner__list').slick({
        dots: true,
        arrows: false,
        slidesToShow: 1,
        // autoplay: true,
        // autoplaySpeed: 3000,
    });

    $('.select').easyDropDown();



    $('.tour__counter-minus').on('click', function() {
        var num = +$(this).next().text();
        if (num !== 1) {
            $(this).next().text(num - 1);
        }

    });

    $('.tour__counter-plus').on('click', function() {
        var num = +$(this).prev().text();
        $(this).prev().text(num + 1);
    });

    function map() {

        function initMap() {

            var styles = [{ "featureType": "administrative.locality", "elementType": "all", "stylers": [{ "hue": "#2c2e33" }, { "saturation": 7 }, { "lightness": 19 }, { "visibility": "on" }] }, { "featureType": "landscape", "elementType": "all", "stylers": [{ "hue": "#ffffff" }, { "saturation": -100 }, { "lightness": 100 }, { "visibility": "simplified" }] }, { "featureType": "poi", "elementType": "all", "stylers": [{ "hue": "#ffffff" }, { "saturation": -100 }, { "lightness": 100 }, { "visibility": "off" }] }, { "featureType": "road", "elementType": "geometry", "stylers": [{ "hue": "#bbc0c4" }, { "saturation": -93 }, { "lightness": 31 }, { "visibility": "simplified" }] }, { "featureType": "road", "elementType": "labels", "stylers": [{ "hue": "#bbc0c4" }, { "saturation": -93 }, { "lightness": 31 }, { "visibility": "on" }] }, { "featureType": "road.arterial", "elementType": "labels", "stylers": [{ "hue": "#bbc0c4" }, { "saturation": -93 }, { "lightness": -2 }, { "visibility": "simplified" }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "hue": "#e9ebed" }, { "saturation": -90 }, { "lightness": -8 }, { "visibility": "simplified" }] }, { "featureType": "transit", "elementType": "all", "stylers": [{ "hue": "#e9ebed" }, { "saturation": 10 }, { "lightness": 69 }, { "visibility": "on" }] }, { "featureType": "water", "elementType": "all", "stylers": [{ "hue": "#e9ebed" }, { "saturation": -78 }, { "lightness": 67 }, { "visibility": "simplified" }] }];

            var myLatlng = new google.maps.LatLng(48.800878, 30.1293792);
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

            if ($('#map').length) {

                var map = new google.maps.Map(document.getElementById('map'), mapOptions);

                setClients(map);
            }

            if ($('#mapResort').length) {

                var resortOptions = {
                    zoom: 7,
                    center: new google.maps.LatLng(53.388265, 27.5114586),
                    scrollwheel: false,
                    styles: styles
                }

                var mapResort = new google.maps.Map(document.getElementById('mapResort'), resortOptions);

                var markerResort = new google.maps.Marker({
                    position: { lat: 52.9591349, lng: 27.5368237 },
                    map: mapResort,
                    icon: 'images/marker-resort-blue.png',
                    title: 'Случь',
                });

            }



        }

        var clients = [
            ['Cronulla Beach', 51.926826, 25.589426, 3],
            ['Manly Beach', 54.955705, 22.122132, 2],
            ['Maroubra Beach', 53.72711, 35.59833, 1]
        ];

        function setClients(map) {

            var image = {
                url: 'images/marker-resort.png',
            };

            var _setClientsLoop = function _setClientsLoop() {
                var client = clients[i];
                var marker = new google.maps.Marker({
                    position: { lat: client[1], lng: client[2] },
                    map: map,
                    icon: image,
                    title: client[0],
                    // zIndex: client[3]
                });
            };

            for (var i = 0; i < clients.length; i++) {
                _setClientsLoop();
            }
        }


        initMap();
    };

    map();


    if (document.body.clientWidth < 1200) {
        $('.main-hot__wrap .row').slick({
            dots: true,
            arrows: false,
            slidesToShow: 2,
            // autoplay: true,
            // autoplaySpeed: 3000,
            responsive: [{
                breakpoint: 620,
                settings: {
                    slidesToShow: 1,
                }
            }, ]


        });
        $('.menu__item').on('click', function(e) {
            if ($(this).children('.sub-menu').length) {
                e.preventDefault();
                $(this).toggleClass('active');
                $(this).children('.sub-menu').slideToggle();
            } else {
                $(this).addClass('active');
            }

        })


    } else {
        $('.menu__item').hover(function() {
            $(this).addClass('active');
            $(this).children('.sub-menu').stop(true, true).slideDown();
        }, function() {
            $(this).removeClass('active');
            $(this).children('.sub-menu').stop(true, true).slideUp();
        });
    }

    // menu mobile

    $('.toggle').on('click', function(e) {
        e.stopPropagation();
        $('.header-menu,.header-menu__close').addClass('active');
        $('.overlay_menu').show();
    })

    $('.menu__title').on('click', function() {
        $('.header-menu,.header-menu__close').removeClass('active');
        $('.overlay_menu').hide();
    })



    // contact mobile

    $('.header-phones__mobile').on('click', function(e) {
        $('.header-top__wrap,.header-phones__close').addClass('active');
        $('.overlay_phones').show();
    })

    $('.header-phones__title').on('click', function() {
        $('.header-top__wrap,.header-phones__close').removeClass('active');
        $('.overlay_phones').hide();
    })

    // search mobile

    $('.header-search__mobile').on('click', function(e) {
        $('.header-search').slideDown();
        $('.overlay_search').show();
    })

    $('.header-search__close').on('click', function(e) {
        $('.header-search').slideUp();
        $('.overlay_search').hide();
    })

    // header scroll

    var menuOffsetTop = $('.header-bottom').offset().top;

    $(window).scroll(function() {
        if ($(window).scrollTop() > menuOffsetTop) {
            $('.header-bottom').addClass('fix');
        } else {
            $('.header-bottom').removeClass('fix');
        }
    });







    if (document.body.clientWidth < 768) {

        $(document).click(function(e) {

            if (!$(e.target).is(".header-menu *") && !$(e.target).is(".header-menu") && !$(e.target).is(".toggle")) {
                $('.header-menu,.header-menu__close').removeClass('active');
                $('.overlay_menu').hide();
            };

            if (!$(e.target).is(".header-search *") && !$(e.target).is(".header-search") && !$(e.target).is(".header-search__mobile")) {
                $('.header-search').slideUp();
                $('.overlay_search').hide();
            };

            if (!$(e.target).is(".header-top__wrap *") && !$(e.target).is(".header-top__wrap") && !$(e.target).is(".header-phones__mobile")) {
                $('.header-top__wrap,.header-phones__close').removeClass('active');
                $('.overlay_phones').hide();
            };

            if (!$(e.target).is(".navigation__btn,.navigation__menu,.navigation__menu *")) {
                $('.navigation__btn').removeClass('active');
                $('.navigation__menu,.navigation__overlay').hide();
            };


        });

        // filter toggle

        if ($('.b-filter').hasClass("b-filter_internal")) {

            $('.b-filter__close-btn').on('click', function() {
                $('.b-filter_internal').slideUp();
            })

        } else {

            $('.b-filter__title').on('click', function() {
                $('.b-filter__wrap').slideToggle();
                $(this).toggleClass('active');
            })

            $('.b-filter__close-btn').on('click', function() {
                $('.b-filter__wrap').slideUp();
                $('.b-filter__title').removeClass('active');
            })

        }

        // navigation toggle

        $('.navigation__btn').on('click', function() {
            $('.navigation__menu,.navigation__overlay').fadeToggle();
            $(this).toggleClass('active');
        })



        // news slider

        $('.main-news__wrap .nine .row').slick({
            dots: true,
            arrows: false,
            slidesToShow: 2,
            // infinite: true,
            // autoplay: true,
            // autoplaySpeed: 3000,
            responsive: [{
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                }
            }, ]
        });

        // news slider resort

        $('.resort-about__news .row').slick({
            dots: true,
            arrows: false,
            slidesToShow: 2,
            // infinite: true,
            // autoplay: true,
            // autoplaySpeed: 3000,
            responsive: [{
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                }
            }, ]
        });


        $('.main-resort__wrap .row').slick({
            dots: true,
            arrows: false,
            slidesToShow: 2,
            // infinite: true,
            // autoplay: true,
            // autoplaySpeed: 3000,
            responsive: [{
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                }
            }]


        });

        $('.footer__list .footer__title').on('click', function() {
            $(this).toggleClass('active');
            $(this).next().slideToggle();
        })



    }

    // filter internal toggle

    $('.banner__filter span').on('click', function() {
        $('.b-filter').slideToggle();
    })

    // resort

    $('.resort-room__images').slick({
        dots: false,
        arrows: true,
        slidesToShow: 1,
        // infinite: true,
        // autoplay: true,
        // autoplaySpeed: 3000,
    });

    $('.resort-room__list').slick({
        dots: true,
        arrows: false,
        slidesToShow: 1,
        // infinite: true,
        // autoplay: true,
        // autoplaySpeed: 3000,
    });


    // form validate

    $('form [type=submit]').click(function() {
        console.log(1);
        var er = 0;
        var form = $(this).parents('form');
        $(".err-text").remove();
        $.each(form.find('.req'), function(index, val) {
            if ($(this).attr('type') == 'email' || $(this).hasClass('email')) {
                if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test($(this).val()))) {
                    er++;
                    $(this).addClass('err');
                    $(this).parent().append('<span class="err-text">введите правильно e-mail!</span>');
                } else {
                    $(this).removeClass('err');
                    $(this).parent().children(".err-text").remove();
                }
            } else {
                if ($(this).val() == '') {
                    er++;
                    if ($(this).hasClass('select')) {
                        $(this).parents('.dropdown').addClass('err');
                        $(this).parents('.form__block').append('<span class="err-text">выберите пункт!</span>');
                    } else {
                        $(this).addClass('err');
                        $(this).parent().append('<span class="err-text">заполните поле!</span>');
                    }
                } else {
                    if ($(this).hasClass('select')) {
                        $(this).parents('.dropdown').removeClass('err');
                        $(this).parents('.form__block').children(".err-text").remove();
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
    $('.select').on('change', function() {
        $(this).parents('.dropdown').removeClass('err');
        $(this).parents('.form__block').children(".err-text").remove();
    })
    $('.checkbox').on('click', function() {
        $(this).parents('.services').removeClass('err');
        $(this).parents('.services').next(".err-text").remove();
    })

    $('form input, form textarea').blur(function() {
        if ($(this).val() === '') {
            $(this).removeClass('active');
        }
    });

    // med page



    function swichAccordion(parent) {
        $(parent + ' .item__title').on('click', function(e) {
            $(parent + ' .item').not($(this).parents('.item')).removeClass('opened');
            $(this).parents('.item').toggleClass('opened');
            if ($(this).parents('.item').hasClass('opened')) {
                $(parent + ' .item__info').slideUp();
                $(this).parents('.item').find('.item__info').slideDown();
            } else {
                $(this).parents('.item').find('.item__info').slideUp();
            }
            if (document.body.clientWidth < 768) {
                $('html,body').animate({ scrollTop: $(this).offset().top - 50 }, 1000);
            }
        });

        $(parent + ' .item__close').on('click', function(e) {
            $(this).parents('.item').removeClass('opened');
            $(this).parents('.item').find('.item__info').slideUp();
            if (document.body.clientWidth < 768) {
                $('html,body').animate({ scrollTop: $(this).parents('.item').offset().top - 50 }, 1000);
            }
        });
    }

    swichAccordion('.med-indicators');
    swichAccordion('.med-nature');

    $('.license__wrap').slick({
        dots: false,
        arrows: true,
        slidesToShow: 1,
        // infinite: true,
        // autoplay: true,
        // autoplaySpeed: 3000,
    });

    $('.carousel__wrap').slick({
        dots: false,
        arrows: true,
        slidesToShow: 4,
        infinite: true,
        // autoplay: true,
        // autoplaySpeed: 3000,
        responsive: [{
            breakpoint: 1200,
            settings: {
                slidesToShow: 3,
            }
        }, {
            breakpoint: 768,
            settings: {
                slidesToShow: 2,
            }
        }, {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
            }
        }]


    });

    // apart page

    $('.apart-info__images').slick({
        dots: true,
        arrows: true,
        slidesToShow: 1,
        // infinite: true,
        // autoplay: true,
        // autoplaySpeed: 3000,
        responsive: [{
            breakpoint: 768,
            settings: {
                dots: false,
            }
        }]
    });

    // leisure page

    swichAccordion('.leisure-events');

    // media page

    function changeImg(image) {
        var that = image;
        var bigImg = that.data('big');
        var fullImg = that.data('full');
        $('.media-foto__big > img').attr('src', bigImg);
        $('.media-foto__big').attr('href', fullImg);
    }

    $('.media-foto__img').on('click', function() {
        changeImg($(this));
    });

    if (isMobile.Android()) {
        $('.media-3d').hide();
    }



    function slickSmallRun(index) {
        $('.media-foto__small').eq(index).slick({
            dots: false,
            arrows: true,
            slidesToShow: 5,
            // infinite: true,
            // autoplay: true,
            // autoplaySpeed: 3000,
            responsive: [{
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                }
            }, {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                }
            }]
        });
    }

    slickSmallRun(0);


    $(".b-tabs__item").hide().eq(0).show();

    $(".b-tabs__btn").click(function() {
        if (!$(this).hasClass("active")) {

            $(".b-tabs__btn").removeClass("active").eq($(this).index()).addClass("active");

            $(".b-tabs__item").hide().eq($(this).index()).fadeIn();

            if (document.body.clientWidth < 768) {
                $('.b-tabs__mobile').text($(this).text());
                $('.b-tabs__pagin').hide();
                $('.b-tabs__mobile').removeClass('active');
            }

            slickSmallRun($(this).index());

        } else {
            if (document.body.clientWidth < 768) {
                $('.b-tabs__pagin').hide();
                $('.b-tabs__mobile').removeClass('active');
            }
        }

    }).eq(0).addClass("active");


    $('.b-tabs__mobile').on('click', function() {
        $('.b-tabs__pagin').slideToggle();
        $(this).toggleClass('active');
    })




    $('.header-sign,.header-sign__mobile, .tour__more, .js-order').fancybox({
        padding: 0,
        closeBtn: false
    });

    $('.popup__close').on('click', function() {
        $.fancybox.close();
    })

    pickmeup.defaults.locales['ru'] = {
        days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
        daysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        daysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']
    };

    function pickmeupInit(selector) {
        pickmeup(selector, {
            locale: 'ru',
            hide_on_select: true
        });
    }
    pickmeupInit('#filterDate');
    pickmeupInit('#filterDate0');

    $('.tooltip').prev().hover(function() {
        $(this).next().show();

    }, function() {
        $(this).next().hide();
    });


    // meal page

    $(".js-tabs__item").hide().eq(0).show();

    $(".js-tabs__btn").click(function() {
        if (!$(this).hasClass("active")) {
            $(".js-tabs__btn").removeClass("active").eq($(this).index()).addClass("active");
            $(".js-tabs__item").hide().eq($(this).index()).fadeIn();
        }
    }).eq(0).addClass("active");

    swichAccordion('.meal-menu');

    // selection page

    $('.b-filter__block_age').hide();

    function showSelectChild(count) {
        $(".select_child").eq(count).on('change', function() {
            var i = $(this).find('option:selected').text();
            if (i !== "нет") {
                $('.b-filter__block_age').eq(count).show();
                $('.b-filter__block_age').eq(count).find('.dropdown').hide();
                for (var j = 0; j < +i; j++) {
                    $('.b-filter__block_age').eq(count).find('.dropdown').eq(j).show();
                }


            } else {
                $('.b-filter__block_age').eq(count).hide();
            }
        });
    }

    showSelectChild(0);




    // function cloneFilteSection() {
    //     var count = $('.b-filter__section').length;

    //     var section='<div class="b-filter__section"> <div class="b-filter__row"> <div class="b-filter__block"> <label for="filterResort' + count + '" class="label">Выберите санаторий</label> <select id="filterResort' + count + '" name="PROPERTY[][' + count + ']" class="select"> <option selected>Все</option> <option>Родон</option> <option>Поречье</option> <option>Сосновый бор</option> <option>Рассвет-Любань</option> <option>Случь</option> <option>Солнышко</option> <option>Росинка</option> <option>Налибокская пуща</option> </select> </div><div class="b-filter__block"> <label for="filterDate' + count + '" class="label">Дата заезда* </label> <input id="filterDate' + count + '" type="text" name="PROPERTY[][' + count + ']" placeholder="" class="req input input_date"> </div><div class="b-filter__block"> <label for="filterDays' + count + '" class="label">Количество дней* </label> <input id="filterDays' + count + '" type="number" name="PROPERTY[][' + count + ']" placeholder="" min="' + count + '" max="365" maxlength="3" autocomplete="false" class="req input"> </div></div><div class="b-filter__hr"></div><div class="b-filter__row"> <div class="b-filter__block"> <label for="filterComfort' + count + '" class="label">Степень комфортности</label> <select id="filterComfort' + count + '" name="PROPERTY[][' + count + ']" class="select"> <option selected>люкс</option> <option>полу-люкс</option> <option>обычный</option> </select> </div></div><div class="b-filter__hr"></div><div class="b-filter__row"> <div class="b-filter__block"> <label for="filterPlaces' + count + '" class="label">Размещение в номере*</label> <select id="filterPlaces' + count + '" name="PROPERTY[][' + count + ']" class="req select"> <option selected>' + count + '</option> <option>2</option> <option>3</option> <option>4</option> </select> <label class="checkbox"> <input type="checkbox" class="checkbox__hidden"><span class="checkbox__showed"></span><span class="checkbox__title">Только одноместные номера </span> </label> </div><div class="b-filter__block"> <label for="filterChild' + count + '" class="label">Количество детей</label> <select id="filterChild' + count + '" name="PROPERTY[][' + count + ']" class="select select_child"> <option selected>нет</option> <option>1</option> <option>2</option> <option>3</option> <option>4</option> </select> </div><div class="b-filter__block b-filter__block_age"> <label class="label">Возраст детей на момент отъезда</label> <div class="b-filter__group"> <select name="PROPERTY[AGE' + count + '][' + count + ']" class="req select"> <option selected>1</option> <option>2</option> <option>3</option> <option>4</option> </select> <select name="PROPERTY[AGE2][' + count + ']" class="req select"> <option selected>1</option> <option>2</option> <option>3</option> <option>4</option> </select> <select name="PROPERTY[AGE3][' + count + ']" class="req select"> <option selected>1</option> <option>2</option> <option>3</option> <option>4</option> </select> <select name="PROPERTY[AGE4][' + count + ']" class="req select"> <option selected>1</option> <option>2</option> <option>3</option> <option>4</option> </select> </div></div></div><div class="b-filter__hr-last"></div></div></div>'

    //     $('.b-filter__inner').append(section);
    //     $('.select').easyDropDown();
    //     pickmeupInit('#filterDate' + count);
    //     $('.b-filter__block_age').eq(count).hide();
    //     showSelectChild(count);
    // }


    // $('.b-filter__add').on('click', function() {
    //     cloneFilteSection()
    // })

    $('.tour__more').fancybox({
        padding: 0,
        margin: [20,0,20,0],
        closeBtn: false,
        beforeShow: function() {
            // console.log(this);
            if (document.body.clientWidth < 1200) {
                $('.popup_similar__wrap .row').slick({
                    dots: true,
                    arrows: false,
                    slidesToShow: 2,
                    // autoplay: true,
                    // autoplaySpeed: 3000,
                    responsive: [{
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 1,
                        }
                    }, ]


                });
            }
        },
        afterClose: function () {
            if (document.body.clientWidth < 1200) {
                $('.popup_similar__wrap .row').slick('unslick');
            }            
        }
    });

    $('.popup_similar__close').on('click', function() {
        $.fancybox.close();
    })

    $('.p-payment__more-btn').on('click', function() {
        var parent = $(this).parent();
        parent.prev().slideDown();
        parent.next().show();
        parent.hide();
    })   

    $('.p-payment__close .g-close').on('click', function() {
        var parent = $(this).parent();
        $(this).parents('.p-payment__item').find('.p-payment__text').slideUp();      
        parent.prev().show();
        parent.hide();

    })   


    $('.personal-side__btn').on('click', function() {
        $('.personal-side__menu,.personal-side__overlay').fadeToggle();
        $(this).toggleClass('active');
    })


    if (document.body.clientWidth < 1200) {

        $(document).click(function(e) {
            if (!$(e.target).is(".personal-side__btn,.personal-side__menu,.personal-side__menu *")) {
                $('.personal-side__btn').removeClass('active');
                $('.personal-side__menu,.personal-side__overlay').hide();
            };
        })
    }


});

$(window).load(function() {


});