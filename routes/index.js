const express = require("express");
const router = express.Router();
const path = require("path");

const { UnknownObjectArraySchema } = require("../models/unknownobjects");
const { NumberVariableSchema } = require("../models/numbervariable");
const { LocationSchema } = require("../models/location");
const { DoodleSchema, DoodleArraySchema } = require("../models/doodle");

router.get("/api/unknownobjects/:oceanname", (req, res) => {
  const oceanName = req.params.oceanname;
  UnknownObjectArraySchema.find({ oceanName: oceanName }, (error, data) => {
    if (data.length <= 0) {
      res.send({ unknownObjectArray: undefined });
      return;
    }
    if (!error) {
      const { unknownObjectArray, latitude, longitude, oceanName } = data[0];
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
      res.send({
        unknownObjectArray: pureUnknownObjectArray,
        oceanName: oceanName,
        latitude: latitude,
        longitude: longitude,
      });
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
  try {
    const { body } = req;
    const { unknownObjectArray, oceanName } = body;

    const data = await UnknownObjectArraySchema.find({ oceanName: oceanName });
    if (data.length > 0) {
      console.log("data exist, data: ", data);

      const objectId = data[0]._id;
      console.log("objectId: ", objectId);

      UnknownObjectArraySchema.findByIdAndUpdate(
        objectId,
        {
          unknownObjectArray: unknownObjectArray,
        },
        (error, data) => {
          if (!error) {
            res.status(200).json({
              code: 200,
              message: "UnknownObject is Updated Successfully",
              updateObject: data,
            });
          } else {
            console.log(
              "error occured while updating unknown object, error:",
              error
            );
            throw error;
          }
        }
      );
    } else {
      const unknownObjectArraySchema = new UnknownObjectArraySchema({
        unknownObjectArray: unknownObjectArray,
        oceanName: oceanName,
      });
      unknownObjectArraySchema.save((error, data) => {
        if (!error) {
          res.status(200).json({
            code: 200,
            massage: `UnknownObjects is Added to ocean<${oceanName}> Successfully`,
            addObject: data,
          });
        } else {
          throw error;
        }
      });
    }
  } catch (error) {
    res.status(500).json({
      code: 500,
      massage: "error occurred while save data in db",
      error: error,
    });
  }
});

// router.get("/api/unknownobjects/:oceanname", (req, res) => {
//   const oceanName = req.params.oceanname;
//   UnknownObjectArraySchema.find({ oceanName: oceanName }, (error, data) => {
//     if (data.length <= 0) {
//       res.send({ unknownObjectArray: undefined });
//       return;
//     }
//     if (!error) {
//       const { unknownObjectArray, latitude, longitude, oceanName } = data[0];
//       const pureUnknownObjectArray = [];
//       for (let i = 0; i < unknownObjectArray.length; i++) {
//         const unknownObject = unknownObjectArray[i];
//         const controlPointPositions = [];
//         for (let j = 0; j < unknownObject.controlPointPositions.length; j++) {
//           const controlPointPosition = unknownObject.controlPointPositions[j];
//           controlPointPositions.push({
//             x: controlPointPosition.x,
//             y: controlPointPosition.y,
//             z: controlPointPosition.z,
//           });
//         }
//         const pureUnknownObject = {
//           originalFileName: unknownObject.originalFileName,
//           relativeOceanPosition: {
//             x: unknownObject.relativeOceanPosition.x,
//             y: unknownObject.relativeOceanPosition.y,
//             z: unknownObject.relativeOceanPosition.z,
//           },
//           relativeOceanRotation: {
//             x: unknownObject.relativeOceanRotation.x,
//             y: unknownObject.relativeOceanRotation.y,
//             z: unknownObject.relativeOceanRotation.z,
//             w: unknownObject.relativeOceanRotation.w,
//           },
//           additionalRot: unknownObject.additionalRot,
//           additionalHeight: unknownObject.additionalHeight,
//           scaleX: unknownObject.scaleX,
//           scaleY: unknownObject.scaleY,
//           scaleZ: unknownObject.scaleZ,
//           firstScaleX: unknownObject.firstScaleX,
//           firstScaleY: unknownObject.firstScaleY,
//           firstScaleZ: unknownObject.firstScaleZ,
//           rotatingSpeed: unknownObject.rotatingSpeed,
//           artworkScale: unknownObject.artworkScale,
//           verticalSpeed: unknownObject.verticalSpeed,
//           maxDeltaY: unknownObject.maxDeltaY,
//           controlPointPositions: controlPointPositions,
//           positionNum: unknownObject.positionNum,
//           positionInterval: unknownObject.positionInterval,
//           objectType: unknownObject.objectType,
//           fileName: unknownObject.fileName,
//           isItStartingObject: unknownObject.isItStartingObject,
//         };
//         pureUnknownObjectArray.push(
//           unknownObject.mtlName
//             ? { ...pureUnknownObject, mtlName: unknownObject.mtlName }
//             : pureUnknownObject
//         );
//       }
//       res.send({
//         unknownObjectArray: pureUnknownObjectArray,
//         oceanName: oceanName,
//         latitude: latitude,
//         longitude: longitude,
//       });
//     } else {
//       res.status(500).json({
//         code: 500,
//         massage: "error occurred while get data from db",
//         error: error,
//       });
//     }
//   });
// });

// Save UnknownObject
router.post("/api/doodle", async (req, res) => {
  try {
    const { body } = req;
    const { doodleArray, oceanName } = body;

    DoodleArraySchema.findOneAndUpdate(
      { oceanName: oceanName },
      {
        oceanName: oceanName,
        doodleArray: doodleArray,
      },
      { upsert: true },
      (error, data) => {
        if (!error) {
          res.status(200).json({
            code: 200,
            massage: `location is upserted successfully`,
            addObject: data,
          });
        } else {
          throw error;
        }
      }
    );
  } catch (error) {
    res.status(500).json({
      code: 500,
      massage: "error occurred while save doodle data in db",
      error: error,
    });
  }
});

// Get Single file by file name
router.get("/api/asset-file/:id", (req, res) => {
  res.sendFile(path.resolve(`assetFiles/${req.params.id}`));
});

router.get("/api/gps-range-radius", (req, res) => {
  NumberVariableSchema.find({ name: "gpsRangeRadius" }, (error, data) => {
    if (!error) {
      if (data.length === 0) {
        res.send({ gpsRangeRadius: undefined });
        return;
      }
      const gpsRangeRadius = data[0].value;
      res.send({ gpsRangeRadius });
    } else {
      res.status(500).json({
        code: 500,
        massage:
          "GET [gps-range-radius] : error occurred while get data from db",
        error: error,
      });
    }
  });
});

router.post("/api/gps-range-radius", async (req, res) => {
  const { body } = req;
  const { gpsRangeRadius } = body;

  try {
    NumberVariableSchema.findOneAndUpdate(
      { name: "gpsRangeRadius" },
      {
        name: "gpsRangeRadius",
        value: gpsRangeRadius,
      },
      { upsert: true },
      (error, data) => {
        if (!error) {
          res.status(200).json({
            code: 200,
            massage: `gpsRangeRadius is upserted successfully`,
            addObject: data,
          });
        } else {
          throw error;
        }
      }
    );
  } catch (error) {
    console.log("error in POST REQ, [api/gps-range-radius], error: ", error);
  }
});

router.get("/api/location/:oceanname", (req, res) => {
  const oceanName = req.params.oceanname;

  LocationSchema.find({ name: oceanName }, (error, data) => {
    if (!error) {
      if (data.length === 0) {
        res.send({ latitude: undefined, longitude: undefined });
        return;
      }
      const { latitude, longitude } = data[0];
      res.send({ latitude, longitude });
    } else {
      res.status(500).json({
        code: 500,
        massage: "GET [location] : error occurred while get data from db",
        error: error,
      });
    }
  });
});

router.get("/api/every-location", (req, res) => {
  LocationSchema.find({}, (error, data) => {
    if (!error) {
      if (data.length === 0) {
        res.send({ locations: [] });
        return;
      }
      const pureLocations = [];
      for (let i = 0; i < data.length; i++) {
        if (data[i] !== undefined) {
          pureLocations.push({
            name: data[i].name,
            latitude: data[i].latitude,
            longitude: data[i].longitude,
          });
        }
      }
      res.send({ locations: pureLocations });
    } else {
      res.status(500).json({
        code: 500,
        massage: "GET [location] : error occurred while get data from db",
        error: error,
      });
    }
  });
});

router.post("/api/location", async (req, res) => {
  const { body } = req;
  const { name, latitude, longitude } = body;

  try {
    LocationSchema.findOneAndUpdate(
      { name: name },
      {
        name: name,
        latitude: latitude,
        longitude: longitude,
      },
      { upsert: true },
      (error, data) => {
        if (!error) {
          res.status(200).json({
            code: 200,
            massage: `location is upserted successfully`,
            addObject: data,
          });
        } else {
          throw error;
        }
      }
    );
  } catch (error) {
    console.log("error in POST REQ, [api/location], error: ", error);
  }
});

router.post("/api/doodle", async (req, res) => {
  const { body } = req;
  const {
    relativeOceanPosition,
    relativeOceanRotation,
    linePositions,
    lineWeight,
  } = body;

  try {
    const doodleSchema = new DoodleSchema({
      relativeOceanPosition: relativeOceanPosition,
      relativeOceanRotation: relativeOceanRotation,
      linePositions: linePositions,
      lineWeight: lineWeight,
    });

    doodleSchema.save((error, data) => {
      if (!error) {
        res.status(200).json({
          code: 200,
          massage: `doodle is Added Successfully`,
          addObject: data,
        });
      } else {
        throw error;
      }
    });
  } catch (error) {
    console.log("error in POST REQ, [api/doodle], error: ", error);
  }
});

router.get("/api/doodle", (req, res) => {
  DoodleSchema.find({}, (error, data) => {
    if (!error) {
      if (data.length === 0) {
        res.send({ doodles: undefined });
        return;
      }
      const pureDoodles = [];
      for (let i = 0; i < data.length; i++) {
        const doodle = data[i];
        pureDoodles.push({
          relativeOceanPosition: doodle.relativeOceanPosition,
          relativeOceanRotation: doodle.relativeOceanRotation,
          linePositions: doodle.linePositions,
          lineWeight: doodle.lineWeight,
        });
      }

      res.send({ doodleArray: pureDoodles });
    } else {
      res.status(500).json({
        code: 500,
        massage: "GET [location] : error occurred while get data from db",
        error: error,
      });
    }
  });
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
