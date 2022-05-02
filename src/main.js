'use strict';

// data.json 가져오기
function loadItems(){    
    return fetch('./data.json') 
    .then(response=> response.json())
    .then(json => json.items)
    .catch(error => alert(error))
}


const list_cola = document.querySelector(".list-cola")
list_cola.addEventListener('click', (event)=>{
    // 이벤트 예외처리
    if(event.target.className==="list-cola"){
        return 
    } else{
        console.log("1");
    }
})

function a(items){
    console.log(items);
}


// 함수 호출
loadItems() 
.then(items => {
    a(items);
    //setEventListeners(items);
})
