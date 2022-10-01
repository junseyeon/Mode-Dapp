$(function () {

    // $(".item").hover(function(){
    //     $(this).css('padding','0.5rem');
    // },function(){
    //     $(this).css('padding','0rem');
    // });

    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 3,
        slidesPerGroup: 3,
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
        $('.hide').removeClass('hide');
        // swiper.slidesPerGroup = 4;
        // swiper.slidesPerView = 4;
        // console.log(swiper.slidesPerGroup);
        // document.body.style.width= '96rem'  ;
    });

});

