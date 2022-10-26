'use strict'
$(function(){

    // document.getElementById("select").addEventListener('change',(event) =>{
    //     console.log(event.target.value);
    // });


    $("#introVideoPath").change(function(){
        $(".videoFile").css('display','block');
        $(".videoFile").css('font-weight','600');
        $(".imgFile").css('display','none');
    });

    $("#introImgPath").change(function(){
        $(".imgFile").css('display','block');
        $(".imgFile").css('font-weight','600');
        $(".videoFile").css('display','none');
    });
    
    var quill = new Quill('#editor-container', {
        modules: {
            toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            ['image', 'code-block']
            ]
        },
        placeholder: '글 작성하기',
        theme: 'snow'  // or 'bubble'
        });


})

