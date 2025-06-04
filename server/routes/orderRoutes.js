const express = require("express");
const Order = require("../models/Order");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// ✅ Create a new order
router.post("/", authMiddleware, async (req, res) => {
  const { items } = req.body;

  try {
    const order = new Order({
      user: req.user.id,
      items,
    });

    await order.save();
    res.status(201).json(order);
  } catch (err) {
    console.error("Error saving order:", err);
    res.status(500).json({ error: "Could not save order." });
  }
});

// ✅ Get all orders for the current user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id });
    res.json(orders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ error: "Could not fetch orders." });
  }
});

// ✅ Delete an order
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const order = await Order.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id, // Ensure only owner's orders can be deleted
    });

    if (!order) return res.status(404).json({ error: "Order not found." });

    res.json({ message: "Order deleted." });
  } catch (err) {
    console.error("Error deleting order:", err);
    res.status(500).json({ error: "Could not delete order." });
  }
});

// ✅ Update an order (e.g., add/remove items)
router.put("/:id", authMiddleware, async (req, res) => {
  const { items } = req.body;

  try {
    const order = await Order.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { items },
      { new: true }
    );

    if (!order) return res.status(404).json({ error: "Order not found." });

    res.json(order);
  } catch (err) {
    console.error("Error updating order:", err);
    res.status(500).json({ error: "Could not update order." });
  }
});

module.exports = router;
