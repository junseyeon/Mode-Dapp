'use strict';

const id = document.querySelector('#id');
const pw = document.querySelector('#pw');
const loginBtn = document.querySelector('button');

loginBtn.addEventListener('click',login);

function login(){
   const req={
    id: id.value,
    pw: pw.value
   };

   if(!id.value) return alert("아이디를 입력해주세요");
   if(!pw.value) return alert("비밀번호를 입력해주세요");

   fetch("/login",{              // post /login으로 넘어가고 값 받아옴 (컨트롤러 js)
    method : 'POST',
    headers : {
        "Content-Type" : "application/json",
    },
    body: JSON.stringify(req),
   })
    .then((res) => 
        res.json()
    )
    .then((res) => { 
        if(res.success){
            location.href = "/market";
        }  else{
            if(res.err) return alert( res.err);
            alert(res.msg);
        }
    })
    .catch((err)=>{      // 그 밖의 에러상황 (경로가 없을 때 등)
        console.error(new Error('로그인 중 에러 발생'));
    });


   // [이중 then 설명] res.json()의 반환 값은 Promise. 기본 res의 반환 값은 response스트림. 
   // json() 메서드를 통해 response 스트림을 읽을 수 있다.
   // response는 데이터가 모두 받아진 상태가 아니다. josn으로 response스트림 가져와 완료 될 때까지 읽는다.
   // body 텍스트를 promise형태로 반환한다.

};
