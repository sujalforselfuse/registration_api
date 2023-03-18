const mongoose=require("mongoose")
const validator=require("validator");

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        minlength:6
    },
    email:{
        type:String,
        required:true,
        unique:[true,"Email Is Already Used"],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email ID")
            }
        }

    },
    password:{
        type:String,
        required:true, 
        minlength:6
    }

})

const user=new mongoose.model('user',userSchema);
module.exports=user;
