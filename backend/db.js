const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const UserSchema = new Schema({
    firstName: { type: String, required: true, trim: true, maxLength: 50 },
    lastName: { type: String, required: true, trim: true, maxLength: 50 },
    email: { type: String, required: true, unique: true, lowercase: true },
    username: { type: String, required: true, unique: true, trim: true, minLength: 3, maxLength: 20, lowercase: true },
    password: { type: String, requried: true, minLength: 6 },
}, {
    timestamps: true
});

const User = mongoose.model("User", UserSchema);

module.exports = {
    User
}