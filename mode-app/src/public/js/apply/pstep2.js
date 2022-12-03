
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

 const regImg = document.getElementById("regImg");
 const fileBtn = document.querySelector(".fileBtn");
 const loadImg = document.querySelector(".loadImg");

  function upImg(){
    const form = $('#imgUpload')[0];
    const formData = new FormData(form);

    if(regImg.value != undefined){
        $.ajax({
            url: '/apply/upload',
            enctype:'multipart/form-data',
            type: 'POST',
            data :formData,
            processData: false,  
            contentType: false,
            cache: false,
            success: function(data){
                if(data.success){
                    loadImg.src=data.src;
                    loadImg.style.display='block';
                    fileBtn.style.display='none';
                    alert('사진 업로드 성공');
                } else{
                    alert('사진 실패');
                }
            },
            error: function(err){
                alert(JSON.stringify(err));
            }
        });
    }

    // if(regImg.value != undefined){
    //     form.method="post";
    //     form.enctype="multipart/form-data";
    //     form.target="_self";
    //     form.action="/apply/upload";
    //     form.submit();
    // }
  }

 const pTitle = document.querySelector("#pTitle");
 const category = document.querySelector("#category");
 const amount = document.querySelector("#amount");
 const endDate = document.querySelector("#endDate");
 const startDate = document.querySelector("#startDate");
 const saveBtn = document.querySelector(".saveBtn");
 const regid = document.getElementById('regid');
 const searchTagArray = document.getElementById('searchTagArray');


 const save = ()=>{

    const inputArray=[pTitle,category,amount, startDate, endDate,tag,loadImg];
    let reqArray=[pTitle.value,category.value,amount.value,startDate.value, endDate.value,tagArr.join(),decodeURI(loadImg.src)];
    const now = new Date();
    reqArray.forEach((value, index)=>{
        if(value == '' && searchTagArray == '') {
            alert(index + "모두 입력해주세요");
            inputArray[index].focus();
            return 0;
        }   
        // if(searchTagArray !== '' && index == 4 ){
        //     reqArray[4] = searchTagArray.value;
        //     console.log(reqArray[4]);
        // }
    });
    console.log( { ...reqArray } );
 
    
    $.ajax({
        url: '/apply/pstep2',
        async: false,
        type: 'POST',
        dataType: 'json',
        data : { ...reqArray, regid: regid.value },
        success: function(data){
            if(data.success){
                alert('기본 정보 저장 완료');
                location.href='/apply/pstep3?regid='+data.regid;
            } else{
                alert('기본 정보 저장 실패');
            }
        },
        error: function(err){
            alert(err.json());
        }
    });

 };

 
