import {v4 as uuidv4} from "uuid";
import BookModel from "../module/book.js";

const GET_ALL_BOOKS = async(req, res)=>{
    try{
        const books=await BookModel.find();
      return res.status(200).json({books: books});
    } catch(err){
      console.log(err);
      return res.status(500).json({mesage:`Server error`});
    }
};
const GET_USER_BOOKS= async(req, res)=>{
    try{
        const books=await BookModel.find({userId: req.params.userId});
        res.status(200).json({books: books});
    } catch(err){
      console.log(err);
      return res.status(500).json({mesage:`Server error`});
    }
};
const GET_BOOK_BY_ID = async (req, res)=>{
    try{
        const id=req.params.id;
        const book=await BookModel.findOne({id:id});
        if(!book){
         return res.status(404).json({message: `The book does not exist`});
        }
        return res.status(200).json({response: `status`, book: book,})
      } catch(err){
          console.log(err);
          return res.status(500).json({massage: `Server error`});
      }
};
const POST_BOOK = async (req, res)=>{
    try{
    const book= new BookModel({
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        summary: req.body.summary,
        imageURL: req.body.imageURL,
        status: req.body.status,
        userId: req.body.userId,
        id: uuidv4(),
    });
    await book.save();
    return res.status(201).json({message: "A book was add successfully.", book: book,});
   } catch (err){
    console.log(err);
    return res.status(500).json({message: "Server error"});
   };
};

 
const PUT_BOOK_BY_ID = async (req, res)=>{
    try{
        const id=req.params.id;
        const book=await BookModel.findOneAndUpdate(
            {id:id},
            {...req.body},
            {new: true}
        );
        if(!book){
            return res.status(404).json({message: `The book does not exist`});
           }
        
        return res.status(200).json({message: `Book was updated`, book: book,})
      } catch(err){
          console.log(err);
          return res.status(500).json({massage: `Server error`});
      }
};
const DELETE_BOOK_BY_ID = async (req, res)=>{
    try{
        const response =await BookModel.findOneAndDelete({id: req.params.id});
        if (response.userId !== req.body.userId){
            return res.status(403).json({ message: "You can delete only book that belongs to you."});
        }
        if(!response){
         return res.status(404).json({message: `The book does not exist`});
        }
        return res.status(200).json({response: `The book was deleted`, book: response,})
      } catch(err){
          console.log(err);
          return res.status(500).json({massage: `Server error`});
      }
};

export{
    GET_ALL_BOOKS,
    GET_USER_BOOKS,
    GET_BOOK_BY_ID,
    POST_BOOK,
    PUT_BOOK_BY_ID,
    DELETE_BOOK_BY_ID,
};