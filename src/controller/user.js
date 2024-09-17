import {v4 as uuidv4} from "uuid";
import bcrypt from "bcryptjs";
import UserModel from "../module/user.js";
import jwt from "jsonwebtoken";

const GET_USER_BY_ID = async (req, res)=>{
    try{
        const id=req.params.id;
        const user=await UserModel.findOne(id);
        if(!user){
         return res.status(404).json({message: `The user does not exist`});
        }
        return res.status(200).json({response: `status`, user: user.email, user:user.username});
      } catch(err){
          console.log(err);
          return res.status(500).json({massage: `Server error`});
      }
};
const SIGN_UP= async (req, res)=> {
    try{
        if(!req.body.username || !req.body.email || !req.body.password){
            return res.status(400).json({message: "You didn't provided necessary data"});
        }
      const salt=bcrypt.genSaltSync(10);  
      const hash=bcrypt.hashSync(req.body.password, salt); 

      const user= { 
        username: req.body.username,
        email: req.body.email,
        id: uuidv4(),
        password: hash,
    };
     const newUser= new UserModel(user);
     await newUser.save();
     const token=jwt.sign(
        {
            email: newUser.email,
            userId: newUser.id,
        }, process.env.JWT_SECRET,
        {expiresIn: "12H"}
     );

     return res.status(201).json({
        user: newUser,
        token: token,
        message: `Registration successful`});
    } catch(err){
        console.log(err);
        return res.status(500).json({message: `Server error`});
    }
};
const LOGIN= async (req, res)=> {
    const user= await UserModel.findOne({email: req.body.email});
    if(!user){
        return res.status(403).json({message: "Bad authorization"})
    }
    const isPasswordMatch=bcrypt.compareSync(req.body.password, user.password);
    if(!isPasswordMatch){
        return res.status(403).json({message: "Bad authorization"});
    }
    const token=jwt.sign(
        {
            email: user.email,
            userId: user.id,
        }, process.env.JWT_SECRET,
        {expiresIn: "12H"}
    );
    return res.status(200).json({token: token, userId: user.id, message: "Login was successfull"});

};

const VALIDATE_LOGIN= async (req, res)=>{
    try{
        return res.status(200).json({massage: "user ok"});
    } catch (err){
        console.log (err);
        return res.status(500).json({message: "error in application"});
    }
};

export {GET_USER_BY_ID, SIGN_UP, LOGIN, VALIDATE_LOGIN};