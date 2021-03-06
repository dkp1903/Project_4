'use strict';

angular.module('proj4App')
.service('yahooFinanceService', function($http){

  this.search = function (userStockInput) {
    console.log(userStockInput + 'is user userStockInput from service');
    return $http.post('/api/yahooFinance', {symbol: userStockInput});
  }

  this.getSelectedStocks = function () {
    return $http.get('/api/yahooFinance');
  }

  this.historicalSingle = function (input) {
    return $http.patch('/api/yahooFinance', {symbol: input});
  }

});

