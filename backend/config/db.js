const mongoose = require("mongoose")

const connect_database = async (request,response) => {
    try{
          const User = await mongoose.connect(process.env.MONGODB_URL);
          console.log("Database connected success");
    }
    catch(e){
        console.log(`Erorr: ${e}`);
    }
}

module.exports = connect_database;
