const mongoose=require("mongoose");
async function connectTOMongoDB(url){
    return mongoose.connect("mongodb+srv://srikanth:srikanth@cluster0.xqig8o8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
}
module.exports={connectTOMongoDB,};
