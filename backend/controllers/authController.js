import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js'
import validator from 'validator'

// Register Controller
export const registerUser = async (req, res) => {
    try {
        
        const {name, email, password} = req.body

        if(!name || !email || !password) {
            return res.json({success: false, message: "All fields are required"})
        }

        if(!validator.isEmail(email)) {
            return res.json({success: false, message: "Invalid Email"})
        }

        if(password.length < 8) {
            return res.json({success: false, message: "Password should be at least 8 characters"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = {
            name,
            email,
            password: hashedPassword
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()
        
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
        res.json({success: true, token, user})

    } catch (error) {
        
        console.log(error)
        res.json({success: false, message: error.message})

    }
};

// Login Controller
export const loginUser = async (req, res) => {
    try {

        const {email, password} = req.body
        const user = await userModel.findOne({email})

        if(!user) {
            return res.json({success: false, message: "User not found"})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(isMatch) {
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
            res.json({success: true, token, user})
        }
        else {
            res.json({success: false, message: "Invalid credentials"})
        }
        
        
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
};

