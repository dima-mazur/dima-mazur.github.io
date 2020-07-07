document.addEventListener("DOMContentLoaded", () => { getRateToday(), getRate(), todayDateValue() });
document.getElementById("btnGet").addEventListener("click", getRate);

const BASE_URL = "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=";

// console.log (URI);

function todayDateValue () {
    document.getElementById('cdate').value = [today].splice(4, 1, '-');
}

function getJson(response) {
    return response.json();
}

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
    let URI = BASE_URL + radioValue.value + "&date=" + dateValue + "&json";

    fetch(URI)
        .then(checkStatus)
        .then(getJson)
        .then(function (data) {
            currencyValue.innerHTML = "<span>" + data[0].rate + "</span>";
        })
        .catch(function (error) {
            alert('Request failed', error);
        });
    }

    // chapter with calculator
    document.getElementById("optionCalendar").addEventListener("click", visible)
    function visible(e) {
        document.getElementById('calcDate').setAttribute('class', 'visible');
        document.getElementById('btnGetCalc').setAttribute('class', 'visible');
    }

    document.getElementById("optionToday").addEventListener("click", () => { invisible(); getRateToday(); });
    function invisible(e) {
        document.getElementById('calcDate').setAttribute('class', 'invisible');
        document.getElementById('btnGetCalc').setAttribute('class', 'invisible');
    }

    document.getElementById("btnGetCalc").addEventListener("click", () => {getRateCalendar()});

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
        for (var i = 0; i < CURRENCY.length; i++) {
            URIcalc.push(BASE_URL + CURRENCY[i] + "&date=" + today + "&json");
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
        var dateCalc = calcDate.value.split("-").join("");
        for (var i = 0; i < CURRENCY.length; i++) {
            URIcalcChooseDate.push(BASE_URL + CURRENCY[i] + "&date=" + dateCalc + "&json");

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

    function usdCalc(e) {
        if (isNaN(Number(e.target.value))) {
            return;
        } else {
            UAH.value = (e.target.value * usdRate).toFixed(2);
            EUR.value = (e.target.value * (usdRate / eurRate)).toFixed(2);
            RUB.value = (e.target.value * (usdRate / rubRate)).toFixed(2);
        }
    }

    function uahCalc(e) {
        if (isNaN(Number(e.target.value))) {
            return;
        } else {
            USD.value = (e.target.value / usdRate).toFixed(2);
            EUR.value = (e.target.value / eurRate).toFixed(2);
            RUB.value = (e.target.value / rubRate).toFixed(2);
        }
    }

    function eurCalc(e) {
        if (isNaN(Number(e.target.value))) {
            return;
        } else {
            USD.value = (e.target.value * (eurRate / usdRate)).toFixed(2);
            UAH.value = (e.target.value * eurRate).toFixed(2);
            RUB.value = (e.target.value * (eurRate / rubRate)).toFixed(2);
        }
    }

    function rubCalc(e) {
        if (isNaN(Number(e.target.value))) {
            return;
        } else {
            USD.value = (e.target.value * (rubRate / usdRate)).toFixed(2);
            UAH.value = (e.target.value * rubRate).toFixed(2);
            EUR.value = (e.target.value * (rubRate / eurRate)).toFixed(2);
        }
    }