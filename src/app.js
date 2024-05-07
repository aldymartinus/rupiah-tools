var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
                '7': 'juta ',
                '8': 'puluh juta ',
                '9': 'ratus juta',
                '10': 'milyar',
                '11': 'puluh milyar',
                '12': 'ratus milyar',
                '13': 'triliun',
                '14': 'puluh triliun',
                '15': 'ratus triliun'
            };
            var index = money.length == 2 && money[0] == '1' && parseInt(money[1]) > 1 ? 1 : 0;
            var isTeenNumbers = money.length === 5 && money[0] === '1' && parseInt(money[1]) > 0;
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
        var nominal = [100000, 50000, 20000, 10000, 5000, 2000, 1000, 500, 200];
        var pas = [];
        var i = 0;
        while (money != 0) {
            pas.push(Math.floor(money / nominal[i]));
            money = money % nominal[i];
            i++;
        }
        return nominal.reduce(function (acc, curr, index) {
            var _a;
            var _b;
            return (__assign(__assign({}, acc), (_a = {}, _a[curr] = (_b = pas[index]) !== null && _b !== void 0 ? _b : 0, _a)));
        }, {});
    };
    return MoneyTools;
}());
var mt = new MoneyTools();
var getId = function (el) { return document.getElementById(el); };
var inputTxt = getId('input-txt');
var outputTxt = getId('output-txt');
var actionBtn = getId('submit-button');
var resetBtn = getId('reset-button');
var isNumber = function (s) {
    return s.charCodeAt(0) > 47 && s.charCodeAt(0) < 58;
};
actionBtn === null || actionBtn === void 0 ? void 0 : actionBtn.addEventListener('click', function (e) {
    outputTxt.value = mt.toWords(inputTxt.value);
});
resetBtn === null || resetBtn === void 0 ? void 0 : resetBtn.addEventListener('click', function (e) {
    inputTxt.value = '';
    outputTxt.value = '';
});
