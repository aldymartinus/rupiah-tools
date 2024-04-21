class MoneyTools {
    toWords(money:string):string {
        let result = '';

        while (money.length !== 0) {
            while (money[0] === '0') money = money.slice(1); //2008 case

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

            result += `${dict[money[index]]}${unit[money.length]}`

            const isUnderTwenty = money.length == 2 && money[0] == '1';
            if (money[1] == '0' || isUnderTwenty) money = money.slice(2);
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
console.log(mt.toWords('2030'));
// 21 solved
// 110
//12500
//1225 solved
//2008 solved