import { Router } from "express";
import { deleteUser, fetchData, fetchIdData, loginUser, signupUser, updateUser, user } from "../controller/user.controller.js";
import { auth } from "../middleware/auth.middleware.js";


const router = Router();

router.use(auth)

router.route("/register").post(signupUser)
router.route("/login").post(loginUser)
router.route("/submit_form").post(user)
router.route("/fetch_data").get(fetchData)
router.route("/update_data/:id").put(updateUser)
router.route("/fetch_unique_data/:id").get(fetchIdData)
router.route("/delete/:id").delete(deleteUser)



export default router