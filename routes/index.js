const express = require("express");
const router = express.Router();

const {
  UnknownObjectArraySchema,
  UnknownObjectSchema,
} = require("../models/unknownobjects");

// Get All Objects
router.get("/api/unknownobjects", (req, res) => {
  UnknownObjectArraySchema.find({}, (err, data) => {
    if (!err) {
      res.send(data);
    } else {
      console.log("error occured while getting all unknown objects, err:", err);
    }
  });
});

// Save UnknownObject
router.post("/api/unknownobject/add", (req, res) => {
  const { body } = req;
  const { unknownObjectArray } = body;
  const newUnknownObjectArray = [];
  console.log("$$$$ body", body);
  for (let i = 0; i < unknownObjectArray.length; i++) {
    const unknownObject = unknownObjectArray[i];
    const newUnknownObject = new UnknownObjectSchema({
      originalFileName: unknownObject.originalFileName,
      relativeOceanPosition: unknownObject.relativeOceanPosition,
      relativeOceanRotation: unknownObject.relativeOceanRotation,
      additionalRot: unknownObject.additionalRot,
      additionalHeight: unknownObject.additionalHeight,
      scaleX: unknownObject.scaleX,
      scaleY: unknownObject.scaleY,
      scaleZ: unknownObject.scaleZ,
      firstScaleX: unknownObject.firstScaleX,
      firstScaleY: unknownObject.firstScaleY,
      firstScaleZ: unknownObject.firstScaleZ,
    });
    console.log("$$$$ newUnknownObject", newUnknownObject);
    newUnknownObjectArray.push(newUnknownObject);
  }

  const dbUnknownObjectArray = new UnknownObjectArraySchema({
    unknownObjectArray: unknownObjectArray,
  });
  console.log("dbUnknownObjectArray", dbUnknownObjectArray);
  dbUnknownObjectArray.save((err, data) => {
    if (!err)
      res.status(200).json({
        code: 200,
        massage: "UnknownObject is Added Successfully",
        addObject: data,
      });
    else console.log("error occured while posting unknown object, err:", err);
  });
});

// Get Single UnknownObject by id
router.get("/api/unknownobject/:id", (req, res) => {
  UnknownObjectArraySchema.findById(req.params.id, (err, data) => {
    if (!err) {
      res.send(data);
    } else {
      console.log(
        "error occured while getting unknown object by objectId, err:",
        err
      );
    }
  });
});

// Update UnknownObject
router.put("/api/unknownobject/edit/:id", (req, res) => {
  const unknownObjectArray = { unknownObjectArray: [] };
  UnknownObjectArraySchema.findByIdAndUpdate(
    req.params.id,
    { $set: unknownObjectArray },
    { new: true },
    (err, data) => {
      if (!err)
        res.status(200).json({
          code: 200,
          message: "UnknownObject is Updated Successfully",
          updateObject: data,
        });
      else
        console.log("error occured while updating unknown object, err:", err);
    }
  );
});

// Delete UnknownObject
router.delete("/api/unknownobject/:id", (req, res) => {
  UnknownObjectArraySchema.findByIdAndRemove(req.params.id, (err, data) => {
    if (!err)
      res.status(200).json({
        code: 200,
        message: "UnknownObject is Deleted Successfully",
        deleteObject: data,
      });
    else console.log("error occured while deleting unknown object, err:", err);
  });
});

module.exports = router;
