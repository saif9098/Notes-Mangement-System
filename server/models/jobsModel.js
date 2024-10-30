import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title:{
      type:String,
      required: [true ,"title is required"],
      unique: true},

  description:{
      type:String,
      required: true},
  tag:{
      type:String,
      default:"General"
      },
   
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);
