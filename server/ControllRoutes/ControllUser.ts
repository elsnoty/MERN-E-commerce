import { NextFunction, Request, Response } from 'express';
import UserModel from '../models/User'
import { UserError } from './error';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const Register = async(req: Request, res: Response)=> {
     const {username, password} = req.body

    try {
        const user = await UserModel.findOne({username})

        if (user){
           return res.status(400).json({err: UserError.USERNAME_ALREADY_EXISTS})
        }
        // to prevent see the pass in database
        const hashPassword = await bcrypt.hash(password, 10)
   
        const NewUser = new UserModel({username, password: hashPassword})
   
        await NewUser.save()
        res.json({message: "User Registerd Successfully"})
    } catch (error) {
        res.status(500).json({err: error})
    }

}

const Login = async (req: Request, res: Response)=>{
    const {username, password} = req.body

    const user = await UserModel.findOne({username})

    if(!user){
        return res.status(400).json({err: UserError.NO_USER_FOUND})
    }

    const isPasswordVaild = await bcrypt.compare(password, user.password)
    if (!isPasswordVaild) {
        return res.status(400).json({err: UserError.WRONG_CREDENTIALS}
        )
    }
    //token
    const token = jwt.sign({id:user?._id}, 'secret')
    res.json({token, userID:user._id})
}

const GetUseres = async (req: Request, res: Response)=>{
  try {
  const users = await UserModel.find({}).sort()
  res.status(200).json(users);
    
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
  } else {
      res.status(400).json({ error: 'An unknown error occurred' });
  }
  }
}
    const verifyToken = (req: Request, res:Response , next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      jwt.verify(authHeader, "secret", (err) => {
        if (err) {
          return res.sendStatus(403);
        }
        next();
      });
    } else {
      res.sendStatus(401);
    }
  };
export {Register, Login, verifyToken, GetUseres};