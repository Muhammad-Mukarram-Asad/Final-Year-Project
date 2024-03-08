import mongoose from "mongoose";


export const postSchema = new mongoose.Schema({

    picture:{
        type:String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGhyJ9EmnEIL_JOQo4kmc_271WXlCw58WsmQ&usqp=CAU"
    },
    user_id : {
        type:String,
        required:[true, "Please Enter user Id"]
    },
    match_format : {
        type:String,
        required:[true, "Please Enter Match Type"]
    },
    score_wicket : {
        type:Number,
        required:[true, "Please Enter Your Score or Wicket"]
    },
    threeWicket_fiftyRun : {
        type:Number,
        required:[true, "Please Enter Your Score or Wicket"]
    },
    fiveWicket_hundredRun : {
        type:Number,
        required:[true, "Please Enter Your Score or Wicket"]
    }

},{timestamps:true}
)

export default mongoose.model.Posts || mongoose.model("Post", postSchema);