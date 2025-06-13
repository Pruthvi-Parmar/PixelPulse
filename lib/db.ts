import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!

if(!MONGODB_URI){
    throw new Error("Please define mongo_uei in env varianle ")
}

let cached = global.mongoose

if(!cached){
    cached = global.mongoose = {
        conn: null,
        promise: null
    }
}

export async function connToDB(){
    if(cached.conn){
        return cached.conn
    }

    if(!cached.promise){
        const opts = {
            bufferCommands : true,
            maxPoolSize: 10
        }
        
        mongoose
        .connect(MONGODB_URI) // opts may be there we can add 
        .then(() => mongoose.connection)

    }

    try {
        cached.conn = await cached.promise
    } catch (error) {
        cached.promise = null
        throw error
        
    }

    return cached.conn;
}