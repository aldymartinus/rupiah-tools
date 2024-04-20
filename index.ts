class MoneyTools {
    toWords(money:string):string {
        let result = '';

        const dict = {
            '1': money.length >= 7 ? 'Satu ' : 'Se',
            '2':'dua ',
            '3':'tiga ',
            '4':'empat ',
            '5':'lima ',
            '6':'enam ',
            '7':'tujuh ',
            '8':'delapan ',
            '9':'sembilan ',
        };

        while (money[0] != '0') {
            if (money.length === 0 && money[0] != '0') break;

            const unit = {
                '1': '',
                '2': money[0] === '1' ? 'belas ' : 'puluh ',
                '3': 'ratus ',
                '4': 'ribu ',
                '5': 'puluh ribu ',
                '6': 'ratus ribu ',
                '7': 'juta '
            };

            result += `${dict[money[0]]}${unit[money.length]}`
            money = money.slice(1);
        }

        return result;
    }

    parse(money:string):object{
        return {};
    }
}

const mt = new MoneyTools();
console.log(mt.toWords('1945'));
