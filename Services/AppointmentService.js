const appointment = require("../models/Appointment");
const mongoose = require("mongoose");
const appo = mongoose.model("Appointment", appointment);
class AppointmentService {
  async Create(dados) {
    let newAppo = new appo(dados);
    newAppo.finished = false;
    try {
      await newAppo.save();
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
module.exports = new AppointmentService();
