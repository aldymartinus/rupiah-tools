var MoneyTools = /** @class */ (function () {
    function MoneyTools() {
    }
    MoneyTools.prototype.toWords = function (money) {
        var result = '';
        while (money.length !== 0) {
            while (money[0] === '0')
                money = money.slice(1);
            if (money === '')
                break;
            var dict = {
                '1': money.length >= 7 || money.length == 1 ? 'satu ' : 'se',
                '2': 'dua ',
                '3': 'tiga ',
                '4': 'empat ',
                '5': 'lima ',
                '6': 'enam ',
                '7': 'tujuh ',
                '8': 'delapan ',
                '9': 'sembilan ',
            };
            var unit = {
                '1': '',
                '2': money[0] === '1' && money[1] !== '0' ? 'belas ' : 'puluh ',
                '3': 'ratus ',
                '4': 'ribu ',
                '5': 'puluh ribu ',
                '6': 'ratus ribu ',
                '7': 'juta '
            };
            var index = money.length == 2 && money[0] == '1' && parseInt(money[1]) > 1 ? 1 : 0;
            var isTeenNumbers = money.length === 5 && money[0] === '1';
            var isAboveTeenNumbers = money.length === 5 && parseInt(money[0]) > 1;
            if (isTeenNumbers)
                result += "".concat(dict[money[index + 1]], "belas ").concat(unit[money.length - 1]);
            else if (isAboveTeenNumbers)
                result += "".concat(dict[money[index + 1]], "puluh ");
            else {
                result += "".concat(dict[money[index]]).concat(unit[money.length]);
            }
            var isUnderTwenty = money.length == 2 && money[0] == '1';
            if (money[1] == '0' || isUnderTwenty || isTeenNumbers)
                money = money.slice(2);
            else {
                money = money.slice(1);
            }
            ;
        }
        return result;
    };
    MoneyTools.prototype.parse = function (money) {
        return {};
    };
    return MoneyTools;
}());
var mt = new MoneyTools();
var getId = function (el) { return document.getElementById(el); };
var inputTxt = getId('input-txt');
var outputTxt = getId('output-txt');
var actionBtn = getId('submit-btn');
var isNumber = function (s) {
    return s.charCodeAt(0) > 47 && s.charCodeAt(0) < 58;
};
inputTxt === null || inputTxt === void 0 ? void 0 : inputTxt.addEventListener('keyup', function (e) {
    if (!isNumber(e.key)) {
        inputTxt.value = '';
        inputTxt === null || inputTxt === void 0 ? void 0 : inputTxt.focus;
    }
    outputTxt.value = mt.toWords(inputTxt.value);
});
