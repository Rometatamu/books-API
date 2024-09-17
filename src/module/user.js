import mongoose from "mongoose";

const userSchema=mongoose.Schema({
        username: {type: String, required: true, min:3},
        email: {type: String, required: true, min:10},
        password: {type: String, required: true, min:8},
        id: {type: String, required: true},
});
export default mongoose.model("User", userSchema);