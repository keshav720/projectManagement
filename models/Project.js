const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  projectName: { 
     type: String,
     required: true
  },
  projectManager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true 
    },
});

module.exports = mongoose.model("Project", projectSchema);
