import User from '../models/User'
import jwt from 'jsonwebtoken'
import Role from '../models/Role';

export const signUp = async (req, res) => {
    const { username, email, password, roles} = req.body
    

    const newUser = new User({
        username,
        email,
        password : await User.encryptPassword(password)
    });

    if (roles) {
        const foundRoles = await Role.find({name : {$in: roles}})
        newUser.roles = foundRoles.map(role => role._id)
    } else {
        const role = await Role.findOne({name : "user"})
        newUser.roles = [role._id]
    }
    
    const saveduser = await newUser.save()
    console.log(saveduser);

    const token = jwt.sign({id : saveduser._id}, process.env.SECRET, {
        expiresIn : 86400
    })

    res.status(200).json({token})
}


export const signIn = async (req, res) => {
    const userFound = await User.findOne({email : req.body.email}).populate('roles')
    if (!userFound) return res.status(400).json({message : "User Not Found"})

    const matchPassword = await User.comparePassword(req.body.password, userFound.password );
    if (!matchPassword) return res.status(401).json({token: null, message: 'Invali Password'})

    const token = jwt.sign({id : userFound._id}, process.env.SECRET, {
        expiresIn : 86400
    })

    console.log(userFound)
    res.json({token})
}