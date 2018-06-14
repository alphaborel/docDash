exports.up = function(knex, Promise) {
  return knex.schema.createTable('doctors', (t)=>{
  t.increments('doc_id').primary();
  t.string('first_name');
  t.string('last_name');
  t.text('profile_pic');
  t.string('email').unique();
  t.text('password');
  t.text('bio');
  t.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('doctors');
};
