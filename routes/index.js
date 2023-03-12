const express = require("express");
const router = express.Router();
const path = require("path");

const { UnknownObjectArraySchema } = require("../models/unknownobjects");
const { NumberVariableSchema } = require("../models/numbervariable");
const { filterObjectId } = require("../util");

router.get("/api/unknownobjects/:oceanname", (req, res) => {
  const oceanName = req.params.oceanname;
  UnknownObjectArraySchema.find({ oceanName: oceanName }, (error, data) => {
    if (data.length <= 0) {
      res.send({ unknownObjectArray: undefined });
      return;
    }
    if (!error) {
      const pureUnknownObjectArray = filterObjectId(data[0].unknownObjectArray);
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
    // 있으면 업데이트 없으면 생성

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
