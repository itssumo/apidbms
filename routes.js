import express from "express";
import {getStudents, getStudent, createEntry, createUser, getUser} from "./db.js";
import { generateHash } from "./token.js";
import { logUser, authenticate } from "./auth.js";

export const router = express.Router();
router.use(express.json());

/////////////////////get all students/////////////////
  router.get('/getallstudents',authenticate, async (req, res) => {
    const students = await getStudents();
    res.send(students);
  }); 
  ///////////get a specific student//////////////////////// 
  router.get('/getastudent/:id', authenticate,async (req, res, next) => {
    try{
      const student = await getStudent(req.params.id);
      if(!student.length){
       throw res.status(404).send("<h1>No student found!!</h1>");
        
      }else{res.status(200).send(student)}
    }catch(err){
      console.log(err.message);
    }
  });
  /////////////////creates new student entry/////////////////////////////////////////////
  router.post('/createstudent',authenticate, async (req, res) => {
    const {  firstName, lastName, age, stream, school } = req.body;
    console.log(req.header['token']);
    try{
      const newStudent = await createEntry( firstName, lastName, age, stream, school);
     
      
      if(newStudent){
        res.status(201).send("Student entry created");
      }
    }catch(err){
      res.status(500).send(`<h1>could not create student due to internal server error due to${err.msessage}</h1> `);
   
    }
  });
  //////////////////////////registers admin to access DBS/////////////////
  router.post('/registeradmin',async (req,res)=>{
    try{
        const username = req.body.username;
        const password = req.body.password;
        console.log(password);
        
        const register = await createUser(username, password);
        if(register){res.status(201).send("admin registered successfully")}
    }catch(err){
        res.status(500).send("internal server error");
    }
  });
//////////////////////admin login////////////////////////////////////
  router.post('/login', logUser);
  