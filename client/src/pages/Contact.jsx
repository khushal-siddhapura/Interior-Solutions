import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import SectionTitle from "../components/SectionTitle";
import Button from "../components/Button";
import {
  FiMail,
  FiMapPin,
  FiPhone,
  FiUser,
  FiMessageSquare,
} from "react-icons/fi";

const Contact = ({ preview = false }) => {
  const navigate = useNavigate();
  const [formStatus, setFormStatus] = useState({ message: "", type: "" });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  // ✨ MODIFIED onSubmit function to use state instead of toast
  const onSubmit = async (data) => {
    setFormStatus({ message: "", type: "" }); // Clear previous status

    try {
      await axios.post(
        "https://interior-solutions.onrender.com/api/public/contact",
        data
      );
      setFormStatus({
        message: "Message sent! We'll be in touch soon.",
        type: "success",
      });
      reset(); // Reset form fields on success
    } catch (error) {
      setFormStatus({
        message: "Oops! Something went wrong. Please try again.",
        type: "error",
      });
    }
  };

  // Preview logic remains the same...
  if (preview) {
    return (
      <div className="relative bg-stone-100 p-8 sm:p-12 rounded-2xl overflow-hidden">
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-gradient-to-br from-indigo-200 to-violet-300 rounded-full opacity-60 blur-xl"></div>
        <div className="absolute -bottom-16 -left-10 w-60 h-60 bg-teal-200 rounded-full opacity-50 blur-2xl"></div>
        <div className="relative z-10 text-center">
          <SectionTitle title="Have an Idea?" />
          <p className="max-w-xl mx-auto text-stone-600 mb-8 tracking-wide">
            Let's turn your concept into a stunning reality. Reach out and our
            team will get back to you promptly.
          </p>
          <div className="inline-flex flex-col sm:flex-row items-center gap-6 bg-white p-4 px-6 rounded-full shadow-sm mb-8">
            <div className="flex items-center gap-2 text-stone-700">
              <FiPhone className="text-indigo-500" />
              <span className="font-medium">+91-99786 41486</span>
            </div>
            <div className="hidden sm:block h-5 w-px bg-stone-300"></div>
            <div className="flex items-center gap-2 text-stone-700">
              <FiMail className="text-indigo-500" />
              <span className="font-medium">kirangajjar2611@gmail.com</span>
            </div>
          </div>
          <div>
            <Button variant="ViewProduct" onClick={() => navigate("/contact")}>
              Send Us a Message
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-20 bg-stone-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Contact Us"
          subtitle="We're here to help. Reach out with any questions or to start your next project."
        />
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-16 items-start ">
          <div className="space-y-8 text-stone-700 text-center md:text-left">
            <h3 className="text-2xl font-semibold text-stone-800">
              Contact Information
            </h3>
            <p className="text-stone-600 leading-relaxed">
              Our team is available to assist you. Fill out the form, and we'll
              get back to you as soon as possible. For immediate assistance,
              please use the contact details below.
            </p>

            {/* This div will now center its children on small screens */}
            <div className="space-y-6 flex flex-col items-center md:items-start">
              {/* Phone */}
              <div className="flex items-center gap-3">
                <FiPhone className="text-indigo-500 text-xl flex-shrink-0" />
                <span className="text-lg">+91 99786-41486</span>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3">
                <FiMail className="text-indigo-500 text-xl flex-shrink-0 mt-1" />
                <span className="text-lg break-all">
                  kirangajjar2611@gmail.com
                </span>
              </div>

              {/* Address */}
              <div className="flex items-start sm:gap-3 gap-1">
                <FiMapPin className="text-indigo-500 text-xl flex-shrink-0 mt-1" />
                <span className="text-lg">
                  Ghuma, Ahmedabad, 380058 Gujarat, India
                </span>
              </div>
            </div>
          </div>

          {/* Right Side: Form with corrected structure */}
          <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-lg">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* --- FIELD WRAPPER START --- */}
              <div>
                <div className="relative">
                  <FiUser className="absolute top-1/2 -translate-y-1/2 left-4 text-stone-400" />
                  <input
                    type="text"
                    {...register("name", {
                      required: "Name is required",
                      minLength: {
                        value: 2,
                        message: "Name must be at least 2 characters",
                      },
                    })}
                    placeholder="Full name"
                    className="w-full pl-12 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:outline-none transition-shadow"
                  />
                </div>
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>
              {/* --- FIELD WRAPPER END --- */}
              {/* --- FIELD WRAPPER START --- */}
              <div>
                <div className="relative">
                  <FiPhone className="absolute top-1/2 -translate-y-1/2 left-4 text-stone-400" />
                  <input
                    type="tel"
                    {...register("phone", {
                      required: "Phone number is required",
                      pattern: {
                        value: /^(?:\+91)?[ -]?\d{10}$/,
                        message: "Please enter a valid 10-digit phone number",
                      },
                    })}
                    placeholder="+91-XXXXXXXXXX"
                    className="w-full pl-12 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:outline-none transition-shadow"
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>
              {/* --- FIELD WRAPPER END --- */}
              {/* --- FIELD WRAPPER START --- */}
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
                        message: "Please enter a valid email address",
                      },
                    })}
                    placeholder="you@example.com"
                    className="w-full pl-12 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:outline-none transition-shadow"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
              {/* --- FIELD WRAPPER END --- */}
              {/* --- FIELD WRAPPER START --- */}
              <div>
                <div className="relative">
                  <FiMessageSquare className="absolute top-5 left-4 text-stone-400" />
                  <textarea
                    rows={5}
                    {...register("message", {
                      required: "Message is required",
                      maxLength: {
                        value: 500,
                        message: "Message cannot exceed 500 characters",
                      },
                    })}
                    placeholder="Write your message..."
                    className="w-full pl-12 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:outline-none transition-shadow resize-none"
                  />
                </div>
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>
              {/* --- FIELD WRAPPER END --- */}
              {/* // Add flex and justify-center to the parent div */}
              <div className="flex justify-center">
                <Button
                  type="submit"
                  variant="ViewProduct"
                  // IMPORTANT: Remove w-full and add padding (like px-10) for a nice width
                  className="w-auto px-10 py-3 text-lg font-semibold tracking-wider"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </div>
              {/* ✨ ADD THIS BLOCK to display success/error message */}
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
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
