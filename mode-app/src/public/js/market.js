$(function () {

    // $(".item").hover(function(){
    //     $(this).css('padding','0.5rem');
    // },function(){
    //     $(this).css('padding','0rem');
    // });

    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 10,
        loop: true,
        loopFillGroupWithBlank: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        // centeredSlides : true,

    }); 


    $('.swiper-button-next').on('click',function(){
        $('.swiper-button-prev').css('display','block');
        // swiper.slidesPerGroup = 4;
        // swiper.slidesPerView = 4;
        // console.log(swiper.slidesPerGroup);
        // document.body.style.width= '96rem'  ;
    });


    // $('.item').on(
    //     "mouseover", function(){
    //         $(this).find('.hidden-text').css('display','block');
    //     },
    //     "mouseout", function(){
    //         $(this).find('.hidden-text').css('display','none');
    //     }
    // );

    $('.item').hover(
        function(){
            $(this).find('.hidden-text').css('display','block');
        },
        function(){
            $(this).find('.hidden-text').css('display','none');
        }
    );

    // $('.item').mouseout(
    //     function(){
    //         $(this).find('.hidden-text').css('display','none');
    //     }
    // );



});

