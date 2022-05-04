'use strict';

// json 데이터 호출
function getJson(){
    return fetch('./src/cola.json')
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

// 입금 클릭시 잔액 변경.
const btn_Deposit = document.querySelector(".btn-deposit");
const txt_deposit = document.querySelector(".txt-deposit");
const my_money = document.querySelector(".txt-money");
const txt_balance = document.querySelector(".txt-balance")

btn_Deposit.addEventListener('click',()=>{
  // 기존 추가 입금액 저장
  txt_balance.textContent = parseInt(txt_deposit.value) + parseInt(txt_balance.textContent);
  // 입금액 공백에 대한 잔액 예외처리
  if(txt_deposit.value==''){txt_balance.textContent = 0;} 
  // 입금 후 금액 초기화
  txt_deposit.value=null;
})

// 거스름돈 반환 후 잔액 0, 소지금에 잔액 추가
const btn_change = document.querySelector(".btn-change");
btn_change.addEventListener('click',()=>{
  my_money.textContent = parseInt(my_money.textContent) + parseInt(txt_balance.textContent);
  txt_balance.textContent=0;
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

// json 함수 호출
getJson()
    .then(items=>{
        displayMainItems(items)
    });

// get list에 item 추가 
function displayGetItem(item){
  const con_getCola = document.querySelector(".con-getCola");
  con_getCola.insertAdjacentHTML("afterbegin", createGetHTMLString(item));
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


