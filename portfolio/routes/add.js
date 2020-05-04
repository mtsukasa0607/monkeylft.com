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

var Bookshelf = require('bookshelf')(knex);
var User = Bookshelf.Model.extend({ tableName: 'users' });

router.get('/', (req, res, next) => {
    let data = {
        title: 'アカウントの作成',
        form: { name: '', password: '' },
        content: '<p>登録する名前とパスワードを入力して下さい。<br>名前は４文字以上、パスワードは６文字以上で設定して下さい。</p>'
    }
    res.render('add', data);
});

router.post('/', [ check('name').trim().escape().isLength({min: 4}), check('password').isLength({min: 6}) ], (req, res, next) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
    let data = {  
        title: '名前とパスワードを再入力',
        content: '<p class="error">ERROR ! 名前は4文字以上、パスワードは6文字以上で入力して下さい。</p>',
        form: req.body
    };
      res.render('add', data);
    } else {
        new User(req.body).save().then((model) => {
          req.session.login = model.attributes;
          let data = {  
              title: 'アカウントが作成されました。',
              message: '掲示板にその日のトレーニング記録を書き込みましよう！',
          };
          res.render('add_ok', data);
        });
    }
  });
  
module.exports = router;
