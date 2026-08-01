const mongoose = require("mongoose");

const diseaseSchema = new mongoose.Schema(
{
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    diseaseName:{
        type:String,
        required:true
    },

    symptoms:{
        type:[String],
        required:true
    },

    precautions:{
        type:[String],
        default:[]
    },

    medicines:{
        type:[String],
        default:[]
    },

    diet:{
        type:[String],
        default:[]
    },

    description:{
        type:String,
        default:""
    }
},
{
    timestamps:true
}
);

module.exports = mongoose.model("Disease", diseaseSchema);