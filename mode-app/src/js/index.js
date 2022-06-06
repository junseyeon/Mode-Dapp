$(function(){
    $('.btn_menu').on('click', function(){
        $(this).toggleClass('active');
        $('.navigation').toggleClass('active').stop().slideToggle();
    });

    $('header .search input').on('keydown', function(){
        $(this).addClass('active');
    });

    $('header .search input').on('blur keyup', function(){
        var val = $(this).val();
        if(val == ""){
            $(this).removeClass('active');
        }
    });
});