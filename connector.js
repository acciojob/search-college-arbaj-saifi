const config = require("./config.json");

const mongoURI =
  config.MONGODB_URI || "mongodb://localhost:27017" + "/collegeDetails";

let mongoose = require("mongoose");
const { collegeSchema } = require("./schema");

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connection established with mongodb server online");
  })
  .catch((err) => {
    console.log("error while connection", err);
  });
let collegeModel = mongoose.model("collegerecords", collegeSchema);

module.exports = { collegeModel };
