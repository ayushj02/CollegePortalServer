const mongoose = require('mongoose')

const noticeSchema = mongoose.Schema({
    fname : {
        type : String,
        required : true
    },
    title : {
        type : String,
        required : true
    },
    description : {
        type : String
    },
    date : {
        type : Date
    }
})

const model = mongoose.model("Notices", noticeSchema);

module.exports = model;