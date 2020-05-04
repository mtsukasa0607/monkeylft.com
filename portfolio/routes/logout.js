let express = require('express');
let router = express.Router();

router.get('/', (req, res, next) => {
    req.session.destroy();
    let data = {
        title: 'ログアウト',
        message: 'ログアウトしました。'
    }
    res.render('logout', data);
});

module.exports = router;
