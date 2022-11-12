const mongoose = require("mongoose");

//UnknownObject Shema

const UnknownObject = mongoose.model("unknownobject", {
  positionx: {
    type: Number,
    required: true,
  },
  positiony: {
    type: Number,
    required: true,
  },
});

module.exports = { UnknownObject };
