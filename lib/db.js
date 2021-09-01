import { MongoClient } from "mongodb"

export async function connectToDatabase(){
    const client=await MongoClient.connect("mongodb+srv://@cluster0.5duo6.mongodb.net/next-auth?retryWrites=true&w=majority")
    return client
}