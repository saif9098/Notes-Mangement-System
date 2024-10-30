import jobsModel from "../models/jobsModel.js";
import mongoose from "mongoose";
import moment from "moment";

// ====== CREATE JOB ======
export const createJobController = async (req, res, next) => {
  const { title, description, tag,id } = req.body;
  if (!title || !description) {
    return res.status(404).send({
      success: false,
      message: "Please Provide All Fields",
    });
  }
  req.body.createdBy = id;
  const job = await jobsModel.create(req.body);
  res.status(201).json({ job });
};
export const getMyJobsController = async (req, res, next) => {
 try {
  const {id}=req.params
   const myjobs = await jobsModel.find({createdBy:id}).sort({ updatedAt: -1 });
   res.status(201).json(myjobs)
  
 } catch (error) {
  res.send(500,"internal server error")
 }
};


// ======= UPDATE JOBS ===========
export const updateJobController = async (req, res, next) => {
  const { id } = req.params;
  const {ncompany, njobType, nsalary, } = req.body;
  //find job
  const job = await jobsModel.findOne({ _id: id });
 
  //validation
  if (!job) {
 
    return res.status(404).send({
      success: false,
      message:`no jobs found with this id ${id}`,
    });
  }
 
  const updateJob = await jobsModel.findByIdAndUpdate(id,
    {
      title:ncompany || job.title,
      description:nsalary || job.description,
      tag:njobType || job.tag,
      
    }
    , {
    new: true,
    runValidators: true,
  });
  //res
  res.status(200).json({ updateJob });
};

// ======= DELETE JOBS ===========
export const deleteJobController = async (req, res, next) => {
  const { id } = req.params;
  //find job
  const job = await jobsModel.findOne({ _id: id });
  //validation
  if (!job) {
    next(`No Job Found With This ID ${id}`);
    return;
  }
  
  await job.deleteOne();
  res.status(200).json({ message: "Success, Job Deleted!" });
};


export const searchNotesController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const userId = req.user.userId; 
    const results = await jobsModel.find({
      createdBy: userId,
        $or: [
          { title: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      });
    res.json(results);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error In Search Notes API",
      error,
    });
  }
};

 