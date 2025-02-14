import {getUser} from "./db.js";
import bcrypt, { hash } from 'bcrypt';
import express from 'express';
import {  generateToken, verifyPassword, verifyToken } from './token.js';
const app = express();
app.use(express.json());

export const logUser = async (req, res)=>{
    try{
        const {username, password} = req.body;
        const registeredUser = await getUser(username);
        if(!registeredUser){res.status(404).send('No user found')}
        const verifiedUser = verifyPassword(password, registeredUser[0].password);
        if(!verifiedUser){
            res.status(401).send('wrong user credential please check and try again')
        }
        const token = await generateToken({username:username, password:password});
        res.status(201).json({token});
    }catch(err){
        console.error('error occured:', err);
        return res.status(500).send("internal server error");
    }
  
}
export const authenticate = async (req, res, next)=>{
    const header = req.header['auth_token'];
    const username = await getUser[0].userName;
    const password = await getUser[0].password;
    const userData = {username:username, password:password};
    let auth;
    try{
        const validToken = verifyToken(header,userData);
        if(!validToken){
            res.status(401).send("invalid token");
            new Error("Invalid token");
        }next();
    }catch(err){
        res.status(500).send("internal server error");
    }
}