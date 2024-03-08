import mongoose from "mongoose";
import jwt from 'jsonwebtoken'

export const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required : [true, "Please Enter Name"],
    },
    email : {
        type: String,
        required : [true, "Please Enter Email"],
        unique : [true, "Email Exist"]
    },
    password : {
        type: String,
        required : [true, "Please provide a password"]
    },
// ------4    
    player_type : {
        type: String,
        default: "Batsman"
    },
// ------5
    country : {
        type: String,
        default: "Enter country"
    },
// ------6
    city : {
        type: String,
        default: "Enter city"
    },
// ------7
    area : {
        type: String,
        default: "Enter area"
    },
// ------8
    wathsapp : {
        type: Number,
        default: 920123456789
    },
// ------9
    status : {
        type:String,
        default: "Available"
    },
// ------10
    follower : {
        type: []
    },
    // imageUrl:{
    //     type: String
    // }
        
},{timestamps:true}
)


userSchema.methods.generateAuthToken = function(){
    try{
        const token = jwt.sign({_id:this._id.toString()}, 'ubit123456789');

        return token;
    }
    catch(err){
        console.log(err);
    }
}


export default mongoose.model.Users || mongoose.model("User",userSchema)