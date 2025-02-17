module.exports = {
    index: function(req, res, next) {
      // console.log({userLogin : req.session.userLogin})
    res.render('index', { title: 'Pizzeria Mafia Marguerita' });
    
  }
}