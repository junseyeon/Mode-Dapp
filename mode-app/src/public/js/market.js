
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
        $('.swiper-button-prev').css('display','block');
        // swiper.slidesPerGroup = 4;
        // swiper.slidesPerView = 4;
        // console.log(swiper.slidesPerGroup);
        //document.body.style.width= '96rem'  ;
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
    const GV = {
        isPause : false,
        timer : null,
    };

    $(document).on("click", ".story", function(){
        $("#modal").show();
        storyTimer();
        $('main').addClass('blur');
    });

    function storyTimer(){
        var len = 0;
        GV.isPause = false;
        GV.timer = setInterval(function(){
            if( len > 90 || GV.isPause){   //6초 후 닫힘
                GV.isPause = true;
                clearInterval(GV.timer);
                modalHide();
                len=0;
                $('main').removeClass("blur");
            }
            $("#timeBar").css("width", len+"%");
            len += 1.5;
            console.log(len);
        },100);
    }

    $("#modal-close").click(modalHide);

    function modalHide(){
        $(".searchModal").hide();
        $('main').removeClass("blur");
        clearInterval(GV.timer);
        GV.isPause = true;
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


function moreFun(){
    alert("눌림");
}

function moveTo(regid){
    location.href= "/marketDetail?regid="+regid;
}