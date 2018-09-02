window.onload = () => {
    const addAssetForm = document.querySelector('#addAssetForm');
    const assetType = document.querySelector('#assetType');
    const assetName = document.querySelector('#assetName');
    const buyPrice = document.querySelector('#buyPrice');
    const sellPrice = document.querySelector('#sellPrice');
    const currency = document.querySelector('#currency');
    const quantity = document.querySelector('#quantity');
    const dividends = document.querySelector('#dividends');
    const dividendsBlock = document.querySelector('#dividendsBlock');
    const buyDate = document.querySelector('#buyDate');
    const sellDate = document.querySelector('#sellDate');
    const buyCommission = document.querySelector('#buyCommission');
    const sellCommission = document.querySelector('#sellCommission');
    const submitBtn = document.querySelector('#submitBtn');

    assetType.onchange = (event) => {
        if (event.target.value === 'SHARE') {
            dividendsBlock.classList.remove('hidden');
        } else {
            dividendsBlock.classList.add('hidden');
        }
    };

    submitBtn.onclick = (event) => {
        event.preventDefault();

        let dataToSend = {
            type: assetType.value,
            name: assetName.value,
            buyPrice: buyPrice.value,
            sellPrice: sellPrice.value,
            currencyCode: currency.value,
            buyDate: new Date(buyDate.value),
            sellDate: new Date(sellDate.value),
            buyCommission: buyCommission.value,
            sellCommission: sellCommission.value,
            quantity: quantity.value,
            dividends: dividends.value
        };


        $.ajax({
            url: '/api/assets/add',
            type: 'POST',
            data: dataToSend,
            success: (response) => {
                addAssetForm.reset();
                console.log('success');
                console.log('response - ', response);
            },
            error: (error) => {
                console.log('error - ', error);
            }
        });
    };
};
