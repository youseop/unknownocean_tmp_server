const mongoose = require("mongoose");

//UnknownObject Shema
const LocationSchema = mongoose.model("location", {
  name: {
    type: String,
    require: true,
  },
  latitude: {
    type: Number,
    require: true,
  },
  longitude: {
    type: Number,
    require: true,
  },
});

module.exports = { LocationSchema };
