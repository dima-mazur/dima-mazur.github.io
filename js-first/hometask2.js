var n, m;
m = Number(prompt('Введіть занчення m'))
if (m > 0) {
    n = 1
}
if (m == 0) {
    n = 0
}
if (m < 0) {
    n = Number(-1)
}
alert(n);