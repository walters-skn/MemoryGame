const items_layout = document.querySelector(".items-layout");
let items_array = [];
let first_card = null;
let second_card = null;
let isAlreadyTwoFlipped = false;

function renderItems (items){
    items.forEach(item => {
        items_layout.innerHTML += 
            `<div class = "item-card" data-name="${item.image_link}">
                <img class="front-cover" src=${item.image_link} />
                <img class="back-cover" src="images/back-cover.jpeg" />
            </div>`

    });

    shuffleAndClickEventOfItem(document.querySelectorAll(".item-card"));

}

function shuffleAndClickEventOfItem(itemCards) {
    itemCards.forEach(itemCard=>{
        itemCard.style.order = Math.floor(Math.random() * itemCards.length)
        itemCard.onclick = function () {
            flipEvent(itemCard);
        }
    })
}

function flipEvent(itemCard) {
    if(isAlreadyTwoFlipped === true) {
        return;
    }
    if (itemCard === first_card) {
        return;
    }

    itemCard.classList.add('flip');

    if(first_card === null) {
        first_card = itemCard;
    } else if(second_card === null){
        second_card = itemCard;
        isAlreadyTwoFlipped = true;
        doSomeMatchCheck();
    }
}

function doSomeMatchCheck(){
    if(first_card.dataset.name === second_card.dataset.name){
        // Successed!
        first_card.onclick = null;
        second_card.onclick = null;
        setTimeout(()=>{
            alert("Excellent!");
        }, 1000);
    } else {
        //failed!
        setTimeout(()=>{
            first_card.classList.remove("flip");
            second_card.classList.remove("flip");
        }, 1000);
    }

    setTimeout(function(){
        // reset value to initial
        first_card = null;
        second_card = null;
        isAlreadyTwoFlipped = false;
    }, 1500)
}

function readJSONfile(fileName) {
    fetch(fileName).then((response)=>{
        return response.json();
    }).then((data)=>{
        items_array = data.items;
        renderItems(items_array);
    })
}

readJSONfile("seeders/data.json")