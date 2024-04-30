import { Signup } from "../model/Signup.model.js";
import { User } from "../model/User.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import bcrypt from "bcrypt"

const signupUser = asyncHandler(async (req, res) => {
    try {

        const {firstname,lastname,email,password,username} = req.body
        // console.log(firstname,lastname,email,password,username)

        const hashedPassword = await bcrypt.hash(password,10)

        const existedUser = await Signup.findOne({
            $or: [{username},{email}]
        })

        if(existedUser){
            throw new ApiError(400,"username or email is already exist")
        }

        const user = await Signup.create({
            firstname,
            lastname,
            email,
            password: hashedPassword,
            username
        })
        const createdUser = await Signup.findById(user._id).select("-password -refreshToken")
        return res.status(200).json(
            new ApiResponse(200,createdUser, "User Registered Successfully")
    )
    } catch (error) {
        // Handle any errors that might occur during response sending
        console.error("Error sending response:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


const loginUser = asyncHandler(async (req, res) => {
   try {
    console.log(req.body)
     const {usernameEmail,password} = req.body
 
     if(!usernameEmail){
         throw new ApiError(400,"username email is required")
     }
 
     const user = await Signup.findOne({
         $or: [{username:usernameEmail},{email:usernameEmail}]
     })
     console.log(user)

     
     
 
     if(!user){
         throw new ApiError(400,"user does not exist")
     }
        console.log(user)
     const isPasswordValid = await bcrypt.compare(password, user.password);

     if(!isPasswordValid){
        return res.status(401).json(new ApiError(401,"Error","Invalid password"));
     }


     const accessToken = user.generateAccessToken();
     const refreshToken = user.generateRefreshToken();
     
     

    // if (user.password !== password) {
    //     throw new ApiError(400, "Invalid User Credentials")
    // }   
 
    //  if(!isPasswordValid){
    //      throw new ApiError(400,"Invalid User Credential")
    //  }


      // Generate access token
    //   const accessToken = jwt.sign(
    //     { _id: user._id, username: user.username, email: user.email },
    //     process.env.ACCESS_TOKEN_SECRET,
    //     { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    // );


    // const userId = await user.findOne({_id})
    //  console.log(userId);

 
     return res.status(200).json(
         new ApiResponse(200,{success: true,message: "User Logged in Successfully",userId:user._id,accessToken,refreshToken})
     )
   } catch (error) {
    console.error("Error in sending the response",error)
    return res.status(500).json(new ApiError(500,"error","Internal Server Error"))
   }
})

    const user = asyncHandler(async(req,res) => {
        try {
            const {empnumber,email,password,status,role,name} = req.body

            // if(role === "admin"){
                const user = await User.create({
                    name,
                    empnumber,
                    email,
                    password,
                    status,
                    role
                })
            // }else{
        
        //     const user = await User.create({
        //         name,
        //         empnumber,
        //         email,
        //         status,
        //         role
        //     })
        // }
            return res.status(200).json(new ApiResponse(200,"Form Submitted Successfully"))
        } catch (error) {
            return res.status(500).json(new ApiError(500, "error", "Internal Server Error"));
        }
})

const fetchData = asyncHandler(async(req,res)  => {
    try {
        const allUser = await User.find({})
        // console.log(allUser);
        console.log("Fetched users:", allUser);
        return res.status(200).json({ success: true, data: allUser });
        // return res.status(200).json(new ApiResponse(200,"Form Submitted Successfully"))
        // return allUser;
    }
     catch (error) {
        return res.status(500).json(new ApiError(500, "error", "Internal Server Error"));
    }
})

const fetchIdData = asyncHandler(async (req, res) => {
    try {
        const userId = req.params.id;
        const fetchedData = await User.findById(userId);
        return res.status(200).json(new ApiResponse(200, fetchedData, "ok"));
    } catch (error) {
        res.status(500).json(new ApiError(500, "error", "internal server error"));
    }
});

const updateUser = asyncHandler(async(req,res) => {
    try {
        const userId = req.params.id;
        const {name,empnumber,email,role,status} = req.body
    
        const updatedUser = await User.findByIdAndUpdate( userId, {
            name,
            empnumber,
            email,
            role,
            status
        },{new:true})
    
        if(!updatedUser){
            throw new ApiError(404,"User not found")
        }
        return res.status(200).json(new ApiResponse(200,updateUser,"User updated Successfully"))
    } catch (error) {
        return res.status(500).json(new ApiError(500,"error","Internal Server Error"))
    }
})


const deleteUser = asyncHandler(async(req,res) => {
    try {
        const userId = req.params.id;
        const deletedUser = await User.findByIdAndDelete(userId)
        if(!deletedUser){
            return res.status(404).json(new ApiError(404,"error","User not found"))
        }
        return res.status(200).json(new ApiResponse(200,deleteUser,"Deleted Successfully"))
    } catch (error) {
        return res.status(500).json(new ApiError(500,"error","Internal server error"))
    }
})

const signup_fetch = asyncHandler(async(req,res) => {
    try {
        const userId = req.params.id;
        const fetchData = await Signup.findById(userId)
            if(!fetchData){
                return res.status(404).json(new ApiError(404,"error","user not found"))
            }
        return res.status(200).json(new ApiResponse(200,fetchData,"ok"))
    } catch (error) {
        return res.status(500).json(new ApiError(500, "error","Internal Server Error"))
    }
})


const updateLogin = asyncHandler(async(req,res) => {
    try {
        const userId = req.params.id
        const {firstname,lastname,username,email} = req.body
    
        const updatedLogin = await Signup.findByIdAndUpdate(userId,{
            firstname,
            lastname,
            username,
            email
        },{new:true})
        if(!updatedLogin){
            return res.status(404).json(new ApiError(404,"Error","User not found"))
        }
        return res.status(200).json(new ApiResponse(200,updatedLogin,"Updated Successfully"))
    } catch (error) {
        return res.status(500).json(new ApiError(500,"Error","Internal Server Error"))
    }
})

// const verifyUser = asyncHandler(async(req,res) => {
//     const 
// })




export { signupUser, loginUser , user , fetchData , updateUser , fetchIdData , deleteUser , signup_fetch , updateLogin };


