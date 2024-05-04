class MoneyTools {
    toWords(money:string):string {
        let result = '';

        while (money.length !== 0) {
            while (money[0] === '0') money = money.slice(1);

            if (money === '') break;

            const dict = {
                '1': money.length >= 7  || money.length == 1 ? 'satu ' : 'se',
                '2':'dua ',
                '3':'tiga ',
                '4':'empat ',
                '5':'lima ',
                '6':'enam ',
                '7':'tujuh ',
                '8':'delapan ',
                '9':'sembilan ',
            };

            const unit = {
                '1': '',
                '2': money[0] === '1' && money[1] !== '0' ? 'belas ' : 'puluh ',
                '3': 'ratus ',
                '4': 'ribu ',
                '5': 'puluh ribu ',
                '6': 'ratus ribu ',
                '7': 'juta '
            };

            let index = money.length == 2 && money[0] == '1' && parseInt(money[1]) > 1 ? 1 : 0;
            const isTeenNumbers = money.length === 5 && money[0] === '1';
            const isAboveTeenNumbers = money.length === 5 && parseInt(money[0]) > 1;

            if (isTeenNumbers) result += `${dict[money[index + 1]]}belas ${unit[money.length-1]}`;
            else if (isAboveTeenNumbers) result += `${dict[money[index + 1]]}puluh `;
            else {
                result += `${dict[money[index]]}${unit[money.length]}`
            }

            const isUnderTwenty = money.length == 2 && money[0] == '1';
            if (money[1] == '0' || isUnderTwenty || isTeenNumbers) money = money.slice(2);
            else {
                money = money.slice(1)
            };
        }

        return result;
    }

    parse(money:string):object{
        return {};
    }
}

const mt = new MoneyTools();
const getId = (el:string) => document.getElementById(el) as HTMLInputElement;

const inputTxt = getId('input-txt');
const outputTxt = getId('output-txt');
const actionBtn = getId('submit-btn');

const isNumber = (s:string):number => {
    return s.split(' ').filter(s => s.charCodeAt(0) > 47 && s.charCodeAt(0) < 58).length;
};

inputTxt?.addEventListener('keyup', (e) => {
    if (!isNumber(inputTxt!.value)) {
        inputTxt!.value = '';
        inputTxt?.focus;
    }

    outputTxt.value = mt.toWords(inputTxt.value);
});