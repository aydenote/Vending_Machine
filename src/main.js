'use strict';

const list_cola = document.querySelector(".list-cola")
list_cola.addEventListener('click', (event)=>{
    
    // 이벤트 예외처리
    if(event.target.className==="list-cola"){
        return 
    } else{
        console.log("1");
    }
})