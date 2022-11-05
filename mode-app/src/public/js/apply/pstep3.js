$(function(){

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
        
    const introImgPath  = document.querySelector('input[name=regImg]');
    const introVideoPath  = document.querySelector('input[name=videoPath]');
    const story = document.querySelector('input[name=story]');
    
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

        $('.saveBtn').on('click', function(){

            story.value = JSON.stringify(quill.getContents());
            let reqArray = [introImgPath.value, introVideoPath.value, story.value] 
            alert('저장합니다');

            console.log({...reqArray});
        //    console.log($(form).serializeArray());
         })
       
     
})


