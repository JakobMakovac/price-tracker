const fetch = require('node-fetch');
const cheerio = require('cheerio');
const fs = require('fs');



fetch('https://www.mimovrste.com/tablice/huawei-mediapad-t5-tablicni-racunalnik-lte-2gb32gb-crn')
    .then((result) => {
        return result.text();
    })
    .then((text) => {
        const html = cheerio.load(text);
        var price = html('.pro-price');
        var oldPrice = html('.rrp-price');

        price = price[0].children[0].nodeValue.trim();
        oldPrice = oldPrice[0].children[0].nodeValue.trim();

        console.log(price);
        console.log(oldPrice);
    })
    .catch((err) => {
        console.log(err);
    })
