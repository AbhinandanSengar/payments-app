const { Schema, model, Types } = require("mongoose");

const UserSchema = new Schema({
    firstName: { type: String, required: true, trim: true, maxlength: 50 },
    lastName: { type: String, required: true, trim: true, maxlength: 50 },
    username: { type: String, required: true, unique: true, trim: true, minlength: 3, maxlength: 20, lowercase: true },
    password: { type: String, required: true, minlength: 6 },
}, {
    timestamps: true
});

const AccountSchema = new Schema({
    userId: { type: Types.ObjectId, required: true, unique: true, ref: "User" },
    balance: { type: Number, required: true, default: 0, min: 0 }
});

const User = model("User", UserSchema);
const Account = model("Account", AccountSchema);

module.exports = {
    User,
    Account
}