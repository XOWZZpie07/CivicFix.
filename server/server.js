require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const Report = require("./models/Report");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const uploadDir = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only JPG, PNG and WEBP images are allowed"));
    }
  }
});

const app = express();

const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(uploadDir));

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.log("MongoDB connection failed:", error);
  });

app.get("/", (req, res) => {
  res.send("Public Infrastructure Reporting API is running");
});

app.post("/api/reports", upload.single("image"), async (req, res) => {
  try {
    const reportData = { ...req.body };

    if (req.file) {
      reportData.image = `/uploads/${req.file.filename}`;
    }

    const newReport = new Report(reportData);
    const savedReport = await newReport.save();

    res.status(201).json({
      message: "Report created successfully",
      report: savedReport
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create report",
      error: error.message
    });
  }
});

app.get("/api/reports", async (req, res) => {
  try {
    const reports = await Report.find();

    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch reports",
      error: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
