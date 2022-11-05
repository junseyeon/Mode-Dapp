const regImg = document.getElementById("regImg");
const fileBtn = document.querySelector(".fileBtn");
const loadImg = document.querySelector(".loadImg");

 function upImg(){
   const form = $('#imgUpload')[0];
   const formData = new FormData(form);
   if(regImg.value != undefined){
    console.log("::" + JSON.stringify(formData));

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
 }