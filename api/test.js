const  iex = require( 'iexcloud_api_wrapper' )

const quote = async (sym) => {
    const quoteData = await iex.quote(sym);
    // do something with returned quote data
    console.log(quoteData)
};

quote("WDC");

