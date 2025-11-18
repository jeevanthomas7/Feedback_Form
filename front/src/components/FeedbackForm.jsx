import React, { useState } from "react";
import axios from "axios";

export default function FeedbackForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    rating: 0,
  });

  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:4000/form", form);

      setSuccess("Feedback submitted!");
      setForm({ name: "", email: "", message: "", rating: 0 });
    } catch (err) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else {
        setErrors(["Something went wrong"]);
      }
    }

    setLoading(false);
  };

  return (
    <form
      className="max-w-md mx-auto mt-10 bg-white p-8 rounded-xl shadow-lg border border-gray-200"
      onSubmit={handleSubmit}
    >
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Feedback Form
      </h1>

      {errors.length > 0 && (
        <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg mb-4 text-sm">
          {errors.map((e, i) => (
            <p key={i}>{e}</p>
          ))}
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 p-3 rounded-lg mb-4 text-sm flex items-center">
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          {success}
        </div>
      )}

      <label className="block mb-4">
        <span className="text-gray-700 font-medium text-sm">Name</span>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg mt-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          placeholder="Your name"
        />
      </label>

      <label className="block mb-4">
        <span className="text-gray-700 font-medium text-sm">Email</span>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg mt-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          placeholder="you@example.com"
        />
      </label>

      <label className="block mb-4">
        <span className="text-gray-700 font-medium text-sm">Message</span>
        <textarea
          name="message"
          rows="4"
          value={form.message}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg mt-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
          placeholder="Tell us what you think..."
        />
      </label>
<label className="block mb-6">
  <span className="text-gray-700 font-medium text-sm">Rating</span>

  <div className="flex mt-2 space-x-1">
    {[1, 2, 3, 4, 5].map((n) => (
      <button
        key={n}
        type="button"
        onClick={() => setForm({ ...form, rating: n })}
        className="text-3xl transition-colors"
      >
        {form.rating >= n ? (
          <span className="text-yellow-400">★</span>
        ) : (
          <span className="text-gray-300 hover:text-yellow-400">★</span>
        )}
      </button>
    ))}
  </div>
</label>


      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {loading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Submitting...
          </>
        ) : (
          "Submit Feedback"
        )}
      </button>
    </form>
  );
}