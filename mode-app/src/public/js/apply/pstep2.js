    
    let tagArr = [];
    const tag = document.getElementById("searchTag");
    let tagArea = document.getElementsByClassName('showTagArea');
    
  function enterkey(){
    if(window.event.keyCode == 13){

        //입력된 태그 화면에 표시
        let show_tag = document.createElement("span");
        show_tag.setAttribute('id','tag');
        show_tag.innerHTML = '#'+tag.value;
        tagArea[0].appendChild(show_tag);   

        tagArr.push(tag.value);
        tag.value="";
     //   console.log(tagArr.join());

    }

  }

 // const form = document.forms.imgUpload;
 const regImg = document.getElementById("regImg");

  const form = $('#imgUpload')[0];
  const formData = new FormData(form);

  function upImg(){

    // if(regImg.value != undefined){
    //     $.ajax({
    //         url: '/apply/upload',
    //         enctype:'multipart/form-data',
    //         type: 'POST',
    //         dataType: 'json',
    //         data :formData,
    //         processData: false,  
    //         contentType: false,
    //         cache: false,
    //         success: function(data){
    //             if(data.success){
    //                 alert('사진 완료');
    //             } else{
    //                 alert('사진 실패');
    //             }
    //         },
    //         error: function(err){
    //             alert(err);
    //         }
    //     });
    // }

    if(regImg.value != undefined){
        form.method="post";
        form.enctype="multipart/form-data";
        form.target="_self";
        form.action="/apply/upload";
        form.submit();
    }
  }

 const pTitle = document.querySelector("#pTitle");
 const category = document.querySelector("#category");
 const imgSrc = document.querySelector("#upImg")
 const amount = document.querySelector("#amount");
 const endDate = document.querySelector("#endDate");
 const saveBtn = document.querySelector(".saveBtn");

 const save = ()=>{

    const inputArray=[pTitle,category,amount,endDate,tag,imgSrc];
    const reqArray=[pTitle.value,category.value,amount.value,endDate.value,tagArr.join(),imgSrc.src];
    const now = new Date();

    reqArray.forEach((value, index)=>{
        console.log(value);
        if(value == '') {
            alert("모두 입력해주세요");
            inputArray[index].focus();
            return 0;
        }   

        // if(endDate.value < now ){
        //     alert("프로젝트 종료일은 미래로 해주세요.");
        // }

    });
    //    console.log( { ...reqArray } );
    
    $.ajax({
        url: '/apply/pstep2',
        async: false,
        type: 'POST',
        dataType: 'json',
        data : { ...reqArray },
        success: function(data){
            if(data.success){
                alert('기본 정보 저장 완료');
                location.href='/apply/pstep3';
            } else{
                alert('기본 정보 저장 실패');
            }
        },
        error: function(err){
            alert(err.json());
        }
    });

 };

 
