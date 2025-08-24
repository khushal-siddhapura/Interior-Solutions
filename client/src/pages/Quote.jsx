import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import SectionTitle from "../components/SectionTitle";
import Button from "../components/Button";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiBox,
  FiHash,
  FiMapPin,
  FiUploadCloud,
  FiChevronDown,
  FiCheckCircle,
} from "react-icons/fi";

const Quote = ({ preview = false }) => {
  const navigate = useNavigate();
  const [formStatus, setFormStatus] = useState({ message: "", type: "" }); // NEW: State for form status

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const designFile = watch("design");
  const fileName = designFile && designFile[0] ? designFile[0].name : null;

  // UPDATED: onSubmit function with state-based notifications
  const onSubmit = async (data) => {
    setFormStatus({ message: "", type: "" }); // Clear previous status

    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key === "design" && data.design[0]) {
        formData.append("file", data.design[0]);
      } else {
        formData.append(key, data[key]);
      }
    });

    try {
      await axios.post(
        "https://interior-solutions.onrender.com/api/public/quote",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setFormStatus({
        message: "Request sent! We'll get back to you soon.",
        type: "success",
      });
      reset(); // Reset form fields on success
    } catch (error) {
      setFormStatus({
        message: "Submission failed. Please try again.",
        type: "error",
      });
    }
  };

  if (preview) {
    return (
      <div className="bg-white p-8 sm:p-12 rounded-2xl shadow-sm border border-stone-200/60 text-center">
        <SectionTitle
          title="Let's Plan Your Project"
          subtitle="Get a clear and competitive quote tailored to your specific needs. It's fast, free, and there's no obligation."
        />
        <p className="max-w-2xl mx-auto text-stone-600 mb-12 tracking-wide">
          Provide us with your project details to receive a personalized
          estimate from our team.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div className="bg-stone-50 p-4 rounded-lg shadow-md border border-stone-200 transition-all duration-300 hover:shadow-xl hover:scale-105 transform">
            <FiCheckCircle className="mx-auto text-green-500 mb-2 text-xl" />
            <span className="font-semibold text-stone-700">
              Personalized Pricing
            </span>
          </div>
          <div className="bg-stone-50 p-4 rounded-lg shadow-md border border-stone-200 transition-all duration-300 hover:shadow-xl hover:scale-105 transform hover:!rotate-0">
            <FiCheckCircle className="mx-auto text-green-500 mb-2 text-xl" />
            <span className="font-semibold text-stone-700">Expert Advice</span>
          </div>
          <div className="bg-stone-50 p-4 rounded-lg shadow-md border border-stone-200 transition-all duration-300 hover:shadow-xl hover:scale-105 transform">
            <FiCheckCircle className="mx-auto text-green-500 mb-2 text-xl" />
            <span className="font-semibold text-stone-700">No Obligation</span>
          </div>
        </div>
        <Button variant="ViewProduct" onClick={() => navigate("/quote")}>
          Start My Quote
        </Button>
      </div>
    );
  }

  return (
    <section className="py-20 bg-stone-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Request a Custom Quote"
          subtitle="Provide your project details below for a personalized estimate."
        />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-12 bg-white p-8 sm:p-10 rounded-2xl shadow-lg space-y-8"
        >
          {/* Section 1: Contact Details */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-stone-800 border-b pb-2">
              1. Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              {/* Name Field */}
              <div>
                <div className="relative">
                  <FiUser className="absolute top-1/2 -translate-y-1/2 left-4 text-stone-400" />
                  <input
                    type="text"
                    {...register("name", { required: "Name is required" })}
                    placeholder="Full name"
                    className="w-full pl-12 pr-4 py-3 bg-stone-100 border-transparent rounded-lg focus:ring-2 focus:ring-indigo-300 focus:outline-none"
                  />
                </div>
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <div className="relative">
                  <FiMail className="absolute top-1/2 -translate-y-1/2 left-4 text-stone-400" />
                  <input
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: "Please add a valid email address",
                      },
                    })}
                    placeholder="you@example.com"
                    className="w-full pl-12 pr-4 py-3 bg-stone-100 border-transparent rounded-lg focus:ring-2 focus:ring-indigo-300 focus:outline-none"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Phone Field */}
              <div className="md:col-span-2">
                <div className="relative">
                  <FiPhone className="absolute top-1/2 -translate-y-1/2 left-4 text-stone-400" />
                  <input
                    type="tel"
                    {...register("phone", {
                      required: "Please enter a valid 10-digit phone number",
                      pattern: {
                        value: /^(?:\+91)?[ -]?\d{10}$/,
                        message: "Invalid phone number",
                      },
                    })}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full pl-12 pr-4 py-3 bg-stone-100 border-transparent rounded-lg focus:ring-2 focus:ring-indigo-300 focus:outline-none"
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Section 2: Project Details */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-stone-800 border-b pb-2">
              2. Project Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              {/* Project Type Field */}
              <div>
                <div className="relative">
                  <FiBox className="absolute top-1/2 -translate-y-1/2 left-4 text-stone-400" />
                  <select
                    {...register("projectType", {
                      required: "Please select a project type",
                    })}
                    className="w-full pl-12 pr-10 py-3 bg-stone-100 border-transparent rounded-lg focus:ring-2 focus:ring-indigo-300 focus:outline-none appearance-none"
                  >
                    <option value="">Project Type</option>
                    <option value="Glass">Glass Partitions</option>
                    <option value="Aluminium">Aluminium Systems Windows</option>
                    <option value="Both">Both</option>
                  </select>
                  <FiChevronDown className="pointer-events-none absolute top-1/2 -translate-y-1/2 right-4 text-stone-400" />
                </div>
                {errors.projectType && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.projectType.message}
                  </p>
                )}
              </div>

              {/* Quantity Field */}
              <div>
                <div className="relative">
                  <FiHash className="absolute top-1/2 -translate-y-1/2 left-4 text-stone-400" />
                  <input
                    type="text"
                    {...register("quantity")}
                    placeholder="Approx. quantity (Optional)"
                    className="w-full pl-12 pr-4 py-3 bg-stone-100 border-transparent rounded-lg focus:ring-2 focus:ring-indigo-300 focus:outline-none"
                  />
                </div>
                {errors.quantity && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.quantity.message}
                  </p>
                )}
              </div>

              {/* Location Field */}
              <div>
                <div className="relative">
                  <FiMapPin className="absolute top-1/2 -translate-y-1/2 left-4 text-stone-400" />
                  <input
                    type="text"
                    {...register("location", {
                      required: "Location is required",
                    })}
                    placeholder="Project Location (City)"
                    className="w-full pl-12 pr-4 py-3 bg-stone-100 border-transparent rounded-lg focus:ring-2 focus:ring-indigo-300 focus:outline-none"
                  />
                </div>
                {errors.location && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.location.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Section 3: Additional Information */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-stone-800 border-b pb-2">
              3. Additional Information
            </h3>
            <div className="grid grid-cols-1 gap-6 pt-4">
              {/* File Upload Field */}
              <div>
                <label
                  htmlFor="design-upload"
                  className="relative flex flex-col items-center justify-center w-full h-32 border-2 border-stone-300 border-dashed rounded-lg cursor-pointer bg-stone-50 hover:bg-stone-100 transition"
                >
                  <FiUploadCloud className="text-3xl text-stone-400 mb-2" />
                  <p className="text-sm text-stone-600">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-stone-500">
                    PDF, PNG, JPG, or CAD file (Max 5MB)
                  </p>
                  <input
                    id="design-upload"
                    type="file"
                    className="opacity-0 absolute inset-0 w-full h-full"
                    {...register("design", {
                      validate: {
                        lessThan5MB: (files) => {
                          if (!files || files.length === 0) return true; // Pass if no file is selected
                          return (
                            files[0]?.size < 5000000 || "File must be under 5MB"
                          );
                        },
                        acceptedFormats: (files) => {
                          if (!files || files.length === 0) return true; // Pass if no file is selected
                          return (
                            [
                              "image/jpeg",
                              "image/png",
                              "application/pdf",
                              "image/vnd.dwg",
                              "image/vnd.dxf",
                            ].includes(files[0]?.type) ||
                            "Unsupported file format"
                          );
                        },
                      },
                    })}
                  />
                </label>
                {fileName && !errors.design && (
                  <p className="text-sm text-green-600 mt-2">
                    File selected: {fileName}
                  </p>
                )}
                {errors.design && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.design.message}
                  </p>
                )}
              </div>

              {/* Message Textarea */}
              <textarea
                rows={4}
                {...register("message", {
                  maxLength: {
                    value: 500,
                    message: "Message cannot exceed 500 characters",
                  },
                })}
                placeholder="Tell us more about your project requirements, dimensions, etc..."
                className="w-full px-4 py-3 bg-stone-100 border-transparent rounded-lg focus:ring-2 focus:ring-indigo-300 focus:outline-none resize-none"
              />
              {errors.message && (
                <p className="text-red-500 text-sm mt-1 -mt-5">
                  {errors.message.message}
                </p>
              )}
            </div>
          </div>

          {/* Submission Area */}
          <div className="pt-4">
            <div className="flex justify-center">
              <Button
                type="submit"
                variant="ContactBtn"
                className="w-full py-3 text-lg font-semibold sm:w-auto sm:px-12"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Quote Request"}
              </Button>
            </div>

            {/* NEW: Status message display */}
            {formStatus.message && (
              <p
                className={`mt-4 text-center text-sm font-medium ${
                  formStatus.type === "success"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {formStatus.message}
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default Quote;
