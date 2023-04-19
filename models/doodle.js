const mongoose = require("mongoose");

//UnknownObject Shema
const DoodleSchema = mongoose.model("doodle", {
  relativeOceanPosition: {
    type: [Number],
    require: true,
  },
  relativeOceanRotation: {
    type: [Number],
    require: true,
  },
  linePositions: {
    type: String,
    require: true,
  },
  lineWeight: {
    type: Number,
    require: true,
  },
});

module.exports = { DoodleSchema };
