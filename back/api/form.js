const connectDb = require("../config/db");
const Form = require("../models/usermodels");

module.exports = async function handler(req, res) {
  try {
    await connectDb();
    if (req.method === "GET") {
      const data = await Form.find().sort({ createdAt: -1 });
      return res.status(200).json(data);
    }
    if (req.method === "POST") {
      const { name, email, message, rating } = req.body;
      if (!name || !email || !message || rating == null) {
        return res.status(400).json({ message: "All fields required" });
      }
      const feedback = new Form({ name, email, message, rating });
      const result = await feedback.save();
      return res.status(201).json(result);
    }
    return res.status(405).json({ message: "Method Not Allowed" });
  } catch (err) {
    console.error("API error:", err);
    if (err.errors) {
      const validationErrors = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ errors: validationErrors });
    }
    return res.status(500).json({ error: "Server error", detail: err.message });
  }
};
