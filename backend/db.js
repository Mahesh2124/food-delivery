const mongoose = require('mongoose');

const mongoURI ='mongodb+srv://food_delivery:food_delivery@cluster0.9i8vbpq.mongodb.net/food_delivery?retryWrites=true&w=majority'

const mongoDB = async() =>{
    mongoose.set("strictQuery", false);
    await mongoose.connect(mongoURI,{useNewUrlParser:true},(err,result) =>{
        if(err){
            console.log("---",err)
        }
        else{
        console.log("connect");
        const fetched_data = mongoose.connection.db.collection("food_items");
        fetched_data.find({}).toArray(function(err,data){
            const food_category =  mongoose.connection.db.collection("food_category");
            food_category.find({}).toArray(function(err,catData){
                if(err) console.log(err);
                else {
                    global.food_items = data;
                    global.food_category = catData;
                }
            })
           // if(err) console.log(err);
           // else {
             //   global.food_items = data;
                
            //}
        })
        }
    });

}

module.exports= mongoDB;