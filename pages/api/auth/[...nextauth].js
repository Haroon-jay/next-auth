import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { connectToDatabase } from "../../../lib/db";
import { comparePassword } from "../../../lib/auth";
export default NextAuth({
    session:{
        jwt:true
    },
    providers:[
        Providers.Credentials({
        async authorize(cred){
          
           const client=await connectToDatabase()
           const user=await client.db().collection("users").findOne({email:cred.email})
           
           if(!user){
               console.log("error")
               throw new Error("No user Found with the given Email")
           }
           
           const res=await comparePassword(cred.password,user.hashedPassword)
           
           if(!res){
               throw new Error("Could not log you In!")
           }
         
           client.close()
           
           return{
            email:user.email
        }
        }
        })
    ]
})