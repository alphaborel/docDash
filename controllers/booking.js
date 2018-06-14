const knex = require("../db/knex.js");

module.exports = {

  booking: function(req, res) {
    knex.column(
      'doc_id',
      'first_name',
      'last_name'
    ).select()
    .from('doctors')
    .where('doc_id', req.params.id)
    .first()
    .then((results)=>{
      res.render("booking", {results:results});
    })
  },

  addto: function(req, res) {
    knex("patients").insert({
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      date: req.body.date,
      reason: req.body.reason,
      details: req.body.details,
      doctor_id: req.body.doctor,
      appointment_status: 'unconfirmed'
    })
    .then(()=>{
        res.redirect('/');
      })
  }

} //end module.export
