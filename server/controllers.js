module.exports = {
  
  route: function(app) {
    app.get('/', this.index);
  },

  index: function(app, res) {
    res.render('index');
  }

};
