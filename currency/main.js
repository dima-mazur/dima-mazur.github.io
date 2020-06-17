document.getElementById("btnGet").addEventListener("click", getRate);


var BASE_URL = "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=";

function getRate(e) {
    var radio = document.getElementsByName("inlineRadioOptions");
    for (let i = 0; i < radio.length; i++) {
        if (radio[i].checked) {
            var radioValue = radio[i];
        }
    }
    var datev = cdate.value.split("-").join("");
    var URI = BASE_URL + radioValue.value + "&date=" + datev + "&json";
    var XHR = new XMLHttpRequest();
    XHR.open("GET", URI);
    XHR.send();
    XHR.addEventListener("readystatechange", handler);
}

function handler(e) {
    if ((e.target.readyState === 4) && (e.target.status === 200)) {
        var data = JSON.parse(e.target.responseText)[0];
        currencyValue.innerHTML = "<span>" + data.rate + "</span>";
    }
}

// ниже раздел с калькулятором
document.getElementById("optionCalendar").addEventListener("click", visible)
function visible(e) {
    document.getElementById('calcdate').setAttribute('class', 'visible');
    document.getElementById('btnGetCalc').setAttribute('class', 'visible');
}

document.getElementById("optionToday").addEventListener("click", () => { invisible(); getRateToday(); });
function invisible(e) {
    document.getElementById('calcdate').setAttribute('class', 'invisible');
    document.getElementById('btnGetCalc').setAttribute('class', 'invisible');
}

document.getElementById("btnGetCalc").addEventListener("click", getRateCalendar);

var currency = ['USD', 'EUR', 'RUB'];
var UAH = document.getElementById('UAH');
var USD = document.getElementById('USD');
var EUR = document.getElementById('EUR');
var RUB = document.getElementById('RUB');
document.getElementById('UAH').addEventListener('change', uahcalc);
document.getElementById("USD").addEventListener("change", usdcalc);
document.getElementById('EUR').addEventListener('change', eurcalc);
document.getElementById('RUB').addEventListener('change', rubcalc);

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
today = yyyy + mm + dd;

var usdRate = 0;
var eurRate = 0;
var rubRate = 0;
var uahRate = 0;

var XHRusd = 0;
var XHReur = 0;
var XHRrub = 0;

var URIcalc = [];

function calcUSD(e) {
    var currencyRate = JSON.parse(e.target.responseText)[0];
    usdRate = currencyRate.rate;
}

function calcEUR(e) {
    var currencyRate = JSON.parse(e.target.responseText)[0];
    eurRate = currencyRate.rate;
}

function calcRUB(e) {
    var currencyRate = JSON.parse(e.target.responseText)[0];
    rubRate = currencyRate.rate;
}


function getRateToday(e) {
    for (var i = 0; i < currency.length; i++) {
        URIcalc.push(BASE_URL + currency[i] + "&date=" + today + "&json");
    }
    var URIusd = URIcalc[0];
    var URIeur = URIcalc[1];
    var URIrub = URIcalc[2];

    XHRusd = new XMLHttpRequest();
    XHRusd.open("GET", URIusd);
    XHRusd.send();
    XHRusd.addEventListener("readystatechange", calcUSD);

    XHReur = new XMLHttpRequest();
    XHReur.open("GET", URIeur);
    XHReur.send();
    XHReur.addEventListener("readystatechange", calcEUR);

    XHRrub = new XMLHttpRequest();
    XHRrub.open("GET", URIrub);
    XHRrub.send();
    XHRrub.addEventListener("readystatechange", calcRUB);
}

function getRateCalendar() {
    var URIcalcChooseDate = [];
    var dateCalc = calcdate.value.split("-").join("");
    for (var i = 0; i < currency.length; i++) {
        URIcalcChooseDate.push(BASE_URL + currency[i] + "&date=" + dateCalc + "&json");

        console.log(dateCalc);

    }
    var URIusd = URIcalcChooseDate[0];
    var URIeur = URIcalcChooseDate[1];
    var URIrub = URIcalcChooseDate[2];

    XHRusd = new XMLHttpRequest();
    XHRusd.open("GET", URIusd);
    XHRusd.send();
    XHRusd.addEventListener("readystatechange", calcUSD);

    XHReur = new XMLHttpRequest();
    XHReur.open("GET", URIeur);
    XHReur.send();
    XHReur.addEventListener("readystatechange", calcEUR);

    XHRrub = new XMLHttpRequest();
    XHRrub.open("GET", URIrub);
    XHRrub.send();
    XHRrub.addEventListener("readystatechange", calcRUB);
}

function usdcalc(e) {
    if (isNaN(Number(e.target.value))) {
        return;
    } else {
        UAH.value = (e.target.value * usdRate).toFixed(2);
        EUR.value = (e.target.value * (usdRate / eurRate)).toFixed(2);
        RUB.value = (e.target.value * (usdRate / rubRate)).toFixed(2);
    }
}

function uahcalc(e) {
    if (isNaN(Number(e.target.value))) {
        return;
    } else {
        USD.value = (e.target.value / usdRate).toFixed(2);
        EUR.value = (e.target.value / eurRate).toFixed(2);
        RUB.value = (e.target.value / rubRate).toFixed(2);
    }
}

function eurcalc(e) {
    if (isNaN(Number(e.target.value))) {
        return;
    } else {
        USD.value = (e.target.value * (eurRate / usdRate)).toFixed(2);
        UAH.value = (e.target.value * eurRate).toFixed(2);
        RUB.value = (e.target.value * (eurRate / rubRate)).toFixed(2);
    }
}

function rubcalc(e) {
    if (isNaN(Number(e.target.value))) {
        return;
    } else {
        USD.value = (e.target.value * (rubRate / usdRate)).toFixed(2);
        UAH.value = (e.target.value * rubRate).toFixed(2);
        EUR.value = (e.target.value * (rubRate / eurRate)).toFixed(2);
    }
}

