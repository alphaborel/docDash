
exports.up = function(knex, Promise) {
  return knex.schema.createTable('patients', (t)=>{
   t.increments('patient_id').primary();
   t.string('first_name');
   t.string('last_name');
   t.string('date');
   t.string('reason');
   t.text('details');
   t.integer('doctor_id');
   t.string('appointment_status');
   t.timestamps(true, true);
 })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('patients');
};
