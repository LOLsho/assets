const data = require('../lib/data');

module.exports.getOne = (req, res) => {
    console.log('in get one');
};

module.exports.getAll = (req, res) => {
    console.log('in getAll');
};

module.exports.getBonds = (req, res) => {
    console.log('in getBonds');
};

module.exports.getEtfs = (req, res) => {
    console.log('in getEtfs');
};

module.exports.getShares = (req, res) => {
    console.log('in getShares');
};

module.exports.addAsset = (req, res) => {
    let userData = req.body;

    let assetType = typeof userData.type === 'string' && types.indexOf(userData.type) > -1 ? userData.type.toUpperCase() : false;
    let assetName = typeof userData.name === 'string' && userData.name.length > 0 ? userData.name : false;
    let buyCommission = typeof userData.buyCommission === 'number' && userData.buyCommission >= 0 ? userData.buyCommission : false;
    let sellCommission = typeof userData.sellCommission === 'number' && userData.sellCommission >= 0 ? userData.sellCommission : false;
    let buyDate = typeof userData.buyDate === 'string' && userData.buyDate.length > 0 ? userData.buyDate : false;
    let sellDate = typeof userData.sellDate === 'string' && userData.sellDate.length > 0 ? userData.sellDate : false;
    let buyPrice = typeof userData.buyPrice === 'number' && userData.buyPrice >= 0 ? userData.buyPrice : false;
    let sellPrice = typeof userData.sellPrice === 'number' && userData.sellPrice >= 0 ? userData.sellPrice : false;
    let currencyCode = typeof userData.currencyCode === 'string' && userData.currencyCode.length > 0 ? userData.currencyCode.toUpperCase() : false;

    if (assetType && assetName && buyCommission && sellCommission && buyDate && sellDate && buyPrice && sellPrice && currencyCode) {
        let assetToSave = {
            type: assetType,
            name: assetName,
            buyCommission,
            sellCommission,
            buyDate,
            sellDate,
            buyPrice,
            sellPrice,
            currencyCode
        };

        let dirPath = 'completedDeals/';
        switch (assetType) {
            case 'ETF':
                dirPath += 'ETF';
                break;
            case 'BOND':
                dirPath += 'BOND';
                break;
            case 'SHARE':
                dirPath += 'SHARE';
                break;
            default:
                dirPath = false;
        }

        if (dirPath) {
            data.create(dirPath, `${assetName} - ${buyDate}`, assetToSave, (error) => {
                if (!error) {
                    console.warn('ASSET CREATED');
                    res.status(201).json({
                        error: false,
                        message: 'Asset added.'
                    });
                } else {
                    console.error('Error creating asset - ', error);
                    res.status(500).json({
                        error: true,
                        message: 'Internal Server Error'
                    });
                }
            });
        } else {
            res.status(400).json({
                error: true,
                message: 'Incorrect type of asset'
            });
        }

    } else {
        res.status(400).json({
            error: true,
            message: 'Incorrect data'
        });
    }
};

const types = ['ETF', 'BOND', 'SHARE'];