import express from "express";
import{
    GET_ALL_BOOKS,
    GET_USER_BOOKS,
    GET_BOOK_BY_ID,
    POST_BOOK,
    PUT_BOOK_BY_ID,
    DELETE_BOOK_BY_ID,
} from "../controller/book.js";

import {auth} from "../middlewares/auth.js";

const router=express.Router();

router.get("/books", GET_ALL_BOOKS);
router.get("/books/user/:userId", auth, GET_USER_BOOKS);
router.get("/books/:id",GET_BOOK_BY_ID);
router.post("/books", auth, POST_BOOK);
router.put("/books/:id", auth, PUT_BOOK_BY_ID);
router.delete("/books/:id", auth, DELETE_BOOK_BY_ID);

export default router;