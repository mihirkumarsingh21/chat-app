import { User } from "../models/user.model.js";

export const getUsersForSideBar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filterUser = await User.find({_id: {$ne: loggedInUserId}}).select("-password"); // this query fetches all users from the database except the logged-in user, and it excludes the password field from the returned data for security purposes and here $ne means `not equal`.
       return res.status(200).json({filterUser});
    } catch (error) {
        console.log("ERROR WHILE GETTING USER:", error.message);
       return res.status(500).json({
            error: "Internal server error"
        })
    }
}


