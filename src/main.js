'use strict';

// json 데이터 호출
function getJson(){
    return fetch('./cola.json')
    .then(response=>response.json())
    .then(json=>json.items)
    .catch(error=> alert(error))
}

// item 컨테이너에 html 추가
function displayItems(items){ 
    const container = document.querySelector('.list-cola'); 
    container.innerHTML = items.map(item=>createHTMLString(item)).join('');
}

// 각 item을 html로 변경
function createHTMLString(item){
    return `
    <li class="list-${item.color}">
    <img
      src=${item.image}
      width="36px"
      height="65px"
      class="img-${item.color}"
      alt="보라색 콜라"
    />
    <p class="txt-colaName">${item.type}</p>
    <p class="txt-price">${item.price}원</p>
  </li>
  `
}

// json 함수 호출
getJson()
    .then(items=>{
        displayItems(items)
    });
