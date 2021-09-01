import { hash,compare } from "bcryptjs"
export async function hashPassword(password){
   const hashedPass=await hash(password,12)
   return hashedPass
}
export async function comparePassword(password,hash){
  
const result=await compare(password,hash)
return result
}
