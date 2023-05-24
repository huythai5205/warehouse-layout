var express = require("express");
var router = express.Router();
const warehouseModel = require("../models/warehouse.model");

/* GET all warehouses */
router.get("/list", function (req, res, next) {
  warehouseModel.find(function (err, warehouseListRes) {
    if (err) {
      res.send([]);
    } else {
      res.send(warehouseListRes);
    }
  });
});

/* GET Details of a specific warehouse */
router.get("/view", function (req, res, next) {
  const warehouseId = req.query.warehouseId;

  warehouseModel.findById(warehouseId, function (err, warehouseRes) {
    if (err) {
      res.send({ status: 500, message: "Unable to Find The Warehouse" });
    } else {
      res.send(warehouseRes);
    }
  });
});

/*  Create new warehouse. */
router.post("/add", function (req, res, next) {
  let name = req.body.name;
  const warehouseObj = new warehouseModel({
    name: name,
    zone: 10
  });

  warehouseObj.save(function (err, warehouseRes) {
    if (err) {
      res.send({ status: 500, message: "Unable to Add Warehouse" });
    } else {
      res.send(warehouseObj);
    }
  });
});

/*  Update existing warehouse. */
router.put("/update", function (req, res, next) {
  warehouseModel.findByIdAndUpdate(
    req.body._id,
    req.body,
    function (err, warehouseRes) {
      if (err) {
        res.send({ status: 500, message: "Unable to Update Warehouse" });
      } else {
        res.send(warehouseRes);
      }
    }
  );
});

/*  Delete existing warehouse. */
router.delete("/delete", function (req, res, next) {
  const warehouseId = req.query.warehouseId;

  warehouseModel.findByIdAndDelete(warehouseId, function (err, warehouseRes) {
    if (err) {
      res.send({ status: 500, message: "Unable to Delete Warehouse" });
    } else {
      res.send({ status: 200, message: "Warehouse Deleted Successfully" });
    }
  });
});

module.exports = router;
