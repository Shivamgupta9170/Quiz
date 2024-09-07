const mongoose = require("mongoose");

const URL = process.env.MONGO_URL;
const conn = async ()=>{
    try{
        await mongoose.connect(URL);
        console.log("DataBase connected");
    }catch(error){
        console.log(error);
    }
}

conn();