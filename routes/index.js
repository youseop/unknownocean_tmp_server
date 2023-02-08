const express = require("express");
const router = express.Router();

const { UnknownObjectArraySchema } = require("../models/unknownobjects");

// Get All Objects
router.get("/api/unknownobjects", (req, res) => {
  UnknownObjectArraySchema.find({}, (error, data) => {
    if (data.length <= 0) {
      res.send({ unknownObjectArray: [] });
      return;
    }
    if (!error) {
      const unknownObjectArray = data[0].unknownObjectArray;
      const pureUnknownObjectArray = [];
      for (let i = 0; i < unknownObjectArray.length; i++) {
        const unknownObject = unknownObjectArray[i];
        const controlPointPositions = [];
        for (let j = 0; j < unknownObject.controlPointPositions.length; j++) {
          const controlPointPosition = unknownObject.controlPointPositions[j];
          controlPointPositions.push({
            x: controlPointPosition.x,
            y: controlPointPosition.y,
            z: controlPointPosition.z,
          });
        }
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
          rotatingSpeed: unknownObject.rotatingSpeed,
          artworkScale: unknownObject.artworkScale,
          verticalSpeed: unknownObject.verticalSpeed,
          maxDeltaY: unknownObject.maxDeltaY,
          controlPointPositions: controlPointPositions,
          positionNum: unknownObject.positionNum,
          positionInterval: unknownObject.positionInterval,
          objectType: unknownObject.objectType,
          fileName: unknownObject.fileName,
          isItStartingObject: unknownObject.isItStartingObject,
        };
        pureUnknownObjectArray.push(
          unknownObject.mtlName
            ? { ...pureUnknownObject, mtlName: unknownObject.mtlName }
            : pureUnknownObject
        );
      }
      res.send({ unknownObjectArray: pureUnknownObjectArray });
    } else {
      res.status(500).json({
        code: 500,
        massage: "error occurred while get data from db",
        error: error,
      });
    }
  });
});

// Save UnknownObject
router.post("/api/unknownobjects/add", async (req, res) => {
  const deleteAll = () =>
    new Promise((resolve, reject) => {
      UnknownObjectArraySchema.deleteMany({}, (err, data) => {
        if (err) {
          reject(err);
        }
        if (data) {
          resolve(data);
        }
      });
    });

  try {
    await deleteAll();
    const { body } = req;
    const { unknownObjectArray } = body;

    const unknownObjectArraySchema = new UnknownObjectArraySchema({
      unknownObjectArray: unknownObjectArray,
    });
    unknownObjectArraySchema.save((error, data) => {
      if (!error) {
        res.status(200).json({
          code: 200,
          massage: "UnknownObjects is Added Successfully",
          addObject: data,
        });
      } else {
        throw error;
      }
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      massage: "error occurred while save data in db",
      error: error,
    });
  }
});

// Get Single file by file name
router.get("/api/asset-file/:id", (req, res) => {
  res.sendFile(process.env.ROOT_DIR + "assetFiles/" + req.params.id);
});

/*
// Get Single UnknownObject by id
router.get("/api/unknownobjects/:id", (req, res) => {
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
router.put("/api/unknownobjects/edit/:id", (req, res) => {
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
router.delete("/api/unknownobjects/:id", (req, res) => {
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
*/

module.exports = router;
