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

//get list에 item 추가 (map으로 구현)
const cola_map = new Map();

function displayGetItem(item){
  const con_getCola = document.querySelector(".con-getCola");
  con_getCola.insertAdjacentHTML("afterbegin", createGetHTMLString(item));
}

function itemCount() {
       //get list에 동일 item이 있는 경우 최대 재고까지 수량만 변경. 
       const con_cola = document.querySelector(".con-cola");
       let count_value = con_cola.dataset.value;
           if(cola_map.has(count_value)){
           cola_map.set(count_value, cola_map.get(count_value)+1);
           } else{
             cola_map.set(count_value, 1);
           }
           con_cola.children[2].innerText=cola_map.get(count_value);  
}

//get list에 item 추가 (객체로로 구현)
// const cola_obj = {};

// function displayGetItem(item){
//   const con_getCola = document.querySelector(".con-getCola");
//   con_getCola.insertAdjacentHTML("afterbegin", createGetHTMLString(item));
  
//      //get list에 동일 item이 있는 경우 최대 재고까지 수량만 변경. 
//      const con_cola = document.querySelector(".con-cola");
//      let count_value = con_cola.dataset.value;
//          if(Object.keys(cola_obj).includes(count_value)){
//           cola_obj[count_value] +=1; 
//          } else{
//           cola_obj[count_value] =1; 
//          }
//          con_cola.children[2].innerText=cola_obj[count_value];
// }

function createGetHTMLString(item){
  let className = item.target.classList.value;
  let arr = className.split("");
  arr.splice(0,5);
  className = arr.join("");

  return `
  <div data-key="type" data-value="${className}" class="con-cola">
            <img
              src="./images/${className}_cola.svg"
              width="18px"
              height="33px"
              alt="${className} cola"
              class="img-cola"
            />
            <p class="txt-colaName voucher">${className}_cola</p>
            <p class="txt-colaCount"></p>
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
let obj ={}
list_cola.addEventListener('click', event=>{
    // 아이템 밖에 클릭시 동작 예외처리
      if(event.target.localName==="ul"){
        return
      } else{
        // 잔액이 없는 경우 콜라 선택 불가.
        if(parseInt(txt_balance.textContent)>=1000){
            displayGetItem(event);
            itemCount();
      }
     }
    })

// json 함수 호출
getJson()
    .then(items=>{
        displayMainItems(items)
    });



