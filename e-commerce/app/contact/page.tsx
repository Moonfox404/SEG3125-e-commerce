"use client";
import React, { useState } from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      <NavBar />
      <div className="min-h-screen p-6 sm:p-12 bg-corns ink">
        <div className="max-w-2xl mx-auto bg-white p-6 sm:p-10 rounded-lg shadow">
          <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-4">
            Contact Us
          </h1>
          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-700 mb-1"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="border p-2 rounded"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="border p-2 rounded"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-gray-700 mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  required
                  className="border p-2 rounded"
                />
              </div>
              <button
                type="submit"
                className="bg-primary text-white py-2 rounded hover:bg-primary-dark transition"
              >
                Send Message
              </button>
            </form>
          ) : (
            <div className="text-center">
              <h2 className="text-xl font-semibold text-green-600 mb-2">
                Thank you!
              </h2>
              <p className="text-gray-700">
                Your message has been received. We'll get back to you within 1-2
                business days.
              </p>
            </div>
          )}

          <div className="mt-8 border-t pt-4 text-gray-700">
            <p>
              <strong>Customer Service:</strong> support@furnitureforest.ca
            </p>
            <p>
              <strong>Phone:</strong> 1-613-FOREST (1-613-367-378)
            </p>
            <p>
              <strong>Address:</strong> 123 Some Street, Ottawa, ON
            </p>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
