let express = require('express');
let router = express.Router();

router.get('/', function(req, res, next) {
  let data = {
    title: 'MONKEY LIFT'
  };
  res.render('top', data);
});

module.exports = router;
