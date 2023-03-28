/**
 * Retrieves price data from a data endpoint
 */
class Datasource {
    /**
     * Constructor for Datasource
     * @param {String} url The URL to use as the data endpoint
     */
    constructor(url) {
        this.url = url;
    }

    /**
     * Retrieves prices from data endpoint
     * @returns {Promise} A Promise which contains an array of Prices
     */
    async getPrices() {
        return fetch(this.url)
            .then(response => response.json())
            .then(data => data.data.prices
                .map(prices => new Prices(prices)));
    }
}

/**
 * Contains buy, sell, id, pair and timestamp of prices
 */
class Prices {
    /**
     * Constructor for Prices
     * @param {Object} object An Object which contains buy, sell, id, pair, and timestamp of the prices
     */
    constructor(object) {
        this.buy = object.buy;
        this.sell = object.sell;
        this.id = object.id;
        this.pair = object.pair;
        this.timestamp = object.timestamp;
    }
    
    /**
     * Returns the mid-point value between buy and sell 
     * @returns {Number} The mid-point value between buy and sell
     */
    mid() {
        return (this.buy + this.sell) / 2 / 100;
    }

    /**
     * Returns the quote currency (counter currency) of the trade pair
     * @returns {String} The quote currency (counter currency) of the trade pair
     */
    quote() {
        return this.quote = this.pair.slice(3);
    }
}

const ds = new Datasource('https://interview.switcheo.com/test.json');

ds.getPrices()
    .then(prices => {
        prices.forEach(price => {
            console.log(`Mid price for ${ price.pair } is ${ price.mid() } ${ price.quote() }.`);
        });
    }).catch(error => {
        console.error(error);
    });