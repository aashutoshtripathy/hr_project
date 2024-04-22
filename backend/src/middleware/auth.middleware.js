import { User } from "../model/User.model.js";
import { loginUser } from "../controller/user.controller.js";

const auth = (req,res,next) => {
   try {
     if (!req.isAuthenticated){
        throw new error('Unauthorized user : User not be authenticated')
     }
     next()
   } catch (error) {
    console.log("user not logged in")
   }
}



export {auth}