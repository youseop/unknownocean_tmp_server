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

const controlPointPosition = new Schema({
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
const UnknownObject = {
  originalFileName: {
    type: String,
    required: true,
  },
  relativeOceanPosition: {
    type: RelativeOceanPosition,
    required: true,
  },
  relativeOceanRotation: {
    type: RelativeOceanRotation,
    required: true,
  },
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
  rotatingSpeed: {
    type: Number,
    required: true,
  },
  artworkScale: {
    type: Number,
    required: true,
  },
  verticalSpeed: {
    type: Number,
    required: true,
  },
  maxDeltaY: {
    type: Number,
    required: true,
  },
  controlPointPositions: {
    type: [controlPointPosition],
    required: true,
  },
  positionNum: {
    type: Number,
    required: true,
  },
  positionInterval: {
    type: Number,
    required: true,
  },
  objectType: {
    type: String,
    required: true,
  },
  fileName: {
    type: String,
    required: true,
  },
  isItStartingObject: {
    type: String,
    required: true,
  },
  mtlName: {
    type: String,
    required: true,
  },
};

//UnknownObject Shema
const UnknownObjectArraySchema = mongoose.model("unknownobjectarrays", {
  unknownObjectArray: {
    type: [UnknownObject],
    required: true,
  },
});

module.exports = { UnknownObjectArraySchema };
