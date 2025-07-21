import User from "../models/userModel.js"

export const userProfile=async (req, res)=>{
    try {
        console.log(req.user);

         const user=await User.findById(req.user._id).select("-password");
         res.status(200).json(req.user);
    } catch (error) {
        res.status(500).json({
            message:"Failed to fetch user profile"
        })
    }
}


export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // password বাদ দেওয়া হচ্ছে
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};



