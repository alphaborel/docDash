//Update the name of the controller below and rename the file.
const doctors = require("../controllers/doctors.js")
const booking = require("../controllers/booking.js")
const appointments = require("../controllers/appointments.js")
const patientInfo = require("../controllers/patientinfo.js")
module.exports = function(app){

  app.get('/', doctors.doctors);
  app.post('/book/add', booking.addto);
  app.get('/book/:id', booking.booking);
  app.get('/doctors/login', doctors.display);
  app.post('/doctors/login', doctors.register);
  app.post('/login', doctors.login);

  app.use(authenticateUser);
  //appointments controller routes
  app.get('/appointments', appointments.display);
  app.get('/appointments/none', appointments.empty);
  app.get('/appointments/unconfirmed', appointments.unconfirmed);
  app.get('/appointments/completed', appointments.completed);
  //patientinfo controller routes
  app.get('/appointments/view/:id', patientInfo.display);
  app.get('/appointments/update/:id', patientInfo.updateStat);
  app.post('/appointments/notes/:id', patientInfo.notes);
  app.get('/appointments/edit/:id', patientInfo.displayPatInfo);
  app.post('/appointments/edit/:id', patientInfo.editPatInfo);
  app.get('/doctors/logout', doctors.logout);
}

function authenticateUser(req, res, next){
  if(!req.session.user_id){
    res.redirect("/doctors/login");
  }else{
    next();
  }
}
