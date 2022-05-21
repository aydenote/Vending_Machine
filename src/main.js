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
    <li data-value="${item.color}" class="list-${item.color}">
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

const con_getCola = document.querySelector(".con-getCola");

// 선택한 콜라 수량 변경.
function itemCount(item_name) {
  //get list에 동일 item이 있는 경우 수량 변경.
  cola_obj[item_name] ? cola_obj[item_name]+=1 : cola_obj[item_name]=1;
  
  // 5개 이상 선택시 품절
    if(cola_obj[item_name]>=5){
      soldOut(item_name, cola_obj[item_name]);
    }

    // 콜라 수량 변경 요청 온 콜라 이름과 기존에 등록된 콜라들 중 맞는 이름을 찾아 해당 콜라 수량을 변경.
    for(let i=0; i<con_getCola.children.length; i++){
      if(con_getCola.children[i].dataset.value===item_name){
        con_getCola.children[i].lastElementChild.innerText=cola_obj[item_name];
      }
    }
}

function soldOut(colaName, colaCount){
  for(let j=0; j<list_cola.children.length; j++){
    if(list_cola.children[j].dataset.value===colaName){
      if(colaCount>=5){
        list_cola.children[j].classList.add("soldout");
    } else{
      list_cola.children[j].classList.remove("soldout");
    }
    }
  }
}


// get list에서 item 클릭시 수량 감소.
con_getCola.addEventListener("click", (event)=>{
  // 외부 클릭 예외 처리
  event.target.className==="con-getCola" ? "" : getListItemCount(event); 
})

function getListItemCount(event){
  let clicked_item=event.path.find(item=> item.className==="con-cola");
  let item_name = clicked_item.dataset.value;
  let item_count = clicked_item.children[2];

  if(item_count.innerText === "1"){  
    delete cola_obj[item_name];
    clicked_item.outerHTML="";
  } else{
    item_count.innerText-=1;
    cola_obj[item_name]-=1;
  }

  if(cola_obj[item_name]<=5){
    soldOut(item_name, cola_obj[item_name]);
  }
}

// 입금 클릭시 잔액 변경.
const btn_Deposit = document.querySelector(".btn-deposit");
const txt_deposit = document.querySelector(".txt-deposit");
const my_money = document.querySelector(".txt-money");
const txt_balance = document.querySelector(".txt-balance")

btn_Deposit.addEventListener('click',()=>{
  // 입금액 공백에 대한 잔액 예외처리
  if(txt_deposit.value==''){
    txt_deposit.value = 0;
  } 
  // 기존 추가 입금액 저장
  txt_balance.textContent = parseInt(txt_deposit.value) + parseInt(txt_balance.textContent);
  // 입금 후 금액 초기화
  txt_deposit.value=null;
})

// 거스름돈 반환 후 잔액 0, 소지금에 잔액 추가
const btn_change = document.querySelector(".btn-change");
btn_change.addEventListener('click',()=>{
  my_money.textContent = parseInt(my_money.textContent) + parseInt(txt_balance.textContent);
  txt_balance.textContent=0;
})

// 획득 버튼 클릭시 
const btn_getCola = document.querySelector(".btn-getCola");
btn_getCola.addEventListener('click', () =>{
  // 총 수량 * 1000원(개당 가격) > 잔액 이면 획득 불가. 경고 출력
  // 총 수량 * 1000원(개당 가격) < 잔액 이면 정상 획득 획득 음료 list에 추가.
  let totalCount = 0;
  for(let i=0; i<con_getCola.children.length; i++){
    totalCount += parseInt(con_getCola.children[i].children[2].innerText);
  }

  if(totalCount*1000>parseInt(txt_balance.textContent)){
    alert("잔액이 부족합니다.")
   } else if(con_getCola.children.length === 0){
    // con_getCola 에 아무것도 없을 경우 예외 처리
    return 
  } else{
    getResult();
    // 잔액 차감 및 콜라 아이템 초기화
    txt_balance.textContent-=totalCount*1000;
    cola_obj = new Object(); // 아이템 초기화
    con_getCola.innerHTML=``; // get list 컨테이너 초기화
    totalPrice();
  }
})

// 획득한 음료에 아이템 표시.
const result = document.querySelector(".con-getCola.result");
function getResult(){
  result.insertAdjacentHTML("afterbegin", con_getCola.innerHTML);
}

// 총금액 변경
const txt_totalPrice = document.querySelector(".txt-totalPrice");
function totalPrice(){
  let total=0;
  for(let i = 0; i<result.children.length; i++){
  total+= parseInt(result.children[i].children[2].textContent);
}
  txt_totalPrice.textContent=total*1000;
}

// 아이템 클릭시 get list에 저장
const list_cola = document.querySelector(".list-cola");
let cola_obj ={};
list_cola.addEventListener('click', event=>{
  const clicked_cola = event.target.dataset.value;
  // 아이템 밖에 클릭시 동작 예외처리
      if(event.target.localName==="ul"){
        return
      } else{
        // 잔액이 없는 경우 콜라 선택 불가.
        if(parseInt(txt_balance.textContent)>=1000){
          Object.keys(cola_obj).includes(clicked_cola) ? itemCount(clicked_cola) : newItem(clicked_cola, event);
        }
      }
  }
)

function newItem(clicked_cola, event){
  con_getCola.insertAdjacentHTML("afterbegin", createGetHTMLString(event));
  itemCount(clicked_cola);
}

function createGetHTMLString(item){
  let className = item.target.classList.value;
  let arr = className.split("");
  arr.splice(0,5);
  className = arr.join("");

  return `
  <div data-value="${className}" class="con-cola">
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


// json 함수 호출
getJson()
    .then(items=>{
        displayMainItems(items)
    });



