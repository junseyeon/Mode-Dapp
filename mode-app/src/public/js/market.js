
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

    // $("#modal").show();

    $(document).on("click", ".story", function(){
        $("#modal").show();
        storyTimer();
        $('main').addClass('blur');
    });

    function storyTimer(){
        var elem = $("#timeBar");
        var len = 0;
        setInterval(function(){
            if( len > 90){   //6초 후 닫힘
                clearInterval();
                modalHide();
                len=0;
                $('main').removeClass("blur");
            }
            $("#timeBar").css("width", len+"%");
            len += 1.5;
        },100);
    }

    $("#modal-close").click(modalHide);

    function modalHide(){
        $(".searchModal").hide();
    }


});

// 왼쪽 사이드바 버튼으로 url 이동... 
// const applyBtn = document.querySelector('.applyBtn');
// applyBtn.addEventListener('click',apply);

// function apply(){
//     // fetch("/apply/start",{
//     //     method : "POST",
//     //     headers : {
//     //         "Content-Type" : "application/json",
//     //     },
//     // });
// };

