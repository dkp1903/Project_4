'use strict';

angular.module('proj4App')
  .controller('StockShowCtrl', function ($stateParams, yahooFinanceService, twitSentService, stockService, portfolioService) {
    console.log('StockShowCtrl is alive!!' + $stateParams);

  var that = this;

  var id = $stateParams.stockId;

  console.log('StockShowCtrl id is :' + id);

  stockService.findStockById(id).then(function(json) {
    that.stock = json.data;
  });
//Stock Stuffs
   that.buyStock = function(stock) {
    portfolioService.buyStock(stock).then(function(json) {
      // console.log(JSON.stringify(json.data) + 'is returned after buyStock');
       that.myPortfolio = json; //TODO: fix what the server is returning
      // that.getUserPortfolio();
    });
  };
  that.sellStock = function(stock) {
    portfolioService.sellStock(stock).then(function(json) {
      // that.myPortfolio = json.data; //  TODO: fix this

    });
  };

  //Get historical stock data
  that.getHistorical = function(input) {
    yahooFinanceService.historicalSingle(input).success(function(json) {
      that.historicalData = json;
       that.chart();
    });
  }
  //Get current stock data
  that.getCurrent = function(input){
   yahooFinanceService.search(input).success(function(json) {
    that.currentData = json;
   })
  }
that.words = [{id:8,word:"great",size:8},{id:8,word:"thanks",size:8},{id:8,word:"thanks",size:8},{id:8,word:"diamond",size:8},{id:8,word:"thank",size:8},{id:8,word:"help",size:8},{id:8,word:"want",size:8},{id:8,word:"better",size:8},{id:8,word:"thank",size:8},{id:8,word:"good",size:8},{id:8,word:"better",size:8},{id:8,word:"yes",size:8},{id:8,"word":"classy",size:8},{id:8,"word":"fit",size:8},{id:8,"word":"thanks",size:8},{id:8,"word":"please",size:8},{id:8,"word":"care",size:8},{id:8,"word":"thank",size:8},{id:8,"word":"safety",size:8},{id:8,"word":"want",size:8},{id:8,"word":"want",size:8},{id:8,"word":"like",size:8},{id:8,"word":"fit",size:8},{id:8,"word":"better",size:8},{id:8,"word":"thank",size:8},{id:8,"word":"better",size:8},{id:8,"word":"yes",size:8}]
//twitter
      that.twitSentQuery = function(input) {
      // console.log(that.userInput + 'is userInput');
      if (that.userInput !== '' || that.userInput !== null) { //Defensive programming - guard against empty answers TODO: research undefined
      twitSentService.search(input).success(function(json) {
        // console.log('twitSentQuery from DashboardCtrl');
        // console.log(json);
        that.twitAnalysis = json;

        // console.log(that.twitAnalysis.positive  + '     is that.twitAnalysis');
        // that.twitAnaylsisData = json;
        //wordcloud
        // wordCloud(that.twitAnalysis.positive);
      });
      }
    }
    that.open;
    that.close;
    that.low;
    that.volume;
    that.adjClose;
    //chart.js stuff
    function getMaxOfArray(numArray) {
      return Math.max.apply(null, numArray);
    }
    function twoDecimal(my_array){
      _(my_array).forEach(function(n) {

        var x = n.toFixed(2);
        console.log(n);
        return x;
      });
     }
    that.chart = function() {
      that.open = _.pluck(that.historicalData, 'open');
      that.close = _.pluck(that.historicalData, 'close');
      that.low = _.pluck(that.historicalData, 'low');
      that.adjClose = _.pluck(that.historicalData, 'adjClose');
      that.volume = _.pluck(that.historicalData, 'volume');
      // var x = twoDecimal(that.volume);
      // console.log(x);
      // var max = getMaxOfArray(that.open);

      // console.log(that.open);

    that.labels = ["2011", "2012", "2013", "2014"];
    that.series = ["Open", "Close" , "Low", "Adjusted Close"];
    that.data = [
      that.open,
      that.close,
      that.low,
      that.adjClose
  ];
  that.barLabels = ["2011", "2012", "2013", "2014"];
  console.log(that.volume);
  that.barData = [
    that.volume
  ];
  }
  that.onClick = function (points, evt) {
    console.log(points, evt);
  };

  //wordcloud
  //create  {id: 1, word: "oke", size: 1}, format


  function wordCloud (my_array) {
   var x = Math.floor(Math.random() * 10) + 1;
   _(my_array).forEach(function(n) {

    that.words.push({id: x, word: n, size: x});
    console.log(that.words);
    });
  }

});