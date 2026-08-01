const Patient = require("../models/Patient");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register
const register = async (req,res)=>{

try{

const {name,email,password,role}=req.body;

// Check user

const userExists=await User.findOne({email});

if(userExists){
return res.status(400).json({
message:"User already exists"
});
}

// Hash Password

const hashedPassword=await bcrypt.hash(password,10);

// Create User

const user=await User.create({

name,
email,
password:hashedPassword,
role

});
await Patient.create({
  user: user._id,
  age: 18,
  gender: "Male",
  phone: "0000000000",
  address: "Update Address",
  bloodGroup: "O+",
  height: 170,
  weight: 70,
  allergies: "",
  medicalHistory: "",
});

// Generate Token

const token=jwt.sign(

{id:user._id},
process.env.JWT_SECRET,

{
expiresIn:"7d"
}

);

user.password = undefined;
res.status(201).json({

success:true,
token,
user

});

}

catch(error){

res.status(500).json({

success:false,
message:error.message

});

}

};

// Login

const login=async(req,res)=>{

try{

const {email,password}=req.body;

const user=await User.findOne({email});

if(!user){

return res.status(400).json({

message:"Invalid Email"

});

}

const isMatch=await bcrypt.compare(password,user.password);

if(!isMatch){

return res.status(400).json({

message:"Invalid Password"

});

}

const token=jwt.sign(

{id:user._id},
process.env.JWT_SECRET,

{
expiresIn:"7d"
}

);

user.password = undefined;
res.json({

success:true,
token,
user

});

}

catch(error){

res.status(500).json({

message:error.message

});

}

};
// ===============================
// Get Logged In User Profile
// ===============================
const getProfile = async (req, res) => {
  try {

    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  register,
  login,
  getProfile,
};