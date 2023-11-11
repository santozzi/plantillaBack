import {Request,Response} from 'express';
import userModel, {IUser} from '../models/user.model';
import jwt from 'jsonwebtoken';
import config from '../config/config';
export const signUp = async (req:Request, res:Response):Promise<Response> => {
    if(!req.body.email || !req.body.password){
        return res.status(400).json({msg: 'Please. Send your email and password'});
    }
   const user = await userModel.findOne({email: req.body.email});
   if(user){
         return res.status(400).json({msg: 'The user already exists'});
    } 
   const nuevoUser = new userModel(req.body);
   const respuesta = await nuevoUser.save();
   return res.send(respuesta);
}
function createToken(user:IUser)
{
   return jwt.sign({id: user.id, email:user.email},config.jwtSecret,{expiresIn: 86400})
}

export const signIn = async (req:Request, res:Response) => {
    if(!req.body.email || !req.body.password){
        return res.status(400).json({msg: 'Please. Send your email and password'});
    }
    const user = await userModel.findOne({email: req.body.email});
    if(!user){
        return res.status(400).json({msg: 'The user does not exists'});
    }
    const isMatch = await user.comparePassword(req.body.password);
    if (isMatch) {
      return res.status(200).json({ token: createToken(user) });
    }
     return res.status(400).json({msg: 'The email or password are incorrect'});
}