const dateFormat = require('dateformat');
const data = require('../lib/data');
const calculator = require('../lib/assetsCalculation');
const bondDir = 'completedDeals/BOND';
const etfDir = 'completedDeals/ETF';
const shareDir = 'completedDeals/SHARE';


module.exports.get = async (req, res) => {
    let bondFileNameList,
        etfFileNameList,
        shareFileNameList,
        bond,
        etf,
        share,
        totalProfit,
        listAssets = [];

    try {
        bondFileNameList = await data.listSync(bondDir);
        etfFileNameList = await data.listSync(etfDir);
        shareFileNameList = await data.listSync(shareDir);

        bondFileNameList.forEach((bondFileName) => {
            bond = data.readSync(bondDir, bondFileName);
            listAssets.push(bond);
        });
        etfFileNameList.forEach((etfFileName) => {
            etf = data.readSync(etfDir, etfFileName);
            listAssets.push(etf);
        });
        shareFileNameList.forEach((shareFileName) => {
            share = data.readSync(shareDir, shareFileName);
            listAssets.push(share);
        });

        listAssets = await Promise.all(listAssets);
        totalProfit = calculator.earnedTotal(listAssets).toFixed(2);


        res.render('index', {
            totalProfit: totalProfit
        });
    } catch (error) {
        console.error('Error managing with files - ', error);
        res.status(500).json({
            error: true,
            message: 'Internal Server Error'
        });
    }
};


