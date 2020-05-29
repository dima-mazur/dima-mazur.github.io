// задаю массмв
var numbers = [4, 9, -6, 13, 25, -5, 2, 0, 7, -3];


//  Поиск максимального значения
function max(numbers) {
    var _max = numbers[0];
    for (var i = 1; i < numbers.length; i++) {
        if (numbers[i] > _max) {
            _max = numbers[i];
        }
    }
    return _max;
}

//  Поиск минимального значения
function min(numbers) {
    var _min = numbers[0];
    for (var i = 1; i < numbers.length; i++) {
        if (numbers[i] < _min) {
            _min = numbers[i];
        }
    }
    return _min;
}

// сумма позитивных 
function sumPositive(numbers) {
    var sum = 0;
    for (var i = 0; i < numbers.length; i++) {
        if (numbers[i] > 0) {
            sum = sum + numbers[i];
        }
    }
    return sum;
}

// умножение отрицательных
function prodNegative(numbers) {
    var prod = 1;
    for (var i = 0; i < numbers.length; i++) {
        if (numbers[i] < 0) {
            prod = numbers[i] * prod;
        }
    }
    return prod;
}

// Количество отрицательных и положительных
function amoPosNeg(numbers) {
    var amoPos = 0;
    var amoNeg = 0;
    for (var i = 0; i < numbers.length; i++) {
        if (numbers[i] < 0) {
            amoNeg = 1 + amoNeg;
        }
        if  (numbers[i] > 0) {
            amoPos = amoPos + 1;
        }
    }
    return ('количестов отрицательных = ' + amoNeg + ' количестов положительных = ' + amoPos)
}

