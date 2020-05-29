var year = [prompt()];
function isLeap(year) {
    var leap = 0;
    if (year % 4 == 0) {
        leap = 'true';
    } else { leap = 'false'; }
    if (year % 100 == 0) {
        leap = 'false';
    }
    if (year % 400 == 0) {
        leap = 'true';
    }
    return (leap);
}

