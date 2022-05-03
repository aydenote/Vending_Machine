'use strict';

// json 데이터 호출
function getJson(){
    return fetch('./cola.json')
    .then(response=>response.json())
    .then(json=>json.items)
    .catch(error=> alert(error))
}

// item 메인 컨테이너에 html로 추가
function displayMainItems(items){ 
    const container = document.querySelector('.list-cola'); 
    container.innerHTML = items.map(item=>createMainHTMLString(item)).join('');
}

// 각 item을 메인 콜라 리스트 html로 변경
function createMainHTMLString(item){
    return `
    <li class="list-${item.color}">
    <img
      src=${item.image}
      width="36px"
      height="65px"
      alt="${item.type}"
      class="img-${item.color}"
    />
    <p class="txt-colaName">${item.type}</p>
    <p class="txt-price">${item.price}원</p>
  </li>
  `
}

// json 함수 호출
getJson()
    .then(items=>{
        displayMainItems(items)
    });

// 입금 클릭시 소지금 변경.
const btn_Deposit = document.querySelector(".btn-deposit");
const txt_deposit = document.querySelector(".txt-deposit");
const my_money = document.querySelector(".txt-money");

btn_Deposit.addEventListener('click',()=>{
  // 기존 소지금에 추가 입금액 저장
  my_money.innerText = parseInt(txt_deposit.value) + parseInt(my_money.textContent);
 
  // 소지금 공백에 대한 예외처리
  if(txt_deposit.value==''){my_money.innerText = 1000;} 
  
  // 입금 후 금액 초기화
  txt_deposit.value=null;
})

// 아이템 클릭시 get list에 저장
const list_cola = document.querySelector(".list-cola");
list_cola.addEventListener('click', event=>{
// 아이템 밖에 클릭시 동작 예외처리
  if(event.target.localName==="ul"){
    return
  } else{
    displayGetItem(event);
  }
})

function displayGetItem(item){
  const con_getCola = document.querySelector(".con-getCola");
  con_getCola.innerHTML = createGetHTMLString(item);
}

function createGetHTMLString(item){
  let className = item.target.classList.value;
  let arr = className.split("");
  arr.splice(0,5);
  className = arr.join("");
     
  return `
  <div class="con-cola">
            <img
              src="./images/${className}_cola.svg"
              width="18px"
              height="33px"
              alt="${className} cola"
              class="img-cola"
            />
            <p class="txt-colaName voucher">${className}_cola</p>
            <p class="txt-colaCount">${1}</p>
  `
}


