    
    var tagArr = [];
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
    }
  }

  const form = document.forms.imgUpload;
  const regImg = document.getElementById("regImg");

  function upImg(){
    console.log(form);
    if(regImg.value != undefined){
        form.method="post";
        form.enctype="multipart/form-data";
        form.target="_self";
        form.action="/apply/upload";
    }
  }


