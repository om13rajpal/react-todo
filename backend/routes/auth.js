const express = require("express")
const authRoute = express.Router();
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { userSchema } = require("../zod-validations/user")
const {userModel} = require("../models/user")

async function generateToken(tokenData, secretKey, time){
    return await jwt.sign(tokenData, secretKey, {expiresIn: time})
}

async function register(req, res, next){
    const {username, password} = req.body
    const data = {
        username,
        password
    }

    const validation = userSchema.safeParse(data)
    if(!validation.success){
        res.status(411).json({status: false, message: "wrong user inputs"})
        return
    }
    const salt = await bcrypt.genSalt(10)
    const hashPass = await bcrypt.hash(password, salt)
    if(hashPass){
        try {
            
            const createUser = await userModel({username,password: hashPass})
            if(createUser){
                const response  = await createUser.save()
                res.json({status: true, message: "user created successfully"})
            }
            else{
                res.status(500).json({status: false, message: "something went wrong "})
            }
        } catch (error) {
            res.status(500).json({status: false, message: "something went wrong\n ", error: error})

            
        }
    }

}

async function login(req, res, next){
    const {username, password} = req.body;
    const data = {username, password}
    const validation = userSchema.safeParse(data)

    if(!validation.success){
        res.status(411).json({status: false, message: "wrong inputs"})
        return
    }
    
    const user = await userModel.findOne({username})

    if(!user){
        res.status(404).json({status: false, message: "user not found"})
        return
    }

    if(!bcrypt.compare(password, user.password)){
        res.status(411).json({status: false, message: "Wrong password"})
        return
    }

    tokenData = {
        _id: user._id,
        username: user.username
    }

    const token = await generateToken(tokenData, "lol", "1h")
    if(!token){
        res.status(500).json({status: false, message: "internal server error token not formed"})
        return
    }
     res.json({status: true, token: token})

}

authRoute.post("/register", register)
authRoute.post("/login", login)

module.exports = {
    authRoute
}