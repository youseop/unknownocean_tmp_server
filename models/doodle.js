const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RelativeOceanPosition = new Schema({
  x: {
    type: Number,
    required: true,
  },
  y: {
    type: Number,
    required: true,
  },
  z: {
    type: Number,
    required: true,
  },
});

const RelativeOceanRotation = new Schema({
  x: {
    type: Number,
    required: true,
  },
  y: {
    type: Number,
    required: true,
  },
  z: {
    type: Number,
    required: true,
  },
  w: {
    type: Number,
    required: true,
  },
});

//UnknownObject Shema
const DoodleObject = {
  relativeOceanPosition: {
    type: RelativeOceanPosition,
    require: true,
  },
  relativeOceanRotation: {
    type: RelativeOceanRotation,
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
};

const DoodleArraySchema = mongoose.model("doodlearrays", {
  doodleArray: {
    type: [DoodleObject],
    required: true,
  },
  oceanName: {
    type: String,
    required: true,
  },
});

module.exports = { DoodleArraySchema };
