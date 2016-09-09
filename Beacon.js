var _ = require('lodash');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// application routing
var router = express.Router();
// body-parser middleware for handling request variables
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var knex = require('knex')({
    client: 'mysql',
    connection: {
        host     : 'localhost',
        user     : 'root',
        password : 'bazzinga',
        database : 'DevServer',
        charset  : 'utf8'
  }
});
var Bookshelf = require('bookshelf')(knex);

// Discount model
var User = Bookshelf.Model.extend({
    tableName: 'discounts'
});

//Discounts Collection
var Users = Bookshelf.Collection.extend({
  model: Discount
});

router.route('/discounts/:aisleName')
  // fetch discounts for aisleName
  .get(function (req, res) {
    Discount.forge({aisleName: req.params.aisleName})
    .fetch()
    .then(function (discountList) {
      if (!discountList) {
        res.status(404).json({error: true, data: {}});
      }
      else {
        res.json({error: false, data: discountList.toJSON()});
      }
    })
    .catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  });

  app.use('/api/beacons', router);
app.listen(8080, function() {
  console.log("✔ Express server listening on port %d in %s mode", 8080, app.get('env'));
});