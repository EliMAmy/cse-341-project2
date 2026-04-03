const express = require('express');
const bodyParser = require("body-parser")
const mongodb =  require("./data/database");
const passport = require("passport");
const session = require("express-session");
const gitHubStrategy = require("passport-github2").Strategy;
const cors = require("cors");

const app = express();
const Port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false
}));
//This  is the basic express session({..}) initialization
app.use(passport.initialize());
//init passport on every route call
app.use(passport.session());
//allow passport to use "express-session" 
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader(
        "Acccess-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Z-Key" 
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

app.use(cors({methods: ["GET", "POST","DELETE","UPDATE", "OPTIONS"]}))
app.use(cors({origin: "*"}));

app.use("/", require("./routes/index"));


passport.use(new gitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL
}, 
function(accessToken, refreshToken, profile, done){
    //user.findOrCreate({ githubId: profile.id }, function (err, user) {
    return done(null, profile);
    //});
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
}); 


app.get("/github/callback", passport.authenticate("github", {
    failureRedirect: "/api-docs", session: false}),
    (req, res) => {
        req.session.user = req.user;
        res.redirect("/");
    });



mongodb.initDb((error) =>{
    if(error){
        console.log(err);
    }
    else{
        
        app.listen(Port, () => {console.log("Database is listening and node running on port" + Port)}); 
    }
});

