const knex = require("../db/knex.js");

module.exports = {

  empty: function(req, res) {
    res.render('appoint_empty');
  },

  display: function(req, res) {
    knex('patients')
      .where('doctor_id', req.session.user_id)
      .andWhere('appointment_status', 'confirmed')
      .then((results) => {
        knex('doctors')
          .select('doctors.first_name', 'doctors.last_name')
          .where('doc_id', req.session.user_id)
          .first()
          .then((doctor) => {
            if (results.length === 0) {
              let locale = {here:"confirmed"};
              res.render('appoint_empty', {
                doctor: doctor,
                locale:locale
              });
            } else {
              res.render('appoint_conf', {
                doctor: doctor,
                results: results
              });
            }
          })
      })
  },
  unconfirmed: function(req, res) {
    knex('patients')
      .where('doctor_id', req.session.user_id)
      .andWhere('appointment_status', 'unconfirmed')
      .then((results) => {
        knex('doctors')
          .select('doctors.first_name', 'doctors.last_name')
          .where('doc_id', req.session.user_id)
          .first()
          .then((doctor) => {
            if (results.length === 0) {
              let locale = {here:"unconfirmed"};
              res.render('appoint_empty', {
                doctor: doctor,
                locale:locale
              });
            } else {
              res.render('appoint_unconf', {
                doctor: doctor,
                results: results
              });
            }
          })
      })
  },

  completed: function(req, res) {
    knex('patients')
      .where('doctor_id', req.session.user_id)
      .andWhere('appointment_status', 'completed')
      .then((results) => {
        knex('doctors')
          .select('doctors.first_name', 'doctors.last_name')
          .where('doc_id', req.session.user_id)
          .first()
          .then((doctor) => {
            if (results.length === 0) {
              let locale = {here:"completed"};
              res.render('appoint_empty', {
                doctor: doctor,
                locale:locale
              });
            } else {
              res.render('appoint_comp', {
                doctor: doctor,
                results: results
              });
            }
          })
      })
  },


} //end module.export
