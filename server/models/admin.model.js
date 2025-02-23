import mongoose from 'mongoose';
import bcrypt from "bcrypt";

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: [3, "Name should be minimum of length 3"],
        required: [true, "Name is required"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        minLength: [6, "Password should be minimum of length 6"],
        required: [true, "Password is required"],
        trim: true,
    },
    department : {
        type : String,
        required : true,
        enum : ["CEC", "CCT", "CCE", "CCP", "CBSA", "CCH", "CCHM"],
    },
    profileImageUrl : {
        type : String,
        trim : true,
        default : "",
    },
    events: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Event",
        },
    ],
}, {
    timestamps: true
});


adminSchema.pre('save', async function () {
    const user = this;
    if (!user.isModified('password')) {
        return;
    }
    user.password = await bcrypt.hash(user.password, 10);
});

adminSchema.set('toJSON', {
    versionKey : false,
    transform: function (doc, ret) {
        delete ret.password;
    }
});

const adminModel = mongoose.model('Admin', adminSchema);

export default adminModel;
