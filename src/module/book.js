import mongoose from "mongoose";

const bookSchema=mongoose.Schema({
        title: {type: String, required: true, min:3},
        author: {type: String, required: true, min:5},
        genre: {type: String, required: true},
        summary: {type: String, required: true, min:20},
        imageURL: {type: String, required: true},
        status: {type: String, required: false},
        userId:{type:String, require:true},
        id: {type: String, required: true},
});
export default mongoose.model("Book", bookSchema);