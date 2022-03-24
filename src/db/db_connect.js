const mongoose = require('mongoose');
const { MONGO } = require('../../config');
const mongoURL = `mongodb://${MONGO.IP}:${MONGO.PORT}/${MONGO.DB_NAME}`;

const connectWithRetry = () =>{
    mongoose.connect(mongoURL,{ useNewUrlParser: true , useUnifiedTopology: true},(err)=>{
        if(!err){
            console.log("connected to mongodb..")
        }else{
            console.log("not connected...");
            setTimeout(connectWithRetry,5000)
        }
    });
    
}

connectWithRetry();