const express =require("express");
const cors =require('cors');
const {connectTOMongoDB}=require("./connect")
const urlRoute=require('./routes/url');
const URL=require('./models/url');
const app=express();
app.use(cors());
const PORT=process.env.PORT || 3000;
require('dotenv').config();
const databaseUrl = process.env.CONNECTIONSTRING;
connectTOMongoDB(databaseUrl).then(()=> console.log('Mongodb connected'));
app.use(express.json());
app.use('/url',urlRoute);
app.get('/:shortId',async (req,res)=>{
    const shortId=req.params.shortId;
   const entry = await URL.findOneAndUpdate(
        { shortId,},
        {
            $push:{
                visitHistory: {
                    timestamp :Date.now(),
                }
            }
        }
    );
    res.redirect(entry.redirectURL);
});

app.listen(PORT,()=> console.log(`Server started at port ${PORT}`));
