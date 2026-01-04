import express from "express";
import {
  getEventById,
  getLatestEvents,
  createEvent,
  updateEvent,
  deleteEvent
} from "../Controllers/controller.js";

import { upload } from "./upload.js";

const router = express.Router();

// GET event by id
router.get("/events", getEventById);

// GET latest events
router.get("/events/latest", getLatestEvents);

// CREATE event
router.post("/events", upload.single("image"), createEvent);

// UPDATE event
router.put("/events/:id", upload.single("image"), updateEvent);

// DELETE event
router.delete("/events/:id", deleteEvent);

export default router;
