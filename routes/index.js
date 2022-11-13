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
      const unknownObjectArray = data[0].unknownObjectArray;
      const pureUnknownObjectArray = [];
      for (let i = 0; i < unknownObjectArray.length; i++) {
        const unknownObject = unknownObjectArray[i];
        const pureUnknownObject = {
          originalFileName: unknownObject.originalFileName,
          relativeOceanPosition: {
            x: unknownObject.relativeOceanPosition.x,
            y: unknownObject.relativeOceanPosition.y,
            z: unknownObject.relativeOceanPosition.z,
          },
          relativeOceanRotation: {
            x: unknownObject.relativeOceanRotation.x,
            y: unknownObject.relativeOceanRotation.y,
            z: unknownObject.relativeOceanRotation.z,
            w: unknownObject.relativeOceanRotation.w,
          },
          additionalRot: unknownObject.additionalRot,
          additionalHeight: unknownObject.additionalHeight,
          scaleX: unknownObject.scaleX,
          scaleY: unknownObject.scaleY,
          scaleZ: unknownObject.scaleZ,
          firstScaleX: unknownObject.firstScaleX,
          firstScaleY: unknownObject.firstScaleY,
          firstScaleZ: unknownObject.firstScaleZ,
        };
        pureUnknownObjectArray.push(pureUnknownObject);
      }
      res.send({ unknownObjectArray: pureUnknownObjectArray });
    } else {
      console.log("error occured while getting all unknown objects, err:", err);
    }
  });
});

// Save UnknownObject
router.post("/api/unknownobject/add", (req, res) => {
  UnknownObjectArraySchema.deleteMany({}, (err, data) => {});
  const { body } = req;
  const { unknownObjectArray } = body;
  const newUnknownObjectArray = [];
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
    newUnknownObjectArray.push(newUnknownObject);
  }

  const unknownObjectArraySchema = new UnknownObjectArraySchema({
    unknownObjectArray: unknownObjectArray,
  });
  unknownObjectArraySchema.save((err, data) => {
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
