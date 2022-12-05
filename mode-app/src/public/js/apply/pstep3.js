$(function(){

    function videoChecked(){
        $(".videoFile").css('display','block');
        $(".videoFile").css('font-weight','600');
        $(".imgFile").css('display','none');
    }

    function imgChecked(){
        $(".imgFile").css('display','block');
        $(".imgFile").css('font-weight','600');
        $(".videoFile").css('display','none');
    }

    // 초기값 셋팅 
    if($('#introVideoPath').is(':checked')){
        console.log("videopath checked");
        videoChecked();
    } 
    else if($('#introImgPath').is(':checked')){
        console.log("imgpath checked");
        imgChecked();
    }

    // 기본 토글 기능
    $("#introVideoPath").change(videoChecked);
    $("#introImgPath").change(imgChecked);
        
    const introImgPath  = document.querySelector('.loadImg');  
    const introVideoPath  = document.querySelector('input[name=videoPath]');
    const introSummarty = document.querySelector('#summaryText');
    const story = document.querySelector('input[name=story]');
    const regid = document.querySelector("#regid");
    
    var quill = new Quill('#editor-container', {
        modules: {
            toolbar: [
                [{ header: [1, 2, false] }],
                ['bold','underline'],
                ['link', 'blockquote', 'code-block', 'image'],
                [{ list: 'ordered' }, { list: 'bullet' }]
            ]
        },
        placeholder: '글 작성하기',
        theme: 'snow'  // or 'bubble'
    });

        
    if( story.value != " "){
        const quilContent = JSON.parse(story.value);
        //console.log(quilContent.ops);
        quill.setContents(quilContent.ops);
    }

        // 페이지 데이터 저장
    $('.saveBtn').on('click', function(){

        story.value = JSON.stringify(quill.getContents());
        let reqArray = [introImgPath.src, introVideoPath.value,introSummarty.value, story.value] 
        console.log({...reqArray});

        $.ajax({
            url: '/apply/pstep3',
            async: false,
            type : 'POST',
            dataType : "json",
            data: { ...reqArray, regid: regid.value},
            success: function(data){
                if(data.success){
                    alert('스토리 작성 저장 완료');
                    location.href='/apply/pstep4?regid='+data.regid;
                } else{
                    alert('스토리 작성 저장 실패');
                }
            },
            error: function(err){
                alert(err.json());
            }
        });

        });
       
     
});


