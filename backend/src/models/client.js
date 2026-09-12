const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema(
  {
    Category: {
      type: String,
      required: [true, "Visa category is required"],
      enum: ["Tourist Visa", "Work Visa", "Student Visa", "Indefinite Leave to Remain (Settlement)"],
      default: "Tourist Visa",
    },
    FullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },
    Email: {
      type: String,
      required: [true, "Email address is required"],
      trim: true,
      lowercase: true,
    },
    Gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      default: "Male",
    },
    Address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
    },
    telephone: {
      type: String,
      required: [true, "Telephone number is required"],
      trim: true,
    },
    DOB: {
      type: String, // Stored as YYYY-MM-DD string as formatted by frontend
      required: [true, "Date of birth is required"],
    },
    POB: {
      type: String, // Place / City of Birth
      required: [true, "Place of birth is required"],
      trim: true,
    },
    CountryofCitizenship: {
      type: String,
      required: [true, "Country of citizenship is required"],
      trim: true,
    },
    PassportNumber: {
      type: String,
      required: [true, "Passport or travel document number is required"],
      trim: true,
      uppercase: true,
      index: true,
    },
    Status: {
      type: String,
      enum: ["Pending", "Issued", "Refused", "Revoked"],
      default: "Pending",
    },
    Paragraph: {
      type: String,
      default: "Currently the status is pending, the application is under review.",
      trim: true,
    },
    photoUrl: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Client = mongoose.model("Client",clientSchema);

module.exports = Client;
