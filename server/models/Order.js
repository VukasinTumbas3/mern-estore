// models/Order.js
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  // svaki order je linkan useru (ObjectId kao referenca)
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  //  array itema u orderu
  items: [
    {
      _id: String,
      name: String,
      price: Number,
      quantity: Number,
    },
  ],
  // kad je order napravljen
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
