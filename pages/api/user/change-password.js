import { getSession } from "next-auth/client"
import { comparePassword, hashPassword } from "../../../lib/auth"
import { connectToDatabase } from "../../../lib/db"

async function handler(req,res){
if(!req.method==="PATCH")return
const session=await getSession({req})
if(!session){
    res.status(401).json({
        error:"Invalid authentication",
        success:false
    })
    return
}
const userEmail=session.user.email
const {oldPassword,newPassword}=req.body
const client=await connectToDatabase()
const userCollection=client.db().collection("users")
const user=await userCollection.findOne({email:userEmail})
if(!user){
    client.close()
    res.status(404).json({strange:"strange"})
return
}
const res=await comparePassword(oldPassword,user.password)
if(!res){
    res.status(403).json({
        message:"Password not equal --Unauthorized"
    })
    client.close()
    return 
}
const hashed=await hashPassword(newPassword)
userCollection.updateOne({email:userEmail},{
 $set:{
     password:hashed
 }
})
client.close()
return res.status(200).json({
    message:"Password updated"
})
}
export default handler