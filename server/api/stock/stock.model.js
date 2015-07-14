'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var StockSchema = new Schema({
    symbol: String,
    name: String,
    lastTradeDate: Date,
    lastTradePriceOnly: Number,
    dividendYield: Number,
    peRatio: Number,
    twitterHandle: String
});

module.exports = mongoose.model('Stock', StockSchema);
