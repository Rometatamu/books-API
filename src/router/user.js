import express from "express";

import {GET_USER_BY_ID, SIGN_UP, LOGIN, VALIDATE_LOGIN} from "../controller/user.js";

const router=express.Router()

router.post("/signup", SIGN_UP);
router.post("/login", LOGIN);
router.get("/users/:id", GET_USER_BY_ID);
router.get("/login/validate", VALIDATE_LOGIN);

export default router;