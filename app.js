const express = require("express");
const app = express();
const { collegeModel } = require("./connector");

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.status(200).send("HELLO WORLD");
});

// solution starts

app.get("/findColleges", async (req, res) => {
  try {
    const { name, state, city, minPackage, maxFees, course, exam } = req.query;

    const filter = {};

    // String filters (case-insensitive)
    if (name) filter.name = { $regex: name, $options: "i" };
    if (state) filter.state = { $regex: state, $options: "i" };
    if (city) filter.city = { $regex: city, $options: "i" };
    if (course) filter.course = { $regex: course, $options: "i" };

    // Exam filter (array contains exam)
    if (exam) filter.exam = { $elemMatch: { $regex: exam, $options: "i" } };

    // Numeric filters (valid positive numbers only)
    const minPackNum = parseFloat(minPackage);
    const maxFeesNum = parseFloat(maxFees);

    if (!isNaN(minPackNum) && minPackNum > 0) {
      filter.minPackage = { $gte: minPackNum };
    }

    if (!isNaN(maxFeesNum) && maxFeesNum > 0) {
      filter.maxFees = { $lte: maxFeesNum };
    }

    // Query MongoDB
    const colleges = await collegeModel.find(filter).select({
      _id: 0,
      name: 1,
      city: 1,
      state: 1,
      exam: 1,
      course: 1,
      maxFees: 1,
      minPackage: 1,
    });

    // Preserve key order
    const result = colleges.map((col) => ({
      name: col.name,
      city: col.city,
      state: col.state,
      exam: col.exam,
      course: col.course,
      maxFees: col.maxFees,
      minPackage: col.minPackage,
    }));

    res.json(result);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Server Error");
  }
});

// solution end

module.exports = { app };
