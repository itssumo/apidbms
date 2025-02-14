import jwt from 'jsonwebtoken';
import bcrypt, { getRounds, hash } from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();
const secretKey = process.env.JWT_KEY;
////// generate hash to be storend in users table in the db mystudents/////////////////
export async function generateHash(inputString) {
    const saltRounds = 10; // Number of salt rounds (higher = more secure but slower)
    const hashedString = await bcrypt.hash(inputString, saltRounds);
    return hashedString;
}
/////////////////// genrates jwt token////////////////////////
export async function generateToken({username, id}){
const payload = {
    username : username,
    password : id,
};

const token =  jwt.sign(payload, secretKey, {expiresIn:'1h'});
return token;
}
/////////////verifies the given token////////////////
export async function verifyToken(token, {username, password}) {
    let validToken = false;
    const user = {
        username: username,
        password:password
    }
    try{
        const decodedToken = await jwt.verify(token, secretKey);
        //console.log(decodedToken);
        if(decodedToken.username===user.username&&decodedToken.password===user.password){
             validToken = true;
        }else{
            
            throw(new Error('invalid token'));
        }
        return validToken;

    }catch(err){
        if(err){
            const check = "check the login credetials";
            console.error(err);
            return check; 
        }
    }
}
export async function verifyPassword(password, hash){
    const result = await bcrypt.compare(password, hash);
    return result;
}
// const testData = {
//     username:"somnath",
//     password: "3290u3409fnk"
// }
// const wrongPass = "3290u3409f"
// // const testToken =   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNvbW5hdGgiLCJwYXNzd29yZCI6IjMyOTB1MzQwOWZuayIsImlhdCI6MTczOTQ2MzM0MCwiZXhwIjoxNzM5NDY2OTQwfQ.4Hltfg4xXip3z4FnhHS8P9PFcz_vHx-E2zqGcCF6NMc';
// // const verifiedToken = await  verifyToken(testToken, testData);
// // console.log(verifiedToken);
// const testHash =await generateHash(testData.password);
// // const testToken = generateToken(testData);
// const checkPassword = await verifyPassword(wrongPass, testHash);
// console.log(checkPassword);


