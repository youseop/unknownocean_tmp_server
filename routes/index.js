const express = require("express");
const router = express.Router();

const { UnknownObject } = require("../models/unknownobjects");

// Get All Objects
router.get("/api/unknownobjects", (req, res) => {
  UnknownObject.find({}, (err, data) => {
    if (!err) {
      res.send(data);
    } else {
      console.log("error occured while getting all unknown objects, err:", err);
    }
  });
});

// Save UnknownObject
router.post("/api/unknownobject/add", (req, res) => {
  const unknownObject = new UnknownObject({
    relativeOceanPosition: req.body.relativeOceanPosition,
    relativeOceanRotation: req.body.relativeOceanRotation,
    additionalRot: req.body.additionalRot,
    additionalHeight: req.body.additionalHeight,
    scaleX: req.body.scaleX,
    scaleY: req.body.scaleY,
    scaleZ: req.body.scaleZ,
    firstScaleX: req.body.firstScaleX,
    firstScaleY: req.body.firstScaleY,
    firstScaleZ: req.body.firstScaleZ,
  });
  unknownObject.save((err, data) => {
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
  UnknownObject.findById(req.params.id, (err, data) => {
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
  const unknownObject = {
    positionx: req.body.positionx,
    positiony: req.body.positiony,
  };
  UnknownObject.findByIdAndUpdate(
    req.params.id,
    { $set: unknownObject },
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
  UnknownObject.findByIdAndRemove(req.params.id, (err, data) => {
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
