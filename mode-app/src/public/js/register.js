'use strict';

const id = document.querySelector('#id');
const Username = document.querySelector('#name');
const pw = document.querySelector('#pw');
const confirmPw = document.querySelector('#confirm-pw');
const role = document.querySelector('#role');
const registerBtn = document.querySelector('button');

registerBtn.addEventListener('click', register);

function register(){

    if(!id.value) return alert('아이디를 입력해주세요');
    if (pw.value !== confirmPw.value) return alert('비밀번호가 일치하지 않습니다.');
    
   const req={
    id: id.value,
    pw: pw.value,
    name: Username.value,
    role : role.value
   };

   fetch("/register",{              // post /login으로 넘어가고 값 받아옴 (컨트롤러 js)
    method : 'POST',  
    headers : {
        "Content-Type" : "application/json",
    },
    body: JSON.stringify(req),
   })
    .then((res) => res.json())
    .then((res) => {
        if(res.success){
            location.href = "/login"; 
        }  else{
            if(res.err) return alert(res.err);
            alert(res.msg);
        }
    })
    .catch((err)=>{      // 그 밖의 에러상황 (경로가 없을 때 등)
        console.error(new Error('회원가입 중 에러 발생'));
    });


   // [이중 then 설명] res.json()의 반환 값은 Promise. 기본 res의 반환 값은 response스트림. 
   // json() 메서드를 통해 response 스트림을 읽을 수 있다.
   // response는 데이터가 모두 받아진 상태가 아니다. josn으로 response스트림 가져와 완료 될 때까지 읽는다.
   // body 텍스트를 promise형태로 반환한다.

};
