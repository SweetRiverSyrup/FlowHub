var express = require('express');
var router = express.Router();
var url = require('url');

/* GET home page. */
router.get('/', function(req, res, next) {
  // encode(decode) html text into html entity
  var decodeHtmlEntity = function(str) {
    return str.replace(/&#(\d+);/g, function(match, dec) {
      return String.fromCharCode(dec);
    });
  };
  var parts = url.parse(req.url, true);
  var queryStr = parts.query;
  conn = req.conn;
  var str = "SELECT * FROM " + queryStr.dataType;
  var query = conn.query(str, function(err, data){
    console.log(err);
    var array = [];
    if(queryStr.dataType == 'physical_data'){
      data.forEach(function(dat){
        var addedTotal = dat.tideChangeAtTime0 + dat.tideChangeAtTime10 + dat.tideChangeAtTime20 + dat.tideChangeAtTime30;
        if(addedTotal = dat.totalTideChange){
          array.push(addedTotal);
          headers = {title: 'Flowhub', array2: array, array: ''};
        }else{
          console.log("error");
          headers = {title: 'Error'};
        }
      });
    }else if(queryStr.dataType == 'watercurrenttable'){
      var array = [];
      data.forEach(function(dat){

        array.push("{cmpsec: " + dat.currentSpeedCmPerSec + ", knot: " + dat.currentSpeedKnots.replace(/knts/gi, '') + "}");
        headers = {title: 'FlowHub', array: array};
      });
    }

    res.render('index', headers);
  });

});

router.get('/accounts', function(req, res, next){
  res.render('accounts', {title: "Flow"});
});

module.exports = router;
