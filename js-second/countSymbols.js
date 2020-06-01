var word = String(prompt('введи слово'));
function countSymbols(word) {
    var _word = word.split('');
    var result = {};
    for (var i = 0; i < _word.length; i++) {
        if (result.hasOwnProperty(_word[i])){
            result[_word[i]]++;
        } else {result[_word[i]]=1}
}
return result;
    }
