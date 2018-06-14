
exports.up = function(knex, Promise) {
  return knex.schema.createTable('doc_notes',(t)=>{
    t.increments('id').primary();
    t.integer('pat_id')
       .references('patient_id')
       .inTable('patients')
       .onDelete('CASCADE');
    t.text('note');
    t.timestamps(true, true);
});
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('doc_notes');
};
