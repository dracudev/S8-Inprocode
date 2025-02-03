import { Router } from "express";
import {
  getEvents,
  getEventById,
  addEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController.js";
import { eventValidator } from "../validations/event.Validation.js";
import { idValidator } from "../validations/generic.Validation.js";

const router = Router();

router.get("/", getEvents);
router.get("/:id", idValidator, getEventById);
router.post("/", eventValidator, addEvent);
router.patch("/:id", idValidator, eventValidator, updateEvent);
router.delete("/:id", idValidator, deleteEvent);

export default router;
