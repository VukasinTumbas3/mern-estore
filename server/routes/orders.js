const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const auth = require("../middleware/auth");

// Create and save a new order
router.post("/", auth, async (req, res) => {
  try {
    const order = new Order({
      user: req.userId,
      items: req.body.items,
    });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    console.error("Error saving order:", err);
    res.status(500).json({ error: "Could not save order." });
  }
});

// Get all orders for the logged-in user
router.get("/", auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.userId });
    res.json(orders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ error: "Could not fetch orders." });
  }
});

// Update an order's items (add, update, or remove)
router.put("/:orderId", auth, async (req, res) => {
  try {
    const { items } = req.body;
    const order = await Order.findOne({
      _id: req.params.orderId,
      user: req.userId,
    });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Merge, add, or remove items
    items.forEach((newItem) => {
      const index = order.items.findIndex((item) => item._id === newItem._id);
      if (newItem.quantity <= 0) {
        // Remove item
        if (index !== -1) order.items.splice(index, 1);
      } else {
        if (index !== -1) {
          // Update existing item
          order.items[index].quantity = newItem.quantity;
        } else {
          // Add new item
          order.items.push(newItem);
        }
      }
    });

    await order.save();
    res.json(order);
  } catch (err) {
    console.error("Error updating order:", err);
    res.status(500).json({ error: "Failed to update order" });
  }
});

// Delete (cancel) an order
router.delete("/:orderId", auth, async (req, res) => {
  try {
    const result = await Order.deleteOne({
      _id: req.params.orderId,
      user: req.userId,
    });

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ error: "Order not found or not authorized" });
    }

    res.json({ message: "Order deleted" });
  } catch (err) {
    console.error("Error deleting order:", err);
    res.status(500).json({ error: "Failed to delete order" });
  }
});

module.exports = router;
