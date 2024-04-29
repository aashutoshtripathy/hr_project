import { Router } from "express";
import { deleteUser, fetchData, fetchIdData, loginUser, signupUser, signup_fetch, updateLogin, updateUser, user } from "../controller/user.controller.js";
// import { auth } from "../middleware/auth.middleware.js";


const router = Router();

// router.use(auth)

router.route("/register").post(signupUser)
router.route("/login").post(loginUser)
router.route("/submit_form").post(user)
router.route("/fetch_data").get(fetchData)
router.route("/update_data/:id").put(updateUser)
router.route("/fetch_unique_data/:id").get(fetchIdData)
router.route("/delete/:id").delete(deleteUser)
router.route("/fetch/signup/:id").get(signup_fetch)
router.route("/update/login/:id").post(updateLogin)



export default router