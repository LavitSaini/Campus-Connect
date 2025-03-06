import Club from "../models/club.model.js";
import User from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js";
import slugify from "slugify";
import { v4 as uuidv4 } from "uuid";

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
    }

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

export const getUserClubs = async (req, res) => {
  const { userId } = req.params;
  const ADMINS_SAFE_DATA = "name profileImageUrl";
  const FOLLOWERS_SAFE_DATA = "name profileImageUrl";
  const EVENTS_SAFE_DATA = "title eventImageUrl";
  try {
    const clubs = await Club.find({ createdBy: userId })
      .populate("followers", FOLLOWERS_SAFE_DATA)
      .populate("events", EVENTS_SAFE_DATA)
      .populate("admins.admin", ADMINS_SAFE_DATA);


    return res.json({
      success: true,
      message: "Clubs fetched successfully",
      clubs,
    });
  } catch (error) {
    console.log("Error coming while fetching user clubs", error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
