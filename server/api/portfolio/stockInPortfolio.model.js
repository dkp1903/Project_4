'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var Stock = require('../stock/stock.model');

var StockInPortfolioSchema = new Schema({
    stock : {
      type : Schema.Types.ObjectId,
      ref: 'Stock'
    },
  qty : Number
});

module.exports = mongoose.model('StockInPortfolio', StockInPortfolioSchema);
