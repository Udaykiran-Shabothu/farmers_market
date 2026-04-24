const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req,res) => {
    const {name,age,email,password,role} = req.body;
    const hashedPassword = await bcrypt.hash(password,10);
    try{
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });

       return res.json(user);
    }
    catch(e){
    return res.status(500).json({ error: e.message });}
};

exports.loginUser = async (req,res) => {
    const {email, password} = req.body;

    try{
    const user = await User.findOne({email})
    if(!user){
      return  res.status(400).json({message: "user not found"})
    }

    const isMatch = await bcrypt.compare(password,user.password);

    if(!isMatch){
       return res.status(400).json({message: "Wrong password"})
    }


    const jwtToken = await jwt.sign({id: user.id}, process.env.SCREATE_KEY); 

    return res.json({jwtToken,user})
}
catch (e) {
  return res.status(500).json({ error: e.message });
}
};