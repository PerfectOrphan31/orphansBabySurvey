const mongoose = require("mongoose");

let answerSchema = mongoose.Schema({
  name: {
    type: String,
    index: true
  },
  email: {
    type: String,
    unique: true
  },
  choice: {
    type: String
  }
});

let Answer = (module.exports = mongoose.model("Answer", answerSchema));

module.exports.saveAnswer = (newAnswer,callback) => {
  newAnswer.save(callback);
};