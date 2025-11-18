const express = require("express");
const Feedback = require("../models/usermodels");

const form = async (req, res) => {
  try {
    const { name, email, message, rating } = req.body;
    const fb = new Feedback({
      name: name,
      email: email,
      message: message,
      rating: rating,
    });
    const saved = await fb.save();
    return res.status(201).json(saved);
  } catch (err) {
    if (err.name === "ValidationError") {
      const errors = Object.keys(err.errors).map((k) => err.errors[k].message);
      return res.status(400).json({ errors });
    }
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};

const check=async(req,res)=>{
  res.send("Deployment Is working")
}
const getfeddback = async (req, res) => {
  try {
    const all = await Feedback.find().sort({ createdAt: -1 });
    return res.json(all);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};

const deleteForm = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await Feedback.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.send("User not found");
    }

    res.send("User deleted successfully");
  } catch (error) {
    console.error(error);
    res.send("Error deleting user");
  }
};
module.exports = { form, getfeddback,deleteForm,check};
