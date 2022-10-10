'use strict';

let q1 = document.getElementsByName('1-1');
const q12 = document.getElementById('q12text');
const q2 = document.getElementById('q2');
const q3 = document.getElementById('q3');
const q4 = document.getElementById('q4');

const saveBtn = document.querySelector('.saveBtn');
saveBtn.addEventListener('click', save);

function save(){
    
    q1.forEach((node)=>{
        if(node.checked){
            q1 = node.value;
        }
    });

    const reqArray = [q1,q12.value,q3.value,q4.value];

    const req={
        q1: q1,
        q12: q12.value,
        q2: q2.value,
        q3: q3.value,
        q4: q4.value
    };

    reqArray.forEach((value)=>{
        if(!value) return alert("모두 입력해주세요");
    });

    fetch("/apply/pstep1",{
        method:'POST',
        headers : {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify(req),
    })
    .then((res) => res.json())
    .then((res)=>{
        if(res.success){
            location.href="/apply/pstep2";
        } else{
            console.log(res);
        }
    })
    .catch((err)=>{
        
    })



}