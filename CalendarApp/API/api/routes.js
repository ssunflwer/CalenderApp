'use strict';
module.exports = function(app) {
  let newsCtrl = require('./controllers/NewsController');

  // todoList Routes
  app.route('/news')
    .get(newsCtrl.get)

  app.route('/news/:newsId')
    .get(newsCtrl.detail)
};