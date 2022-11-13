const mongoose = require("mongoose");

//UnknownObject Shema

const UnknownObject = mongoose.model("unknownobject", {
  relativeOceanPosition: [Number],
  relativeOceanRotation: [Number],
  additionalRot: {
    type: Number,
    required: true,
  },
  additionalHeight: {
    type: Number,
    required: true,
  },
  scaleX: {
    type: Number,
    required: true,
  },
  scaleY: {
    type: Number,
    required: true,
  },
  scaleZ: {
    type: Number,
    required: true,
  },
  firstScaleX: {
    type: Number,
    required: true,
  },
  firstScaleY: {
    type: Number,
    required: true,
  },
  firstScaleZ: {
    type: Number,
    required: true,
  },
});

module.exports = { UnknownObject };
