const express = require('express');
const bodyParser = require('body-parser');
const config = require('./lib/config');
const path = require('path');

// ----- Routes -----
const indexRoute = require('./routes/index');
const assetsRoute = require('./routes/assets');


const app = express();

app.set('views', path.join(__dirname, './public/pug'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, './public')));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());



app.use('/', indexRoute);
app.use('/api/assets', assetsRoute);


app.use((req, res) => {
    res.status(404).send('Page Not Found');
});


app.listen(config.PORT, () => {
    console.log(`Server is running on PORT - ${config.PORT}`);
});






const dateFormat = require('dateformat');

const completedDeals = [
    {
        type: 'etf',
        name: 'Акции компаний IT-сектора США',
        buyCommission: 1.37,
        sellCommission: 14.84,
        buyDate: new Date(2018, 6, 26, 10, 4),
        sellDate: new Date(2018, 7, 27, 10, 55),
        buyPrice: 4560,
        sellPrice: 4945,
        currencyCode: 'RUB'
    },
    {
        type: 'bond',
        name: 'Ярославская обл. об.2014г.',
        buyCommission: 0.10,
        sellCommission: 0.99,
        buyDate: new Date(2018, 6, 17, 12, 43),
        sellDate: new Date(2018, 7, 16, 11, 27),
        buyPrice: 334.03,
        sellPrice: 333.60,
        currencyCode: 'RUB'
    },
    {
        type: 'bond',
        name: 'МКБ выпуск 7',
        buyCommission: 0.30,
        sellCommission: 3.01,
        buyDate: new Date(2018, 6, 24, 10, 26),
        sellDate: new Date(2018, 7, 1, 14, 3),
        buyPrice: 1028.09,
        sellPrice: 1029.84,
        currencyCode: 'RUB'
    }
];

const calcCompleted = {};

calcCompleted.earnedOneAsset = (asset) => {
    let totalCommission = asset.buyCommission + asset.sellCommission;
    let priceDifference = asset.sellPrice - asset.buyPrice;
    return priceDifference - totalCommission;
};

calcCompleted.earnedTotal = () => {
    let result = 0;
    completedDeals.forEach((deal) => {
        result += calcCompleted.earnedOneAsset(deal);
    });
    console.log(result);
};


completedDeals.forEach((deal) => {
    console.log(calcCompleted.earnedOneAsset(deal));
});

calcCompleted.earnedTotal();