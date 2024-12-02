const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    refs: "clients",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    requried: true,
    enum: ["active", "inactive"],
  },
});

module.exports = mongoose.model("project", projectSchema);
