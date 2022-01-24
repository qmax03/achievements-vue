var express = require('express');
var router = express.Router();
const users = require('./data/users');
const usersTickers = require('./data/userTickers');
const tickers = require('./data/tickers');

/* GET users listing. */
router.get('/', (req, res, next) => {
  console.log("user")
  res.send(
      users
  );
});
router.get('/:userId', (req, res, next) => {
  const { userId } = req.params
  res.send(
      users.find( user => user.id === parseInt(userId, 10) ) ?? {}
  );
});

router.get('/:userId/tickers', (req, res, next) => {
  const { userId } = req.params
  const tickerIds = usersTickers.filter( ut => ut.user_id === parseInt(userId, 10) ).map( record => record.ticker_id)
  res.send(
      tickers.filter( ticker => tickerIds.includes(ticker.id) ) ?? []
  );
});


module.exports = router;
