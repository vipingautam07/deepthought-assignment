import { ObjectId } from "mongodb";
import { getDB } from "../db.js";


export async function getEventById(req, res) {
  const { id } = req.query;
  const db = getDB();

  const event = await db
    .collection("events")
    .findOne({ _id: new ObjectId(id) });

  res.json(event);
}


export async function getLatestEvents(req, res) {
  const { limit = 5, page = 1 } = req.query;
  const db = getDB();

  const events = await db
    .collection("events")
    .find({})
    .sort({ schedule: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit))
    .toArray();

  res.json(events);
}


export async function createEvent(req, res) {
  const db = getDB();

  const eventData = {
    type: "event",
    ...req.body,
    files: {
      image: req.file ? `/uploads/${req.file.filename}` : null
    },
    createdAt: new Date()
  };

  const result = await db
    .collection("events")
    .insertOne(eventData);

  res.json({
    event_id: result.insertedId
  });
}


export async function updateEvent(req, res) {
  const { id } = req.params;
  const db = getDB();

  const updateData = {
    ...req.body
  };

  if (req.file) {
    updateData.files = {
      image: `/uploads/${req.file.filename}`
    };
  }

  await db.collection("events").updateOne(
    { _id: new ObjectId(id) },
    { $set: updateData }
  );

  res.json({ message: "Event updated" });
}


export async function deleteEvent(req, res) {
  const { id } = req.params;
  const db = getDB();

  await db
    .collection("events")
    .deleteOne({ _id: new ObjectId(id) });

  res.json({ message: "Event deleted" });
}
