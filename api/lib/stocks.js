const iex = require('iexcloud_api_wrapper');
const cache = require('./cache');

async function getPrice(symbol, options={}) {
    let price = options.useCache ? await cache.get(symbol) : null
    if (!price) {
        const quote = await iex.quote(symbol);
        price = quote.latestPrice;
        await cache.set(symbol, price, 'EX', 60)
        console.log(`loaded ${symbol} price from api`)
    } else {
        console.log(`loaded ${symbol} price from cache`)
    }
    return price
}

module.exports = {
    getPrice
}   