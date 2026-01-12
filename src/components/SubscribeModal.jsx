"use client";

import { useState } from "react";
import { X } from "lucide-react";

const industries = [
  "Industry",
  "Advertising & Marketing",
  "Technology",
  "Finance & Banking",
  "Healthcare",
  "Retail & E-commerce",
  "Manufacturing",
  "Education",
  "Other",
];

const countries = [
  "Country",
  "United Arab Emirates",
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Germany",
  "France",
  "India",
  "Singapore",
  "Other",
];

export default function SubscribeModal({ onClose }) {
  const [formData, setFormData] = useState({
    fullName: "",
    jobTitle: "",
    company: "",
    industry: "Industry",
    country: "Country",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    onClose();
  };

  return (
    <div className="relative w-[960px] max-w-full bg-white shadow-2xl overflow-hidden">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-1 hover:opacity-70 transition-opacity cursor-pointer z-10"
      >
        <X className="w-6 h-6 text-gray-600" />
      </button>

      <div className="p-16 lg:p-20">
        {/* Heading */}
        <h2 className="font-serif text-4xl lg:text-5xl text-gray-900 leading-tight max-w-lg mb-12">
          Subscribe to stay inspired by thoughtful design
        </h2>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left - Description */}
          <div className="text-gray-500 leading-relaxed">
            <p>
              At Decograph Interiors, we believe great spaces begin with great
              ideas. Subscribe to receive curated insights, design inspirations,
              project highlights, and industry perspectives straight to your
              inbox. Stay connected with our latest work across residential,
              retail, and commercial interiors.
            </p>
          </div>

          {/* Right - Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Text Inputs */}
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full border-b border-gray-300 pb-3 text-gray-400 placeholder-gray-400 focus:outline-none focus:border-gray-500 transition-colors"
            />
            <input
              type="text"
              name="jobTitle"
              placeholder="Job Title"
              value={formData.jobTitle}
              onChange={handleChange}
              className="w-full border-b border-gray-300 pb-3 text-gray-400 placeholder-gray-400 focus:outline-none focus:border-gray-500 transition-colors"
            />
            <input
              type="text"
              name="company"
              placeholder="Company"
              value={formData.company}
              onChange={handleChange}
              className="w-full border-b border-gray-300 pb-3 text-gray-400 placeholder-gray-400 focus:outline-none focus:border-gray-500 transition-colors"
            />

            {/* Dropdowns */}
            <select
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              className="w-full border-b border-gray-300 pb-3 text-gray-400 bg-transparent focus:outline-none focus:border-gray-500 transition-colors cursor-pointer"
            >
              {industries.map((industry) => (
                <option key={industry} value={industry}>
                  {industry}
                </option>
              ))}
            </select>

            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full border-b border-gray-300 pb-3 text-gray-400 bg-transparent focus:outline-none focus:border-gray-500 transition-colors cursor-pointer"
            >
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border-b border-gray-300 pb-3 text-gray-400 placeholder-gray-400 focus:outline-none focus:border-gray-500 transition-colors"
            />

            {/* Submit Row */}
            <div className="flex items-start justify-between gap-4 pt-4">
              <button
                type="submit"
                className="text-red-500 font-medium hover:opacity-70 transition-opacity cursor-pointer"
              >
                Submit
              </button>
              <p className="text-sm text-gray-900 text-right max-w-[280px]">
                Please review our Privacy Policy to understand how we handle your
                personal information.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
