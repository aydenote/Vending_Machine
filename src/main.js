'use strict';

// data.json 가져오기
function loadItems(){    
    return fetch('./cola.json') 
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
        //  클릭시 json data 호출
        const type = event.target.className.slice(5); 
        loadItems().then(items => {
            for(let i=0; i<items.length; i++){
              if(type.toUpperCase()===items[i].type.toUpperCase())
              display(items[i]);
            }
        })
    }
})

// 클릭된 아이템 보여주기
function display(items){
    const container = document.querySelector('.con-getCola'); 
    container.innerHTML = createHTMLString(items);
    // items.map(item=>createHTMLString(item)).join('');
}

// 클릭된 아이템 HTML 생성
function createHTMLString(item){
    let first_count = 1;
    return `
    <div class="con-cola">
    <img
      src=${item.image}
      width="18px"
      height="33px"
      class="img-cola"
    />
    <p class="txt-colaName voucher">${item.type}_cola</p>
    <p class="txt-colaCount">${first_count}</p>
  </div>
  `
}
