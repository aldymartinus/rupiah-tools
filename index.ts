class MoneyTools {
    toWords(money:string):string {
        const dict = {
            '1': money.length >= 7 ? 'Satu' : 'Se',
            '2':'Dua',
            '3':'Tiga',
            '4':'Empat',
            '5':'Lima',
            '6':'Enam',
            '7':'Tujuh',
            '8':'Delapan',
            '9':'Sembilan',
        };

        const unit = {
            '2': money[0] === '1' ? 'belas' : 'puluh',
            '3': 'ratus',
            '4': 'ribu',
            '5': 'puluh ribu'
        };

        return `${dict[money[0]]} ${unit[money.length]}`;
    }

    parse(money:string):object{
        return {};
    }
}

const mt = new MoneyTools();
console.log(mt.toWords('3100'));
