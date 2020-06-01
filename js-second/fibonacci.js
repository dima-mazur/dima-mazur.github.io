// Последовательность Фибоначчи
function generateFibonacciSequence(n) {
    if (Number(n) <= 0) {var fibo = null;} 
    if (Number(n) == 1) {var fibo = [1];}
    if (Number(n) >= 2) {
        var fibo = [1, 1];
        for (var i = 2; i < n; i++) {
            fibo[i] = fibo[i - 2] + fibo[i - 1];}
        }
        return fibo;
    }
