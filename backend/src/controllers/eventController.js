import Event from "../models/eventModel.js";
import { validationResult } from "express-validator";

export const getEvents = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const events = await Event.findAll();

    res.status(200).json({
      code: 1,
      message: "Events List",
      data: events,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: "An error occurred while obtaining the events",
    });
  }
};

export const getEventById = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;

    const event = await Event.findByPk(id);
    if (!event) {
      return res.status(404).json({
        code: -6,
        message: "Event Not Found",
      });
    }

    res.status(200).json({
      code: 1,
      message: "Event Detail",
      data: event,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: "An error occurred while obtaining the event",
    });
  }
};

export const addEvent = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, category } = req.body;
    let newEvent;
    try {
      newEvent = await Event.create({
        title: title,
        description: description,
        category: category,
      });
    } catch (error) {
      // If the error is due to a duplicate title
      if (error.name === "SequelizeUniqueConstraintError") {
        res.status(400).json({
          code: -61,
          message: "Duplicate Event Title",
        });
      }
    }

    if (!newEvent) {
      return res.status(404).json({
        code: -6,
        message: "Error When Adding The Event",
      });
    }

    res.status(200).json({
      code: 1,
      message: "Event Added Successfully",
      data: newEvent,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: "An error occurred while adding the event",
    });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { title, description, category } = req.body;

    const event = await Event.findByPk(id);
    if (!event) {
      return res.status(404).json({
        code: -3,
        message: "Event not found",
      });
    }

    event.title = title;
    event.description = description;
    event.category = category;
    await event.save();

    res.status(200).json({
      code: 1,
      message: "Event Updated Successfully",
      data: event,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: "An error occurred while updating the event",
    });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;

    const deletedEvent = await Event.destroy({ where: { id_event: id } });

    if (!deletedEvent) {
      return res.status(404).json({
        code: -100,
        message: "Event Not Found",
      });
    }

    res.status(200).json({
      code: 1,
      message: "Event Deleted Successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: "An error occurred while deleting the event",
    });
  }
};
