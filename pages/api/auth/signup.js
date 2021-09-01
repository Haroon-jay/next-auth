import { connectToDatabase } from "../../../lib/db"
import {hashPassword} from "../../../lib/auth"
async function handler(req,res){
  
  if(req.method!=="POST") {
      return
  }
 const {email,password}=req.body  
 console.log(password.trim().length) 
 if(!email || !email.includes("@") || !password || password.trim().length<6 ){
     return res.status(422).json({
         message:"invalid input -- password should be atleast 6 characters long"
     })
 }
const client=await connectToDatabase()
const db=client.db()
const existingUser=await db.collection("users").findOne({email:email})
if(existingUser){
    return res.status(422).json({success:false,message:"User with this email exists"});client.close()
}
const hashedPassword= await hashPassword(password)
console.log(hashedPassword)
const result=await db.collection("users").insertOne({email,hashedPassword})
client.close()
return res.status(201).json({
    message:"Succesfully created user!",
    result
})

}
export default handler