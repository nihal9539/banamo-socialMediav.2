import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    reset_token: {
        type: String,
        default: null,
        allowNull: true
    }

},
    { timestamps: true }
)

const UserModel = mongoose.model('user', UserSchema);

export default UserModel