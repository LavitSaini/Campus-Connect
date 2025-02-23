import Event from "../models/event.model.js";
import { sendEventEmail } from "../utils/event.utils.js";
import cloudinary from "../lib/cloudinary.js";
import slugify from "slugify";
import { v4 as uuidv4 } from 'uuid';

export const createEvent = async (req, res) => {
    try {
        const { user : admin } = req;
        const data = req.body;

        if(!data.title || !data.date || !data.location || !data.category) {
            return res.status(400).json({
                success: false,
                message: "title, date, category and location are required",
            });
        }

        // upload image on cloudinary
        if (data.eventImageUrl) {
            try {
                const uploadRes = await cloudinary.uploader.upload(data.eventImageUrl);
                data["eventImageUrl"] = uploadRes.secure_url;

            } catch (error) {
                console.log(error);
                console.log("Error coming while uploading course image", error.message);
                throw error;
            }
        }

        const titleSlug = slugify(data.title, { lower: true, strict: true });
        data["titleSlug"] = `${titleSlug}-${uuidv4().slice(0, 8)}`;
        data["author"] = admin._id;

        const event = await Event.create(data);

        // run an async task to notify all the subscribe users about the event

        admin.events.push(event._id);
        await admin.save();

        sendEventEmail(event);

        return res.status(201).json({
            success: true,
            message: "Event created successfully"
        });

    } catch (error) {
        console.log("Error coming while creating event", error.message);
        return res.status(500).json({
            success: false,
            message: "Unknown error occurred while creating event"
        })
    }
}

export const deleteEvent = async (req, res) => {
    try {
        // const admin = req.admin;

        const { eventId } = req.params;

        if (!eventId) {
            return res.status(400).json({
                success: false,
                message: "EventId is required"
            });
        }

        // const event = await Event.findOne({_id : eventId, author : admin._id});

        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event not found"
            });
        }

        await Event.findByIdAndDelete(event._id);

        return res.json({
            success: true,
            message: "Event deleted successfully"
        });

    } catch (error) {
        console.log("Error coming while deleting event", error.message);
        return res.status(500).json({
            success: false,
            message: "Unknown error occurred while deleting event"
        })
    }
}

export const updateEvent = async (req, res) => {
    try {
        // const admin = req.admin;
        const { eventId } = req.params;
        const data = req.body;

        if (!eventId) {
            return res.status(400).json({
                success: false,
                message: "EventId is required"
            });
        }

        // const event = await Event.findOne({_id : eventId, author : admin._id});

        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event not found"
            });
        }

        if (data.eventImageUrl) {
            try {
                const uploadRes = await cloudinary.uploader.upload(data.eventImageUrl);
                data["eventImageUrl"] = uploadRes.secure_url;

            } catch (error) {
                console.log(error);
                console.log("Error coming while uploading course image", error.message);
                throw error;
            }
        }

        const updatedEvent = await Event.findByIdAndUpdate(eventId, data, { new: true });
        console.log(updateEvent);

        return res.json({
            success: true,
            message: "Event updated successfully",
            event: updatedEvent,
        });

    } catch (error) {
        console.log("Error coming while updating event", error.message);
        return res.status(500).json({
            success: false,
            message: "Unknown error occurred while updating event"
        })
    }
}

export const getEvents = async (req, res) => {
    try {
        const AUTHOR_SAFE_DATA = "name profileImageUrl";
        let { page, limit } = req.query;

        page = page || 1;
        limit = limit || 10;
        let skip = (page - 1) * limit;

        const events = await Event.find({})
            .sort({ 'createdAt': -1 })
            .skip(skip)
            .limit(limit)
            .populate('author', AUTHOR_SAFE_DATA)
            .lean();

        if (events.length === 0) {
            return res.status(404).json({
                success: true,
                message: "No events found",
            });
        }

        return res.json({
            success: true,
            message: "Events fetched successfully",
            events,
        });

    } catch (error) {
        console.log("Error coming while getting events", error.message);
        return res.status(500).json({
            success: false,
            message: "Unknown error occurred while getting events"
        })
    }
}