document.getElementById("btnGet").addEventListener("click", getRate);

function getRate(e) {
    var BASE_URL = "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=";
    var datev = cdate.value.split("-").join("");
    var URI = BASE_URL + currency.value + "&date=" + datev + "&json";
    // console.log(URI);
    
    var XHR = new XMLHttpRequest();
    XHR.open("GET", URI);
    XHR.send();
    XHR.addEventListener("readystatechange", handler);
}

function handler(e) {
    if ((e.target.readyState === 4) && (e.target.status === 200)) {
        var data = JSON.parse(e.target.responseText)[0];
        // console.log(data);
        var result = document.createElement("span");
        result.innerText = data.rate;
        // console.log(result);
        document.getElementById("currencyValue").appendChild(result);
    }
}