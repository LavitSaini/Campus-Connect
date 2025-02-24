import Club from "../models/club.model.js";
import cloudinary from "../lib/cloudinary.js";
import slugify from "slugify";
import { v4 as uuidv4 } from 'uuid';

export const createClub = async (req, res) => {
    try {
        const admin = req.user;
        const data = req.body;

        if (!data.name || !data.description) {
            return res.status(400).json({
                success: false,
                message: "Name and description is required",
            });
        }

        if (data.profileImageUrl) {
            try {
                const uploadRes = await cloudinary.uploader.upload(data.profileImageUrl);
                data["profileImageUrl"] = uploadRes.secure_url;

            } catch (error) {
                console.log(error);
                console.log("Error coming while uploading club profile image", error.message);
                throw error;
            }
        }

        const nameSlug = slugify(data.name, { lower: true, strict: true });
        
        data["nameSlug"] = `${nameSlug}-${uuidv4().slice(0, 8)}`;

        data["createdBy"] = admin._id;
        
        data["admins"] = [];
        data.admins.push({
            admin : admin._id,
        });

        // create club
        const club = await Club.create(data);

        // update admin 
        admin.adminAtClubs.push(club._id);
        await admin.save();

        return res.status(201).json({
            success: true,
            message: "Club created successfully",
        });

    } catch (error) {
        console.log("Error coming while creating club", error.message);
        return res.status(500).json({
            success: false,
            message: "Unknown error occurred while creating club"
        })
    }
}

export const getSingleClub = async (req, res) => {
    try {
        const { clubId } = req.params;

        const club = await Club
            .findById(clubId)   
            .populate("createdBy", "name department profileImageUrl")
            .populate("admins.admin", "name department profileImageUrl")
            .populate({
                path : "events",
                populate : {
                    path : "author",
                    select : "name department profileImageUrl"
                }
            })

        if(!club) {
            return res.status(404).json({
                success: false,
                message: "Club not found",
            });
        }

        return res.json({
            success : true,
            club,
        });

    } catch (error) {
        console.log("Error coming while creating club", error.message);
        return res.status(500).json({
            success: false,
            message: "Unknown error occurred while creating club"
        })
    }
}

export const addAdminToClub = async (req, res) => {
    try {
        
    } catch (error) {
        console.log("Error coming while adding admin to club", error.message);
        return res.status(500).json({
            success: false,
            message: "Unknown error occurred adding admin to club"
        })
    }
}