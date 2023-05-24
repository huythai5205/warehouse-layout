const mongoose = require("mongoose");

const warehouseSchema = mongoose.Schema({
  name: { type: String, unique: true },
  zone1: {
    shelves: [
      {
        label: Number,
        item: String
      }
    ]
  },
  zone2: {
    shelves: [
      {
        label: Number,
        item: String
      }
    ]
  },
  zone3: {
    shelves: [
      {
        label: Number,
        item: String
      }
    ]
  },
  zone4: {
    shelves: [
      {
        label: Number,
        item: String
      }
    ]
  },
  zone5: {
    shelves: [
      {
        label: Number,
        item: String
      }
    ]
  },
  zone6: {
    shelves: [
      {
        label: Number,
        item: String
      }
    ]
  },
  zone7: {
    shelves: [
      {
        label: Number,
        item: String
      }
    ]
  },
  zone8: {
    shelves: [
      {
        label: Number,
        item: String
      }
    ]
  },
  zone9: {
    shelves: [
      {
        label: Number,
        item: String
      }
    ]
  },

  zone10: {
    shelves: [
      {
        label: Number,
        item: String
      }
    ]
  },
  zone11: {
    shelves: [
      {
        label: Number,
        item: String
      }
    ]
  },
  zone12: {
    shelves: [
      {
        label: Number,
        item: String
      }
    ]
  }
});

const warehouseModel = mongoose.model("Warehouse", warehouseSchema);

module.exports = warehouseModel;
