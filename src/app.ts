class MoneyTools {
    toWords(money: string): string {
        let result = '';

        while (money.length !== 0) {
            while (money[0] === '0') money = money.slice(1);

            if (money === '') break;

            const dict = {
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

            const unit = {
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

            let index = money.length == 2 && money[0] == '1' && parseInt(money[1]) > 1 ? 1 : 0;
            const isTeenNumbers = money.length === 5 && money[0] === '1' && parseInt(money[1]) > 0;
            const isAboveTeenNumbers = money.length === 5 && parseInt(money[0]) > 1;

            if (isTeenNumbers) result += `${dict[money[index + 1]]}belas ${unit[money.length - 1]}`;
            else if (isAboveTeenNumbers) result += `${dict[money[index]]}puluh `;
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

    parse(money: number): object {
        const fractions = [100000, 50000, 20000, 10000, 5000, 2000, 1000, 500, 200];
        const quantity: number[] = [];
        let i = 0;
        while (money != 0) {
            quantity.push(Math.floor(money / fractions[i]));
            money = money % fractions[i];
            i++;
        }

        // return nominal.reduce((acc, curr, index) => ({...acc, [curr]: qtyOfFractions[index] ?? 0}), {});
        return fractions.map((val, index) => {
            return {[val]:quantity[index] ?? 0};
        });
    }
}

const mt = new MoneyTools();
const getId = (el: string) => document.getElementById(el) as HTMLInputElement;

const inputTxt = getId('input-txt');
const outputTxt = getId('output-txt');
const actionBtn = getId('submit-button');
const resetBtn = getId('reset-button');
const parseTable = getId('parse-table');

const isNumber = (s: string): boolean => {
    return s.charCodeAt(0) > 47 && s.charCodeAt(0) < 58
};

actionBtn?.addEventListener('click', (e) => {
    const parseData = mt.parse(parseInt(inputTxt.value));
    outputTxt.value = mt.toWords(inputTxt.value);
    renderParseTable(parseData);
});

resetBtn?.addEventListener('click', (e) => {
    inputTxt.value = '';
    outputTxt.value = '';
    parseTable.innerHTML = '';
});

const renderParseTable = (data) => {

    parseTable.innerHTML = `
    <tr>
        <th>Fractions</th>
        <th>Quantity</th>
    </tr>
    `;

    data.forEach((element:Number) => {
        const tr = document.createElement('tr');
        const td_fractions = document.createElement('td');
        const td_qty = document.createElement('td');

        const key = Object.keys(element)[0];
        td_fractions.textContent = key;
        td_qty.textContent = `${element[key]} lembar`;

        tr.appendChild(td_fractions);
        tr.appendChild(td_qty)

        parseTable.appendChild(tr);
    });
};

// -- number to word issues --
// 1 2500 000
// 120 000