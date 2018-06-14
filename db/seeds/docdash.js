
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('doctors', 'patients').del()
    .then(function () {
      return knex('doctors').insert([
        {first_name: 'Stephen', last_name: 'Strange', profile_pic: '/img/profileDefault.jpg', email: 'nimblefingers@gmail.com', password: 1234, bio:'Let me work my magic.'},
        {first_name: 'Beverly', last_name: 'Crusher', profile_pic: '/img/profileDefault.jpg', email: 'beverly.crusher@starfleet.com', password: 1234, bio:'I strive to be the best Doctor I can be.'},
        {first_name: 'Hawkeye', last_name: 'Pierce', profile_pic: '/img/profileDefault.jpg', email: 'iveneverhademail@aol.com', password: 1234, bio:'This will only hurt a little.'}
      ]).then(()=>{
      return knex('patients').insert([
        {first_name: 'Donnie', last_name: 'Darko', date: '2019-12-12', reason:'I feel paranoid all the time', details:'I think someone is following me. I see a shadow out of the corner of my eye.', doctor_id: 1, appointment_status: 'unconfirmed'},
        {first_name: 'Wesley', last_name: 'Crusher', date: '2119-12-12', reason:'Black eye.', details:'I fell down in class.', doctor_id: 1, appointment_status: 'unconfirmed'},
        {first_name: 'BJ', last_name: 'Hunnicut', date: '1950-12-12', reason:'Took a bullet to the leg.', details:'The other guy is worse off, trust me.', doctor_id: 1, appointment_status: 'unconfirmed'}
        ]);
    });
  });
};
