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
let url = require('url');

let Bookshelf = require('bookshelf')(knex);
let User = Bookshelf.Model.extend({ tableName: 'users' });

router.post('/', (req, res, next) => {
  let nm = req.body.name;
  let pw = req.body.password;

  User.query({where: {name: nm}, andWhere: {password: pw}}).fetch().then((model) => {
    req.session.login = model.attributes;
    let data = {  
      title: 'ログイン完了',
      message: '掲示板にその日のトレーニング記録を書き込みましよう！',
      form: req.body
    };
    res.render('add_ok', data);

  }).catch((err) => {
    let data = {
      title: '再入力して下さい。',
      content: '<P class="error">名前またはパスワードが違います。</p>',
      form: req.body
    };
    res.render('login', data);
  });
});


router.get('/', (req, res, next) => {

  let url_parts = url.parse(req.url, true);
  let query = url_parts.query;

  if(query.name == 'visitor' && query.password == 'xxxxxxx'){

    let nm = query.name;
    let pw = query.password;

    User.query({where: {name: nm}, andWhere: {password: pw}}).fetch().then((model) => {
      req.session.login = model.attributes;
      let data = {  
        title: 'ログイン完了',
        message: '掲示板にその日のトレーニング記録を書き込みましよう！',
        form: req.body
      };
      res.render('add_ok', data);

    }).catch((err) => {
      let data = {
        title: '再入力して下さい。',
        content: '<P class="error">名前またはパスワードが違います。</p>',
        form: req.body
      };
      res.render('login', data);
    });

  } else {

    if(req.session.login == null){
      let data = {
          title: 'ログイン',
          form: { name: '', password: '' },
          content: '名前とパスワードを入力して下さい。'
        }
        res.render('login', data);
    } else {
      res.redirect('/record/1');
    }
  }
});


module.exports = router;
