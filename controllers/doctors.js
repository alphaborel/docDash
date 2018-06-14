const knex = require("../db/knex.js");

module.exports = {

  doctors: function(req, res) {
    knex.column(
      'doc_id',
      'first_name',
      'last_name',
      'profile_pic'
    ).select().from('doctors').then((results)=>{
        res.render("doctors", {results:results});
    })
  },

  display: function(req, res) {
        res.render("login");
  },

  register: function(req, res) {
    if(req.body.password == req.body.confirm){
    knex.insert({
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      profile_pic: req.body.avatar,
      email: req.body.email,
      password: req.body.password,
      bio: req.body.bio
    }).into("doctors")
    .then(()=>{
        res.redirect('/doctors/login');
    })
    } else {
      //I'm not sure how to get this to work yet...
      //req.flash("messages", {"error":"Passwords do not match."});
        res.redirect('/doctors/login');
      };
  },

  login: function(req, res){
    knex('doctors').where("email", req.body.email).first().then((results)=>{
      let user = results;
      if(user.password === req.body.password){
        req.session.user_id = user.doc_id;
        req.session.save(()=>{
          res.redirect('/appointments');
      })
    } else {
          res.redirect("/doctors/login");
      }
    }).catch(()=>{
          res.redirect("/");
    })
  },

  logout: function(req, res) {
    req.session.user_id = null;
    res.redirect('/doctors/login');
  }

} //end module.export
