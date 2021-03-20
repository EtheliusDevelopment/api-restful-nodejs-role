// Authorizator
import jwt from 'jsonwebtoken'
import User from '../models/User'
import Role from '../models/Role'

export const verifyToken = async (req, res, next) => {
try {
    const token = req.headers["x-access-token"];

    if(!token) return res.status(403).json({message : "No token Provided"})

    const decoded =jwt.verify(token, process.env.SECRET)
    req.userId = decoded.id;
    
    const user = await User.findById( req.userId, {password : 0});
    console.log(user);
    if (!user) return res.status(404).json({message : " Use not found"})
    next()
    
} catch (error) {
    console.error(error);
    return res.status(401).json({message : "Unauthorized"})
}}

export const isModerator = async ( req, res, next) =>{
    const user = await User.findById(req.userId);
    const roles = await Role.find({_id : {$in : user.roles}});

    console.log(roles);
    for (let i = 0; i < roles.length ; i++ ) {
        if (roles[i].name === "moderator" || "admin") {
            next ()
            return;
        }
    }

    return res.status(401).json({message : 'Moderator role is required'})

};

export const isAdmin = async ( req, res, next) =>{
    const user = await User.findById(req.userId);
    const roles = await Role.find({_id : {$in : user.roles}});

    console.log(roles);
    for (let i = 0; i < roles.length ; i++ ) {
        if (roles[i].name === "admin") {
            next ();
            return;
        }
    }

    return res.status(401).json({message : 'Admin role is required'})
    
}