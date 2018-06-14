const knex = require("../db/knex.js");

module.exports = {

  display: function(req, res) {
      knex('patients')
      .where('patient_id', req.params.id)
      .first()
      .then((results)=>{
        knex('doc_notes')
        .where('pat_id', req.params.id)
      .then((notes)=>{
        res.render('patient_info', {results:results, notes:notes});
      })
      })
  },

  updateStat: function(req, res) {
    knex('patients')
    .where('patient_id', req.params.id)
    .first()
    .then((results)=>{
        waitondb(results);
    })
    function waitondb(results) {
      //change appointment status from unconfirmed to confirmed
      if(results.appointment_status === 'unconfirmed') {
        knex('patients')
        .where({
          patient_id: req.params.id
        })
        .update({
          appointment_status: 'confirmed'
        })
        .then(()=>{
          res.redirect('/appointments');
        })
      //change appointment status from confirmed to completed
      } else if(results.appointment_status === 'confirmed') {
        knex('patients')
        .where({
          patient_id: req.params.id
        })
        .update({
          appointment_status: 'completed'
        })
        .then(()=>{
          res.redirect('/appointments');
        })
      } else if(results.appointment_status === 'completed') {
        knex('patients')
        .where({
          patient_id: req.params.id
        })
        .del()
        .then(()=>{
          res.redirect('/appointments');
        })
      }
    }

  },

  displayPatInfo: function(req, res) {
    knex('patients')
    .where('patient_id', req.params.id)
    .first()
    .then((results)=>{
      res.render('update_patient', {results:results});
    })
  },

  editPatInfo: function(req, res) {
    knex('patients')
    .where({
      patient_id: req.params.id
    })
    .update({
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      date: req.body.date,
      reason: req.body.reason,
      details: req.body.details
    })
    .then(()=>{
      res.redirect('/appointments/view/'+req.params.id);
    })
  },

  notes: function(req, res) {
      knex('doc_notes').insert({
        pat_id: req.params.id,
        note: req.body.notes
      })
      .then(()=>{
        res.redirect('/appointments/view/'+req.params.id);
      })
  },

} //end module.export
