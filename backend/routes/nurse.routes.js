const express=require("express");

const nurse=express.Router({ mergeParams: true });

const nurseService=require("../services/nurse.service")

nurse.get("/",nurseService.getNurseList);

module.exports=nurse;