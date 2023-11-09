const items = document.querySelectorAll(".container__item");

items.forEach(item => {
    item.addEventListener('mouseover', () => {
        removeFocus();
        item.classList.add('container_selected')
    })

    removeFocus = () => {
        items.forEach(item => {
            item.classList.remove('container_selected')
        })
    }
})

//модальное окно
document.addEventListener("DOMContentLoaded", () => {
    // Кнопка по которой происходит клик
    let callBackButton = document.querySelector('#callback-button');

    // Модальное окно, которое необходимо открыть
    let modal = document.querySelector("#modal");

    // Кнопка "закрыть" внутри модального окна
    let closeButton = modal.querySelector(".modal__close-button");

    // Тег body для запрета прокрутки
    let tagBody = document.querySelector("body");

    callBackButton.addEventListener("click", (e) => {
        e.preventDefault();
        modal.classList.add("modal_active");
        tagBody.classList.add("hidden");
    })

    closeButton.addEventListener("click", (e) => {
        e.preventDefault();
        modal.classList.remove("modal_active");
        tagBody.classList.remove("hidden");
    })
})

//расчет
const calculateBtn = document.querySelector("#calculate");

calculateBtn.addEventListener("click", calculate);

function calculate(e) {
    e.preventDefault();
    const place = document.querySelector("#place").value*1;
    const hotel = document.querySelector("#hotel").value*1;
    const food = document.querySelector("#food").value*1;
    const days = document.querySelector("#days").value*1;
    const people = document.querySelector("#people").value*1;

    if(days === "" || people === "" || people < 1  || days < 1) {
        Swal.fire({
            icon: 'error',
            text: 'Пожалуйста, введите полную информацию!',
            color: '#212121',
            background: '#F6F6F6',
            confirmButtonColor: '#6D9886'
        })

        place = false;
    }

    const check = document.querySelector("#check");
    const checkPrice = check.checked ? Number(check.value) : 0;
    
    let amountPerPerson = (hotel+food+place)*days+checkPrice;
    let totalAmount = amountPerPerson*people;

    amountPerPerson = amountPerPerson.toFixed(2);
    totalAmount = totalAmount.toFixed(2);
    
    document.querySelector("#sumCommon").textContent = totalAmount;
    document.querySelector("#sumPerson").textContent = amountPerPerson;
}

//сброс
const form = document.querySelector("form");
const showBill = document.querySelector("#showBill");
const resetBtn = document.querySelector("#reset");

resetBtn.addEventListener("click", () => {
    form.reset();

    document.querySelector("#sumCommon").textContent = "";
    document.querySelector("#sumPerson").textContent = ""; 
})

//счетчик
const day = document.querySelector("#day");
const hours = document.querySelector("#hours");
const minutes = document.querySelector("#minutes");
const seconds = document.querySelector("#seconds");

function countDown () {
    const now = new Date();
    const finish = new Date("January 20, 2024, 00:00");
    const diff = finish - now;

    const msInSecond = 1000;
    const msInMinute = 60 * 1000;
    const msInHour = 60 * 60 * 1000;
    const msInDay = 24 * 60 * 60 * 1000;

    const inRussia = function declOfNum(number, titles) {
        cases = [2, 0, 1, 1, 1, 2];
        return titles [(number%100>4 && number%100<20)? 2 : cases[(number%10<5)? number%10:5]];
    }

    const displayDays = Math.floor(diff / msInDay);
    day.textContent = displayDays;
    const dayInRussia = inRussia(displayDays, ['День', 'Дня', 'Дней']);
    document.querySelector('#daysName').textContent = dayInRussia;

    const displayHours = Math.floor((diff % msInDay) / msInHour);
    hours.textContent = displayHours;
    const hoursInRussia = inRussia(displayHours, ['Час', 'Часа', 'Часов']);
    document.querySelector("#hoursName").textContent = hoursInRussia;

    const displayMinutes = Math.floor((diff % msInHour) / msInMinute);
    minutes.textContent = displayMinutes;
    const minutesInRussia = inRussia(displayMinutes, ['Минута', 'Минуты', 'Минут']);
    document.querySelector("#minutesName").textContent = minutesInRussia;

    const displaySeconds = Math.floor((diff % msInMinute) / msInSecond);
    seconds.textContent = displaySeconds;
    const secondsInRussia = inRussia(displaySeconds, ['Секунда', 'Секунды', 'Секунд']);
    document.querySelector("#secondsName").textContent = secondsInRussia;

    if(diff <= 0) {
        day.textContent = 0;
        hours.textContent = 0;
        minutes.textContent = 0;
        seconds.textContent = 0;
        document.querySelector('#daysName').textContent = "Дней";
        document.querySelector("#hoursName").textContent = "Часов";
        document.querySelector("#minutesName").textContent = "Минут";
        document.querySelector("#secondsName").textContent = "Секунд";
        clearInterval(timer);

        document.querySelector(".flex__subtitle").style.display = "none";
        document.querySelector(".flex__heading").textContent = "Акция закончилась!"
    }
}

let timer = setInterval(countDown, 1000);