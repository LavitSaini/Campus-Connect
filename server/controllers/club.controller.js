import Club from "../models/club.model.js";
<<<<<<< HEAD
import Event from "../models/event.model.js";
import User from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js";
import slugify from "slugify";
import { v4 as uuidv4 } from 'uuid';
import mongoose, { mongo } from "mongoose";
=======
import User from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js";
import slugify from "slugify";
import { v4 as uuidv4 } from "uuid";
>>>>>>> 3b56f35 (Frontend Updated)

export const createClub = async (req, res) => {
  try {
    const admin = req.user;
    const data = req.body;

<<<<<<< HEAD
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
            admin: admin._id,
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
=======
    if (!data.name || !data.description) {
      return res.status(400).json({
        success: false,
        message: "Name and description is required",
      });
>>>>>>> 3b56f35 (Frontend Updated)
    }

    if (data.clubImage) {
      try {
        const uploadRes = await cloudinary.uploader.upload(data.clubImage, {
          format: "webp",
          folder: "club_images",
        });
        data["clubImageUrl"] = uploadRes.secure_url;
      } catch (error) {
        console.log(
          "Error coming while uploading club profile image",
          error.message
        );
      }
    }

    const nameSlug = slugify(data.name, { lower: true, strict: true });

    data["nameSlug"] = `${nameSlug}-${uuidv4().slice(0, 8)}`;

    data["createdBy"] = admin._id;

    data["admins"] = [
      ...data["admins"],
      {
        admin: admin._id,
      },
    ];

    // create club
    const club = await Club.create(data);

    // Update all admin users' adminAtClubs field asynchronously
    data.admins.forEach((obj) => {
      User.findByIdAndUpdate(obj.admin, {
        $addToSet: { adminAtClubs: club._id },
      }).exec();
    });

    return res.status(201).json({
      success: true,
      message: "Club created successfully",
    });
  } catch (error) {
    console.log("Error coming while creating club", error.message);
    return res.status(500).json({
      success: false,
      message: "Unknown error occurred while creating club",
    });
  }
};

export const getClubs = async (req, res) => {
  try {
    const ADMINS_SAFE_DATA = "name profileImageUrl";
    const FOLLOWERS_SAFE_DATA = "name profileImageUrl";
    const EVENTS_SAFE_DATA = "title eventImageUrl";

    const clubs = await Club.find({})
      .populate("followers", FOLLOWERS_SAFE_DATA)
      .populate("events", EVENTS_SAFE_DATA)
      .populate("admins.admin", ADMINS_SAFE_DATA);

    if (clubs.length === 0) {
      return res.status(404).json({
        success: true,
        message: "No clubs found",
      });
    }

    return res.json({
      success: true,
      message: "Clubs fetched successfully",
      clubs,
    });
  } catch (error) {
    console.log("Error coming while getting clubs", error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getSingleClub = async (req, res) => {
  const { clubId } = req.params;

<<<<<<< HEAD
        const club = await Club
            .findById(clubId)
            .populate("createdBy", "name department profileImageUrl")
            .populate("admins.admin", "name department profileImageUrl")
            .populate({
                path: "events",
                populate: {
                    path: "author",
                    select: "name department profileImageUrl"
                }
            })

        if (!club) {
            return res.status(404).json({
                success: false,
                message: "Club not found",
            });
        }

        return res.json({
            success: true,
            club,
        });

    } catch (error) {
        console.log("Error coming while creating club", error.message);
        return res.status(500).json({
            success: false,
            message: "Unknown error occurred while creating club"
        })
=======
  const ADMINS_SAFE_DATA = "name profileImageUrl";
  const FOLLOWERS_SAFE_DATA = "name profileImageUrl";
  const EVENTS_SAFE_DATA = "title eventImageUrl date";
  try {
    const club = await Club.findById({ _id: clubId })
      .populate("followers", FOLLOWERS_SAFE_DATA)
      .populate("events", EVENTS_SAFE_DATA)
      .populate("admins.admin", ADMINS_SAFE_DATA);

    if (!club) {
      return res.status(404).json({
        success: false,
        message: "Club not found",
      });
>>>>>>> 3b56f35 (Frontend Updated)
    }

<<<<<<< HEAD
export const addAdminToClub = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const admin = req.user;
        const { clubId, adminId } = req.params;

        if (admin._id.toString() === adminId) {
            return res.status(400).json({
                success: false,
                message: "You cannot add yourself"
            });
        }

        const adminToAdd = await User.findById(adminId, null, { session });

        if (!adminToAdd) {
            return res.status(404).json({
                success: false,
                message: "Admin to add not found"
            });
        }

        if (adminToAdd.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: `You can only add admins as club admins`
            });
        }

        if (adminToAdd.adminAtClubs.some(id => id.toString() === clubId)) {
            return res.status(400).json({
                success: false,
                message: `${adminToAdd.name} is already an admin in the club`
            });
        }

        const club = await Club.findOne({ _id: clubId, "admins.admin": admin._id }, null, { session });

        if (!club) {
            return res.status(404).json({
                success: false,
                message: "Club not found"
            });
        }

        club.admins.push({
            admin: adminToAdd._id
        });
        await club.save({ session });

        adminToAdd.adminAtClubs.push(club._id);
        await adminToAdd.save({ session });

        await session.commitTransaction();

        return res.json({
            success: true,
            message: `${adminToAdd.name} is now admin to club`
        });

    } catch (error) {
        await session.abortTransaction();

        console.log("Error coming while adding admin to club", error.message);
        return res.status(500).json({
            success: false,
            message: "Unknown error occurred adding admin to club"
        })
    } finally {
        session.endSession();
    }
}

export const deleteClub = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const admin = req.user;
        const { clubId } = req.params;

        const club = await Club.findOne({ _id: clubId, createdBy: admin._id }, null, { session });

        if (!club) {
            await session.abortTransaction();
            session.endSession();

            return res.status(404).json({
                success: false,
                message: "Club not found or not created by you",
            });
        }

        const clubAdminsList = club.admins.map((adminObj) => adminObj.admin);
        const followersList = club.followers;
        const eventList = club.events;

        const adminUpdatePromise = User.updateMany(
            { _id: { $in: clubAdminsList } },
            {
                $pull: { adminAtClubs: club._id }
            }, { session });

        const followerUpdatePromise = User.updateMany(
            { _id: { $in: followersList } },
            {
                $pull: { followingClubs: club._id }
            }, { session });

        const eventAuthors = await Event.distinct("author", { _id: { $in: eventList } }).session(session);

        const eventAuthorUpdatePromise = User.updateMany(
            { _id: { $in: eventAuthors } },
            { $pull: { events: { $in: eventList } } },
            { session }
        );

        const eventDeletePromise = Event.deleteMany({ _id: { $in: eventList } }, { session });

        const clubDeletePromise = Club.deleteOne({ _id: clubId }, { session });

        await Promise.all([
            adminUpdatePromise,
            followerUpdatePromise,
            eventAuthorUpdatePromise,
            eventDeletePromise,
            clubDeletePromise
        ]);

        await session.commitTransaction();
        session.endSession();

        return res.json({
            success: true,
            message: "Club deleted successfully"
        });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();

        console.log("Error coming while adding deleting the club", error.message);
        return res.status(500).json({
            success: false,
            message: "Unknown error occurred adding deleting the club"
        });
    }
}

export const followClub = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const user = req.user;
        const { clubId } = req.params;

        const club = await Club.findByIdAndUpdate(clubId, {
            $addToSet: { followers: user._id },
        }, { new: true, session });        

        if (!club) {
            await session.abortTransaction();
            session.endSession();

            return res.status(404).json({
                success: false,
                message: "Club not found",
            });
        }

        await User.findByIdAndUpdate(
            user._id,
            { $addToSet: { followingClubs: club._id } },
            { session }
        );

        await session.commitTransaction();
        session.endSession();

        return res.json({
            success: true,
            message: `You are now following ${club.name}`,
        });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();

        console.log("Error coming while following club", error.message);
        return res.status(500).json({
            success: false,
            message: "Unknown error occurred following club"
        })
    }
}

export const unfollowClub = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const user = req.user;
        const { clubId } = req.params;

        const club = await Club.findById(clubId, null, { session });

        if (!club) {
            await session.abortTransaction();

            return res.status(404).json({
                success: false,
                message: "Club not found",
            });
        }

        if (!club.followers.some(followerId => followerId.toString() === user._id.toString())) {
            await session.abortTransaction();

            return res.status(400).json({
                success: false,
                message: `You can't unfollow ${club.name} as you are not following it.`,
            });
        }

        await Promise.all([
            User.findByIdAndUpdate(user._id, { $pull: { followingClubs: club._id } }, { session }),
            Club.findByIdAndUpdate(club._id, { $pull: { followers: user._id } }, { session })
        ]);

        await session.commitTransaction();

        return res.json({
            success: true,
            message: `You have unfollowed ${club.name}`,
        });
    } catch (error) {
        await session.abortTransaction();

        console.log("Error coming while unfollowing club", error.message);
        return res.status(500).json({
            success: false,
            message: "Unknown error occurred unfollowing club"
        })
    } finally {
        session.endSession();
    }
}

export const getClubs = async (req, res) => {
    try {
        const CREATEDBY_SAFE_DATA = "name department profileImageUrl";
        let { page, limit } = req.query;

        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;
        let skip = (page - 1) * limit;

        const totalClubs = await Club.countDocuments({});

        // TODO: add advance filtering
        const clubs = await Club.find({})
            .sort({ 'createdAt': -1 })
            .skip(skip)
            .limit(limit)
            .populate('createdBy', CREATEDBY_SAFE_DATA)
            .populate({
                path: "admins.admin",
                select: "name department profileImageUrl"
            })
            .lean()

        if (clubs.length === 0) {
            return res.status(404).json({
                success: true,
                message: "No clubs found",
                clubs: []
            });
        }

        return res.json({
            success: true,
            message: "Clubs fetched successfully",
            clubs,
            page,
            totalPages: Math.ceil(totalClubs / limit),
        });

    } catch (error) {
        console.log("Error coming while getting clubs", error.message);
        return res.status(500).json({
            success: false,
            message: "Unknown error occurred getting clubs"
        });
=======
    return res.json({
      success: true,
      club,
    });
  } catch (error) {
    console.log("Error coming while fetching club", error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const followClub = async (req, res) => {
  const clubToFollowClubId = req.params.clubId;
  const loggedInUserId = req.user._id;

  try {
    // find the club
    const clubToFollow = await Club.findOne({ _id: clubToFollowClubId });
    if (!clubToFollow) {
      return res.status(400).json({
        success: false,
        message: "Invalid Club Id!",
      });
>>>>>>> 3b56f35 (Frontend Updated)
    }
    if (clubToFollow.followers.includes(loggedInUserId)) {
      return res.status(400).json({
        success: false,
        message: `You are already following ${clubToFollow.name} club.`,
      });
    }

    await User.findByIdAndUpdate(
      { _id: loggedInUserId },
      {
        $addToSet: { followingClubs: clubToFollowClubId },
      }
    );

    await Club.findOneAndUpdate(
      { _id: clubToFollowClubId },
      {
        $addToSet: { followers: loggedInUserId },
      }
    );

    return res.status(201).json({
      success: true,
      message: `${clubToFollow.name} Club Followed!`,
    });
  } catch (error) {
    console.log("Error coming while follow club", error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const unfollowClub = async (req, res) => {
  const clubToUnfollowClubId = req.params.clubId;
  const loggedInUserId = req.user._id;

  try {
    // check is the club valid or not
    const clubToUnfollow = await Club.findOne({ _id: clubToUnfollowClubId });
    if (!clubToUnfollow) {
      return res.status(400).json({
        success: false,
        message: "Invalid Club Id!",
      });
    }

    // if isFollowing then remove and update the loggedInUser
    await User.findByIdAndUpdate(
      { _id: loggedInUserId },
      {
        $pull: { followingClubs: clubToUnfollowClubId },
      }
    );

    // also update the club
    await Club.findOneAndUpdate(
      { _id: clubToUnfollowClubId },
      {
        $pull: { followers: loggedInUserId },
      }
    );

    return res.status(201).json({
      success: true,
      message: `${clubToUnfollow.name} Club Unfollowed!`,
    });
  } catch (error) {
    console.log("Error coming while unfollow club", error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
