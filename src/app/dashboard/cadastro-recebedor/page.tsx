"use client";

import { Form } from "@/components/ui/form";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FormData, formSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";

const steps = [
  { index: 1, title: "Account Details" },
  { index: 2, title: "Personal Info" },
  { index: 3, title: "Social Links" },
];

export default function CadastroRecebedor() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    confirmPassword: "",
    contact: "email",
    interests: [],
    newsletter: false,
  });

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateStep = () => {
    if (currentStep === 2 && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return false;
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep()) setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep()) {
      alert("Form submitted successfully!");
      console.log(formData);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="container mx-auto p-4">
        <div className="bg-white border-gray-300 border-solid border rounded-lg p-6 md:p-10 max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">
            Account Setup Wizard
          </h1>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              {["Personal Info", "Account Details", "Preferences"].map(
                (label, index) => (
                  <span
                    key={index}
                    className={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200 ${
                      index + 1 <= currentStep ? "" : "opacity-50"
                    }`}
                  >
                    {label}
                  </span>
                )
              )}
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200">
              <div
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500 transition-all duration-500 ease-in-out"
                style={{ width: `${(currentStep / 3) * 100}%` }}
              ></div>
            </div>
          </div>

          <Form {...form}></Form>

          {/* Form Steps */}
          <form onSubmit={handleSubmit}>
            {currentStep === 1 && (
              <div>
                <input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="input"
                  required
                />
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="Email Address"
                  className="input"
                  required
                />
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  type="tel"
                  placeholder="Phone Number"
                  className="input"
                  required
                />
              </div>
            )}
            {currentStep === 2 && (
              <div>
                <input
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Username"
                  className="input"
                  required
                />
                <input
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  type="password"
                  placeholder="Password"
                  className="input"
                  required
                />
                <input
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  type="password"
                  placeholder="Confirm Password"
                  className="input"
                  required
                />
              </div>
            )}
            {currentStep === 3 && (
              <div>
                <label>Preferred Contact Method:</label>
                <input
                  type="radio"
                  name="contact"
                  value="email"
                  checked={formData.contact === "email"}
                  onChange={handleChange}
                />{" "}
                Email
                <input
                  type="radio"
                  name="contact"
                  value="phone"
                  checked={formData.contact === "phone"}
                  onChange={handleChange}
                />{" "}
                Phone
                <label>Subscribe to Newsletter:</label>
                <input
                  type="checkbox"
                  name="newsletter"
                  checked={formData.newsletter}
                  onChange={handleChange}
                />
              </div>
            )}

            {/* Navigation Buttons */}
            <div className={`flex ${currentStep < 2 ? 'justify-end' : 'justify-between'} mt-8`}>
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
                >
                  Previous
                </button>
              )}
              {currentStep < 3 && (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  Next
                </button>
              )}
              {currentStep === 3 && (
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  Submit
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
