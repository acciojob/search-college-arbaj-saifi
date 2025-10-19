const { collegeModel } = require("./connector");
const { data } = require("./data");
const mongoose = require("mongoose");

const refreshAll = async () => {
  await collegeModel.deleteMany({});
  await collegeModel.insertMany(data);
  console.log("done!");
  await mongoose.disconnect();
};
refreshAll();
