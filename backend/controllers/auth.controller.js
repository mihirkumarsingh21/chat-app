import {User} from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signUp = async (req, res) => {
    try {
        const {fullname, username, password, confirmpassword, gender} = req.body;
        console.log("Received Data:", { fullname, username, password, gender });

        if(password !== confirmpassword) {
            console.table([password, confirmpassword]);
            return res.status(400).json({message: "Password does not match."});
        }

       const user = await User.findOne({username});
       console.log(`USER: ${user}`);

       if(user) {
        return res.status(400).json({message: "User already exsit."}); 
       } // here checking if the user exsit with same the user details then send the msg to the client (frontend)

    const salt = await bcrypt.genSalt(10); // here generating salt for hashing the password.
    console.log(`SALT : ${salt}`);
    const hashedPassword = await bcrypt.hash(password, salt); // here password which is user send it.
    console.log(`HASHEDPASSWORD : ${hashedPassword}`);

       const male = "Male";
       const female = "Female"

     const newUser = new User({
        fullname,
        username,
        password: hashedPassword,
        gender,
        profilePic: gender === "male" ? male : female
       })


    //    JWT Token...

    await generateTokenAndSetCookie(newUser._id, res);

    console.log(`NEW USER: ${newUser}`);

       await newUser.save();
        
      return res.status(201).json({
        message: "User Created.!",
        succsess: true,
        data: newUser
       })

       

    } catch (error) {
        // res.status(500).json({message: error.message})
        console.log(`ERROR during creating user in DataBase: ${error} `);
    }
}

export const login = async (req, res) => {
    try {
        const {username, password} = req.body;
        const exsitedUser = await User.findOne({username});
        const isPasswordCorrect = bcrypt.compare(password, exsitedUser?.password);


        if(!exsitedUser || !isPasswordCorrect  ) {
            return res.status(400).json({
                message: "username or password is incorrect",
                succsess: false,
            })
        }

       await generateTokenAndSetCookie(exsitedUser?._id, res);
      return res.status(200).json({
        message: "User loggedin succsessfully",
        succsess: true,
        data: exsitedUser,
       })

    } catch (error) {
        console.log(`ERROR while user login: ${error}`)
        return res.status(500).json({
            message: "Internal server error" || error.message   
        })

    }
}

export const logout = (req, res) => {
    try {
        res.cookie("jwt-token", "", {
            maxAge: 0,
        });
        return res.status(200).json({
            message: "Logout succssesfully",
            succsess: true,
        })
    } catch (error) {
       console.log(`ERROR while logout user: ${error.message}`);
       return res.status(500).json({
        message: "Server error",
        succsess: false 
       }) 
    }
}



