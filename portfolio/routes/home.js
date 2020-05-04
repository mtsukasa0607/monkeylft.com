let express = require('express');
let router = express.Router();
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

router.get('/:id', (req, res, next) => {
    res.redirect('/home/' + req.params.id + '/1');
});

router.get('/:id/:page', (req, res, next) => {
    let id = req.params.id;
    id *= 1;
    let pg = req.params.page;
    pg *= 1;
    if(pg < 1){ pg = 1; }
    new Record().orderBy('created_at', 'DESC').where('user_id', '=', id).fetchPage({page:pg, pageSize:10, withRelated: ['user']}).then((collection) => {
      var data = {
          title: '個人の記録',
          login: req.session.login,
          user_id: id,
          collection: collection.toArray(),
          pagination: collection.pagination
      };
      res.render('home', data);
    }).catch((err) => {
        res.status(500).json({error: true, data: {message: err.message}});
    });
});
module.exports = router;