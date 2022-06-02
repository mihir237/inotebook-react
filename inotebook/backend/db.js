const mongoose = require("mongoose")
const mongoURI = "mongodb://localhost:27017/inotebook?directConnection=true"
     
const connectTOMongo = ()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log("connected to mongo succssfully")
    })
}

module.exports = connectTOMongo;