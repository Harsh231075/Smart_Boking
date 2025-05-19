import express from "express";
import slots from "../data/slotData.js";

const router = express.Router();


router.get("/", (req, res) => {
  res.json(slots);
});


router.post("/book", (req, res) => {
  const { name, id } = req.body;
  console.log(name, id);
  const slot = slots.find((s) => s.id === id);

  if (!slot) return res.status(404).json({ message: "Slot not found" });
  if (slot.status === "booked") return res.status(400).json({ message: "Slot already booked" });

  slot.status = "booked";
  slot.name = name;

  res.json({ message: "Slot booked successfully", slot });
});


router.post("/cancel", (req, res) => {
  const { id } = req.body;
  const slot = slots.find((s) => s.id === id);

  if (!slot) return res.status(404).json({ message: "Slot not found" });
  if (slot.status === "available") return res.status(400).json({ message: "Slot is already available" });

  slot.status = "available";
  slot.name = null;

  res.json({ message: "Booking cancelled", slot });
});

export default router;
