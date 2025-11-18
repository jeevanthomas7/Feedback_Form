import React, { useEffect, useState } from "react";
import axios from "axios";

export default function FeedbackList() {
  const [data, setData] = useState([]);

  const loadData = async () => {
    const res = await axios.get("https://feedback-formback.vercel.app/form");
    setData(res.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  async function deleteh(id) {
    try {
      await axios.delete(`https://feedback-formback.vercel.app/form/${id}`)
      setData(prev => prev.filter(item => item._id !== id))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 px-4">
      <h2 className="text-2xl font-semibold text-green-6cd00 mb-4 text-center ">Feedback List</h2>

      {data.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-200 p-8 text-center text-slate-500">No feedback yet</div>
      ) : (
        <div className="space-y-3">
          {data.map(f => (
            <div key={f._id} className="flex items-start gap-3 bg-gradient-to-r from-white to-slate-50 rounded-xl p-4 shadow-sm">
              <div className="flex-none w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold bg-amber-50 text-amber-700">{f.name ? f.name.charAt(0).toUpperCase() : "?"}</div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-slate-800">{f.name}</div>
                    <div className="text-xs text-slate-400">{f.email}</div>
                  </div>

                  <div className="text-sm font-semibold text-cyan-700">{f.rating}★</div>
                </div>

                <p className="mt-2 text-slate-700">{f.message}</p>

                <div className="mt-3 text-xs text-slate-400">{new Date(f.createdAt).toLocaleString()}</div>
              </div>

              <button
                onClick={() => deleteh(f._id)}
                className="ml-3 px-3 mt-16 py-1 rounded-md bg-red-500 text-white text-sm hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
