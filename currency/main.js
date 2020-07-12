document.addEventListener("DOMContentLoaded", () => { getRateToday(), getRate() });
document.getElementById("btnGet").addEventListener("click", getRate);

const BASE_URL = "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=";

let getJson = (response) => response.json();
let checkError = (error) => alert('Request failed', error);

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response);
    }
    return Promise.reject(new Error(response.statusText));
}

function getRate(e) {
    let currencyRadioButtonValue = document.getElementsByName("inlineRadioOptions");
    let radioValue;
    for (let i = 0; i < currencyRadioButtonValue.length; i++) {
        if (currencyRadioButtonValue[i].checked) {
            radioValue = currencyRadioButtonValue[i];
        }
    }

    let dateValue = cdate.value.split("-").join("");
    if (dateValue == 0) {
        dateValue = today;
    } else {
        dateValue;
    }
    let URI = BASE_URL + radioValue.value + "&date=" + dateValue + "&json";

    fetch(URI)
        .then(checkStatus)
        .then(getJson)
        .then(function (data) {
            currencyValue.innerHTML = "<span>" + data[0].rate + "</span>";
        })
        .catch(checkError);
}

// chapter with calculator
document.getElementById("optionCalendar").addEventListener("click", visibleCalendar)
function visibleCalendar(e) {
    document.getElementById('calcDate').setAttribute('class', 'visible');
    document.getElementById('btnGetCalc').setAttribute('class', 'visible');
}

document.getElementById("optionToday").addEventListener("click", () => { invisibleCalendar(); getRateToday(); });
function invisibleCalendar(e) {
    document.getElementById('calcDate').setAttribute('class', 'invisible');
    document.getElementById('btnGetCalc').setAttribute('class', 'invisible');
}

document.getElementById("btnGetCalc").addEventListener("click", () => { getRateCalendar() });

const CURRENCY = ['USD', 'EUR', 'RUB'];
const UAH = document.getElementById('UAH');
const USD = document.getElementById('USD');
const EUR = document.getElementById('EUR');
const RUB = document.getElementById('RUB');
UAH.addEventListener('change', uahCalc);
USD.addEventListener('change', usdCalc);
EUR.addEventListener('change', eurCalc);
RUB.addEventListener('change', rubCalc);

let today = new Date();
const dd = String(today.getDate()).padStart(2, '0');
const mm = String(today.getMonth() + 1).padStart(2, '0');
const yyyy = today.getFullYear();
today = yyyy + mm + dd;

let usdRate = 0;
let eurRate = 0;
let rubRate = 0;
let uahRate = 0;

let URIcalc = [];

let calcUSD = (data) => usdRate = data[0].rate;
let calcEUR = (data) => eurRate = data[0].rate;
let calcRUB = (data) => rubRate = data[0].rate;

function getRateToday(e) {
    for (let i = 0; i < CURRENCY.length; i++) {
        URIcalc.push(BASE_URL + CURRENCY[i] + "&date=" + today + "&json");
    }
    let URIusd = URIcalc[0];
    let URIeur = URIcalc[1];
    let URIrub = URIcalc[2];

    fetch(URIusd)
        .then(checkStatus)
        .then(getJson)
        .then(calcUSD)
        .catch(checkError);

    fetch(URIeur)
        .then(checkStatus)
        .then(getJson)
        .then(calcEUR)
        .catch(checkError);

    fetch(URIrub)
        .then(checkStatus)
        .then(getJson)
        .then(calcRUB)
        .catch(checkError);
}

function getRateCalendar() {
    let URIcalcChooseDate = [];
    let dateCalculateRate = calcDate.value.split("-").join("");
    for (let i = 0; i < CURRENCY.length; i++) {
        URIcalcChooseDate.push(BASE_URL + CURRENCY[i] + "&date=" + dateCalculateRate + "&json");
    }
    let UriUsd = URIcalcChooseDate[0];
    let UriEur = URIcalcChooseDate[1];
    let UriRub = URIcalcChooseDate[2];

    fetch(UriUsd)
        .then(checkStatus)
        .then(getJson)
        .then(calcUSD)
        .catch(checkError);

    fetch(UriEur)
        .then(checkStatus)
        .then(getJson)
        .then(calcEUR)
        .catch(checkError);

    fetch(UriRub)
        .then(checkStatus)
        .then(getJson)
        .then(calcRUB)
        .catch(checkError);
}

function usdCalc(e) {
    if (isNaN(Number(e.target.value))) {
        return;
    }
    UAH.value = (e.target.value * usdRate).toFixed(2);
    EUR.value = (e.target.value * (usdRate / eurRate)).toFixed(2);
    RUB.value = (e.target.value * (usdRate / rubRate)).toFixed(2);
}

function uahCalc(e) {
    if (isNaN(Number(e.target.value))) {
        return;
    }
    USD.value = (e.target.value / usdRate).toFixed(2);
    EUR.value = (e.target.value / eurRate).toFixed(2);
    RUB.value = (e.target.value / rubRate).toFixed(2);
}

function eurCalc(e) {
    if (isNaN(Number(e.target.value))) {
        return;
    }
    USD.value = (e.target.value * (eurRate / usdRate)).toFixed(2);
    UAH.value = (e.target.value * eurRate).toFixed(2);
    RUB.value = (e.target.value * (eurRate / rubRate)).toFixed(2);
}

function rubCalc(e) {
    if (isNaN(Number(e.target.value))) {
        return;
    }
    USD.value = (e.target.value * (rubRate / usdRate)).toFixed(2);
    UAH.value = (e.target.value * rubRate).toFixed(2);
    EUR.value = (e.target.value * (rubRate / eurRate)).toFixed(2);
}