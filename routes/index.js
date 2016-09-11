var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (!req.session.userName) {
      res.redirect('/auth');
  }
  res.render('index', { title: req.session.userName });
});

router.get('/logout', function(req, res, next) {
  req.session.destroy(function(err) {
      res.redirect('/');
  })
});

router.get('/auth', function(req, res, next) {
    if (req.session.userName) {
        res.redirect('/');
    }
    res.render('auth', { title: 'auth' });
});

module.exports = router;
