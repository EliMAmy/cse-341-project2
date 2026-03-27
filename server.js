const express = require('express');
const bodyParser = require("body-parser")
const mongodb =  require("./data/database");
const app = express();
const Port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader(
        "Acccess-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Z-Key" 
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

app.use("/", require("./routes/index"));


mongodb.initDb((error) =>{
    if(error){
        console.log(err);
    }
    else{
        
        app.listen(Port, () => {console.log("Database is listening and node running on port" + Port)}); 
    }
});

