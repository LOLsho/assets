


const calc = {};

calc.earnedOneAsset = (asset) => {
    let total = 0;
    let totalCommission = asset.buyCommission + asset.sellCommission;
    let priceDifference = asset.sellPrice - asset.buyPrice;
    if (asset.type === 'SHARE') {
        total = priceDifference - totalCommission + asset.devidents;
    } else {
        total = priceDifference - totalCommission;
    }
    return total;
};

calc.earnedTotal = (deals) => {
    let result = 0;
    deals.forEach((deal) => {
        result += calc.earnedOneAsset(deal);
    });
    return result;
};



module.exports = calc;