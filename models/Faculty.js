const mongoose = require('mongoose')

const facultySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
      gender: {
        type: String,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      username: {
        type: String,
      },
      password: {
        type: String,
      }
}, {collection : "faculty-data"})

const model = mongoose.model("FacultyData", facultySchema);

module.exports = model ;
