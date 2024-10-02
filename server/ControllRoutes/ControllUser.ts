import { NextFunction, Request, Response } from 'express';
import UserModel from '../models/User';
import { UserError } from './error';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
  throw new Error("JWT secret key is missing in the environment variables");
}

const Register = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username });

    if (user) {
      return res.status(400).json({ err: UserError.USERNAME_ALREADY_EXISTS });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const NewUser = new UserModel({ username, password: hashPassword });

    await NewUser.save();
    res.json({ message: "User Registered Successfully" });
  } catch (error) {
    res.status(500).json({ err: error });
  }
};

const Login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username });

    if (!user) {
      return res.status(400).json({ err: UserError.NO_USER_FOUND });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ err: UserError.WRONG_CREDENTIALS });
    }

    // Create the JWT token using the secret from .env with an expiration time
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, userID: user._id });
  } catch (error) {
    res.status(500).json({ err: error });
  }
};

const GetUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find({}).sort();
    res.status(200).json(users);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'An unknown error occurred' });
    }
  }
};

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    // Extract the Bearer token
    const token = authHeader.split(' ')[1];

    jwt.verify(token, JWT_SECRET, (err) => {
      if (err) {
        return res.status(403).json({ message: "Invalid or expired token" });
      }
      next();
    });
  } else {
    res.status(401).json({ message: "Authorization header is missing" });
  }
};

export { Register, Login, verifyToken, GetUsers };
