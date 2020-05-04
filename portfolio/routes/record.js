let express = require('express');
let router = express.Router();
let { check, validationResult } = require('express-validator');
let knex = require('knex')({
  dialect: 'mysql',
  connection: {
    host: 'portfoliodb.ckgrzxlyztye.ap-northeast-1.rds.amazonaws.com',
    user: 'root',
    password: 'myrdspassword',
    database: 'my_expressapp_db',
    charset: 'utf8'
  }
});

let Bookshelf = require('bookshelf')(knex);
let User = Bookshelf.Model.extend({ tableName: 'users' });
let Record = Bookshelf.Model.extend({
  tableName: 'records',
  hasTimestamps: true,
  user: function(){
    return this.belongsTo(User);
  }
});

router.get('/', (req, res, next) => {
  if(req.session.login == null){
    res.redirect('/');
  } else {
    res.redirect('/record/1');
  }
});

router.post('/', [ check('bp').isLength({min: 1}).isInt(), check('dl').isLength({min: 1}).isInt(), check('sq').isLength({min: 1}).isInt() ], (req, res, next) => {
  let errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.redirect('/record/1');
    } else {
      let rec = {
        bp: req.body.bp,
        dl: req.body.dl,
        sq: req.body.sq,
        user_id: req.session.login.id
      }
      new Record(rec).save().then((model) => {
        res.redirect('/record/1');
      }).catch((err) => {
        res.status(500).json({error: true, data: {message: err.message}});
      });
    }
});

router.get('/:page', (req, res, next) => {
  if(req.session.login == null){
    res.redirect('/login');
    return;
  }
  let pg = req.params.page;
  pg *= 1;
  if(pg < 1){ pg = 1; }
  new Record().orderBy('created_at', 'DESC').fetchPage({ page:pg, pageSize:10, withRelated: ['user'] }).then((collection) => {
    let data = {
      title: '最近の記録',
      login: req.session.login,
      collection: collection.toArray(),
      pagination: collection.pagination
    };
    res.render('record', data);
  }).catch((err) => {
    res.status(500).json({error: true, data: {message: err.message}});
  });
});

module.exports = router;
