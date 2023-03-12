const mongoose = require("mongoose");

//UnknownObject Shema
const NumberVariableSchema = mongoose.model("gpsrangeradius", {
  value: {
    type: Number,
  },
  name: {
    type: String,
    require: true,
  },
});

module.exports = { NumberVariableSchema };
