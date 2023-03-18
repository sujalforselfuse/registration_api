const express = require("express");
const bcrypt = require("bcrypt");
const app = express();
const port = process.env.PORT || 8080;
require("./database_connection/connection");
const user = require("./models/users")

app.use(express.json());

app.get("/", (req, res) => {
    res.send("perfect")
})

app.post("/register", (req, res) => {

    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let confirmation = req.body.confirmpassword;



    if (password != confirmation) {
        res.json({
            message: "Password Not Match"
        })
    }
    else {

        /* bcrypt.hash(password, 10, function (err, hash) { */


        const datafromapi = new user(req.body);
        datafromapi.save().then(() => {
            console.log("connection saved succesfully;")
        }
        ).catch((e) => {
            console.log(e);
        })


        /* }); */





    }



    res.send("post succesfully");
})

app.post("/login", async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    /* res.send("jfj") */
    if (username && password) {
        const user_info = await user.findOne({ username: username })

        if (user_info) {



            if ((user_info.username == username) && (password == user_info.password)) {
                res.send({
                    "status": "success",
                    "msg": "Login Succesfully"
                })
            }
            else {
                res.send({
                    "status": "failed",
                    "msg": "UserName or Password Is Incorrect"
                })
            }
        }
        else {
            res.send({
                "status": "failed",
                "msg": "User Is Not Registered"
            })
        }
    }
    else {
        res.send({
            "status": "failed",
            "msg": "All fields are mandatory"
        })
    }


})

app.post("/forgot", async (req, res) => {

    let email=req.body.email;
    let password=req.body.password;
    let confirmation=req.body.confirmpassword;

    let user_info=await user.findOne({email:email})

    if(password && confirmation){
        if(password==confirmation){
              user.findByIdAndUpdate(user_info._id,{$set:{password:password}}) 
        }
        else{
            res.send({
                "status": "failed",
                "msg": "Password Not Matched"
            })
        }
    }
    else{
        res.send({
            "status": "failed",
            "msg": "field should not be empty"
        })
    }


})



app.listen(port, () => {
    console.log(`connect at port ${port}`)
})
