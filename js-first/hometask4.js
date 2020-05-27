var sum = 0;
var finish = Number(prompt('введіть число, до якого необходідно визначити сумму всіх цілих чисел'))
for (var i = 0; i <= finish; i++) {
    sum = sum + i;
}
alert('Сумма чисел =' + (sum))